import { Client, PublishPacket } from "aedes";
import { EventManager, EventManagerWithPublicDispatch } from "../../util/event_manager";
import { MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_TYPE, MqttMavic3EnterpriseProperties_STATE_CHANGE_TYPE } from "./mqtt-types/documented";
import { randomUUID } from "crypto";
import { assignObject } from "../../util/typescript";


type ConnectorEvents = {
    packet: {
        client: Client
        connectionId: number
        packet: PublishPacket
    }
    unsupported_topic: string
}

type EventFunction<M extends Message<MD>, MD = M extends Message<infer G> ? G : unknown> = (callback: EventCallback<M, MD>) => void

type EventFunctionWithRespond<M extends Message<MD>, R extends Response<RD>, MD = M extends Message<infer G> ? G : unknown, RD = R extends Response<infer G> ? G : unknown> = (callback: EventCallbackWithResponse<M, R, MD, RD>) => void


type ConnectionId = number

export default class Connector extends EventManager<ConnectorEvents>  {

    private internalEventManager = new EventManagerWithPublicDispatch<{[key: string]: {
        serialNumber: string
        client: Client
        connectionId: number
        message: Message<any>
    }}>()

    private validEvents = new Array<string>()

    private clients = new Map<ConnectionId, Client>()


    private sentMessagesThatAwaitAResponse: {
        tid: string
        bid?: string
        onResponseCallback: (message: Message<MessageData>)=>void
    }[] = []

    handleMqttPacket(client: Client, connectionId: number, packet: PublishPacket){

        this.clients.set(connectionId, client)//TODO this is really not great. we should move all the management (including auth) code from ./index.ts into this class

        this.dispatch('packet', {client, connectionId, packet})

        const message = JSON.parse(packet.payload.toString())

        const topic = packet.topic
        const topicMatch = topic.match(/^([^\/]+\/product\/)([^/]+)\/(.*)$/)

        if(message.tid !== '00000000-0000-0000-0000-000000000000'){// this is not a valid transaction id and indicates it does not need a a response

            const sentMessageThatAWaitsAResponseIndex = this.sentMessagesThatAwaitAResponse.findIndex(m => {
                if(message.tid === m.tid){
                    return true
                }

                if(typeof m.bid === 'string' && message.bid === m.bid){
                    return true
                }
            })

            if(sentMessageThatAWaitsAResponseIndex >= 0){
                // it is a response to a message we have sent before

                this.sentMessagesThatAwaitAResponse[sentMessageThatAWaitsAResponseIndex].onResponseCallback(message)
                this.sentMessagesThatAwaitAResponse.splice(sentMessageThatAWaitsAResponseIndex, 1)
            }
        }

        if(!topicMatch){
            this.dispatch('unsupported_topic', topic)
            return
        }

        const eventName = topicMatch[1] + topicMatch[3]
        const serialNumber = topicMatch[2]

        if(this.validEvents.includes(eventName)){
            this.internalEventManager.dispatch(eventName, {
                serialNumber,
                client,
                connectionId,
                message
            })
        } else {
            this.dispatch('unsupported_topic', topic)
        }
    }

    private registerEvent(eventName: string){
        if(this.validEvents.includes(eventName)){
            throw new Error('duplicate eventName ' + eventName)
        }

        this.validEvents.push(eventName)
    }

    private makeEventFunction<M extends Message<MD>, MD = M extends Message<infer G> ? G : unknown>(eventName: string): EventFunction<M, MD> {
        this.registerEvent(eventName)

        return (callback: EventCallback<M, MD>)=>{
            this.internalEventManager.addListener(eventName, (c)=>{
                return callback(c.connectionId, c.message as M, c.serialNumber)
            })
        }
    }

