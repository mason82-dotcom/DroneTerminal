import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Drone, ApiSchema_Drone_Battery, ApiSchema_Drone_Flights, ApiSchema_Drone_Media, ApiSchema_Drone_Position, ApiSchema_Flight } from '../generated-definitions/api/ApiSchemas';
import { DBType_Drone_Media, DBType_Flight } from '../generated-definitions/db/DBTypes';
import { ApiType_Drone, ApiType_Drone_Battery, ApiType_Drone_Flights, ApiType_Drone_Media, ApiType_Drone_Position, ApiType_Flight } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { assignObject } from '../util/typescript';
import { getCore } from '../core';
import FlightModule from '../core/modules/FlightModule';
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
router.use('/:drone_id', asyncHandler(async(req, res, next) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const drone = await getCore().modules.drone.getDrone(droneId)

    if(drone === false){
        throw GuardError._410_Gone()
    }

    const connection = await getCore().modules.drone.getLastConnectionForDrone(drone)

    if(!connection){
        // connection deleted or last_connection_id was never set
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    req._drone = drone

    next()
}))




router.get('/:drone_id', asyncHandler(async (req, res) => {

    res.GM.guardSend<ApiType_Drone>(req._drone!, ApiSchema_Drone)
}))




router.get('/:drone_id/last-position', asyncHandler(async (req, res) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const droneLastPosition = await getCore().modules.drone.getLastPositionOfDrone(droneId)

    if(droneLastPosition === false){
        res.status(410).send()
        return
    }

    res.GM.guardSend<ApiType_Drone_Position>(droneLastPosition, ApiSchema_Drone_Position)
}))


router.get('/:drone_id/last-battery', asyncHandler(async (req, res) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const droneLastBattery = await getCore().modules.drone.getLastTelemetryOfDrone(droneId)

    if(droneLastBattery === false){
        res.status(410).send()
        return
    }

    res.GM.guardSend<ApiType_Drone_Battery>(droneLastBattery, ApiSchema_Drone_Battery)
}))


router.get('/:drone_id/media', asyncHandler(async (req, res) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const droneMedia = await db.manyOrNone<DBType_Drone_Media & {file_name: string}>('SELECT drone_media.*, files.name as file_name FROM drone_media INNER JOIN files ON drone_media.file_id = files.id WHERE drone_id = ${droneId}', {
        droneId
    })

    res.GM.guardSend<ApiType_Drone_Media>(droneMedia.map(m => getCore().modules.droneMedia.parseCameraMetaOfMedia(m)), ApiSchema_Drone_Media)
}))


router.get('/:drone_id/flights', asyncHandler(async (req, res) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const droneFlights = await db.manyOrNone<DBType_Flight>('SELECT * FROM flights WHERE drone_id = ${droneId}', {
        droneId
    })

    const ret = new Array<{track: Awaited<ReturnType<FlightModule['getTrackForFlight']>>} & DBType_Flight>()

    for(const flight of droneFlights){
        ret.push(
            assignObject({track: await getCore().modules.flight.getTrackForFlight(flight.id)}, flight)
        )
    }

    res.GM.guardSend<ApiType_Drone_Flights>(ret, ApiSchema_Drone_Flights)
}))

router.get('/:drone_id/current-flight', asyncHandler(async (req, res) => {

    const droneId = req.GM.guardParam('drone_id', 'id')

    const currentFlight = await db.one<DBType_Flight>('SELECT * FROM flights WHERE drone_id = ${droneId} ORDER BY id DESC LIMIT 1', {
        droneId
    })

    res.GM.guardSend<ApiType_Flight>(assignObject({track: await getCore().modules.flight.getTrackForFlight(currentFlight.id)}, currentFlight), ApiSchema_Flight)
}))



export default router
