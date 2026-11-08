
//Source: https://developer.dji.com/doc/cloud-api-tutorial/en/api-reference/pilot-to-cloud/jsbridge.html#cloud-module

export type DjiBridgeResponse<T> = DjiBridgeResponseSuccess<T> | DjiBridgeResponseFail

export type DjiBridgeResponseSuccess<T> = {
    code: 0
    data: T
}

export type DjiBridgeResponseFail = {
    code: number
    message: string
}

export type DjiBridgeEncapsulatedResponse<T> = {
    code: 0
    data: T
}

export type EmptyObject = Record<string, never>

export type ComponentName = 'api' | 'thing' | 'liveshare' | 'api' | 'ws' | 'map' | 'tsa' | 'media' | 'mission'


export type LiveShareConfigType = 1 | 2 | 3 | 4

export type LiveShareConfig_Agora = {
    uid: string
    token: string
    channelId: string
}

export type LiveShareConfig_RTMP = {
    url: string
}

export type LiveShareConfig_RTSP = {
    userName: string,
    password: string,
    port: string
}

export type LiveShareConfig_GB28181 = {
    serverIp: string,
    serverPort: string,
    serverId: string,
    agentId: string,
    password: string,
    agentPort: string,
    agentChannel: string,
}


export type LiveShareConfig<T extends LiveShareConfigType> = {
    type: T
    params: T extends 1 ? LiveShareConfig_Agora : T extends 2 ? LiveShareConfig_RTMP : T extends 3 ? LiveShareConfig_RTSP : T extends 4 ? LiveShareConfig_GB28181 : {}
} | { type: 0 }

