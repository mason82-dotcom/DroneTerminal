import { sleep } from "@/util/sleep.js"
import { ComponentName, DjiBridge, DjiBridgeEncapsulatedResponse, DjiBridgeResponse, DjiBridgeResponseFail, DjiBridgeResponseSuccess, EmptyObject } from "./DjiBridge.js"


type ModuleName = ComponentName

type Media_DownloadOwner = 'mine' | 'other'

export function deviceSupportsSDK(){
    return !!window['djiBridge']
}

export class EventManager<M extends { [key: string]: any }> {
    private listeners = new Map<String, Function[]>()

    addListener<E extends keyof M>(eventName: E, callback: (data: M[E]) => void) {
        if (!this.listeners.has(eventName as string)) {
            this.listeners.set(eventName as string, [])
        }

        this.listeners.get(eventName as string)!.push(callback)
    }

    addListenOnce<E extends keyof M>(eventName: E, callback: (data: M[E]) => void) {

        const funcOnce = (...args)=>{
            try {
                this.removeListener(eventName, funcOnce)
            } catch (err){
                console.error('failed to remove funcOnce after dispatched once', err)
            }

            callback.apply(null, args)
        }

        this.addListener(eventName, funcOnce)
    }

    removeListener<E extends keyof M>(eventName: E, callback: (data: M[E]) => void) {
        if (this.listeners.has(eventName as string)) {
            const list = this.listeners.get(eventName as string)

            const index = list!.findIndex(c => c === callback)

            if (index !== -1) {
                list!.splice(index, 1)
            }

        }
    }

    protected dispatch<E extends keyof M>(eventName: E, data: M[E]) {
        if (this.listeners.has(eventName as string)) {
            const list = this.listeners.get(eventName as string)

            for (const l of list!) {
                l(data)
            }

        }
    }
}


interface DjiOpenPlatformConnectSDKEvents {
    log: string
    unlinked: undefined //cloud platform connection is disabled and all config is reset
    websocket_connection_state: boolean
    mqtt_connection_state: boolean
    stream_connection_state: boolean
}

const JS_CALLBACK_PREFIX = 'dji_open_platform_connect_sdk_js_callback_'
const JS_CALLBACK_MQTT_CONNECTION_STATE = JS_CALLBACK_PREFIX + 'mqtt_connection_state'
const JS_CALLBACK_LIVESHARE_CONNECTION_STATE = JS_CALLBACK_PREFIX + 'liveshare_connection_state'
const JS_CALLBACK_WEBSOCKET_CONNECTION_STATE = JS_CALLBACK_PREFIX + 'websocket_connection_state'

export class DjiOpenPlatformConnectSDK extends EventManager<DjiOpenPlatformConnectSDKEvents> {

    private appId: string
    private appKey: string
    private appLicense: string

    private licenseIsVerified = false

    private djiBridge: DjiBridge

    constructor(appId: string, appKey: string, appLicense: string){
        super()

        this.appId = appId
        this.appKey = appKey
        this.appLicense = appLicense

        this.djiBridge = window['djiBridge']

        this.djiBridge.onStopPlatform = ()=>{
            this.dispatch('unlinked', undefined)
        }

        // WS

        this.registerJsCallback(JS_CALLBACK_WEBSOCKET_CONNECTION_STATE, (connectState: boolean)=>{
            this.dispatch('websocket_connection_state', connectState)
        })

        // MQTT

        this.registerJsCallback(JS_CALLBACK_MQTT_CONNECTION_STATE, (connectState: boolean)=>{
            this.dispatch('mqtt_connection_state', connectState)
        })

        this.updateMqttConnectionStateOnce()

        // live share

        this.registerJsCallback(JS_CALLBACK_LIVESHARE_CONNECTION_STATE, (connectState: boolean)=>{
            this.dispatch('stream_connection_state', connectState)
        })

    }

    // -- GENERAL --

    verifyLicense = this.wrapWithLog('verifyLicense', ()=>{
        const ret = this.unwrapResponse(this.djiBridge.platformVerifyLicense(this.appId, this.appKey, this.appLicense))

        this.licenseIsVerified = ret

        return ret
    })

