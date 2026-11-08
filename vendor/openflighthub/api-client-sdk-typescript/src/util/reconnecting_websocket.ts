import EventManager from './event_manager'

interface ReconnectingWebSocketEvents {
    open: undefined
    lost: {code?: number, reason?: string}
    error: string
    message: string
    reconnected: undefined
}

export class ReconnectingWebSocket extends EventManager<ReconnectingWebSocketEvents> {

    private firstOpenEvent = true
    private url: string
    private socket: WebSocket

    private TIMEOUT_BETWEEN_SEND = 200
    private RECONNECT_TIMEOUT = 1000

    private keepAliveInterval

    constructor(url: string) {
        super()

        this.url = url

        this.createSocket()
    }

    private createSocket() {

        this.socket = new WebSocket(this.url)

        setTimeout(()=>{
            if(this.firstOpenEvent && !this.isOpen()){
                console.warn('fatal: connecting to websocket timed out')
                this.socket.close()
            }
        }, 1000 * 3)

        if(this.keepAliveInterval !== undefined){
            clearInterval(this.keepAliveInterval)
        }

        this.keepAliveInterval = setInterval(()=>{
            this.sendKeepAlive()// prevent TCP RST happening (some routers do that if connection is not being used)
        }, 1000 * 5)

        this.socket.addEventListener('open', evt => {
            if (this.firstOpenEvent) {
                this.firstOpenEvent = false

                this.dispatch('open', undefined)
            } else {
                this.dispatch('reconnected', undefined)//TODO due to energy saving, browsers close unused sockets after some time, we should send over some messages from time to time to keep it open (so it does not constantly reconnect)
            }
        })

        this.socket.addEventListener('message', (evt)=>{
            this.dispatch('message', evt.data)
        })

        this.socket.addEventListener('error', evt => {
            this.dispatch('error', typeof evt.toString === 'function' ? evt.toString() : '' + evt)
        })

        this.socket.addEventListener('close', evt => {
            setTimeout(()=>{
                this.createSocket()
            }, this.RECONNECT_TIMEOUT)

            this.dispatch('lost', {code: evt.code, reason: evt.reason})
            //console.log('websocket disconnected', this.url)
        })
    }

    sendKeepAlive(){
        if(this.isOpen()){
            this.socket.send('keep-alive')
        }
    }

    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        if (this.isOpen()) {
            this.socket.send(data)
        } else {
            setTimeout(() => {
                this.send(data)
            }, this.TIMEOUT_BETWEEN_SEND)
        }
    }

    close() {
        this.socket.close()

        clearInterval(this.keepAliveInterval)
    }

    isOpen(){
        return this.socket.readyState === WebSocket.OPEN
    }

}
