import api from "@/api/index.js";
import { deviceSupportsSDK, DjiOpenPlatformConnectSDK, EventManager } from "./dji-pilot-2/dji-open-platform-connect-sdk.js";
import { ApiResponse_ConnectionLinkConfigGet } from "openflighthub-api-client-sdk";

export function deviceSupportsOpenFlightHubConnectLink(){
    // add more alternatives here once they exist
    return deviceSupportsSDK()
}

export function deviceSupportsOpenFlightHubConnectLink_DJI_Pilot_2(){
    return deviceSupportsSDK()
}

export type OpenFlightHubConnectLinkType = 'dji-pilot-2'

export class OpenFlightHubConnectLinkManager {


    constructor(){
        if(!deviceSupportsSDK()){
            throw new Error('device is not linkable (no dji-pilot-2 sdk support)')
        }
    }

    /**
     * if device is successfully logged in as user on openflighthub.org
     */
    async deviceCanBeLinked(){
        try {
            await api.rest.auth.check.get()

            return true
        } catch (err){//not authorized
            return false
        }
    }

    async deviceIsLinked(): Promise<false | OpenFlightHubConnectLinkType>{
        try {
            await api.rest.connectionLink.auth.check.get()//TODO at least for pilot 2 sdk, read token from api module and try to login with that (this is not that easy, since all the data we need for that (e.g. verifiying license first) is stored on the api server and can only be retrieved if credentials are provided. We should check, how long the session cookie is stored on the remote control)

            return 'dji-pilot-2'
        } catch (err){
            return false
        }
    }

    async getLink(): Promise<OpenFlightHubConnectLinkClient<string>>{

        if(await this.deviceIsLinked() === false){
            throw new Error('device is not linked')
        }

        return await this.initClient()
    }

    getLinkableWorkspaces(){
        return api.rest.workspace.myWorkspaces.get()
    }

    async linkToOpenFlightHub(connectionId: string, secret: string){
        await api.rest.connectionLink.auth.login.post({data:{
            connection_id: connectionId,
            secret
        }})

        return await this.initClient()
    }

    private async initClient(): Promise<OpenFlightHubConnectLinkClient<string>>{
        const client = new OpenFlightHubConnectLinkClient_DjiPilot2(await api.rest.connectionLink.config.get())
        await client.init()
        return client
    }

    /**
     * this will create a new workspace uuid and reset the client sdk (if any weird errors happen, e.g. with dji sdk mqtt does not connect after playing around too much in dev mode with it). Remote Controller must be restarted after this!
     */
    async resetClients(){
        console.log('resetting clients ...')
        const config = await api.rest.connectionLink.config.get()

        const sdkConfig = await api.rest.connectionLink.djiPilot2.sdkConfig.get()

        const sdk = new DjiOpenPlatformConnectSDK(sdkConfig.app_id, sdkConfig.app_key, sdkConfig.app_license)

        sdk.verifyLicense()

        sdk.setWorkspaceUUID(config.workspace_uuid)

        await sdk.unloadAllModules()

        await api.rest.connectionLink.resetWorkspaceUuid.post()


        sdk.setWorkspaceUUID('' + crypto.randomUUID())

        sdk.setPlatformInformation(config.platform_name, 'RESET WORKSPACE', 'only temporary. Please visit the "manage connection" view to continue.')

        console.log('reset done')
    }
}


type OpenFlightHubConnectLinkClient_Events = {
    'unlinked': unknown
    'connected-changed': undefined
}

export type ConnectionState<ModuleName extends string> = {
    connected: boolean,
    modules: ModuleConnectionState<ModuleName>[]
}

export type ModuleConnectionState<ModuleName extends string> = {
    name: ModuleName
    connected: boolean
}


export class OpenFlightHubConnectLinkClient<ModuleName extends string> extends EventManager<OpenFlightHubConnectLinkClient_Events> {

    protected platformConfig: ApiResponse_ConnectionLinkConfigGet

    constructor(platformConfig: ApiResponse_ConnectionLinkConfigGet){
        super()

        this.platformConfig = platformConfig
    }

    /**
     * initialize stuff and/or check if stuff is already running
     */
    init(): void | Promise<void>{
        throw new Error('not implemented')
    }

    /**
     * if stuff is connected to the platform
     */
    isConnected(): ConnectionState<ModuleName> | Promise<ConnectionState<ModuleName>>{
        throw new Error('not implemented')
    }

    getPlatformName(){
        return this.platformConfig.platform_name
    }

    getWorkspaceName(){
        return this.platformConfig.workspace_name
    }

    getConnectionId(){
        return this.platformConfig.connection_id
    }

    async unlink(){
        //TODO
        // properly delete all the module configs via js bridge?
    }
}

export type OpenFlightHubConnectLinkClient_DjiPilot2_ModuleName = 'api' | 'mqtt' | 'stream' | 'ws' | 'media' | 'map' | 'situational_awareness'

export class OpenFlightHubConnectLinkClient_DjiPilot2 extends OpenFlightHubConnectLinkClient<OpenFlightHubConnectLinkClient_DjiPilot2_ModuleName> {

    protected sdk: DjiOpenPlatformConnectSDK

    protected mqttIsConnected = false
    protected streamIsConnected = false
    protected websocketIsConnected = false

