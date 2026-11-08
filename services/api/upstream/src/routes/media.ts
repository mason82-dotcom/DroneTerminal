import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Media, ApiSchema_Media_Ground_Coverage } from '../generated-definitions/api/ApiSchemas';
import { DBType_Drone_Media } from '../generated-definitions/db/DBTypes';
import { ApiType_Media } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { getCore } from '../core';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


const router = express.Router()


router.use((req, res, next) => {

    req.GM.guardUserIsAuthenticated().then(()=>{
        next()
    }).catch(err => {
        next(err)
    })

})

router.get('/:media_id', asyncHandler(async(req, res) => {

    const mediaId = req.GM.guardParam('media_id', 'id')

    const media = await req.GM.guardDBGone(()=>{
        return db.one<DBType_Drone_Media & {file_name: string}>('SELECT drone_media.*, files.name as file_name FROM drone_media INNER JOIN files ON drone_media.file_id = files.id WHERE drone_media.id = ${mediaId}', {
            mediaId
        })
    })

    const drone = await getCore().modules.drone.getDroneSafe(media.drone_id)
    const connection = await getCore().modules.drone.getLastConnectionForDrone(drone)

    if(!connection){
        // connection deleted or last_connection_id was never set
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    res.GM.guardSend<ApiType_Media>(getCore().modules.droneMedia.parseCameraMetaOfMedia(media), ApiSchema_Media)
}))



router.get('/ground-coverage/:media_id', asyncHandler(async(req, res) => {

    const mediaId = req.GM.guardParam('media_id', 'id')

    const media = await req.GM.guardDBGone(()=>{
        return db.one<DBType_Drone_Media & {created_at: string, file_name: string}>('SELECT drone_media.*, files.created_at, files.name as file_name FROM drone_media INNER JOIN files ON drone_media.file_id = files.id WHERE drone_media.id = ${mediaId}', {
            mediaId
        })
    })

    const drone = await getCore().modules.drone.getDroneSafe(media.drone_id)
    const connection = await getCore().modules.drone.getLastConnectionForDrone(drone)

    if(!connection){
        // connection deleted or last_connection_id was never set
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)


    const meta = await getCore().modules.droneMedia.getDroneMetaFromFile(media.file_id)

    if(meta === false){
        throw GuardError._410_Gone()
    }

    if(!meta.position || !meta.altitude || !meta.fov || !meta.gimbal){
        throw GuardError._410_Gone()
    }

    const coverage = await getCore().modules.droneMedia.getMediaCoverage(media)

    if(coverage === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend(coverage, ApiSchema_Media_Ground_Coverage)

}))

export default router
