import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Remote_Controller, ApiSchema_Remote_Controller_Position } from '../generated-definitions/api/ApiSchemas';
import { DBType_Connection, DBType_Remote_Controller_Data } from '../generated-definitions/db/DBTypes';
import { ApiType_Remote_Controller, ApiType_Remote_Controller_Position } from '../generated-definitions/api/ApiTypes';
import { getCore } from '../core';
import { GuardError } from '../ManInTheMiddleware';
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




router.get('/:remote_controller_id', asyncHandler(async (req, res) => {

    const remoteControllerId = req.GM.guardParam('remote_controller_id', 'id')

    const connection = await db.one<DBType_Connection>('SELECT * FROM connections WHERE remote_controller_id = ${remoteControllerId}', {
        remoteControllerId
    })

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    const remoteController = await getCore().modules.remoteController.getRemoteController(remoteControllerId)

    if(remoteController === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend<ApiType_Remote_Controller>(remoteController, ApiSchema_Remote_Controller)
}))

router.get('/:remote_controller_id/last-position', asyncHandler(async (req, res) => {

    const remoteControllerId = req.GM.guardParam('remote_controller_id', 'id')

    const connection = await db.one<DBType_Connection>('SELECT * FROM connections WHERE remote_controller_id = ${remoteControllerId}', {
        remoteControllerId
    })

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    const remoteControllerLastPosition = await getCore().modules.remoteController.getLastPositionOfRemoteController(remoteControllerId)

    if(remoteControllerLastPosition === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend<ApiType_Remote_Controller_Position>(remoteControllerLastPosition, ApiSchema_Remote_Controller_Position)
}))


export default router
