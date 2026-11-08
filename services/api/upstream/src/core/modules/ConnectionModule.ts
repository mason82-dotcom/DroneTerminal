
import { DBUpdate_Connection, delete_Connection, delete_Live_Share_Key, insert_Connection, insert_Live_Share_Key, select_Connection, select_Live_Share_Key, update_Connection } from '../../generated-definitions/db/DBHelpers'
import {DBType_Connection} from '../../generated-definitions/db/DBTypes'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import { isConnectionOnline } from '../../connector/dji-pilot-2'
import dayjs from 'dayjs'
import { getCore } from '../index'
import { generateUniqueTokenUrlSafe } from '../../util/crypto'
import { createBucketForConnection } from '../../s3-store'
import { getRandomUUIDFromId } from '../../util/uuid'
import * as express from 'express'

import pgp from 'pg-promise'
import { setSessionCookie } from '../../util/cookie'
import type DroneModule from './DroneModule'
import { createSimpleHumanReadableCode } from '../../util/humankey'

//@ts-ignore
const db = global.db as pgp.IDatabase<any>

const TOKEN_BYTE_LENGTH = 42

export default class ConnectionModule extends Module_Base<
    {
        workspaceId: number,
        id: number
    },

    {
        create_connection: {
            eventDataType: DBType_Connection,
            availableContexts: 'workspaceId' | 'id'
        },
        update_connection: {
            eventDataType: DBType_Connection,
            availableContexts: 'workspaceId' | 'id'
        },
        delete_connection: {
            eventDataType: DBType_Connection,
            availableContexts: 'workspaceId' | 'id'
        }
    }
> {

    constructor(){
        super()
    }



    async createConnection(workspaceId: number, name: string){

        const connection = await insert_Connection({
            secret: generateUniqueTokenUrlSafe(25),
            workspace_id: workspaceId,
            name,
            workspace_uuid: getRandomUUIDFromId(workspaceId)
        })

        await createBucketForConnection(connection.id)

        //TODO: delete connection if create bucket was unsuccessfull

        this.dispatch('create_connection', {
            id: connection.id,
            workspaceId: connection.workspace_id
        }, connection)

        return connection
    }

    /**
     *
     * @returns false if connection does not exist
     * @see updateConnectionSafe
     */
    async updateConnection(id: number, data: DBUpdate_Connection){
        const connection = await update_Connection(id, data)

        if(connection === false){
            return false
        }

        this.dispatch('update_connection', {
            id: connection.id,
            workspaceId: connection.workspace_id
        }, connection)

        return connection
    }

    /**
     *
     * @see updateConnection
     */
    updateConnectionSafe = makeFunctionIdSafe(this, this.updateConnection)

    /**
     *
     * @returns false if does not exist
     * @see deleteConnectionSafe
     */
    async deleteConnection(id: number){
        const connection = await delete_Connection(id)

        if(connection === false){
            return false
        }

        this.dispatch('delete_connection', {
            id: connection.id,
            workspaceId: connection.workspace_id
        }, connection)
    }

    /**
     *
     * @see deleteConnection
     */
    deleteConnectionSafe = makeFunctionIdSafe(this, this.deleteConnection)

    /**
     *
     * @returns false if does not exist
     * @see getConnectionSafe
     */
    async getConnection(id: number){
        return await select_Connection(id)
    }
    /**
     *
     * @see getConnection
     */
    getConnectionSafe = makeFunctionIdSafe(this, this.getConnection)





    /**
     *
     * @returns false if connection does not exist
     */
    async getDroneConnectionOnlineStatus(connectionId: number): Promise<false | {
        remoteController: boolean
        drone: boolean
    }> {

        const connection = await select_Connection(connectionId)

        if(connection === false){
            return false
        }

        const mqttIsConnected = isConnectionOnline(connectionId)

        if(typeof connection.last_drone_id !== 'number'){
            return {
                remoteController: mqttIsConnected,
                drone: false
            }
        }

        let lastPos: Awaited<ReturnType<DroneModule['getLastTelemetryOfDrone']>> | false

        try {
            lastPos = await getCore().modules.drone.getLastTelemetryOfDrone(connection.last_drone_id)
        } catch (err){
            lastPos = false
        }

        return {
            remoteController: mqttIsConnected,
            drone: lastPos && dayjs(lastPos.reported_at).isAfter( dayjs().subtract(120, 'second') )// last telemetry is not older then 120 seconds
        }
    }

    async generateConnectionSessionCookieAndSet(connectionId: number, res: express.Response){

        const sessionToken = generateUniqueTokenUrlSafe(TOKEN_BYTE_LENGTH)

        await db.none('UPDATE connections SET session_token = ${sessionToken} WHERE id = ${id};', {
            id: connectionId,
            sessionToken
        })

        const longTime = 1000 * 60 * 60 * 24 * 365 * 10 // 10 years

        setSessionCookie('connection-link-auth', sessionToken, res, longTime)
    }

    /**
     * @returns
     */
    async getFirstConnectionForWorkspaceThatHasConnectedRemoteController(workspaceId: number): Promise<DBType_Connection | false>{
        const connections = await select_Connection(pgp.as.format('WHERE workspace_id = ${workspaceId} AND remote_controller_id IS NOT NULL', {
            workspaceId
        }))//TODO is this correct?

        if(connections.length === 0){
            return false
        }

        return connections[0]
    }

    async getConnectionLiveShareKeys(connectionId: number){
        return await select_Live_Share_Key(pgp.as.format('WHERE connection_id = ${connectionId}', {connectionId}))
    }

    async createConnectionLiveShareKey(values: {connectionId: number, valid_until?: string, created_by_user_id: number, name?: string}){
        let key = createSimpleHumanReadableCode(5)

        while((await select_Live_Share_Key(pgp.as.format('WHERE key = ${key}', {key}))).length > 0){
            key = createSimpleHumanReadableCode(5)
        }

        const liveShareKey = await insert_Live_Share_Key({
            connection_id: values.connectionId,
            key,
            valid_until: values.valid_until,
            created_by: values.created_by_user_id,
            name: values.name
        })

        return liveShareKey
    }

    async deleteConnectionLiveShareKey(liveShareKeyId: number){
        await delete_Live_Share_Key(liveShareKeyId)
    }

    async getLiveShareKey(key: string){
        const liveShareKeys = await select_Live_Share_Key(pgp.as.format('WHERE key = ${key}', {key}))
        return liveShareKeys.length > 0 ? liveShareKeys[0] : false
    }
}

