import { Client, PublishPacket } from "aedes";
import Connector from "./Connector";
import Logger from "./ConnectorLogger";
import path from "path";
import {MqttRcProEnterpriseProperties_STABLE_FREQUENCY_TYPE, MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_TYPE} from './mqtt-types/documented'
import * as pgp from 'pg-promise'
import { DBType_Connection, DBType_Drone_Data_TYPES, DBType_Drone_TYPES, DBType_Flight_Data_TYPES, DBType_Remote_Controller_Data_TYPES, DBType_Remote_Controller_TYPES } from "../../generated-definitions/db/DBTypes";
import {getProductType} from './util/product'
import type { sendToConnection } from "../../routes/connection-link/dji-pilot-2/ws";
import { getCore } from "../../core";
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

const connector = new Connector()


const onlineConnections = new Map<number, {client: Client}>()

connector.onMessage_State((connectionId, message)=>{
    //TODO save live_capacity information of rc (and use that to determine if rc can do livestreaming)
    //TODO website on rc needs to reqest aircraft and rc serial number, send to server so it can identify rc and drone by serial number
})


connector.onMessage_Status(async (connectionId, message, productSerialNumber, respond)=>{

    try {

        if(message.method === 'update_topo'){
            //@ts-ignore
            if(message.data.thing_version !== '1.2.0' && message.data.version !== 1){
                console.warn('thing_version of mqtt message update_topo was not 1.2.0 or 1: ', message)
            }

            const connection = await getCore().modules.connection.getConnectionSafe(connectionId)

            await updateProductForConnection(connection, productSerialNumber, message.data.domain, message.data.type, message.data.sub_type)

            if(message.data.sub_devices){
                for(const subDevice of message.data.sub_devices){
                    await updateProductForConnection(connection, subDevice.sn, subDevice.domain, subDevice.type, subDevice.sub_type)
                }
            }
        }

    } catch (err){
        console.error('error while running onMessage_Status', err)
    }

    respond({
        result: 0
    })
})


/**
 * makes sure, the drones and remote controllers for this connection link are properly registered and referenced to each other
 */
async function updateProductForConnection(connection: DBType_Connection, serialNumber: string, domain: string, type: number, sub_type: number){//TODO move this logic into DroneModule.ts

    const productType = getProductType(domain, type, sub_type)

    if(productType.domain === 'controller'){

        if(typeof connection.remote_controller_id !== 'number'){

            let remoteController = await getCore().modules.remoteController.getRemoteControllerForSerialNumber(serialNumber)

            if(remoteController){

                try {
                    const oldConnection = await getCore().modules.remoteController.getConnectionForRemoteController(remoteController.id)

                    console.warn('transfering remote controller from connection', oldConnection.id, 'to', connection.id)

                    await getCore().modules.connection.updateConnection(oldConnection.id, {
                        //@ts-ignore
                        remote_controller_id: null
                    })

                } catch (err){
                    //ignore
                    console.log('failed to remove remote controller from old connection', err)
                }

            } else {
                remoteController = await getCore().modules.remoteController.createRemoteController({
                    type: productType.type === 'rc_plus' ? DBType_Remote_Controller_TYPES.dji_rc_plus
                        : productType.type === 'rc_plus_2' ? DBType_Remote_Controller_TYPES.dji_rc_plus_2
                        : productType.type === 'rc_pro_enterprise' ? DBType_Remote_Controller_TYPES.dji_rc_pro_enterprise
                        : productType.type === 'smart_controller_enterprise' ? DBType_Remote_Controller_TYPES.dji_smart_controller
                        : DBType_Remote_Controller_TYPES.unknown,
                    serial_number: serialNumber
                })
            }

            await getCore().modules.connection.updateConnection(connection.id, {
                remote_controller_id: remoteController.id
            })

            connection.remote_controller_id = remoteController.id
        }

    } else if(productType.domain === 'drone'){

        let drone = await  getCore().modules.drone.getDroneForSerialNumber(serialNumber)

        if(drone){
            if(drone.last_connection_id !== connection.id){
                console.warn('transferring drone connection from', drone.last_connection_id, 'to', connection.id)
                drone.last_connection_id = connection.id

                await getCore().modules.drone.updateDrone(drone.id, {
                    last_connection_id: connection.id
                })
            }
        } else {

            try {
                drone = await getCore().modules.drone.createDrone({
                    type: productType.type === 'mavic_3_enterprise' ? DBType_Drone_TYPES.dji_mavic_3
                        : productType.type === 'matrice_300_rtk' ? DBType_Drone_TYPES.dji_matrice_300
                        : productType.type === 'matrice_30' ? DBType_Drone_TYPES.dji_matrice_30
                        : productType.type === 'matrice_350_rtk' ? DBType_Drone_TYPES.dji_matrice_350
                        : DBType_Drone_TYPES.unknown,
                    serial_number: serialNumber,
                    name: productType.subType,
                    last_connection_id: connection.id
                })

                const flight = await getCore().modules.flight.createFlight({
                    drone_id: drone.id,
                    workspace_id: connection.workspace_id
                })

                drone = await getCore().modules.drone.updateDroneSafe(drone.id, {
                    current_flight_id: flight.id
                })

            } catch (err){

                throw err
            }

        }

        if(connection.last_drone_id !== drone.id){
            console.warn('replacing connection drone', connection.last_drone_id, 'with', drone.id)

            await  getCore().modules.connection.updateConnection(connection.id, {
                last_drone_id: drone.id
            })

            connection.last_drone_id = drone.id
        }

    } else {
        //TODO implement camera and dock?
    }

}


