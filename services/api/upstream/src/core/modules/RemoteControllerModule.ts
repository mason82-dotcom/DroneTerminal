import {DBInsert_Remote_Controller, DBUpdate_Remote_Controller, delete_Remote_Controller, insert_Remote_Controller, insert_Remote_Controller_Data, select_Remote_Controller, update_Remote_Controller} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'
import { DBType_Connection, DBType_Remote_Controller, DBType_Remote_Controller_Data, DBType_Remote_Controller_Data_TypeType } from '../../generated-definitions/db/DBTypes'
import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket'
import { getCore } from '..'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


export const REMOTE_CONTROLLER_DATA_TYPES: Record<string, DBType_Remote_Controller_Data_TypeType> = {
    POSITION: 0
}


export default class RemoteControllerModule extends Module_Base<
    {
        id: number
    },

    {
        create_remote_controller: {
            eventDataType: DBType_Remote_Controller,
            availableContexts: 'id'
        },
        update_remote_controller: {
            eventDataType: DBType_Remote_Controller,
            availableContexts: 'id'
        },
        delete_remote_controller: {
            eventDataType: DBType_Remote_Controller,
            availableContexts: 'id'
        }
    }
> {

    private subscribableEventHandlerRemoteControllerPosition: SubscribableEventHandler<'remote_controller_position'>

    constructor(){
        super()

        //TODO reimplement live remote controller position (got removed at some point around probably 10th April 25 ?)
        this.subscribableEventHandlerRemoteControllerPosition = registerSubscribableEvent('remote_controller_position', async(event, filter, client)=>{

            const remoteControllerId = parseInt(filter)

            if(isNaN(remoteControllerId) || remoteControllerId < 0){
                return 'invalid filter: ' + remoteControllerId
            }

            const remoteController = await this.getRemoteController(remoteControllerId)

            if(remoteController === false){
                return 'remote controller does not exist'
            }

            const connection = await this.getConnectionForRemoteController(remoteController.id)//TODO api crashes if no connection has this remote controller

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, connection.workspace_id)

            if(!hasPermission){
                return 'Permission denied'
            }

        })
    }

    async createRemoteController(data: DBInsert_Remote_Controller){
        const remoteController = await insert_Remote_Controller(data)

        this.dispatch('create_remote_controller', {
            id: remoteController.id
        }, remoteController)

        return remoteController
    }

    /**
     *
     * @returns false if does not exist
     * @see updateRemoteControllerSafe
     */
    async updateRemoteController(id: number, data: DBUpdate_Remote_Controller){
        const remoteController = await update_Remote_Controller(id, data)

        if(remoteController === false){
            return false
        }

        this.dispatch('update_remote_controller', {
            id: remoteController.id
        }, remoteController)

        return remoteController
    }

    /**
     *
     * @see updateRemoteController
     */
    updateRemoteControllerSafe = makeFunctionIdSafe(this, this.updateRemoteController)

    /**
     *
     * @returns false if does not exist
     * @see deleteRemoteControllerSafe
     */
    async deleteRemoteController(id: number){
        const remoteController = await delete_Remote_Controller(id)

        if(remoteController === false){
            return false
        }

        this.dispatch('delete_remote_controller', {
            id: remoteController.id
        }, remoteController)
    }

    /**
     *
     * @see deleteRemoteController
     */
    deleteRemoteControllerSafe = makeFunctionIdSafe(this, this.deleteRemoteController)

    /**
     *
     * @returns false if does not exist
     * @see getRemoteControllerSafe
     */
    async getRemoteController(id: number){
        return await select_Remote_Controller(id)
    }



    /**
     *
     * @see getRemoteController
     */
    getRemoteControllerSafe = makeFunctionIdSafe(this, this.getRemoteController)



    async getRemoteControllerForSerialNumber(serialNumber: string){
        return db.oneOrNone<DBType_Remote_Controller>('SELECT * FROM remote_controllers WHERE serial_number = ${serialNumber};', {
            serialNumber
        })
    }


    async addRemoteControllerData(remoteControllerId: number, type: DBType_Remote_Controller_Data_TypeType, data: any){
        await insert_Remote_Controller_Data({
            remote_controller_id: remoteControllerId,
            type,
            data
        })
    }

    async getLastPositionOfRemoteController(remoteControllerId: number){
        const remoteControllerLastPosition = await db.one<DBType_Remote_Controller_Data>('SELECT * FROM remote_controller_data WHERE remote_controller_id = ${remoteControllerId} AND type = ${type} ORDER BY created_at DESC LIMIT 1', {
            type: REMOTE_CONTROLLER_DATA_TYPES.POSITION,
            remoteControllerId
        })

        return this.extractPositionFromRemoteController(remoteControllerLastPosition)
    }

    async getConnectionForRemoteController(remoteControllerId: number){
        return await db.one<DBType_Connection>('SELECT * FROM connections WHERE remote_controller_id = ${remoteControllerId}', {
            remoteControllerId
        })
    }

    private extractPositionFromRemoteController(remoteControllerData: DBType_Remote_Controller_Data){

        const possibleData = remoteControllerData.data as any

        if(typeof possibleData.latitude !== 'number' || typeof possibleData.longitude !== 'number' || typeof possibleData.height !== 'number'){
            return false
        }

        return {
            reported_at: remoteControllerData.created_at,
            latitude: possibleData.latitude as number,
            longitude: possibleData.longitude as number,
            height: possibleData.height as number
        }
    }


}
