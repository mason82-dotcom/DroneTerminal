import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Connection_Post, ApiSchema_Connection_Post_Response } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Connection_Post, ApiType_Connection_Post_Response } from '../../generated-definitions/api/ApiTypes';
import { GuardError } from '../../ManInTheMiddleware';
import { getCore } from '../../core';
import existingConnectionRoute from './existing_connection'

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


router.post('/', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Connection_Post>(ApiSchema_Connection_Post)

    const workspace = await getCore().modules.workspace.getWorkspace(requestBody.workspace_id)

    if(workspace === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(workspace.id)

    const connection = await getCore().modules.connection.createConnection(workspace.id, requestBody.name)

    res.GM.guardSend<ApiType_Connection_Post_Response>({
        connection_id: '' + connection.id,
        secret: connection.secret
    }, ApiSchema_Connection_Post_Response)

}))


router.use('/:connection_id', asyncHandler(async (req, res, next) => {

    const connectionId = req.GM.guardParam('connection_id', 'id')

    const connection = await getCore().modules.connection.getConnection(connectionId)

    if(connection === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(connection.workspace_id)

    //@ts-ignore
    req._connection = connection

    next()
}), existingConnectionRoute)


export default router
