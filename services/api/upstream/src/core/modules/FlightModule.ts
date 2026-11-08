import {DBInsert_Flight, DBInsert_Flight_Data, DBUpdate_Flight, delete_Flight, insert_Flight, insert_Flight_Data, select_Flight, update_Flight} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import * as pgp from 'pg-promise'
import { DBType_Flight, DBType_Flight_Data, DBType_Flight_User_TYPES, DBType_Flight_User_TypeType, DBType_Task_StateType } from '../../generated-definitions/db/DBTypes'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class FlightModule extends Module_Base<
    {
        id: number
        workspaceId: number
    },

    {
        create_flight: {
            eventDataType: DBType_Flight,
            availableContexts: 'workspaceId'
        },
        update_flight: {
            eventDataType: DBType_Flight,
            availableContexts: 'id' | 'workspaceId'
        },
        delete_flight: {
            eventDataType: DBType_Flight,
            availableContexts: 'id' | 'workspaceId'
        },
        create_flight_data: {
            eventDataType: DBType_Flight_Data,
            availableContexts: 'workspaceId'
        }
    }
> {

    constructor(){
        super()
    }

    async createFlight(data: DBInsert_Flight){
        const flight = await insert_Flight(data)

        this.dispatch('create_flight', {
            workspaceId: flight.workspace_id
        }, flight)

        return flight
    }

    /**
     *
     * @returns false if does not exist
     * @see updateFlightSafe
     */
    async updateFlight(id: number, data: DBUpdate_Flight){
        const flight = await update_Flight(id, data)

        if(flight === false){
            return false
        }

        this.dispatch('update_flight', {
            id: flight.id,
            workspaceId: flight.workspace_id
        }, flight)

        return flight
    }

    /**
     *
     * @see updateFlight
     */
    updateFlightSafe = makeFunctionIdSafe(this, this.updateFlight)

    /**
     *
     * @returns false if does not exist
     * @see deleteFlightSafe
     */
    async deleteFlight(id: number){
        const flight = await delete_Flight(id)

        if(flight === false){
            return false
        }

        this.dispatch('delete_flight', {
            id: flight.id,
            workspaceId: flight.workspace_id
        }, flight)
    }

    /**
     *
     * @see deleteFlight
     */
    deleteFlightSafe = makeFunctionIdSafe(this, this.deleteFlight)

    /**
     *
     * @returns false if does not exist
     * @see getFlightSafe
     */
    async getFlight(id: number){
        return await select_Flight(id)
    }

    /**
     *
     * @see getFlight
     */
    getFlightSafe = makeFunctionIdSafe(this, this.getFlight)


    async createFlightData(data: DBInsert_Flight_Data){
        const flightData = await insert_Flight_Data(data)

        const workspaceId = await this.getWorkspaceIdForFlight(flightData.flight_id)

        this.dispatch('create_flight_data', {
            workspaceId
        }, flightData)

        return flightData
    }


    async getTrackForFlight(flightId: number){

        return await db.manyOrNone<{created_at: string, height: number, longitude: number, latitude: number, time: string}>("SELECT created_at, data->'height' as height, data->'longitude' as longitude,  data->'latitude' as latitude, received_at as time FROM flight_data WHERE flight_id = ${flightId} ORDER BY created_at ASC", {
            flightId
        })
    }

    async getWorkspaceIdForFlight(flightId: number){
        const flight = await this.getFlightSafe(flightId)

        return flight.workspace_id
    }



    validateFlightUserType(type: number): DBType_Flight_User_TypeType {
        if(typeof type === 'number'){
            if(Object.values(DBType_Flight_User_TYPES).includes(type as unknown as DBType_Flight_User_TypeType)){
                return type as DBType_Flight_User_TypeType
            }
        }

        throw new Error('invalid flight user type: ' + type)
    }
}
