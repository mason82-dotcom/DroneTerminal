import express from 'express';
import ws from 'ws'
import TrafficSensing, { SensingHandle } from '../../../aircraft_sensing/TrafficSensing';
import { getCore } from '../../../core';
import { WorkspaceTrafficSensingHandle } from '../../../core/modules/WorkspaceModule';
import { DJI_SUPPORTED_COLORS, getDJIGeoJsonForGeoObject, getDJIMapElementTypeForGeoObject } from '../../../util/dji';
import { DBType_Connection, DBType_Geo_Object } from '../../../generated-definitions/db/DBTypes';
//@ts-ignore
const trafficSense : TrafficSensing = global.trafficSense

if(!trafficSense){
    //TODO move trafficSenso to geoobjects module throw new Error('missing global trafficSense')
}

const router = express.Router()

const DRONE_SENSING_RADIUS_ON_MAP = 1000 * 100

const connectedDjiPilot2Clients = new Map<number /* connectionId */, {
    ws: ws.WebSocket
    droneSensingHandle?: SensingHandle,
    workspaceTrafficSensingHandle?: WorkspaceTrafficSensingHandle,
    existingMapElementIds: string[]
}>()

//TODO fix this dirty hack (used in connector/dji-pilot-2/index.ts)
//@ts-ignore
global.sendToConnection = sendToConnection

router.ws('/', (ws: ws.WebSocket, req) => {//TODO implement deny handshake when user is not authenticated (right now we open the connection, then check, then close) https://github.com/websockets/ws/blob/HEAD/doc/ws.md#new-websocketserveroptions-callback https://github.com/websockets/ws/issues/377 https://github.com/expressjs/express/issues/2556

    req.GM.guardDjiPilot2ApiWebsocketIsAuthenticated().then(connection=>{

        console.log('/dji-pilot-2 ws connectionId' + connection.id, 'has connected to workspace', connection.workspace_id)

        connectedDjiPilot2Clients.set(connection.id, {
            ws,
            existingMapElementIds: []
        })

        ws.on('message', (data, isBinary)=>{
            if(isBinary){
                console.error('unexpectedly received binary data from websocket', connection.id, data)
            } else {
                const dataString = data.toString()

                if(dataString === 'ping'){
                    //TODO should we respond with "pong" ? ws.send("pong")

                    ws.send('ping')// if we dont respond with ping or pong, webcsocket closes with code 4000

                    return
                }

                let parsed

                try {
                    parsed = JSON.parse(dataString)
                } catch (err){
                    console.error('failed to parse ws message', connection.id, dataString, err)
                }

                ////TODO we should update the drone traffic sensing area when we receive a new position from the drone

                try {
                    handleMessage(ws, connection.id, parsed)
                } catch (err){
                    console.error('failed ws handleMessage()', connection.id, err)
                }
            }
        })

        ws.on('error', (err)=>{
            console.log('dji pilot 2 ws error', err)
        })

        ws.on('close', (code, reason)=>{
            console.log('dji pilot 2 ws has closed for workspace', connection.workspace_id, code, reason.toString())

            const existingClient = connectedDjiPilot2Clients.get(connection.id)

            if(!existingClient){
                return
            }

            if(existingClient.droneSensingHandle){
                existingClient.droneSensingHandle.stop()
            }

            if(existingClient.workspaceTrafficSensingHandle){
                existingClient.workspaceTrafficSensingHandle.stop()
            }

            connectedDjiPilot2Clients.delete(connection.id)
        })

        if(typeof connection.workspace_id === 'number'){

            const theConnectedClient = connectedDjiPilot2Clients.get(connection.id)
            if(theConnectedClient){
                getCore().modules.workspace.activateTrafficSensing(connection.workspace_id).then(handle => {
                    theConnectedClient.workspaceTrafficSensingHandle = handle
                }).catch(err => {
                    console.error('failed to activate traffic sensing for workspace', connection.workspace_id, err)
                })
            }
        } else {

            //TODO also implement sensing for position of remote controller
            if(typeof connection.last_drone_id === 'number'){
                getCore().modules.drone.getLastPositionOfDrone(connection.last_drone_id).then(lastDronePosition => {
                    if(lastDronePosition !== false){
                        const handle = trafficSense.startSensing(lastDronePosition.latitude, lastDronePosition.longitude, DRONE_SENSING_RADIUS_ON_MAP)

                        const theConnectedClient = connectedDjiPilot2Clients.get(connection.id)

                        if(!theConnectedClient){
                            return
                        }

                        theConnectedClient.droneSensingHandle = handle

                        //TODO implement removing existing map element ids after we havent received an update for a long time

                        handle.addListener('traffic', trafficData=>{

                            const existsAlready = theConnectedClient.existingMapElementIds.includes(trafficData.id)

                            ws.send(JSON.stringify({
                                biz_code: existsAlready ? 'map_element_update' : 'map_element_create',
                                version: '1.0',
                                timestamp: Date.now(),
                                data: {
                                    group_id: connection.workspace_uuid,
                                    id: trafficData.id,
                                    name: trafficData.name,
                                    resource: {
                                        type: 0,
                                        user_name: 'OpenFlightHub Server',
                                        content: {
                                            type: 'Feature',
                                            properties: {
                                                color: DJI_SUPPORTED_COLORS.RED,
                                            },
                                            geometry: {
                                                type: 'Point',
                                                coordinates: [trafficData.position.longitude, trafficData.position.latitude, trafficData.position.height]
                                            }
                                        }
                                    }
                                }
                            }))

                            if(!existsAlready){
                                theConnectedClient.existingMapElementIds.push(trafficData.id)
                            }
                        })

                        console.log('done with setting up traffic map markers for dji pilot 2 ws', connection)
                    }
                }).catch(err => {
                    console.error('failed to get last position of drone in order to set up traffic sensing', err)
                })
            }
        }

        //force update of topology
        ws.send(JSON.stringify({
            biz_code: 'device_update_topo',
            version: '1.0',
            timestamp: Date.now(),
            data: {}
        }))


        //sync geo objects

        getCore().modules.geoObject.getUnsyncedGeoObjects(connection.workspace_id).then(geoObjects => {

            console.log('syncing geo objects with dji pilot 2 ws client', connection.id, geoObjects.length, 'geo objects to sync')

            for(const geoObject of geoObjects){

                if(geoObject.type === 0){
                    sendCreateGeoObjectMessage(ws, geoObject, connection)
                    getCore().modules.geoObject.updateGeoObject(geoObject.id, {
                        is_synced_with_dji: true
                    }).catch(err => {
                        console.error('failed to update geo object after syncing with dji pilot 2 ws client', geoObject.id, connection.id, err)
                    })
                }

                //TODO support traffic and unit geo objects
            }

        }).catch(err => {
            console.error('failed to get unsynced geo objects for syncing with dji pilot 2 ws client', connection.id, err)
        })

        //TODO remove this testing code

        setInterval(()=>{

            if(ws.readyState === ws.OPEN){

                ws.send(JSON.stringify({
                    biz_code: 'device_osd',
                    version: '1.0',
                    timestamp: Date.now(),
                    data: {
                        sn: 'SN#TEST-SIT-AWARE-HOST',
                        host: {
                            latitude: 47.591146,
                            longitude: 9.76875,
                            height: 700,
                            elevation: 200,
                            attitude_head: 45,
                            horizontal_speed: 5,
                            vertical_speed: 1
                        }
                    }
                }))

                ws.send(JSON.stringify({
                    biz_code: 'device_osd',
                    version: '1.0',
                    timestamp: Date.now(),
                    data: {
                        sn: 'SN#TEST-SIT-AWARE-PARENT',
                        host: {
                            latitude: 47.595146,
                            longitude: 9.76275,
                            height: 500,
                            elevation: 0,
                            attitude_head: 45,
                            horizontal_speed: 0,
                            vertical_speed: 0
                        }
                    }
                }))

            }

        }, 1000 * 1)

    }).catch(()=>{
        ws.close(4001, 'Unauthorized')
    })
})

