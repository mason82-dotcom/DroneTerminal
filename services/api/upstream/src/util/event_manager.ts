export class EventManager<M extends {[key: string] : any}> {
    private listeners = new Map<String, {
        func: Function
        once: boolean///TODO test the once feature
    }[]>()

    /**
     * @param once if true, callback will only be executed once and the listener will be removed automatically. No need to call removeListener() manually!
     */
    addListener<E extends keyof M>(eventName: E, callback: (data: M[E])=> void, once?: true){
        if(!this.listeners.has(eventName as string)){
            this.listeners.set(eventName as string, [])
        }

        this.listeners.get(eventName as string)!.push({
            func: callback,
            once: once === true
        })
    }

    removeListener<E extends keyof M>(eventName: E, callback: (data: M[E])=> void){
        if(this.listeners.has(eventName as string)){
            const list = this.listeners.get(eventName as string)

            const index = list.findIndex(c => c.func === callback)

            if(index !== -1){
                list.splice(index, 1)
            }

        }
    }

    protected dispatch<E extends keyof M>(eventName: E, data: M[E]){
        if(this.listeners.has(eventName as string)){
            const list = this.listeners.get(eventName as string)

            for(let li = 0; li < list.length; li++){
                const listEntry = list[li]

                try {

                    const ret = listEntry.func(data)

                    if(ret instanceof Promise){
                        ret.catch(err => {
                            console.error('unhandled error while executing listener callback [async] for event', eventName, err)
                        })
                    }

                } catch (err){
                    console.error('unhandled error while executing listener callback [sync] for event', eventName, err)
                }

                if(listEntry.once){
                    list.splice(li, 1)
                    li--
                }
            }

        }
    }
}

export class EventManagerWithPublicDispatch<M extends {[key: string] : any}> extends EventManager<M> {

    public dispatch<E extends keyof M>(eventName: E, data: M[E]){
        super.dispatch(eventName, data)
    }
}
