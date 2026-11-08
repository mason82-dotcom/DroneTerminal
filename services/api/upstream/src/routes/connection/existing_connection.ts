import express from 'express';
import asyncHandler from 'express-async-handler'
import { ApiSchema_Connection, ApiSchema_Connection_Live_Share_Keys_Get } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Connection, ApiType_Connection_Live_Share_Keys_Get } from '../../generated-definitions/api/ApiTypes';
import { getCore } from '../../core';
import { DBType_Connection } from '../../generated-definitions/db/DBTypes';
import { ApiSchema_Connection_Live_Share_Keys_Post, ApiSchema_Connection_Live_Share_Keys_Post_Response } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Connection_Live_Share_Keys_Post, ApiType_Connection_Live_Share_Keys_Post_Response } from '../../generated-definitions/api/ApiTypes';
import { GuardError } from '../../ManInTheMiddleware';

const router = express.Router()



router.get('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const connection = req._connection as DBType_Connection

    //@ts-ignore
    connection.drone_id = connection.last_drone_id // fix for api description

    res.GM.guardSend<ApiType_Connection>(connection, ApiSchema_Connection)
}))

router.delete('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const connection = req._connection as DBType_Connection

    await getCore().modules.connection.deleteConnection(connection.id)

    res.status(200).send()
}))


router.get('/live-share-keys', asyncHandler(async (req, res) => {

    //@ts-ignore
    const connection = req._connection as DBType_Connection

    const liveShareKeys = await getCore().modules.connection.getConnectionLiveShareKeys(connection.id)

    res.GM.guardSend<ApiType_Connection_Live_Share_Keys_Get>(liveShareKeys, ApiSchema_Connection_Live_Share_Keys_Get)

}))

router.post('/live-share-keys', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Connection_Live_Share_Keys_Post>(ApiSchema_Connection_Live_Share_Keys_Post)

    //@ts-ignore
    const connection = req._connection as DBType_Connection

    const liveShareKey = await getCore().modules.connection.createConnectionLiveShareKey({
        connectionId: connection.id,
        valid_until: requestBody.valid_until,
        created_by_user_id: (await req.GM.getCurrentUser()).id,
        name: requestBody.name
    })

    res.GM.guardSend<ApiType_Connection_Live_Share_Keys_Post_Response>(liveShareKey, ApiSchema_Connection_Live_Share_Keys_Post_Response)

}))


router.delete('/live-share-key/:live_share_key_id', asyncHandler(async (req, res) => {

    //@ts-ignore
    const connection = req._connection as DBType_Connection

    const liveShareKeyId = req.GM.guardParam('live_share_key_id', 'id')

    const liveShareKey = await getCore().modules.connection.getConnectionLiveShareKeys(connection.id)

    if(!liveShareKey.find(key => key.id === liveShareKeyId)){
        throw GuardError._403_Forbidden()
    }

    await getCore().modules.connection.deleteConnectionLiveShareKey(liveShareKeyId)

    res.status(200).send()
}))



export default router
