import { ReconnectingWebSocket } from "./util/reconnecting_websocket"
import * as client_to_server from './generated/websocket-definitions/client_to_server'
import * as server_to_client from './generated/websocket-definitions/server_to_client'

type EventFilter = string
export type EventCallback<E extends server_to_client.Message_Type_Event_Type> = (event: E, filter: EventFilter, data: server_to_client.Message_Type_Event_Object_Data<E>)=>void

export default class LiveWebSocket{

    private readonly subscribedEvents = new Map<server_to_client.Message_Type_Event_Type, Map<EventFilter, EventCallback<server_to_client.Message_Type_Event_Type>[]>>()

    private readonly socket: ReconnectingWebSocket

    private readonly pendingMessages: { messageId: number, resolve: (message: client_to_server.Message_Type_Answer_Data<any>) => void, reject: (reason: any) => void }[] = []

    private messageIdCounter = 0

    constructor(baseUrl?: string){

        this.socket = new ReconnectingWebSocket(
            baseUrl ? baseUrl : (document.location.hostname === 'localhost' ? 'ws://localhost:9001/live' : ('wss://' + document.location.hostname + '/api/live'))
        )

        this.socket.addListener("open", ()=>{
            console.log('live', 'socket open')
            this.setup()
        })

        this.socket.addListener("reconnected", ()=>{
            console.log('live', 'socket reconnected')
            this.setup()
        })

        this.socket.addListener("message", this.handleMessage.bind(this))

        this.socket.addListener('lost', () => {
            console.log('live', 'socket lost')
        })
    }

    private setup(){
        // in case we setup again, we need to resubscribe to all existing events
        for (const eventEntry of this.subscribedEvents) {
            const event = eventEntry[0]
            const filters = eventEntry[1]

            for (const filterEntry of filters) {
                const filter = filterEntry[0]

                this.subscribeToEvent_AtServer(event, filter)
            }
        }
    }

    private handleMessage(msg: string){

        if (typeof msg !== 'string') {
            throw new Error('LiveWebsocket: invalid message data type: ' + typeof msg)
        }

        let messageWithoutType: any
        try {
            messageWithoutType = JSON.parse(msg)
        } catch (ex) {
            this.sendErrorToServer('can not parse msg JSON: ' + ex)
            return
        }


        if(typeof messageWithoutType !== 'object'){
            this.sendErrorToServer('invalid message: ' + messageWithoutType)
            return
        }

        if(typeof messageWithoutType.messageId !== 'number'){
            this.sendErrorToServer('invalid messageId: ' + messageWithoutType.messageId)
            return
        }

        if(typeof messageWithoutType.type !== 'string'){
            this.sendErrorToServer('invalid type: ' + messageWithoutType.type)
            return
        }

        switch((messageWithoutType as server_to_client.Message<server_to_client.Message_Type>).type){
            case 'event': {

                const message = messageWithoutType as server_to_client.Message<'event'>

                const event = message.data.event
                const filter = message.data.filter

                const filters = this.subscribedEvents.get(event)
                if(filters){

                    for(const [key, callbacks] of filters){
                        if(filter === '' || key === filter || key.split('&')[0] === filter){
                            for(const callback of callbacks){
                                try {
                                    callback(event, filter, message.data.eventData)
                                } catch(err){
                                    console.error('unhandled error when executing LiveWebSocket listener callback:', err)
                                }
                            }
                        }
                    }
                }

            } break

            case 'answer': {
                const message = messageWithoutType as server_to_client.Message<'answer'>

                for (let i = 0; i < this.pendingMessages.length; i++) {
                    const pendingMessage = this.pendingMessages[i]

                    if (pendingMessage.messageId === message.messageId) {
                        pendingMessage.resolve(message.data.result)

                        this.pendingMessages.splice(i, 1)
                        break
                    }
                }

            } break

            case 'error': {
                console.error('LiveWebsocket', 'server reported error', messageWithoutType.data)
            } break

            default: {
                throw new Error('live: unsupported message type: ' + messageWithoutType.type)
            }
        }
    }

    /**
     * promise will reject if a system or transmission error happens, the data of the resolving promise will indicate the actually result: {success: false/true}
     */
    private sendToServer<T extends client_to_server.Message_Type>(type: T, data: client_to_server.Message_Data<T>, overwriteMessageId?: number){
        return new Promise<server_to_client.Message_Type_Answer_Data<any>>((resolve, reject)=>{

            const messageId = overwriteMessageId ? overwriteMessageId : ++this.messageIdCounter

            this.socket.send(JSON.stringify({
                type,
                data,
                messageId
            }))

            this.pendingMessages.push({
                messageId,
                resolve,
                reject
            })
        })
    }

    private async sendErrorToServer(error: string){
        await this.sendToServer('error', error)
    }

    private async answerServerMessage<T extends server_to_client.Message_Type>(originalMessage: server_to_client.Message<T>, success: boolean, result?: any){
        await this.sendToServer('answer', {
            success,
            result
        }, originalMessage.messageId)
    }

    private resolveServerMessage<T extends server_to_client.Message_Type>(originalMessage: server_to_client.Message<T>, result?: any){
        this.answerServerMessage(originalMessage, true, result)
    }

    private rejectServerMessage<T extends server_to_client.Message_Type>(originalMessage: server_to_client.Message<T>, result?: any){
        this.answerServerMessage(originalMessage, false, result)
    }

    private async subscribeToEvent_AtServer<E extends server_to_client.Message_Type_Event_Type>(event: E, filter: EventFilter){
        await this.sendToServer('subscribe', {
            event,
            filter
        })
    }

    private async unsubscribeFromEvent_AtServer<E extends server_to_client.Message_Type_Event_Type>(event: E, filter: EventFilter){
        // currently not implemented
    }

    //TODO implement typing for specific answers
    async subscribeToEvent<E extends server_to_client.Message_Type_Event_Type>(event: E, filter: EventFilter, callback: EventCallback<E>){
        let filters = this.subscribedEvents.get(event)

        if(!filters){
            const n = new Map<string, EventCallback<server_to_client.Message_Type_Event_Type>[]>()
            this.subscribedEvents.set(event, n)
            filters = n
        }

        let callbacks = filters.get(filter)
        if(!callbacks){
            const n = []
            filters.set(filter, n)
            callbacks = n
        }

        if(!callbacks.includes(callback)){
            callbacks.push(callback)
        }

        await this.subscribeToEvent_AtServer(event, filter)
    }

    async unsubscribeFromEvent<E extends server_to_client.Message_Type_Event_Type>(event: E, filter: EventFilter, callback: EventCallback<E>){
        let filters = this.subscribedEvents.get(event)

        if(filters){
            let callbacks = filters.get(filter)

            if(callbacks){

                const callbackIndex = callbacks.indexOf(callback)

                if(callbackIndex >= 0){
                    callbacks.splice(callbackIndex, 1)
                }

                if(callbacks.length === 0){
                    this.unsubscribeFromEvent_AtServer(event, filter)
                }
            }
        }
    }

    getSocket(){
        return this.socket
    }
}