    /**
     *
     * @param responseEventName special string of the format "thing/product/$/property" where $ will be replaced with the client id automatically
     * @returns
     */
    private makeEventFunctionWithRespond<M extends Message<MD>, R extends Response<RD>, MD = M extends Message<infer G> ? G : unknown, RD = R extends Response<infer G> ? G : unknown>(eventName: string, responseEventName: string, makeResponseBaseData?: (message: M)=>Record<string, any>): EventFunctionWithRespond<M, R, MD, RD> {
        this.registerEvent(eventName)

        return (callback: EventCallbackWithResponse<M, R, MD, RD>)=>{
            this.internalEventManager.addListener(eventName, (c)=>{
                return callback(c.connectionId, c.message as M, c.serialNumber, (responseData: RD)=>{//TODO dont hand over original message, instead a clone of it (so we cant accidentially mess up the originalMessage when we need it for responding)
                    if(typeof makeResponseBaseData === 'function'){
                        Object.assign(responseData, makeResponseBaseData(c.message as M))
                    }
                    this.respondToMessage(c.client, c.connectionId, c.serialNumber, c.message, responseEventName, responseData)
                })
            })
        }
    }

    /**
     * @param responseEventName the $ char will be replaced with the serialNumber
     * @param response
     */
    private async respondToMessage(client: Client, connectionId: number, serialNumber: string, originalMessage: Message<any>, responseEventName: string, responseData: ResponseData){
        const responseMessage: Response_Base = {
            tid: originalMessage.tid,
            bid: originalMessage.bid,
            timestamp: Date.now(),
            data: responseData
        }

        const topic = responseEventName.replace('$', serialNumber)

        try {
            await this.sendMessage(client, topic, serialNumber, responseMessage)
        } catch (err){
            console.warn('failed to send response to', connectionId, err)
        }

        console.log('responded to #' + topic, connectionId, responseMessage)
    }

