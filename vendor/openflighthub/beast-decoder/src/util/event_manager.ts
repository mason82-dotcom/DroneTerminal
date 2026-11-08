
export default class EventManager<M extends {[key: string] : any}> {
    private listeners = new Map<String, Function[]>()

    addListener<E extends keyof M>(eventName: E, callback: (data: M[E])=> void){
        if(!this.listeners.has(eventName as string)){
            this.listeners.set(eventName as string, [])
        }

        this.listeners.get(eventName as string)!.push(callback)
    }

    removeListener<E extends keyof M>(eventName: E, callback: (data: M[E])=> void){
        if(this.listeners.has(eventName as string)){
            const list = this.listeners.get(eventName as string)

            const index = list!.findIndex(c => c === callback)

            if(index !== -1){
                list!.splice(index, 1)
            }

        }
    }

    protected dispatch<E extends keyof M>(eventName: E, data: M[E]){
        if(this.listeners.has(eventName as string)){
            const list = this.listeners.get(eventName as string)

            for(const l of list!){
                l(data)
            }

        }
    }
}