export type DjiBridge = {
    /**
     * NOTE: sometimes the remote controller has a bug where it somehow bricks the workspace with that UUID (e.g. when playing around with it too much for developing). In that case it will never actually send any mqtt messages out. In that case, you must use a different UUID!
     *
     * @param uuid the identifier of the workspace Identifier, the id must be uuid format. Example: e3dea0f5-37f2-4d79-ae58-490af3228069
     */
    platformSetWorkspaceId: (uuid: string) => DjiBridgeResponse<EmptyObject>

    /**
     *
     * @param platformName the text displayed at the top of the webview
     * @param workspaceName the name displayed on the "cloud" tile in the pilot 2 app home screen
     * @param desc the description displayed on the "cloud" tile in the pilot 2 app home screen (just below workspaceName)
     *
     */
    platformSetInformation: (platformName: string, workspaceName: string, desc: string) => DjiBridgeResponse<EmptyObject>

    platformGetRemoteControllerSN: () => DjiBridgeResponse<string>

    platformGetAircraftSN: () => DjiBridgeResponse<string>

    /**
     * Close and exit the platform
     */
    platformStopSelf: () => DjiBridgeResponse<EmptyObject>


    /**
     * can be called if api component has been loaded at least once (it still works if api component has been unloaded afterwards)
     */
    apiSetToken: (token: string) => DjiBridgeResponse<EmptyObject>

    /**
     * can be called if api component has been loaded at least once (it still works if api component has been unloaded afterwards)
     */
    apiGetToken: () => DjiBridgeResponse<string>


    /**
     * The appId and appKey and license need to be requested on the developer website.
     */
    platformVerifyLicense: (appId: string, appKey: string, license: string) => DjiBridgeResponse<boolean>

    platformGetRemoteControllerSN: () => DjiBridgeResponse<string>

    platformGetAircraftSN: () => DjiBridgeResponse<string>

    /**
     * don't immediately call this for api component after you loaded the page or verified the license (i dont know which creates the problems), but the dji pilot app will not be ready and throw an error!
     *
     *
     * components loading seems to be persistent after page reload (maybe not anymore if platform integration is stopped?)
     *
     * you can call this even if the component is already loaded, it will then overwrite the existing config/params (at least this works for api component)
     *
     */
    platformLoadComponent: (name: ComponentName, param: string) => DjiBridgeResponse<EmptyObject>

    platformIsComponentLoaded: (name: ComponentName) => DjiBridgeResponse<boolean>

    /**
     * if you call unloadComponent mqtt, dont immediately call loadcomeponent mqtt! It does not work and completely blocks the javascript
     */
    platformUnloadComponent: (name: ComponentName) => DjiBridgeResponse<EmptyObject>

    apiGetToken: () => DjiBridgeResponse<string>

    apiGetHost: () => DjiBridgeResponse<string>


    wsGetConnectState: () => DjiBridgeResponse<boolean>
    wsConnect: (host: string, token: string, callback: string) => DjiBridgeResponse<EmptyObject>
    wsDisconnect: () => DjiBridgeResponse<EmptyObject>
    wsSend: (msg: string) => DjiBridgeResponse<EmptyObject>

    mapSetUserName: (username: string) => DjiBridgeResponse<EmptyObject>
    mapSetElementPreName: (preName: string) => DjiBridgeResponse<EmptyObject>

    thingGetConnectState: () => DjiBridgeResponse<boolean>
    thingConnect: (username: string, password: string, callback: string) => DjiBridgeResponse<EmptyObject>
    thingDisconnect: () => DjiBridgeResponse<EmptyObject>
    thingSetConnectCallback: (callback: string) => DjiBridgeResponse<EmptyObject>
    thingGetConfigs: () => DjiBridgeResponse<{
        connectCallback: string
        host: string
        password: undefined | string // undefined if authentication/connection failed
        username: undefined | string // undefined if authentication/connection failed
    }>


    /**
     * result might be {type: 0} if authentication/connection failed //TODO check if it was type: 0 or type: 2
     * @returns
     */
    liveshareGetConfig: () => DjiBridgeEncapsulatedResponse<LiveShareConfig<LiveShareConfigType>>

    /**
     * @type 1, 2, 3 or 4
     * @param params JSON string. Depends on param type: 1 = LiveShareConfig_Agora, 2 = LiveShareConfig_RTMP, 3 = LiveShareConfig_RTSP, 4 = LiveShareConfig_GB28181
     * @returns
     */
    liveshareSetConfig: (type: T, params: string) => DjiBridgeResponse<EmptyObject>

    liveshareGetStatus: () => DjiBridgeEncapsulatedResponse<{
        audioBitRate: number // -1 if not connected
        dropRate: number // -1 if not connected
        fps: number // -1 if not connected
        jitter: number // -1 if not connected
        quality: 0 | number // 0 if not connected
        rtt: number // -1 if not connected
        status: number // 0 if not connected
        type: number
        videoBitRate: number // -1 if not connected
    }>
    liveshareStartLive: () => DjiBridgeResponse<EmptyObject>
    liveshareStopLive: () => DjiBridgeResponse<EmptyObject>


    mediaSetAutoUploadPhoto: (auto: boolean) => DjiBridgeResponse<EmptyObject>
    mediaGetAutoUploadPhoto: () => DjiBridgeResponse<boolean>

    /**
     *
     * @param type 0 = original, 1 = thumbnail
     */
    mediaSetUploadPhotoType: (type: 0 | 1) => DjiBridgeResponse<EmptyObject>
    mediaGetUploadPhotoType: () => DjiBridgeResponse<0 | 1>

    mediaSetAutoUploadVideo: (auto: boolean) => DjiBridgeResponse<EmptyObject>
    mediaGetAutoUploadVideo: () => DjiBridgeResponse<boolean>

    /**
     *
     * @param rc 0 = the current remote controller, 1 = the other remote controller
     */
    mediaSetDownloadOwner: (rc: 0 | 1) => DjiBridgeResponse<EmptyObject>
    mediaGetDownloadOwner: () => DjiBridgeResponse<0 | 1>


    /**
     * this function will be called when the user clicks the "sign out" button on the cloud platform (unlinking the the cloud platform from the remote controller and effectively resetting the cloud platform connection and settings)
     */
    onStopPlatform?: () => void

    /**
     * this function will be called when the users presses the back icon on the top left of the the webview (this is NOT the physical back button!).
     * @returns If you return true, the pilot app will ignore the "back" event
     */
    onBackClick?: () => boolean



/*
window.djiBridge.platformSetLogEncryptKey(String key) 	Set the log encryption key	Set the public key of the pilot log.
window.djiBridge.platformClearLogEncryptKey()	Clear the log encryption key	Clear the log encryption key.
window.djiBridge.platformGetLogPath()	Obtain the log path	Obtain the path for saving pilot logs.
window.open('scheme://host...', arg); 	Launch the third-party App	Using Scheme format
window.djiBridge.platformGetVersion()	Get version	Rreturn modelVersion and appVersion
window.djiBridge.platformIsVerified()	Check if the interface is authenticated	Check whether the certificate has been authenticated before initiating js communication, if there is no authentication case, the communication will fail.
window.djiBridge.platformLoadComponent(String name, String param)	Load Function Module	name: function module param: a json character. See below for details of the function modules:
Cloud Module
Live Stream Module
API Module
WS Module
Map Module
TSA Module
Media Module
Mission Module
window.djiBridge.platformUnloadComponent(String name)	Remove function module	-
window.djiBridge.platformIsComponentLoaded(String name)	Determine if the module is	-
window.djiBridge.platformIsAppInstalled(String pkgName)	Check if the APP is installed	pkgName: App package name
*/
}