connector.onMessage_Osd(async (connectionId, message, productSerialNumber)=>{

    const _m = message as {data: {longitude?: number, latitude?: number, height?: number, elevation?: number}}

    const connection = await getCore().modules.connection.getConnectionSafe(connectionId)


    if(typeof message.gateway !== 'string'){
        console.error('expected osd message to have the property "gateway"', message)
        return
    }


    const messageType = productSerialNumber === message.gateway ? 'fromGateway' : 'notFromGateway' //TODO: check if this works correctly for all drones (especially m300)

    if(messageType === 'fromGateway'){

        //TODO is a dock a gateway or not? i guess it is?

        if(typeof _m.data.longitude === 'number' && typeof _m.data.latitude === 'number' && typeof _m.data.height === 'number'){

            const messageData = _m.data as MqttRcProEnterpriseProperties_STABLE_FREQUENCY_TYPE

            if((_m.data.longitude === 0 && _m.data.latitude === 0) === false){// check if gps has lock

                if(typeof connection.remote_controller_id !== 'number'){
                    console.warn('got remote controller data, but remote controller was not yet created', connection.id)
                } else {

                    getCore().modules.remoteController.addRemoteControllerData(connection.remote_controller_id, DBType_Remote_Controller_Data_TYPES.position, {
                        longitude: messageData.longitude,
                        latitude: messageData.latitude,
                        height: messageData.height
                    })
                }
            }
        }

    } else {
        const drone = await getCore().modules.drone.getDroneForSerialNumber(productSerialNumber)

        if(drone){

            //@ts-ignore
            if(typeof _m.data.longitude === 'number' && typeof _m.data.latitude === 'number' && typeof _m.data.height === 'number' && typeof _m.data.elevation === 'number'){
                const messageData = _m.data as MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_TYPE

                if((_m.data.longitude === 0 && _m.data.latitude === 0) === false){// check if gps has lock

                    getCore().modules.drone.addDroneData(drone.id, DBType_Drone_Data_TYPES.position, {
                        longitude: messageData.longitude,
                        latitude: messageData.latitude,
                        height: messageData.height
                    })

                    getCore().modules.drone.setDroneInFlightState(drone, _m.data.elevation !== 0).then(drone=>{

                        getCore().modules.flight.createFlightData({
                            created_at: new Date(message.timestamp).toISOString(),
                            data: {
                                longitude: messageData.longitude,
                                latitude: messageData.latitude,
                                height: messageData.height
                            },
                            flight_id: drone.current_flight_id!,
                            type: DBType_Flight_Data_TYPES.position,
                            received_at: new Date(message.timestamp).toISOString()
                        }).catch(err => {
                            console.error('failed to insert flight data', err)
                        })

                    }).catch(err => console.error('failed to setDroneInFlightState', err))



                    //TODO fix this ugly hack (because we can not import ws before setting up global traffic sense)

                    //@ts-ignore
                    ;(global.sendToConnection as typeof sendToConnection)(connection.id, {
                        "biz_code": "device_osd",
                        "version": "1.0",
                        "timestamp": Date.now(),
                        "data": {
                            "host": {
                                "latitude": messageData.latitude,
                                "longitude": messageData.longitude,
                                "height": messageData.height,
                                "attitude_head": messageData.attitude_head,
                                "elevation": messageData.elevation,
                                "horizontal_speed": messageData.horizontal_speed,
                                "vertical_speed": messageData.vertical_speed
                            },
                            "sn": drone.serial_number
                        }
                    })
                }

                if(typeof messageData.battery?.capacity_percent === 'number'){
                    getCore().modules.drone.addDroneData(drone.id, DBType_Drone_Data_TYPES.telemetry, {
                        capacity_percent_left: messageData.battery.capacity_percent
                    })
                }

            }

        } else {
            //TODO support camera
        }
    }

})

