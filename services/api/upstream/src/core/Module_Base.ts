import {EventManagerWithPublicDispatch} from '../util/event_manager'

export default class Module_Base<


    Contexts extends {[key: string]: any},

    Events extends {[key: string]: {
        eventDataType: any
        availableContexts: keyof Contexts
    }}
>{

    private eventManager = new EventManagerWithPublicDispatch<{[key in keyof Events]: {data: Events[key]['eventDataType'], contexts: Pick<Contexts, Events[key]['availableContexts']>}}>()


    /**
     * @see stopListen
     * @param contexts if not false, then your callback will only be called for those specific contexts values
     * @returns use the returned function to stop listening to the event via stopListen()
     */
    listenTo<EventName extends keyof Events>(eventName: EventName, contexts: false | Partial<Pick<Contexts, Events[EventName]['availableContexts']>>, callback: (eventName: EventName, contexts: Pick<Contexts, Events[EventName]['availableContexts']>, eventData: Events[EventName]['eventDataType'])=>void){

        const cb: Parameters<typeof this.eventManager.addListener>[1] = (data)=>{
            //TODO add try catch for better debugging when unhandled error?

            if(contexts === false){
                callback(eventName, data.contexts, data.data)
            } else {
                for(const [contextName, contextValue] of Object.entries(contexts)){
                    if(data.contexts[contextName as keyof typeof data.contexts] === contextValue){
                        callback(eventName, data.contexts, data.data)
                        break
                    }
                }
            }
        }
        this.eventManager.addListener(eventName, cb)

        return cb
    }

    stopListen<EventName extends keyof Events>(eventName: EventName, handle: ReturnType<typeof this.listenTo>){
        this.eventManager.removeListener(eventName, handle)
    }

    protected dispatch<EventName extends keyof Events>(eventName: EventName, contexts: Pick<Contexts, Events[EventName]['availableContexts']>, eventData: Events[EventName]['eventDataType']){

        this.eventManager.dispatch(eventName, {
            data: eventData,
            contexts
        })
    }

}

export class ModuleError extends Error {

    constructor(message?: string){
        super(message)
    }
}

export class ModuleError_IdNotFound extends ModuleError {

    constructor(id: number){
        super('id not found: ' + id)
    }
}

export function makeFunctionIdSafe<A extends any[], F extends (id: number, ...args: A)=>Promise<false | any>>(that: Object, func: F){
    return async function(id: number, ...args: A){
        const ret = await func.apply(that, [id, ...args])

        if(ret === false){
            throw new ModuleError_IdNotFound(id)
        }

        return ret
    } as (...args: Parameters<F>)=>Promise<Exclude<Awaited<ReturnType<F>>, false>>
}
