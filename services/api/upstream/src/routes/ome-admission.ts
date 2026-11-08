/*

Is contacted by the OME stream server if clients connect and asks this api if it should allow or deny the request.

See https://airensoft.gitbook.io/ovenmediaengine/access-control/admission-webhooks

*/

import express from 'express';
import asyncHandler from 'express-async-handler'

import SecretsLoader from '../util/SecretsLoader'
import { JSONSchema4 } from '../util/types/JSONSchema'
import { getUserForStreamToken, GuardError } from '../ManInTheMiddleware';
import { createHmac } from 'crypto';
import { getCore } from '../core';
import dayjs from 'dayjs';

const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets(['ome_admission_secret'])

const router = express.Router()


const OME_AUTH_HEADER = 'X-OME-Signature'

const OME_ADMISSION_REQUEST_SCHEMA: JSONSchema4 = {
    type: 'object',
    required: ['client', 'request'],
    properties: {
        client: {
            type: 'object',
            required: ['address', 'port', 'real_ip'],
            properties: {
                address: {
                    type: 'string'// "211.233.58.86"
                },
                port: {
                    type: 'number'//29291,
                },
                real_ip: {
                    type: 'string'// "192.0.2.43"
                },
                user_agent: {
                    type: 'string'// "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
                }
            }
        },
        request: {
            type: 'object',
            required: ['direction', 'protocol', 'status', 'url', 'time'],
            properties: {
                direction: {
                    type: 'string'// "incoming" or "outgoing"
                },
                protocol: {
                    type: 'string'// "webrtc" or "rtmp" or "srt" or "llhls" or "thumbnail"
                },
                status: {
                    type: 'string'// "opening" or "closing"
                },
                url: {
                   type: 'string'// "scheme://host[:port]/app/stream/file?query=value&query2=value2"
                },
                new_url: {
                    type: 'string'// "scheme://host[:port]/app/new_stream/file?query=value&query2=value2"
                },
                time: {
                    type: 'string'// "2021-05-12T13:45:00.000Z"
                }
            }
        }
    }
}


type OmeAdmissionRequest = {
    client: {
      address: string // IP address of the client connected to the server e.g. "211.233.58.86"
      port: number // Port number of the client connected to the server
      real_ip: string // IP address of the client forwarded by the proxy server e.g. "192.0.2.43",
      user_agent?: string // Client's User_Agent e.g. "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
    },
    request: {
      direction: 'incoming' | 'outgoing' // incoming = a client requests to publish a stream, outgoing = a client requests to play a stream
      protocol: 'webrtc' | 'rtmp' | 'srt' | 'llhls' | 'thumbnail'
      status: 'opening' | 'closing' // opening = a client requests to open a stream, closing = a client closed the stream
      url: string // url requested by the client. Format: "scheme://host[:port]/app/stream/file?query=value&query2=value2",
      new_url?: string // url redirected from user's control server (status "closing" only) Format: "scheme://host[:port]/app/new_stream/file?query=value&query2=value2",
      time: string // time requested by the client (ISO8601 format) e.g. "2021-05-12T13:45:00.000Z"
    }
}

type OmeAdmissionResponse_Opening = {
    allowed: boolean // Allows or rejects the client's request
    new_url?: string // Redirects the client to a new url. However, the scheme, port, and file cannot be different from the request. Only host, app, and stream can be changed. The host can only be changed to another virtual host on the same server.
    lifetime?: number // The amount of time (in milliseconds) that a client can maintain a connection (Publishing or Playback). 0 means infinity. HTTP based streaming (HLS) does not keep a connection, so this value does not apply.
    reason?: string // If allowed is false, it will be output to the log.
}

const OME_ADMISSION_RESPONSE_OPENING_SCHEMA: JSONSchema4 = {
    type: 'object',
    required: ['allowed'],
    properties: {
        allowed: {
            type: 'boolean'
        },
        new_url: {
            type: 'string'
        },
        lifetime: {
            type: 'number'
        },
        reason: {
            type: 'string'
        }
    }
}

router.use((req, res, next)=>{
    let authHeader = req.headers[OME_AUTH_HEADER.toLowerCase()]

    if(authHeader instanceof Array){
        authHeader = authHeader[0]
    }

    // see https://airensoft.gitbook.io/ovenmediaengine/access-control/admission-webhooks#security
    const hmac = createHmac('sha1', secrets.ome_admission_secret)
    hmac.update(JSON.stringify(req.body))
    const hash = hmac.digest('base64url')

    if(authHeader !== hash){
        res.status(401).send()
        console.warn('ome admission auth failed: hash did not match', authHeader, hash)
    } else {
        next()
    }
})

router.post('/', asyncHandler(async(req, res)=>{

    const body = req.GM.guardBodySchema<OmeAdmissionRequest>(OME_ADMISSION_REQUEST_SCHEMA)

    const url = new URL(body.request.url)

    const auth = url.searchParams.get('auth')

    if(typeof auth !== 'string' || auth.length === 0){
        throw GuardError._401_Unauthorized()
    }

    const match = url.pathname.match(/^\/ofh\/(\d+)$/)

    if(!match){
        throw GuardError._400_BadRequest('invalid stream id')
    }

    const connectionId = parseInt(match[1])

    if(isNaN(connectionId)){
        throw GuardError._400_BadRequest('invalid stream id')
    }

    const connection = await getCore().modules.connection.getConnection(connectionId)

    if(connection === false){
        throw GuardError._410_Gone()
    }

    if(body.request.status === 'closing'){//client closed connection

         if(body.request.direction === 'incoming'){// publisher

            getCore().modules.connection.updateConnectionSafe(connection.id, {
                stream_is_alive: false
            })

        }

        res.status(200).send()
    } else {

        if(body.request.direction === 'incoming'){// publisher

            if(auth !== connection.secret){
                throw GuardError._403_Forbidden()
            }

            getCore().modules.connection.updateConnectionSafe(connection.id, {
                stream_is_alive: true
            })

            res.status(200).GM.guardSend<OmeAdmissionResponse_Opening>({
                allowed: true
            }, OME_ADMISSION_RESPONSE_OPENING_SCHEMA)

            return

        } else {// viewer

            const user = await getUserForStreamToken(auth)

            if(user === false){

                const liveShareKey = await getCore().modules.connection.getLiveShareKey(auth)

                if(liveShareKey === false){
                    throw GuardError._403_Forbidden()
                } else {

                    if(liveShareKey.connection_id !== connection.id){
                        throw GuardError._403_Forbidden()
                    }

                    if(dayjs(liveShareKey.valid_until).isAfter(dayjs()) === false){
                        throw GuardError._403_Forbidden()
                    }

                    res.status(200).GM.guardSend<OmeAdmissionResponse_Opening>({
                        allowed: true
                    }, OME_ADMISSION_RESPONSE_OPENING_SCHEMA)

                    return
                }
            }

            if(await getCore().modules.user.userHasPermissionForWorkspace(user.id, connection.workspace_id) === false){
                throw GuardError._403_Forbidden()
            }

            res.status(200).GM.guardSend<OmeAdmissionResponse_Opening>({
                allowed: true
            }, OME_ADMISSION_RESPONSE_OPENING_SCHEMA)

            return
        }
    }
}))

export default router