    async init(){

        console.debug('initializing OpenFlightHubConnectLinkClient_DjiPilot2 ...')

        const sdkConfig = await api.rest.connectionLink.djiPilot2.sdkConfig.get()

        this.sdk = new DjiOpenPlatformConnectSDK(sdkConfig.app_id, sdkConfig.app_key, sdkConfig.app_license)

        this.sdk.verifyLicense()

        this.sdk.setPlatformInformation(this.platformConfig.platform_name, this.platformConfig.workspace_name, 'on ' + this.platformConfig.platform_name)

        this.sdk.setWorkspaceUUID(this.platformConfig.workspace_uuid)


        console.debug('  setup api ...')

        // Api

        if(this.sdk.api_moduleIsLoaded()){
            await this.sdk.api_unloadModule()
        }

        this.sdk.api_loadModule(sdkConfig.api_url, this.platformConfig.secret)

        console.debug('  setup mqtt ...')

        // MQTT
        this.sdk.addListener('mqtt_connection_state', state => {
            this.mqttIsConnected = state
            this.dispatch('connected-changed', undefined)
        })

        const mqttUsername = this.platformConfig.connection_id
        const mqttPassword = this.platformConfig.secret

        if(this.sdk.mqtt_moduleIsLoaded()){
            await this.sdk.mqtt_unloadModule()
        }

        if(!this.sdk.mqtt_moduleIsLoaded()){
            await this.sdk.mqtt_loadModule(sdkConfig.mqtt_url, mqttUsername, mqttPassword)
        }

        if(!this.sdk.mqtt_isConnected()){
            await this.sdk.mqtt_start(mqttUsername, mqttPassword)
        }


        console.debug('  setup live stream ...')

        // Live Stream

        this.sdk.addListener('stream_connection_state', connectState => {
            this.streamIsConnected = connectState
            this.dispatch('connected-changed', undefined)
        })


        if(this.sdk.stream_moduleIsLoaded()){
            this.sdk.stream_getConfig()
            await this.sdk.stream_unloadModule()
        }

        if(!this.sdk.stream_moduleIsLoaded()){
            await this.sdk.stream_loadModule('js-manual')
        }

        const streamStatus = this.sdk.stream_isStreamRunningAndConnected()

        this.sdk.stream_stop()
        this.sdk.stream_setConfig_RTMP(sdkConfig.rtmp_url)
        //this.sdk.stream_start()

        console.debug('  setup media upload ...')

        // Media Upload
        if(this.sdk.media_moduleIsLoaded()){
            await this.sdk.media_unloadModule()
        }

        await this.sdk.media_loadModule(true, 0, false)
        this.sdk.media_setDownloadRemoteController('mine')//TODO check if this is required


        console.debug('  setup ws ...')

        // Ws

        this.sdk.addListener('websocket_connection_state', state => {
            this.websocketIsConnected = state
            this.dispatch('connected-changed', undefined)
        })


        if(this.sdk.ws_moduleIsLoaded()){
            await this.sdk.ws_unloadModule()
        }
        await this.sdk.ws_loadModule(sdkConfig.ws_url + '/?x-auth-token=' + this.platformConfig.secret, this.platformConfig.secret)

        this.sdk.ws_connect(sdkConfig.ws_url + '/?x-auth-token=' + this.platformConfig.secret, this.platformConfig.secret)




        console.debug('  setup map ...')

        // Map
        if(this.sdk.map_moduleIsLoaded()){
            await this.sdk.map_unloadModule()
        }

        await this.sdk.map_loadModule(this.getRemoteControllerSerialNumber(), 'Conn ' + this.getConnectionId())//TODO use connection name as prefix


        console.debug('  setup situational awareness ...')

        // Situational Awareness
        if(this.sdk.situational_awareness_moduleIsLoaded()){
            await this.sdk.situational_awareness_unloadModule()
        }

        await this.sdk.situational_awareness_loadModule()


        console.debug('init done')
    }

    async isConnected(): Promise<ConnectionState<OpenFlightHubConnectLinkClient_DjiPilot2_ModuleName>>{

        const modules: ModuleConnectionState<OpenFlightHubConnectLinkClient_DjiPilot2_ModuleName>[] = []

        modules.push({
            name: "mqtt",
            connected: this.mqttIsConnected
        })

        modules.push({
            name: 'stream',
            connected: this.streamIsConnected
        })

        modules.push({
            name: 'api',
            connected: this.sdk.api_moduleIsLoaded()
        })


        modules.push({
            name: 'ws',
            connected: this.websocketIsConnected
        })


        modules.push({
            name: 'media',
            connected: this.sdk.media_moduleIsLoaded()
        })


        modules.push({
            name: 'map',
            connected: this.sdk.map_moduleIsLoaded()
        })


        modules.push({
            name: 'situational_awareness',
            connected: this.sdk.situational_awareness_moduleIsLoaded()
        })

        return {
            connected: modules.filter(m=>m.name !== 'stream').find(m => !m.connected) ? false : true,// stream reports connected only when stream is live
            modules
        }
    }

    getRemoteControllerSerialNumber(){
        return this.sdk.getRemoteControllerSN()
    }

    getAircraftSerialNumber(){
        return this.sdk.getAircraftSN()
    }

    async toggleMediaModuleEnabled(){
        if(this.sdk.media_moduleIsLoaded()){
            await this.sdk.media_unloadModule()
        } else {
            await this.sdk.media_loadModule(true, 0, false)
            this.sdk.media_setDownloadRemoteController('mine')//TODO check if this is required
        }
    }
}
