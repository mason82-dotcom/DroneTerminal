import { Request } from 'express';
import * as ws from 'ws';
import { DBType_User } from '../generated-definitions/db/DBTypes';
import * as server_to_client from './definitions/server_to_client'
import * as client_to_server from './definitions/client_to_server'

type ClientData = {
    id: ClientId
    userId: number
    ws: ws.WebSocket
    messageIdCounter: number
    subscribedEvents: Map<server_to_client.Message_Type_Event_Type, EventFilter[]>
}

type EventFilter = string

export type ClientId = number
let clientIdCounter: ClientId = 1
const connectedClients: ClientData[] = []


export function handleNewClient(ws: ws.WebSocket, req: Request, user: DBType_User){

    const myClientId = clientIdCounter++

    const myClient = {
        id: myClientId,
        userId: user.id,
        ws,
        subscribedEvents: new Map<server_to_client.Message_Type_Event_Type, EventFilter[]>(),
        messageIdCounter: 0
    }

    addClient(myClient)

    ws.on('message', async (msg, isBinary) => {

        if(isBinary){
            sendErrorToClient(myClient, 'can not handle binary message')
            return
        }

        if(!isBinary && msg.toString() === 'keep-alive'){
            return
        }

        let messageWithoutType: any

        try {

            messageWithoutType = JSON.parse(msg.toString())

        } catch (ex) {
            sendErrorToClient(myClient, 'can not parse msg JSON: ' + ex)
            return
        }

        if(typeof messageWithoutType !== 'object'){
            sendErrorToClient(myClient, 'invalid message')
            return
        }

        if(typeof messageWithoutType.messageId !== 'number'){
            sendErrorToClient(myClient, 'invalid messageId: ' + messageWithoutType.messageId)
            return
        }

        if(typeof messageWithoutType.type !== 'string'){
            sendErrorToClient(myClient, 'invalid type: ' + messageWithoutType.type)
            return
        }

        switch((messageWithoutType as client_to_server.Message<client_to_server.Message_Type>).type){
            case 'subscribe': {
                const message = messageWithoutType as client_to_server.Message<'subscribe'>

                if(typeof message.data !== 'object' || typeof message.data.event !== 'string' || typeof message.data.filter !== 'string'){
                    rejectClientMessage(myClient, message, 'invalid subscribe data')
                    return
                }

                const handler = registeredSubscribableEventHandlers.get(message.data.event)

                if(!handler){
                    rejectClientMessage(myClient, message, 'unsupported event type: ' + message.data.event)
                    return
                }

                const result = await handler._addFilterListener(message.data.filter, myClient)

                if(typeof result === 'string'){
                    rejectClientMessage(myClient, message, result)
                    return
                } else {
                    resolveClientMessage(myClient, message)
                    return
                }

            }

            case 'error': {
                console.log('client reported error via websocket', messageWithoutType.data)
            }

            case 'answer': {
                // not implemented yet
            }

            default: {
                rejectClientMessage(myClient, messageWithoutType, 'invalid message type: ' + messageWithoutType.type)
                return
            }
        }
    })

    ws.on('close', ()=>{
        removeClient(myClient)
    })
}

function sendToClient<T extends server_to_client.Message_Type>(client: ClientData, type: T, data: server_to_client.Message_Data<T>, overwriteMessageId?: number){
    const msg: server_to_client.Message<T> = {
        type,
        data,
        messageId: overwriteMessageId || (++client.messageIdCounter)
    }

    client.ws.send(JSON.stringify(msg))
}

function sendErrorToClient(client: ClientData, errorMessage: string){
    sendToClient(client, 'error', errorMessage)
}

function answerClientMessage<T extends client_to_server.Message_Type>(client: ClientData, originalMessage: client_to_server.Message<T>, success: boolean, result?: any){
    sendToClient(client, 'answer', {
        success,
        result
    }, originalMessage.messageId)
}

function resolveClientMessage<T extends client_to_server.Message_Type>(client: ClientData, originalMessage: client_to_server.Message<T>, result?: string){
    answerClientMessage(client, originalMessage, true, result)
}

function rejectClientMessage<T extends client_to_server.Message_Type>(client: ClientData, originalMessage: client_to_server.Message<T>, error: string){
    answerClientMessage(client, originalMessage, false, error)
}

function addClient(client: ClientData){
    connectedClients.push(client)
}

function removeClient(client: ClientData){
    // remove from clients and listeners
    const clientIndex = connectedClients.indexOf(client)

    if(clientIndex < 0){
        return
    }

    for(const entry of connectedClients[clientIndex].subscribedEvents){

        const event = entry[0]
        const filters = entry[1]

        for(const filter of filters){
            const handler = registeredSubscribableEventHandlers.get(event)
            if(handler){
                handler._removeFilterListener(filter, client)
            }
        }
    }

    connectedClients.splice(clientIndex, 1)
}

// see close codes: https://learn.microsoft.com/en-us/dotnet/api/system.net.websockets.websocketclosestatus?view=net-8.0
function kickClient(client: ClientData, reason?: string){
    client.ws.close(4000, reason)
    removeClient(client)
}


const registeredSubscribableEventHandlers = new Map<server_to_client.Message_Type_Event_Type, SubscribableEventHandler<server_to_client.Message_Type_Event_Type>>()

