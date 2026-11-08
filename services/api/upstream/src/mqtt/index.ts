import MqttServer from "./mqtt_server"
import { handleMqttAuth, handleMqttPacket, handleMqttConnect, handleMqttDisconnect } from "../connector/dji-pilot-2"

export function setup(port: number){

    const mqttServer = new MqttServer(port, handleMqttAuth, handleMqttPacket, handleMqttConnect, handleMqttDisconnect)
}