function handleMessage(ws: ws.WebSocket, connectionId: number, data: any){
    console.warn('received unexpected message from dji pilot 2 ws client', connectionId, data)
}

function sendCreateGeoObjectMessage(ws: ws.WebSocket, geoObject: DBType_Geo_Object, connection: DBType_Connection){
    ws.send(JSON.stringify({
        biz_code: 'map_element_create',
        version: '1.0',
        timestamp: Date.now(),
        data: {
            group_id: connection.workspace_uuid,
            id: geoObject.id,
            name: geoObject.name,
            type: getDJIMapElementTypeForGeoObject(geoObject.sub_type as unknown as 0 | 1 | 2 | 3),
            content: getDJIGeoJsonForGeoObject(geoObject)
        }
    }))

    //TODO check if the websocket responds with success/erro
}

function sendCreateGeoObjectMessageToClient(geoObject: DBType_Geo_Object, connection: DBType_Connection){
    const client = connectedDjiPilot2Clients.get(connection.id)

    return sendCreateGeoObjectMessage(client!.ws, geoObject, connection)
}
//@ts-ignore
global.sendCreateGeoObjectMessageToClient = sendCreateGeoObjectMessageToClient //TODO fix this hack (otherwise import circle breaks everything)

/**
 * @param messageData will be stringified as json
 * @returns false if no client for this connectionId is connected
 */
export function sendToConnection(connectionId: number, messageData: object): boolean {
    const client = connectedDjiPilot2Clients.get(connectionId)

    if(typeof client === 'undefined'){
       return false
    }

    client.ws.send(JSON.stringify(messageData))

    return true
}

export default router
