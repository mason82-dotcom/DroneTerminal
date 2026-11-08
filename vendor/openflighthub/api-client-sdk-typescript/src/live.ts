import LiveWebSocket, { EventCallback } from "./live_websocket"
import * as client_to_server from './generated/websocket-definitions/client_to_server'
import * as server_to_client from './generated/websocket-definitions/server_to_client'
import EventManager from "./util/event_manager"
import { ReconnectingWebSocket } from "./util/reconnecting_websocket"

const EVENT_FILTER_SEPARATOR = '%'

function joinEventFilters(...filters: string[]){//TODO escaping on client and server
    return filters.filter(f => typeof f !== 'undefined').join(EVENT_FILTER_SEPARATOR)
}

export default class Live {

    private readonly liveWebSocket: LiveWebSocket
    readonly status: ApiStatus

    constructor(baseUrl?: string){

        this.liveWebSocket = new LiveWebSocket(baseUrl)

        this.status = new ApiStatus(this.liveWebSocket.getSocket())
    }

    subscribeToDronePosition(droneId: number, callback: (event: 'drone_position', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Drone_Position)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('drone_position', '' + droneId, callback)
    }

    subscribeToDroneTelemetry(droneId: number, callback: (event: 'drone_telemetry', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Drone_Telemetry)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('drone_telemetry', '' + droneId, callback)
    }

    subscribeToRemoteControllerPosition(remoteControllerId: number, callback: (event: 'remote_controller_position', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Remote_Controller_Position)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('remote_controller_position', '' + remoteControllerId, callback)
    }

    subscribeToWorkspaceDronesPosition(workspaceId: number, callback: (event: 'workspace_drones_position', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Workspace_Drone_Position)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('workspace_drones_position', '' + workspaceId, callback)
    }

    subscribeToDbRowUpdate(table: string, rowId: number, callback: (event: 'db_row_update', filter: string, data: server_to_client.Message_Type_Event_Object_Data_DbRowUpdate)=>void){
        return this.liveWebSocket.subscribeToEvent('db_row_update', joinEventFilters(table, '' + rowId), callback)
    }

    subscribeToDroneMedia(droneId: number, callback: (event: 'drone_media', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Drone_Media)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('drone_media', '' + droneId, callback)
    }

    subscribeToWorkspaceDronesMedia(workspaceId: number, callback: (event: 'workspace_drones_media', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Workspace_Drone_Media)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('workspace_drones_media', '' + workspaceId, callback)
    }

    /**
     * the filter in the callback can either be the workspaceId as string or an empty string indicating that this is a global geoobject
     */
    subscribeToGeoObjects(workspaceId: number, callback: (event: 'geo_object', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Geo_Object)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('geo_object', '' + workspaceId, callback)
    }

    subscribeToMission(missionId: number, callback: (event: 'mission', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Mission)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('mission', '' + missionId, callback)
    }

    subscribeToTask(taskId: number, callback: (event: 'task', filter: string, data: server_to_client.Message_Type_Event_Object_Data_Task)=>void){//TODO implement unsubscribe
        return this.liveWebSocket.subscribeToEvent('task', '' + taskId, callback)
    }

}



export interface ApiStatusEvents {
    connected: undefined
    disconnected: 'logout' | 'tcp_reset' | null
}

class ApiStatus extends EventManager<ApiStatusEvents> {

    constructor(socket: ReconnectingWebSocket){
        super()

        socket.addListener('open', ()=>{
            this.dispatch('connected', undefined)
        })

        socket.addListener('reconnected', ()=>{
            this.dispatch('connected', undefined)
        })

        socket.addListener('lost', data=>{
            this.dispatch('disconnected', data.code === 4000 && data.reason === 'logout' ? 'logout' : (data.code === 1006 ? 'tcp_reset' : null ))
        })

        if(socket.isOpen()){
            this.dispatch('connected', undefined)
        }
    }
}