    /**
     * @param onResponseCallback depending on the method, this function may be called: never, once or multiple times
     *
     * you should use makeMessage() to create a message
     */
    private sendMessage(client: Client, topic: string, serialNumber: string, message: Message<MessageData>, onResponseCallback?: (message: Message<MessageData>) => void){

        // TODO implement tid and bid belonging to this message (for simple tids, we can use promises, for bids we need something special)
        // and the onReplyCallback
        // NOTE: we currently use makeMessage() but this is maybe not the best approach?

        if(onResponseCallback){
            this.sentMessagesThatAwaitAResponse.push({
                tid: message.tid,
                bid: message.bid,
                onResponseCallback
            })
        }

        return new Promise<void>((resolve, reject)=>{
            client.publish({
                cmd: 'publish',
                dup: false,
                qos: 1,
                retain: false,
                topic: topic.replace('$', serialNumber),
                payload: JSON.stringify(message)
            }, (err)=>{
                if(err){
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }


    /**
     * @param topic the "$" char will be replaced with the serialNumber
     * @param onResponseCallback depending on the method, this function may be called: never, once or multiple times
     *
     * you should use makeMessage() to create a message
     */
    sendMessageToConnection(connectionId: number, topic: string, serialNumber: string, message: Message<MessageData>, onResponseCallback?: (message: Message<MessageData>) => void){

        const client = this.clients.get(connectionId)
        if(!client){
            throw new Error('no client found for connectionId: ' + connectionId)
        }

        return this.sendMessage(client,
            topic,
            serialNumber,
            message, onResponseCallback)
    }

    static makeMessage<M extends Message<MD>, MD = M extends Message<infer G> ? G : unknown, >(base: Omit<M, keyof Message_Base>, data: MD) {

        const initial: Message_Base = {
            tid: randomUUID(),
            bid: randomUUID(),
            timestamp: Date.now(),
            data
        }

        const ret = assignObject(initial, base)

        return ret as M
    }

    // definitions

    onMessage_State = this.makeEventFunction<Message_Type_State>('thing/product/state')

    onMessage_Status = this.makeEventFunctionWithRespond<Message_Type_Status, Response_Type_Status>('sys/product/status', 'sys/product/$/status_reply')

    onMessage_Osd = this.makeEventFunction<Message_Type_Osd>('thing/product/osd')


    onMessage_Event = this.makeEventFunctionWithRespond<Message_Type_Event, Response_Type_Event>('thing/product/events', 'thing/product/$/events_reply')

}



type EventCallback<M extends Message<MD>, MD = M extends Message<infer G> ? G : unknown> = (connectionId: number, message: M, productSerialNumber: string) => void
type EventCallbackWithResponse<M extends Message<MD>, R extends Response<RD>, MD = M extends Message<infer G> ? G : unknown, RD = R extends Response<infer G> ? G : unknown> = (connectionId: number, message: M, productSerialNumber: string, respond: (data: RD) => void) => void

interface Message_Base {// coming from device to cloud
    tid: string //transaction UUID used when a response is required for this message
    bid?: string //business UUID used for operations that require multiple transactions //TODO is this required or optional?
    timestamp: number // the time the message was sent (unix milliseconds)
    gateway?: string // serial number of the gateway device (usually the remote controller) that send the message
    data: {}
}


type MessageData = Record<string, any>
interface Message<MD extends MessageData> extends Message_Base {
    data: MD
}

export interface MessageWithMethod<MD extends MessageData, Method = string> extends Message<MD> {
    method: Method
}


//TODO make this generic for many drones
//TODO is gateway property and bid mandatory?
export type Message_Type_State = Message<MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_TYPE | MqttMavic3EnterpriseProperties_STATE_CHANGE_TYPE>

//TODO
export type Message_Type_Status = MessageWithMethod<{
    domain: string
    type: number
    sub_type: number
    device_secret: string
    nonce: string
    thing_version: string
    sub_devices: {
        sn: string
        domain: string
        type: number
        sub_type: number
        device_secret: string
        nonce: string
        thing_version: string
    }[]
}, 'update_topo'>


//TODO
export type Message_Type_Osd = Message<{todo: true}>

//TODO
export interface Message_Type_Event extends MessageWithMethod<{
    todo22: string
}> {
    need_reply: 0 | 1 // 0 = false, 1 = true
}

//TODO
export type Message_Type_Services = MessageWithMethod<{}> // sent down to client

export type Message_Type_Services_Method = 'cloud_control_auth_request' | 'camera_photo_take' //TODO use documented.ts types

interface Response_Base {// response from cloud back to device
    tid: string //transaction UUID used when a response is required for this message
    bid?: string //business UUID used for operations that require multiple transactions //TODO is this required or optional?
    timestamp: number // the time the message was sent (unix milliseconds)
    data: {}
}

type ResponseData = Record<string, any>
interface Response<RD extends ResponseData> extends Response_Base {
    data: RD
}

//TODO would be nice if the response type depends on a message type generic, so we cant make silly mistakes here
export interface Response_Type_Status extends Response_With_Result<{}> {
    method: string
}

//TODO would be nice if the response type depends on a message type generic, so we cant make silly mistakes here
export interface Response_Type_Event extends Response_With_Result<{}> {
    method: string
    need_reply: 0 | 1 // 0 = false, 1 = true
}

type Response_With_Result<R extends Record<string, any>> = Response<R & {
    result: number
}>


// DRONE CONNECTION CONNECTOR

type DroneConnectionEventCallback<M extends Message<MD>, MD = M extends Message<infer G> ? G : unknown> = (message: M) => void

type DroneConnectionEventCallbackWithResponse<M extends Message<MD>, R extends Response<RD>, MD = M extends Message<infer G> ? G : unknown, RD = R extends Response<infer G> ? G : unknown> = (message: M, respond: (data: RD) => void) => void

type DroneConnection_EventFunction<E extends EventFunction<Message<MD>>, M = E extends EventFunction<infer G> ? G : unknown, MD = M extends Message<infer G> ? G : unknown> = (callback: DroneConnectionEventCallback<Message<MD>, MD>) => void

type DroneConnection_EventFunctionWithRespond<
    E extends EventFunctionWithRespond<Message<MD>, Response<RD>>,
    M = E extends EventFunctionWithRespond<infer G1, infer G2> ? G1 : unknown,
    R = E extends EventFunctionWithRespond<infer G1, infer G2> ? G2 : unknown,
    MD = M extends Message<infer G> ? G : unknown,
    RD = R extends Response<infer G> ? G : unknown
> = (callback: DroneConnectionEventCallbackWithResponse<Message<MD>, Response<RD>>) => void

export class DroneConnectionConnector {
    private readonly connector: Connector
    private readonly myDroneId: number
    private readonly myConnectionId: number
    private gatewaySerialNumber: string

    onMessage_State: DroneConnection_EventFunction<Connector['onMessage_State']>

    onMessage_Status: DroneConnection_EventFunctionWithRespond<Connector['onMessage_Status']>

    onMessage_Osd: DroneConnection_EventFunction<Connector['onMessage_Osd']>

    onMessage_Event: DroneConnection_EventFunctionWithRespond<Connector['onMessage_Event']>

    constructor(connector: Connector, droneId: number, connectionId: number){
        this.connector = connector
        this.myDroneId = droneId
        this.myConnectionId = connectionId

        this.onMessage_State = this.makeEventFunction(this.connector.onMessage_State)

        this.onMessage_Status = this.makeEventFunctionWithRespond(()=>this.connector.onMessage_Status)

        this.onMessage_Osd = this.makeEventFunction(()=>this.connector.onMessage_Osd)

        this.onMessage_Event = this.makeEventFunctionWithRespond(()=>this.connector.onMessage_Event)

        const cb = data => {
            const d = data as {
                client: Client;
                connectionId: number;
                packet: PublishPacket;
            }

            if(d.connectionId === this.myConnectionId && d.packet.topic.endsWith('/status')){
                const topicMatch = d.packet.topic.match(/^([^\/]+\/product\/)([^/]+)\/(.*)$/)
                const serialNumber = topicMatch[2]

                if(typeof serialNumber !== 'string'){
                    console.warn('could not find serial number in topic product/status', d.packet.topic)
                }

                this.gatewaySerialNumber = serialNumber
            }
        }

        this.connector.addListener('packet', cb)
    }


    /**
     * @param topic the $ char will be replaced with the serialNumber
     *
     * you should use makeMessage() to create a message
     */
    sendMessage(topic: string, message: Message<MessageData>, onResponseCallback?: (message: Message<MessageData>) => void){
        return this.connector.sendMessageToConnection(this.myConnectionId, topic, this.getGatewaySerialNumber(), message, onResponseCallback)
    }


    // definitions

    private makeEventFunction<
        EF extends EventFunction<Message<MD>>,
        M = EF extends EventFunction<infer G> ? G : unknown,
        MD = M extends Message<infer G> ? G : unknown
    >(connectorEventFunction: EF): DroneConnection_EventFunction<EventFunction<Message<MD>>>{
        return (callback)=>{

            connectorEventFunction((connectionId, message)=>{

                if(connectionId !== this.myDroneId){
                    return
                }

                callback(message)
            })
        }
    }

    private makeEventFunctionWithRespond<
        EF extends EventFunctionWithRespond<Message<MD>, Response<RD>>,
        M = EF extends EventFunction<infer G1, infer G2> ? G1 : unknown,
        MD = M extends Message<infer G> ? G : unknown,
        R = EF extends EventFunction<infer G1, infer G2> ? G2 : unknown,
        RD = R extends Response<infer G> ? G : unknown
    >(connectorEventFunctionWithRespond: EF): DroneConnection_EventFunctionWithRespond<EventFunctionWithRespond<Message<MD>, Response<RD>>>{
        return (callback)=>{

            connectorEventFunctionWithRespond((connectionId, message, serialNumber, respond)=>{

                if(connectionId !== this.myDroneId){
                    return
                }

                callback(message, respond)
            })
        }
    }

    getGatewaySerialNumber(): string {
        if(typeof this.gatewaySerialNumber === 'string'){
            return this.gatewaySerialNumber
        } else {
            throw new Error('gatewaySerialNumber is not yet set')
        }

    }

}