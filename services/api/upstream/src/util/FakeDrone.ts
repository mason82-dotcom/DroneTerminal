import * as pgp from 'pg-promise'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>
import FakeTrack from './FakeTrack'
import { DBType_Drone_Data_TYPES, DBType_Flight_Data_TYPES } from '../generated-definitions/db/DBTypes'
import { getCore } from '../core'

export default class FakeDrone {

    private droneId: number
    private track: FakeTrack

    constructor(droneId: number, workspaceId: number, track: FakeTrack){
        this.droneId = droneId

        this.track = track

        getCore().modules.drone.getDroneSafe(droneId).then(async(drone)=>{

            let connection = await getCore().modules.drone.getActiveConnectionForDrone(droneId)

            if(connection === false){
                connection = await getCore().modules.connection.createConnection(workspaceId, drone.name)
            }

            //TODO dont do this manaally, there should be a functiion in droneModule or connectionModule that does this for us
            await getCore().modules.drone.updateDroneSafe(drone.id, {
                last_connection_id: connection.id
            })

            await getCore().modules.connection.updateConnectionSafe(connection.id, {
                last_drone_id: drone.id
            })

            setInterval(async()=>{

                const currentPosition = this.track.getCurrentPosition()

                await getCore().modules.drone.addDroneData(this.droneId, DBType_Drone_Data_TYPES.position, {
                    longitude: currentPosition.longitude,
                    latitude: currentPosition.latitude,
                    height: this.track.getCurrentHeight()
                })

                await getCore().modules.drone.addDroneData(this.droneId, DBType_Drone_Data_TYPES.telemetry, {
                    capacity_percent_left: 42
                })

                await this.getFlightId().then(flightId=>{
                    getCore().modules.flight.createFlightData({
                        created_at: new Date().toISOString(),
                        data: {
                            longitude: currentPosition.longitude,
                            latitude: currentPosition.latitude,
                            height: this.track.getCurrentHeight()
                        },
                        flight_id: flightId!,
                        type: DBType_Flight_Data_TYPES.position
                    })
                })

            }, 1000 * 2)
        })
    }

    public getId(){
        return this.droneId
    }

    public getTrack(){
        return this.track
    }

    public async getFlightId(){
        return (await getCore().modules.drone.getDroneSafe(this.droneId)).current_flight_id
    }

}