connector.onMessage_Event((connectionId, message, serialNumber, respond)=>{

    if(message.need_reply === 1){// if this check is not done, it crashes the dji pilot 2 app on the remote controller
        respond({
            result: 0
        })
    }
})


new Logger(connector, path.resolve(path.join('/ofh_logs', 'connector_logs')))

const authedClientIdToConnectionIdMap = new Map<string, {
    connection_id: number,
    client: Client
}>()

export function handleMqttPacket(client: Client, packet: PublishPacket){
    try {

        const authMap = authedClientIdToConnectionIdMap.get(client.id)

        if(!authMap){
            console.error('trying to handleMqttPacket but client_id is not mapped to a connection (missing auth?). Ignoring packet', client.id)
            return
        }

        connector.handleMqttPacket(client, authMap.connection_id, packet)
    } catch (err){
        console.error('Failed to handleMqttPacket', err)
    }
}

export async function handleMqttAuth(client: Client, username: string, password: string): Promise<boolean>{

    const connection = await db.oneOrNone<DBType_Connection>('SELECT * FROM connections WHERE id = ${id} AND secret = ${secret}', {
        id: username,
        secret: password
    })

    if(!connection){
        console.log('mqtt auth failed for username (wrong secret)', username)
        return false
    }

    const existingClient = authedClientIdToConnectionIdMap.get(client.id)

    if(existingClient){

        if(existingClient.connection_id !== connection.id){
            // a client with same id connected to a different connection, so for security reasons we must kick the already existing client
            console.warn('new client authed but a client with the same client_id but different connection_id already exists and is now being force kicked!', client.id, connection.id, existingClient.connection_id)

            existingClient.client.close()
        }
    }

    authedClientIdToConnectionIdMap.set(client.id, {
        client,
        connection_id: connection.id
    })

    return true
}


export function handleMqttConnect(client: Client){
    onlineConnections.set(authedClientIdToConnectionIdMap.get(client.id)!.connection_id, {client})

    //TODO notify dji pilot 2 ws Situatun awareness deviceOnline
}

export function handleMqttDisconnect(client: Client){
    onlineConnections.delete(authedClientIdToConnectionIdMap.get(client.id)!.connection_id)

    //TODO notify dji pilot 2 ws Situatun awareness deviceOffline
}

export function isConnectionOnline(connectionId: number){
    return onlineConnections.has(connectionId)
}