    setWorkspaceUUID = this.wrapWithLog('setWorkspaceId', (uuid: string)=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformSetWorkspaceId(uuid)
        )
    })

    setPlatformInformation = this.wrapWithLog('setPlatformInformation', (platformName: string, workspaceName: string, description: string)=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformSetInformation(platformName, workspaceName, description)
        )
    })

    getRemoteControllerSN = this.wrapWithLog('getRemoteControllerSN', ()=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformGetRemoteControllerSN()
        )
    })

    /**
     * @returns false if aircraft is not connected to remote controller
     */
    getAircraftSN = this.wrapWithLog('getAircraftSN', ()=>{

        this.guardLicenseIsVerified()

        try {
            return this.unwrapResponse(
                this.djiBridge.platformGetAircraftSN()
            )
        } catch (err){
            return false
        }
    })


    // -- MQTT --

    /**
     * don't immediately call this after you verified the license the first time, the dji pilot app will not be ready and throw an error!
     *
     * @param host url of our platforms api e.g. tcp://123.123.123.123:8080
     * @param token this one will be transmitted by the remote controll when doing api request in the X-Auth-Token HTTP header
     */
    mqtt_loadModule(host: string, username: string, password: string){
        return this.loadModule('thing', {
            host,
            connectCallback: JS_CALLBACK_MQTT_CONNECTION_STATE,
            username,
            password
        })
    }

    mqtt_moduleIsLoaded(){
        return this.moduleIsLoaded('thing')
    }

    mqtt_unloadModule(){
        return this.unloadModule('thing')
    }

    mqtt_isConnected = this.wrapWithLog('mqtt_isConnected', ()=>{

        this.guardModuleLoaded('thing')

        return this.unwrapResponse(
            this.djiBridge.thingGetConnectState()
        )
    })

    /**
     * requires the mqtt module to be loaded already. Will throw if could not successfully connected within 15 seconds
     * @see mqtt_startWithExistingConfig()     *
     */
    mqtt_start = this.wrapWithLog('mqtt_start', (username: string, password: string)=>{
        return new Promise<void>((resolve, reject)=>{

            this.guardModuleLoaded('thing')

            let promiseIsDone = false

            const callback = (connectState: boolean)=>{

                if(!promiseIsDone){

                    if(connectState){

                        promiseIsDone = true
                        resolve()

                        this.removeListener('mqtt_connection_state', callback)
                    } else {
                        //ignore unreliable dji event
                    }
                }
            }

            this.addListener('mqtt_connection_state', callback)

            setTimeout(()=>{
                if(!promiseIsDone){
                    const isConnected = this.mqtt_isConnected()

                    promiseIsDone = true

                    if(!isConnected){
                        reject('mqtt not connected after 15 seconds')
                    } else {
                        resolve()
                    }
                }
            }, 1000 * 15)

            this.djiBridge.thingConnect(username, password, JS_CALLBACK_MQTT_CONNECTION_STATE)

            this.updateMqttConnectionStateOnce()
        })
    })

    private updateMqttConnectionStateOnce(){
        setTimeout(()=>{
            const response = this.unwrapResponse(this.djiBridge.thingGetConnectState())
            this.dispatch('mqtt_connection_state', response)
        }, 500)
    }


    mqtt_Stop = this.wrapWithLog('mqtt_Stop', ()=>{

        this.guardModuleLoaded('thing')

        this.djiBridge.thingDisconnect()
    })

    mqtt_GetCurrentConfig = this.wrapWithLog('mqtt_GetCurrentConfig', ()=>{

        this.guardModuleLoaded('thing')

        return this.unwrapResponse(
            this.djiBridge.thingGetConfigs()
        )
    })


    // -- API --



    /**
     * don't immediately call this after you verified the license for the first time, the dji pilot app will not be ready and throw an error!
     *
     * @param host url of our platforms api e.g. https://example.org/api
     * @param token this one will be transmitted by the remote controll when doing api request in the X-Auth-Token HTTP header
     */
    api_loadModule(host: string, token: string){//TODO make this a promise that resolves after some time

        if(!host.endsWith('/')){
            host += '/'
        }

        return this.loadModule('api', {
            host,
            token
        })
    }

    api_moduleIsLoaded(){
        return this.moduleIsLoaded('api')
    }

    api_unloadModule(){
        return this.unloadModule('api')
    }

    api_getCurrentToken = this.wrapWithLog('api_getCurrentToken', ()=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.apiGetToken()
        )
    })

    api_setToken = this.wrapWithLog('api_setToken', (token: string)=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.apiSetToken(token)
        )
    })

    api_getCurrentHost = this.wrapWithLog('api_getCurrentHost', ()=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.apiGetHost()
        )
    })


    // -- WebSocket --

    ws_loadModule(host: string, token: string){

        if(!host.endsWith('/')){
            host += '/'
        }

        return this.loadModule('ws', {
            host,
            token,
            connectCallback: JS_CALLBACK_WEBSOCKET_CONNECTION_STATE
        })
    }

    ws_moduleIsLoaded(){
        return this.moduleIsLoaded('ws')
    }

    ws_unloadModule(){
        return this.unloadModule('ws')
    }

    ws_connect = this.wrapWithLog('ws_connect', (host: string, token: string)=>{

        return this.unwrapResponse(
            this.djiBridge.wsConnect(host, token, JS_CALLBACK_WEBSOCKET_CONNECTION_STATE)
        )
    })

    ws_disconnect = this.wrapWithLog('ws_disconnect', ()=>{

        return this.unwrapResponse(
            this.djiBridge.wsDisconnect()
        )
    })

    ws_send = this.wrapWithLog('ws_send', (message: string)=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.wsSend(message)
        )
    })



    // Live stream

    /**
     *
     * @param videoPublishType on-demand: control server can control and configure the stream via mqtt, js: params are being set via this JS sdk and only remote controller can control the stream, mixed: both can control the stream
     * @returns
     */
    stream_loadModule(videoPublishType: 'on-demand' | 'js-manual' | 'mixed'){

        let vType: string

        switch(videoPublishType){
            case 'on-demand': {
                vType = 'video-on-demand'
            }; break;

            case 'js-manual': {
                vType = 'video-by-manual'
            }; break;

            case 'mixed': {
                vType = 'video-demand-aux-manual'
            }; break;

            default: {
                throw new Error('videoPublishType not supported: ' + videoPublishType)
            }
        }

        return this.loadModule('liveshare', {
            videoPublishType: vType,
            statusCallback: JS_CALLBACK_LIVESHARE_CONNECTION_STATE
        })
    }


    stream_moduleIsLoaded(){
        return this.moduleIsLoaded('liveshare')
    }

    stream_unloadModule(){
        return this.unloadModule('liveshare')
    }

    stream_getConfig = this.wrapWithLog('stream_getConfig', ()=>{
        this.guardLicenseIsVerified()

        return this.unwrapEncapsulatedResponse(this.djiBridge.liveshareGetConfig())
    })

    stream_setConfig_Agora = this.wrapWithLog('stream_setConfig_Agora', (uid: string, channelId: string, token: string)=>{
        this.guardModuleLoaded('liveshare')

        this.djiBridge.liveshareSetConfig(1, JSON.stringify({
            uid,
            channelId,
            token
        }))
    })

    stream_setConfig_RTMP = this.wrapWithLog('stream_setConfig_RTMP', (url: string)=>{
        this.guardModuleLoaded('liveshare')

        this.djiBridge.liveshareSetConfig(2, JSON.stringify({
            url
        }))
    })

    stream_setConfig_RTSP = this.wrapWithLog('stream_setConfig_RTSP', (port: string, userName: string, password: string)=>{
        this.guardModuleLoaded('liveshare')

        this.djiBridge.liveshareSetConfig(3, JSON.stringify({
            port,
            userName,
            password
        }))
    })

    stream_setConfig_GB28181 = this.wrapWithLog('stream_setConfig_GB28181', (serverIp: string, serverPort: string, serverId: string, agentId: string, password: string, agentPort: string, agentChannel: string)=>{
        this.guardModuleLoaded('liveshare')

        this.djiBridge.liveshareSetConfig(4, JSON.stringify({
            serverIp,
            serverPort,
            serverId,
            agentId,
            password,
            agentPort,
            agentChannel,
        }))
    })

    stream_isStreamRunningAndConnected = this.wrapWithLog('stream_isStreamRunningAndConnected', ()=>{
        return this.unwrapEncapsulatedResponse(this.djiBridge.liveshareGetStatus())
    })

    private guard_stream_hasConfig(){
        const conf = this.stream_getConfig()

        if(typeof conf.type !== 'number'){
            throw new Error('stream config must be set first')
        }
    }

    stream_start = this.wrapWithLog('stream_start', ()=>{
        this.guard_stream_hasConfig()

        return this.unwrapResponse(this.djiBridge.liveshareStartLive())
    })

    stream_stop = this.wrapWithLog('stream_stop', ()=>{
        return this.unwrapResponse(this.djiBridge.liveshareStopLive())
    })


    // Media Management

    /**
     *
     * @param autoUploadPhoto
     * @param autoUploadPhotoType 0 = original, 1 = thumbnail
     * @param autoUploadVideo
     * @returns
     */
    media_loadModule(autoUploadPhoto: boolean, autoUploadPhotoType: 0 | 1, autoUploadVideo: boolean){

        this.guardModuleLoaded('api')

        return this.loadModule('media', {
            autoUploadPhoto,
            autoUploadPhotoType,
            autoUploadVideo
        })
    }

    media_moduleIsLoaded(){
        return this.moduleIsLoaded('media')
    }

    media_unloadModule(){
        return this.unloadModule('media')
    }

    /**
     *
     * @param owner mine = current remote controller, other = the other remote controller
     */
    media_setDownloadRemoteController(rc: Media_DownloadOwner){
        return this.unwrapResponse(this.djiBridge.mediaSetDownloadOwner(rc === 'mine' ? 0 : 1))
    }


    /**
     *
     * @returns mine = current remote controller, other = the other remote controller
     */
    media_getDownloadRemoteController(): Media_DownloadOwner {
        return this.unwrapResponse(this.djiBridge.mediaGetDownloadOwner()) === 0 ? 'mine' : 'other'
    }

    // Map

    map_loadModule(userName: string, elementNamePrefix: string){

        this.guardModuleLoaded('thing')
        this.guardModuleLoaded('ws')

        return this.loadModule('map', {
            userName,
            elementPreName: elementNamePrefix
        })
    }

    map_moduleIsLoaded(){
        return this.moduleIsLoaded('map')
    }

    map_unloadModule(){
        return this.unloadModule('map')
    }

    map_setUserName(userName: string){
        return this.unwrapResponse(this.djiBridge.mapSetUserName(userName))
    }

    map_setElementNamePrefix(elementNamePrefix: string){
        return this.unwrapResponse(this.djiBridge.mapSetElementPreName(elementNamePrefix))
    }

    // Situational Awareness (TSA)

    situational_awareness_loadModule(){

        this.guardModuleLoaded('api')

        this.guardModuleLoaded('ws')

        return this.loadModule('tsa', {})
    }

    situational_awareness_moduleIsLoaded(){
        return this.moduleIsLoaded('tsa')
    }

    situational_awareness_unloadModule(){
        return this.unloadModule('tsa')
    }




    // internal stuff

    private guardLicenseIsVerified(){
        if(!this.licenseIsVerified){
            throw new Error('call verifyLicense() first')
        }
    }

    private guardModuleLoaded(moduleName: ModuleName){
        if(!this.moduleIsLoaded(moduleName)){
            throw new Error('module must be loaded first: ' + moduleName)
        }
    }

    private loadModule = this.wrapWithWaitAfterFinished(this.wrapWithLog('loadModule', (moduleName: ModuleName, params: object)=>{
        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformLoadComponent(moduleName, JSON.stringify(params))
        )
    }), 300)// wait to give dji to do some stuff

    private moduleIsLoaded = this.wrapWithLog('moduleIsLoaded', (moduleName: ModuleName)=>{

        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformIsComponentLoaded(moduleName)
        )
    })

    private unloadModule = this.wrapWithWaitAfterFinished(this.wrapWithLog('unloadModule', (ModuleName: ModuleName)=>{
        this.guardLicenseIsVerified()

        return this.unwrapResponse(
            this.djiBridge.platformUnloadComponent(ModuleName)
        )
    }), 300)// wait to give dji to do some stuff


    async unloadAllModules(){
        if(this.api_moduleIsLoaded()){
            await this.api_unloadModule()
        }

        if(this.mqtt_moduleIsLoaded()){
            await this.mqtt_unloadModule()
        }

        //TODO add all other modules
    }

    // helpers

    /**
     * basically does window['callbackName'] = function(){} so the dji apps can call this function
     * @see unregisterJsCallback()
     * @param callbackName
     */
    private registerJsCallback(callbackName: string, callback: Function){

        window[callbackName] = callback
    }

    /**
     *
     * @see registerJsCallback()
     * @param callbackName the return value from registerJsCallback()
     */
    private unregisterJsCallback(callbackName: string){
        window[callbackName] = undefined
    }

    /**
     *
     * @see registerJsCallback()
     * @param callbackName the return value from registerJsCallback()
     */
    private executeJsCallback(callbackName: string, args: any[]){
        const cb = window[callbackName]

        if(typeof cb !== 'function'){
            throw new Error('provided callbackName is not a function: ' + callbackName)
        }

        cb.apply(null, args)
    }

    private wrapWithLog<F extends Function>(title: string, func: F){
        const f = (...args)=>{

            try {
                const argString = args.map(a => {
                    return (a instanceof Object) ? JSON.stringify(a) : ('' + a)
                }).join(', ')

                this.log(`running ${title}(${argString}) ...`)


                const result = func.apply(this, args)

                if(typeof result === 'undefined'){
                    this.log('@' + title + '() = success')
                } else {
                    this.log('@' + title + '() = ', JSON.stringify(result, null, 2))
                }

                return result
            } catch (err){
                if(err instanceof Error){
                    this.log('@' + title + '()  ', err.stack || err.message || err.name)
                } else {
                    this.log('@' + title + '()  ERROR:', err)
                }

                throw err
            }
        }

        return f as unknown as F
    }

    /**
     * only waits if func ran without throwing any error
     * @param waitTime in milliseconds
     */
    private wrapWithWaitAfterFinished<F extends (...args: any) => any>(func: F, waitTime: number){
        return (...args: Parameters<F>) => {
            return new Promise<ReturnType<F>>((resolve, reject)=>{
                const res = func.apply(this, args)

                if(res instanceof Promise){
                    res.then(r => {
                        setTimeout(()=>{
                            resolve(r)
                        }, waitTime)
                    }).catch(reject)
                } else {
                    setTimeout(()=>{
                        resolve(res)
                    }, waitTime)
                }
            })
        }
    }

    /**
     *
     * @param response is actually a string, but we hack something togethere here ok?
     */
    private unwrapResponse<T>(response: DjiBridgeResponse<T>): T {

        const parsed = JSON.parse(response as unknown as string) as DjiBridgeResponse<T>

        if(parsed.code === 0){
            return (parsed as DjiBridgeResponseSuccess<T>).data
        } else {
            throw new Error('Failed with code ' + parsed.code +  ': ' + (parsed as DjiBridgeResponseFail).message)
        }
    }
//TODO typing does not work :()
    private unwrapEncapsulatedResponse<X>(response: DjiBridgeEncapsulatedResponse<X>): X{
        const str = this.unwrapResponse(response as DjiBridgeResponse<string>)

        try {
            const parsed = JSON.parse(str) as X

            return parsed
        } catch (err){
            throw new Error('Failed to parse encapsulated data ' + str)
        }
    }

    private log(...args){
        console.debug.apply(null, args)
        this.dispatch('log', args.map(a => '' + a).join(' '))
    }

}
