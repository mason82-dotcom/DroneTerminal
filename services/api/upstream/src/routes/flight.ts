import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Flight, ApiSchema_Flight_Media, ApiSchema_Flight_Patch, ApiSchema_Flight_Post, ApiSchema_Flight_Users, ApiSchema_Flight_Users_Post, ApiSchema_Reference } from '../generated-definitions/api/ApiSchemas';
import { ApiType_Flight, ApiType_Flight_Media, ApiType_Flight_Patch, ApiType_Flight_Post, ApiType_Flight_Users, ApiType_Flight_Users_Post, ApiType_Reference } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { assignObject } from '../util/typescript';
import { DBType_Drone_Media, DBType_Flight_User } from '../generated-definitions/db/DBTypes';
import { getCore } from '../core';
import { insert_Flight_User } from '../generated-definitions/db/DBHelpers';
import dayjs from 'dayjs';
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

//TODO check if this implementation of auth for all other endpoints works
router.use('/:flight_id', asyncHandler(async(req, res, next) => {

    const flightId = req.GM.guardParam('flight_id', 'id')

    const flight = await getCore().modules.flight.getFlight(flightId)

    if(flight === false){
        throw GuardError._410_Gone()
    }

    const connection = await getCore().modules.drone.getLastConnectionForDrone(flight.drone_id)

    if(!connection){
        // connection deleted or last_connection_id was never set
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    req._flight = flight

    next()
}))

router.get('/:flight_id/media', asyncHandler(async (req, res) => {

    const flightId = req.GM.guardParam('flight_id', 'id')

    const flightMedia = await db.manyOrNone<DBType_Drone_Media & {file_name: string}>('SELECT drone_media.*, files.name as file_name FROM drone_media INNER JOIN files ON drone_media.file_id = files.id WHERE flight_id = ${flightId}', {
        flightId
    })

    res.GM.guardSend<ApiType_Flight_Media>(flightMedia.map(m => getCore().modules.droneMedia.parseCameraMetaOfMedia(m)), ApiSchema_Flight_Media)
}))


router.get('/:flight_id/users', asyncHandler(async (req, res) => {

    const flightId = req.GM.guardParam('flight_id', 'id')

    const users = await db.manyOrNone<DBType_Flight_User>('SELECT * FROM flight_users WHERE flight_id = ${flightId}', {
        flightId
    })

    res.GM.guardSend<ApiType_Flight_Users>(users, ApiSchema_Flight_Users)
}))

router.delete('/:flight_id/user/:user_id', asyncHandler(async (req, res) => {

    const flightId = req.GM.guardParam('flight_id', 'id')
    const userId = req.GM.guardParam('user_id', 'id')

    const users = await db.manyOrNone<DBType_Flight_User>('SELECT * FROM flight_users WHERE flight_id = ${flightId} AND user_id = ${userId}', {
        flightId,
        userId
    })

    if(users.length === 0){
        throw GuardError._410_Gone()
    }

    await db.none('DELETE FROM flight_users WHERE flight_id = ${flightId} AND user_id = ${userId}', {
        flightId,
        userId
    })

    res.send()
}))

router.post('/:flight_id/users', asyncHandler(async (req, res) => {

    const flightId = req.GM.guardParam('flight_id', 'id')

    const requestBody = req.GM.guardBodySchema<ApiType_Flight_Users_Post>(ApiSchema_Flight_Users_Post)

    const user = await getCore().modules.user.getUser(requestBody.user_id)

    if(user === false){
        throw GuardError._400_invalidBody('user_id')
    }

    //TODO is this check good enough?
    const flightUserIsRelatedToFlight =await getCore().modules.user.userHasPermissionForWorkspace(requestBody.user_id, req._flight!.workspace_id)
    if(flightUserIsRelatedToFlight === false){
        throw GuardError._400_invalidBody('user not part of workspace')
    }

    await insert_Flight_User({
        flight_id: flightId,
        user_id: requestBody.user_id,
        type: getCore().modules.flight.validateFlightUserType(requestBody.type),
        created_by: (await req.GM.getCurrentUser()).id
    })

    res.send()
}))

router.get('/:flight_id', asyncHandler(async (req, res) => {

    const track = await getCore().modules.flight.getTrackForFlight(req._flight!.id)

    res.GM.guardSend<ApiType_Flight>(assignObject({track}, req._flight!), ApiSchema_Flight)
}))

router.patch('/:flight_id', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Flight_Patch>(ApiSchema_Flight_Patch)

    const flight = await getCore().modules.flight.updateFlight(req._flight!.id, assignObject(requestBody, {
        is_changed_manually: true,
        updated_by: (await req.GM.getCurrentUser()).id
    }))

    if(flight === false){
        throw GuardError._410_Gone()
    }

    const track = await getCore().modules.flight.getTrackForFlight(req._flight!.id)

    res.GM.guardSend<ApiType_Flight>(assignObject(flight, {track}), ApiSchema_Flight)
}))


router.post('/', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Flight_Post>(ApiSchema_Flight_Post)

    const drone = await getCore().modules.drone.getDrone(requestBody.drone_id)

    if(drone === false){
        throw GuardError._400_invalidBody('drone_id')
    }

    const lastConnection = await getCore().modules.drone.getLastConnectionForDrone(drone)

    if(lastConnection === false){
        throw new Error('drone has no last connection')//should never happen
    }

    await req.GM.guardUserHasPermissionForWorkspace(lastConnection.workspace_id)

    //TODO check if request body schema valdiation ensures dates are valid

    if(typeof requestBody.ended_at === 'string' && dayjs(requestBody.ended_at).isBefore(dayjs(requestBody.started_at))){
        throw GuardError._400_invalidBody('ended_at cannot be before started_at')
    }

    if(typeof requestBody.landed_at === 'string' && dayjs(requestBody.landed_at).isBefore(dayjs(requestBody.started_at))){
        throw GuardError._400_invalidBody('landed_at cannot be before started_at')
    }

    if(requestBody.track && requestBody.track.length > 0){
        throw GuardError._501_Not_Implemented('track is not supported yet')
    }

    const flight = await getCore().modules.flight.createFlight({
        drone_id: requestBody.drone_id,
        workspace_id: lastConnection.workspace_id,
        is_changed_manually: true,
        is_created_manually: true,
        started_at: requestBody.started_at,
        ended_at: requestBody.ended_at,
        landed_at: requestBody.landed_at
    })

    res.GM.guardSend<ApiType_Reference>(flight, ApiSchema_Reference)
}))



export default router
