import * as express from 'express';
import * as pgp from 'pg-promise'
import asyncHandler from 'express-async-handler'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

import { ApiSchema_File, ApiSchema_File_Get_Multiple, ApiSchema_File_Get_Multiple_Post } from '../generated-definitions/api/ApiSchemas';
import { ApiType_File, ApiType_File_Get_Multiple, ApiType_File_Get_Multiple_Post } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { DBType_File } from '../generated-definitions/db/DBTypes';
import { getCore } from '../core';

const router = express.Router()

router.get('/:file_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const fileId = req.GM.guardParam('file_id', 'id')

    const file = await getCore().modules.file.getFile(fileId)

    if(file === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(file.workspace_id)

    res.GM.guardSend<ApiType_File>(file, ApiSchema_File)
}))

router.post('/get-multiple', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const fileIds = req.GM.guardBodySchema<ApiType_File_Get_Multiple_Post>(ApiSchema_File_Get_Multiple_Post)

    const files = await req.GM.guardDBGone(()=>{
        return db.manyOrNone<DBType_File>('SELECT * FROM files WHERE id in ${fileIds}', {fileIds})
    })

    for(const file of files){
        await req.GM.guardUserHasPermissionForWorkspace(file.workspace_id)
    }

    res.GM.guardSend<ApiType_File_Get_Multiple>(files, ApiSchema_File_Get_Multiple)
}))

router.get('/data/:file_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const fileId = req.GM.guardParam('file_id', 'id')

    const file = await getCore().modules.file.getFile(fileId)

    if(file === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(file.workspace_id)

    res.appendHeader('Content-Disposition', `attachment; filename="${file.name}"`)

    try {
        res.sendFile(getCore().modules.file.getAbsoluteFilePathForFile(file))
    } catch (err){
        console.error('error while sending file', err)
        res.status(500).send()
    }
}))


router.get('/thumbnail/:file_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const fileId = req.GM.guardParam('file_id', 'id')

    const file = await getCore().modules.file.getFile(fileId)

    if(file === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(file.workspace_id)

    if(typeof file.thumbnail_format !== 'string'){
        throw GuardError._410_Gone('file has no thumbnail')
    }

    res.appendHeader('Content-Disposition', `attachment; filename="${file.name}"`)

    try {
        res.sendFile(await getCore().modules.file.getAbsoluteThumbnailPathForFile(file))
    } catch (err){
        console.error('error while sending thumbnail', err)
        res.status(500).send()
    }
}))


export default router
