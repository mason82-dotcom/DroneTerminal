import {DBInsert_Drone, DBInsert_Drone_Data, DBUpdate_Drone, delete_Drone, insert_Drone, insert_Drone_Data, select_Connection, select_Drone, select_Workspace, update_Drone} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'
import { DBType_Drone, DBType_Drone_Data, DBType_Drone_Data_TYPES, DBType_Drone_Data_TypeType } from '../../generated-definitions/db/DBTypes'
import { getCore } from '..'
import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class DroneModule extends Module_Base<
    {
        id: number
    },

    {
        create_drone: {
            eventDataType: DBType_Drone,
            availableContexts: 'id'
        },
        update_drone: {
            eventDataType: DBType_Drone,
            availableContexts: 'id'
        },
        delete_drone: {
            eventDataType: DBType_Drone,
            availableContexts: 'id'
        },
        create_drone_data: {
            eventDataType: DBType_Drone_Data,
            availableContexts: 'id'
        }
    }
> {

    private subscribableEventHandlerWorkspaceDronesPosition: SubscribableEventHandler<'workspace_drones_position'>
    private subscribableEventHandlerDronePosition: SubscribableEventHandler<'drone_position'>
    private subscribableEventHandlerDroneTelemetry: SubscribableEventHandler<'drone_telemetry'>

    constructor(){
        super()

        this.subscribableEventHandlerDronePosition = registerSubscribableEvent('drone_position', async(event, filter, client)=>{

            const droneId = parseInt(filter)

            if(isNaN(droneId) || droneId < 0){
                return 'invalid filter: ' + droneId
            }

            const workspaceId = await this.getCurrentWorkspaceOfDrone(droneId)//TODO api crashes if drone does not exist

            if(workspaceId === false){
                return 'drone not linked to workspace'
            }

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, workspaceId)

            if(!hasPermission){
                return 'Permission denied'
            }

        })


        this.subscribableEventHandlerDroneTelemetry = registerSubscribableEvent('drone_telemetry', async(event, filter, client)=>{
            const droneId = parseInt(filter)

            if(isNaN(droneId) || droneId < 0){
                return 'invalid filter: ' + droneId
            }

            const workspaceId = await this.getCurrentWorkspaceOfDrone(droneId)// TODO api crashes if drone does not exist

            if(workspaceId === false){
                return 'drone not linked to workspace'
            }

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, workspaceId)

            if(!hasPermission){
                return 'Permission denied'
            }

        })

        this.subscribableEventHandlerWorkspaceDronesPosition = registerSubscribableEvent('workspace_drones_position', async(event, filter, client)=>{

            const workspaceId = parseInt(filter)

            if(isNaN(workspaceId) || workspaceId < 0){
                return 'invalid filter: ' + workspaceId
            }

            const workspace = await select_Workspace(workspaceId)

            if(workspace === false){
                return 'workspace does not exist'
            }

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, workspace.id)

            if(!hasPermission){
                return 'Permission denied'
            }

        })

    }

    async createDrone(data: DBInsert_Drone){
        const drone = await insert_Drone(data)

        this.dispatch('create_drone', {
            id: drone.id
        }, drone)

        return drone
    }

    /**
     *
     * @returns false if does not exist
     * @see updateDroneSafe
     */
    async updateDrone(id: number, data: DBUpdate_Drone){
        const drone = await update_Drone(id, data)

        if(drone === false){
            return false
        }

        this.dispatch('update_drone', {
            id: drone.id
        }, drone)

        return drone
    }

    /**
     *
     * @see updateDrone
     */
    updateDroneSafe = makeFunctionIdSafe(this, this.updateDrone)

    /**
     *
     * @returns false if does not exist
     * @see deleteDroneSafe
     */
    async deleteDrone(id: number){
        const drone = await delete_Drone(id)

        if(drone === false){
            return false
        }

        this.dispatch('delete_drone', {
            id: drone.id
        }, drone)
    }

    /**
     *
     * @see deleteDrone
     */
    deleteDroneSafe = makeFunctionIdSafe(this, this.deleteDrone)

    /**
     *
     * @returns false if does not exist
     * @see getDroneSafe
     */
    async getDrone(id: number){
        return await select_Drone(id)
    }

    /**
     *
     * @see getDrone
     */
    getDroneSafe = makeFunctionIdSafe(this, this.getDrone)

    private async insertDroneData(data: DBInsert_Drone_Data){

        let drone = await this.getDroneSafe(data.drone_id)

        if(typeof drone.current_flight_id !== 'number'){
            const newFlight = await getCore().modules.flight.createFlight({
                drone_id: drone.id,
                workspace_id: await this.getCurrentWorkspaceOfDroneOrDefault(drone.id, 0)
            })

            drone = await this.updateDroneSafe(drone.id, {
                current_flight_id: newFlight.id
            })
        }

        const droneData = await insert_Drone_Data(data)

        if(droneData.type === DBType_Drone_Data_TYPES.position){
            const droneLastPosition = this.extractPositionFromDroneData(droneData)

            if(droneLastPosition === false){
                console.warn('invalid drone position in data', droneData)
            } else {
                this.subscribableEventHandlerDronePosition.triggerListener('' + droneData.drone_id, {
                    id: droneData.drone_id,
                    serial_number: (await this.getDroneSafe(droneData.drone_id)).serial_number,
                    position: droneLastPosition
                })


                const currentWorkspaceId = await this.getCurrentWorkspaceOfDrone(drone.id)

                if(currentWorkspaceId !== false){
                    this.subscribableEventHandlerWorkspaceDronesPosition.triggerListenerIfExists('' + currentWorkspaceId, async ()=>{
                        return {
                            id: droneData.drone_id,
                            serial_number: (await this.getDroneSafe(droneData.drone_id)).serial_number,
                            position: droneLastPosition
                        }
                    })
                }
            }
        } else if (droneData.type === DBType_Drone_Data_TYPES.telemetry){
            const droneLastTelemetry = this.extractTelemetryFromDroneData(droneData)

            if(droneLastTelemetry === false){
                console.warn('invalid drone telemetry in data', droneData)
            } else {
                this.subscribableEventHandlerDroneTelemetry.triggerListener('' + droneData.drone_id, {
                    id: droneData.drone_id,
                    telemetry: droneLastTelemetry
                })
            }
        }

        this.dispatch('create_drone_data', {
            id: droneData.drone_id
        }, droneData)

        return droneData
    }


    async addDroneData(droneId: number, type: DBType_Drone_Data_TypeType, data: any){

        const drone = await this.getDroneSafe(droneId)

        await this.insertDroneData({
            drone_id: droneId,
            flight_id: drone.current_flight_id!,
            type,
            data
        })
    }

    async getLastPositionOfDrone(droneId: number){
        const droneLastPosition = await db.one<DBType_Drone_Data>('SELECT * FROM drone_data WHERE drone_id = ${droneId} AND type = ${type} ORDER BY created_at DESC LIMIT 1', {
            type: DBType_Drone_Data_TYPES.position,
            droneId
        })

        return this.extractPositionFromDroneData(droneLastPosition)
    }


    private extractPositionFromDroneData(droneData: DBType_Drone_Data){

        const possiblePositionData = droneData.data as any

        if(typeof possiblePositionData.latitude !== 'number' || typeof possiblePositionData.longitude !== 'number' || typeof possiblePositionData.height !== 'number'){
            return false
        }

        return {
            reported_at: droneData.created_at,
            latitude: possiblePositionData.latitude as number,
            longitude: possiblePositionData.longitude as number,
            height: possiblePositionData.height as number
        }
    }


    async getLastTelemetryOfDrone(droneId: number){
        const droneLastTelemetry = await db.one<DBType_Drone_Data>('SELECT * FROM drone_data WHERE drone_id = ${droneId} AND type = ${type} ORDER BY created_at DESC LIMIT 1', {//TODO we need to make sure the data contains the required telemetry
            type: DBType_Drone_Data_TYPES.telemetry,
            droneId
        })

        return this.extractTelemetryFromDroneData(droneLastTelemetry)
    }


    private extractTelemetryFromDroneData(droneData: DBType_Drone_Data){

        const possibleTelemetryData = droneData.data as any

        if(typeof possibleTelemetryData.capacity_percent_left !== 'number'){
            return false
        }

        return {
            reported_at: droneData.created_at,
            capacity_percent_left: possibleTelemetryData.capacity_percent_left as number
        }
    }

    async getDroneForSerialNumber(serialNumber: string){
        return db.oneOrNone<DBType_Drone>('SELECT * FROM drones WHERE serial_number = ${serialNumber};', {
            serialNumber
        })
    }

    async setDroneInFlightState(drone: DBType_Drone, isInFlight: boolean){

        //TODO end flight after some time we saw no messages?

        //TODO start new flight, if last time we saw messages was ages ago?

        if(isInFlight && !drone.in_flight){
            // start new flight and end old one

            const currentFlight = await getCore().modules.flight.getFlightSafe(drone.current_flight_id!)

            await getCore().modules.flight.updateFlight(drone.current_flight_id!, {
                ended_at: new Date().toISOString(),
                landed_at: currentFlight.landed_at || new Date().toISOString()
            })

            const currentWorkspace = await this.getCurrentWorkspaceOfDrone(drone.id)

            const newFlight = await getCore().modules.flight.createFlight({
                drone_id: drone.id,
                workspace_id: currentWorkspace === false ? 0 : currentWorkspace
            })

            if(currentWorkspace === false){
                console.warn('creating new flight but drone has no current connection', newFlight, drone)
            }

            drone = await this.updateDroneSafe(drone.id, {
                current_flight_id: newFlight.id,
                in_flight: true
            })
        }

        if(!isInFlight && drone.in_flight){
            // mark flight as landed

            await getCore().modules.flight.updateFlight(drone.current_flight_id!, {
                landed_at: new Date().toISOString()
            })

            drone = await this.updateDroneSafe(drone.id, {
                in_flight: false
            })

        }

        return drone
    }


    async getActiveConnectionForDrone(droneId: number){
        const drone = await this.getDroneSafe(droneId)
        if(typeof drone.last_connection_id !== 'number'){
            return false
        }

        const connection = await getCore().modules.connection.getConnection(drone.last_connection_id)

        if(!connection){
            return false
        }

        if(connection.last_drone_id === droneId){
            return connection
        } else {
            return false
        }
    }

    async getLastConnectionForDrone(droneOrDroneId: DBType_Drone | number){
        if(typeof droneOrDroneId === 'number'){
            droneOrDroneId = await this.getDroneSafe(droneOrDroneId)
        }

        if(typeof droneOrDroneId.last_connection_id !== 'number'){
            return false
        }

        const connection = await select_Connection(droneOrDroneId.last_connection_id)

        if(connection){
            return connection
        } else {
            return false
        }
    }

    async getCurrentWorkspaceOfDrone(droneId: number){
        const currentConnection = await this.getActiveConnectionForDrone(droneId)

        if(currentConnection === false){
            return false
        }

        return currentConnection.workspace_id
    }

    async getCurrentWorkspaceOfDroneOrDefault(droneId: number, def: number){
        const workspaceId = await this.getCurrentWorkspaceOfDrone(droneId)

        if(workspaceId === false){
            return def
        }

        return workspaceId
    }
}
