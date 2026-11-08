import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiType_Connection_Link_Dji_Pilot_2_Sdk_Config } from '../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Connection_Link_Dji_Pilot_2_Sdk_Config } from '../../../generated-definitions/api/ApiSchemas';
import { connectionLinkAuthMiddleware } from '..';
import path from 'path';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

import SecretsLoader from '../../../util/SecretsLoader'
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets([
    'dji_cloud_app_id', 'dji_cloud_app_key', 'dji_cloud_app_license', 'platform_url', 'mqtt_port', 'rtmp_url'])

const router = express.Router()

if(('' + secrets.platform_url).indexOf(':') >= 0){
    throw new Error('platform_url must not contain a port!')
}

router.get('/sdk-config', connectionLinkAuthMiddleware, asyncHandler(async (req, res) => {

    const currentConnection = await req.GM.getCurrentConnection()

    req.GM.guardSend<ApiType_Connection_Link_Dji_Pilot_2_Sdk_Config>({
        api_url: 'https://' + secrets.platform_url + '/api/connection-link/dji-pilot-2/api/',
        app_id: secrets.dji_cloud_app_id as string,
        app_key: secrets.dji_cloud_app_key as string,
        app_license: secrets.dji_cloud_app_license as string,
        mqtt_url: 'tcp://' + secrets.platform_url + ':' + secrets.mqtt_port,
        rtmp_url: 'rtmp://' + secrets.rtmp_url + '/' + currentConnection.id + '?auth=' + currentConnection.secret,
        ws_url: 'wss://' + secrets.platform_url + '/api/connection-link/dji-pilot-2/ws'
    }, ApiSchema_Connection_Link_Dji_Pilot_2_Sdk_Config)

}))


import ExpressApiLogger from '../../../util/ExpressApiLogger'
const apiLogger = new ExpressApiLogger(path.resolve(path.join('/ofh_logs', 'dji_cloud_api_logs')))

import apiRoute from './api'
router.use('/api', apiLogger.logRequestMiddlerware(), apiRoute)

import wsRoute from './ws'
router.use('/ws', wsRoute)

export default router