/**
 *
 * @param onNewSubscriber if you return a string the subscription will not be allowed (the string is a publicly visible error message!)
 */
export function registerSubscribableEvent<T extends server_to_client.Message_Type_Event_Type>(event: T, onNewSubscriber?: OnNewSubscriberCallback<T>, onSubscriberLeft?: OnSubscriberLeftCallback<T>){
    if(registeredSubscribableEventHandlers.has(event)){
        throw new Error('subscribable event "' + event+ '" has already been registered')
    }

    const handler = new SubscribableEventHandler(event, onNewSubscriber, onSubscriberLeft)

    registeredSubscribableEventHandlers.set(event, handler)

    return handler
}

export type OnNewSubscriberCallback<T> = (event: T, filter: EventFilter, client: ClientData) => ((void | undefined | string) | Promise<void | undefined | string>)
export type OnSubscriberLeftCallback<T> = (event: T, filter: EventFilter, client: ClientData) => void

export type {SubscribableEventHandler}
class SubscribableEventHandler<T extends server_to_client.Message_Type_Event_Type> {

    private readonly event: T

    private readonly filters = new Map<EventFilter, ClientData[]>()

    private readonly newSubscriberCallback?: OnNewSubscriberCallback<T>
    private readonly subscriberLeftCallback?: OnSubscriberLeftCallback<T>

    constructor(event: T, onNewSubscriber?: OnNewSubscriberCallback<T>, onSubscriberLeft?: OnSubscriberLeftCallback<T>){
        this.event = event
        this.newSubscriberCallback = onNewSubscriber
        this.subscriberLeftCallback = onSubscriberLeft
    }

    async _addFilterListener(filter: EventFilter, client: ClientData) : Promise<undefined | string> {

        if(this.newSubscriberCallback){
            const result = this.newSubscriberCallback(this.event, filter, client)

            if(result instanceof Promise){
                const r = await result

                if(typeof r === 'string'){
                    return r
                }

            } else {
                if(typeof result === 'string'){
                    return result
                }
            }
        }

        let clients = this.filters.get(filter)

        if(!clients){
            const n = []
            this.filters.set(filter, n)
            clients = n
        }

        if(!clients.includes(client)){
            clients.push(client)
        }

        // add to client
        let clientFilters = client.subscribedEvents.get(this.event)
        if(!clientFilters){
            const n = []
            clientFilters = n
            client.subscribedEvents.set(this.event, n)
        }

        if(!clientFilters.includes(filter)){
            clientFilters.push(filter)
        }
    }

    _removeFilterListener(filter: EventFilter, client: ClientData){

        const clients = this.filters.get(filter)

        if(clients){

            const index = clients.indexOf(client)

            if(index >= 0){
                clients.splice(index, 1)
            }
        }

        if(this.subscriberLeftCallback){
            try {
                this.subscriberLeftCallback(this.event, filter, client)
            } catch (error) {
                console.error('Error in subscriberLeftCallback:', error)
            }
        }
    }

    protected removeClient(client: ClientData){
        for(const filter of this.filters){
            const clients = filter[1]
            const clientIndex = clients.indexOf(client)

            if(clientIndex >= 0){
                clients.splice(clientIndex, 1)
            }
        }
    }

    /**
     * @see triggerListenerIfExists() if you only want to execute some code if there really is at least one listener
     * @param filter if empty string, dispatches to all clients
     */
    triggerListener(filter: EventFilter, data: server_to_client.Message_Type_Event_Object_Data<T>){
        for(const [key, clients] of this.filters){
            if(filter === '' || key === filter || key.split('&')[0] === filter){
                for(const client of clients){
                    sendToClient(client, 'event', {
                        event: this.event,
                        filter,
                        eventData: data
                    })
                }
            }
        }
    }

    /**
     *
     * @param callback will be executed only if at least one listener for this event and filter exists. The returned data of this callback will be sent to all the listeners
     * @see triggerListener()
     * @param filter if empty string, dispatches to all clients
     */
    triggerListenerIfExists<CR = server_to_client.Message_Type_Event_Object_Data<T> | Promise<server_to_client.Message_Type_Event_Object_Data<T>>>(filter: EventFilter, callback: () => CR): CR extends Promise<void> ? Promise<void> : void {
        for(const [key, clients] of this.filters){
            if(filter === '' || key === filter || key.split('&')[0] === filter){

                const result = callback()

                if(result instanceof Promise){
                    //@ts-ignore
                    return new Promise<void>((resolve, reject)=>{
                        result.then(res => {

                            for(const client of clients){
                                sendToClient(client, 'event', {
                                    event: this.event,
                                    filter,
                                    eventData: res as server_to_client.Message_Type_Event_Object_Data<T>
                                })
                            }

                            resolve()

                        }).catch(reject)
                    })
                } else {
                    for(const client of clients){
                        sendToClient(client, 'event', {
                            event: this.event,
                            filter,
                            eventData: result as server_to_client.Message_Type_Event_Object_Data<T>
                        })
                    }
                }
            }
        }
    }

}


export function forceLogoutUser(userId: number){

    for(const client of connectedClients){
        if(client.userId === userId){
            kickClient(client, 'logout')
        }
    }
}
