
import Live from './live';
import RestApi from './rest_api';
import {CLIENT_SDK_VERSION} from './generated/client_sdk_version'

export type * from './generated/rest_api_types';
export type * from './generated/websocket-definitions/server_to_client';
export type {ApiStatusEvents} from './live'
export type {makeStructure} from './generated/rest_api_structure'
export type {Live}
import * as Constants from './util/constants'

export class OpenFlightHubApi{

    readonly rest: ReturnType<typeof RestApi>
    readonly live: Live
    readonly VERSION = CLIENT_SDK_VERSION
    readonly CONSTANTS = Constants

    constructor(options?: {
        restApiBaseUrl?: string
        liveWebsocketBaseUrl?: string
    }){
        this.rest = RestApi(options?.restApiBaseUrl)
        this.live = new Live(options?.liveWebsocketBaseUrl)
    }

    getFileDataUrl(fileId: number){
        return '/api/file/data/' + fileId
    }

    getFileThumbnailUrl(fileId: number){
        return '/api/file/thumbnail/' + fileId
    }
}
