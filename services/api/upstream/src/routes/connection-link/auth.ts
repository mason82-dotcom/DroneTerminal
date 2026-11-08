import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

const router = express.Router()

import { ApiSchema_Connection_Link_Auth_Login_Post } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Connection_Link_Auth_Login_Post } from '../../generated-definitions/api/ApiTypes';
import { DBType_Connection } from '../../generated-definitions/db/DBTypes';
import { getCore } from '../../core';


router.get('/check', asyncHandler(async(req, res)=>{

    await req.GM.guardConnectionLinkIsAuthenticated()

    res.status(200).send()

}))

router.post('/login', asyncHandler(async(req, res)=>{

    const body = req.GM.guardBodySchema<ApiType_Connection_Link_Auth_Login_Post>(ApiSchema_Connection_Link_Auth_Login_Post)


    try {
        let connection = await db.one<DBType_Connection>('SELECT * FROM connections WHERE id = ${id} AND secret = ${secret};', {
            id: body.connection_id,
            secret: body.secret
        })

        await getCore().modules.connection.generateConnectionSessionCookieAndSet(connection.id, res)

        res.status(200).send()

    } catch {

        //TODO delay doesnt work
        // delay(()=>{//delay request so people can't correlate that with email existance
        //     res.status(418).send()//should be 410 gone, but we dont want to tell anyone!
        // })
        res.status(418).send()//should be 410 gone, but we dont want to tell anyone!

        return
    }

}))

export default router