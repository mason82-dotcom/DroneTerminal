import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post, ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response, ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post, ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response, ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post, ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response, ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post, ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response } from '../../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post, ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response, ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post, ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response, ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post, ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response, ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post, ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response } from '../../../../generated-definitions/api/ApiSchemas';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

import {deleteObject, downloadObject, getBucketNameForConnectionId} from '../../../../s3-store'
import { DBType_Connection, DBType_Drone_Media, DBType_Drone_Media_TYPES, DBType_Drone_Media_TypeType } from '../../../../generated-definitions/db/DBTypes';
import { GuardError } from '../../../../ManInTheMiddleware';
import { getCore } from '../../../../core';
import { getFileExtension } from '../../../../util/file';

const router = express.Router()


router.post('/fast-upload', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()


    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post>(ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post)

    //TODO check if fingerprint is fine or if we need body.ext.tinny_fingerprint

    if(body.fingerprint.length === 0){
        throw GuardError._400_invalidBody('fingerprint')
    }

    const existingMedia = await db.oneOrNone<DBType_Drone_Media>('SELECT * FROM drone_media INNER JOIN connections ON drone_media.drone_id = connections.last_drone_id ' + pgp.as.format('WHERE fingerprint = ${fingerprint} AND connections.id = ${connectionId}', {
        fingerprint: body.fingerprint,
        connectionId: connection.id
    }))

    if(existingMedia){
        res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response>({
            code: 0,
            data: {},
            message: 'success'
        }, ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response)
    } else {
        res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response>({
            code: 404,
            data: {},
            message: 'no file with this fingerprint exists'
        }, ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response)
    }

}))

router.post('/files/tiny-fingerprints', asyncHandler(async (req, res) => {// this endpoint is used by m300 (not by mavic 3)

    const connection = await req.GM.getCurrentConnection()


    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post>(ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post)

    const existingTinyFingerprints = await db.manyOrNone<{tiny_fingerprint: string}>('SELECT tiny_fingerprint FROM drone_media INNER JOIN connections ON drone_media.drone_id = connections.last_drone_id ' + pgp.as.format('WHERE connections.id = ${connectionId}', {
        connectionId: connection.id
    }))

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response>({
        code: 0,
        message: 'success',
        data: {
            tiny_fingerprints: existingTinyFingerprints.map(etf => etf.tiny_fingerprint)
        }
    }, ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response)

}))

router.post('/upload-callback', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post>(ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post)

    const mediaType: DBType_Drone_Media_TypeType = typeof body.sub_file_type === 'number' ? (body.sub_file_type === 1 ? DBType_Drone_Media_TYPES.panorama : DBType_Drone_Media_TYPES.picture) : DBType_Drone_Media_TYPES.video

    //TODO support differentiation between picture and panorama

    const drone = await getCore().modules.drone.getDroneSafe(connection.last_drone_id)

    await getCore().modules.droneMedia.createDroneMediaFromBucketObject(getBucketNameForConnectionId(connection.id), body.object_key, drone, body.fingerprint, body.ext.tinny_fingerprint, mediaType, JSON.stringify({ext: body.ext, metadata: body.metadata}))

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response>({
        code: 0,
        message: 'success',
        data: {
            object_key: body.object_key
        }
    }, ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response)

}))

router.post('/group-upload-callback', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post>(ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post)

    //TODO what do we need to implement here?
    console.log('group-upload-callback', body)

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response>({
        code: 0,
        message: 'success',
        data: {}
    }, ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response)
}))

export default router
