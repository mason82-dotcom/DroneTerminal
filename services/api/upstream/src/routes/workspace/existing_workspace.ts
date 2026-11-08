import express, { Request } from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Geo_Object, ApiSchema_Geo_Object_Patch, ApiSchema_Reference, ApiSchema_Workspace, ApiSchema_Workspace_Connections, ApiSchema_Workspace_Files, ApiSchema_Workspace_Geo_Objects_Get, ApiSchema_Workspace_Geo_Objects_Post, ApiSchema_Workspace_Invite_Team_Post, ApiSchema_Workspace_Kick_Team_Post, ApiSchema_Workspace_Missions, ApiSchema_Workspace_Patch, ApiSchema_Workspace_Permissions } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Geo_Object_Patch, ApiType_Reference, ApiType_Workspace, ApiType_Workspace_Connections, ApiType_Workspace_Files, ApiType_Workspace_Geo_Objects_Get, ApiType_Workspace_Geo_Objects_Post, ApiType_Workspace_Invite_Team_Post, ApiType_Workspace_Kick_Team_Post, ApiType_Workspace_Missions, ApiType_Workspace_Patch, ApiType_Workspace_Permissions } from '../../generated-definitions/api/ApiTypes';
import { DBType_Connection, DBType_File, DBType_Workspace, DBType_Workspace_ForOrganisation, DBType_Workspace_ForTeam } from '../../generated-definitions/db/DBTypes';
import { MulterFile } from '../../app';
import { GuardError } from '../../ManInTheMiddleware';
import { getCore } from '../../core';
import { multerMiddleware } from '../../util/multer';
import { select_Mission } from '../../generated-definitions/db/DBHelpers';
import { randomUUID } from 'crypto';

//@ts-ignore
const db = global.db as pgp.IDatabase<any>


const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    res.GM.guardSend<ApiType_Workspace>(workspace, ApiSchema_Workspace)
}))


router.patch('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    if(await getCore().modules.workspace.userOwnsWorkspace(workspace.id, (await req.GM.getCurrentUser()).id) === false){
        throw GuardError._403_Forbidden()
    }

    const requestBody = req.GM.guardBodySchema<ApiType_Workspace_Patch>(ApiSchema_Workspace_Patch)

    const updatedWorkspace = await getCore().modules.workspace.updateWorkspaceSafe(workspace.id, requestBody)

    res.GM.guardSend<ApiType_Workspace>(updatedWorkspace, ApiSchema_Workspace)
}))

router.delete('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    await getCore().modules.workspace.deleteWorkspace(workspace.id)

    res.status(200).send()
}))

// connection

router.get('/connections', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const connections = await db.manyOrNone<DBType_Connection>('SELECT * FROM connections WHERE workspace_id = ${workspaceId};', {
        workspaceId: workspace.id
    })

    //@ts-ignore
    connections.forEach(c => c.drone_id = c.last_drone_id)// fix for api description

    req.GM.guardSend<ApiType_Workspace_Connections>(connections, ApiSchema_Workspace_Connections)

}))


router.get('/files', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const files = await db.manyOrNone<DBType_File>('SELECT * FROM files WHERE workspace_id = ${workspaceId}', {
        workspaceId: workspace.id
    })

    res.GM.guardSend<ApiType_Workspace_Files>(files, ApiSchema_Workspace_Files)

}))

router.post('/file', multerMiddleware.single('file'), asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    if(!(req as Request & {file: MulterFile}).file){
        throw GuardError._400_invalidBody('file')
    }

    const file = await getCore().modules.file.storeTmpMulterFileInDatabase((req as Request & {file: MulterFile}).file, workspace.id, (await req.GM.getCurrentUser()).id)

    res.GM.guardSend<ApiType_Reference>(file, ApiSchema_Reference)
}))

router.patch('/file/:file_id', multerMiddleware.single('file'), asyncHandler(async (req, res) => {


    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const fileId = req.GM.guardParam('file_id', 'id')

    await req.GM.guardDBGone(()=>{
        return db.one<DBType_File>('SELECT * FROM files WHERE workspace_id = ${workspaceId} AND id = ${id};', {
            id: fileId,
            workspaceId: workspace.id
        })
    })

    if(!(req as Request & {file: MulterFile}).file){
        throw GuardError._400_invalidBody('file')
    }

    throw new Error('not implemented')
    //TODO fix this broken code
    // we currently create a new file, instead of changing the old file

    const file = await getCore().modules.file.storeTmpMulterFileInDatabase((req as Request & {file: MulterFile}).file, workspace.id, (await req.GM.getCurrentUser()).id)

    res.GM.guardSend<ApiType_Reference>(file, ApiSchema_Reference)
}))

router.delete('/file/:file_id', asyncHandler(async (req, res) => {


    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const fileId = req.GM.guardParam('file_id', 'id')

    const file = await req.GM.guardDBGone(()=>{
        return db.one<DBType_File>('SELECT * FROM files WHERE workspace_id = ${workspaceId} AND id = ${id};', {
            id: fileId,
            workspaceId: workspace.id
        })
    })

    await getCore().modules.file.deleteFile(file.id)

    res.status(200).send()
}))


router.get('/permissions', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const permissions = await getCore().modules.workspace.getPermissions(workspace.id)

    res.GM.guardSend<ApiType_Workspace_Permissions>(permissions, ApiSchema_Workspace_Permissions)

}))

router.post('/invite-team', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    let ownsTeam = false

    if(typeof (workspace as DBType_Workspace_ForTeam).owner_team_id === 'number'){
        ownsTeam = await getCore().modules.team.userOwnsTeam((await req.GM.getCurrentUser()).id, (workspace as DBType_Workspace_ForTeam).owner_team_id)
    } else {
        ownsTeam = await getCore().modules.organisation.userOwnsOrganisation((await req.GM.getCurrentUser()).id, (workspace as DBType_Workspace_ForOrganisation).owner_organisation_id)
    }

    if(!ownsTeam){
        throw GuardError._403_Forbidden()
    }

    const requestBody = req.GM.guardBodySchema<ApiType_Workspace_Invite_Team_Post>(ApiSchema_Workspace_Invite_Team_Post)

    await getCore().modules.workspace.inviteTeam(workspace.id, requestBody.team_id)

    res.send()

}))


router.post('/kick-team', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    let userOwnsTeam = false

    if(typeof (workspace as DBType_Workspace_ForTeam).owner_team_id === 'number'){
        userOwnsTeam = await getCore().modules.team.userOwnsTeam((await req.GM.getCurrentUser()).id, (workspace as DBType_Workspace_ForTeam).owner_team_id)
    } else {
        userOwnsTeam = await getCore().modules.organisation.userOwnsOrganisation((await req.GM.getCurrentUser()).id, (workspace as DBType_Workspace_ForOrganisation).owner_organisation_id)
    }

    if(!userOwnsTeam){
        throw GuardError._403_Forbidden()
    }

    const requestBody = req.GM.guardBodySchema<ApiType_Workspace_Kick_Team_Post>(ApiSchema_Workspace_Kick_Team_Post)

    await getCore().modules.workspace.kickTeam(workspace.id, requestBody.team_id)

    res.send()

}))

router.get('/missions', asyncHandler(async (req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const missions = await select_Mission(pgp.as.format('WHERE workspace_id = ${workspaceId}', {
        workspaceId: workspace.id
    }))

    res.GM.guardSend<ApiType_Workspace_Missions>(missions, ApiSchema_Workspace_Missions)

}))



router.get('/geo-objects', asyncHandler(async(req, res) => {

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const geoObjectsWithTasks = await getCore().modules.geoObject.getGeoObjectsWithTasks(await getCore().modules.workspace.getGeoObjectsForWorkspace(workspace.id))

    res.GM.guardSend<ApiType_Workspace_Geo_Objects_Get>(geoObjectsWithTasks.filter(g => g.type !== 3) /* TODO: remove filter when we decide to include type 3 objects */, ApiSchema_Workspace_Geo_Objects_Get)
}))

router.post('/geo-objects', asyncHandler(async(req, res) => {

    const body = req.GM.guardBodySchema<ApiType_Workspace_Geo_Objects_Post>(ApiSchema_Workspace_Geo_Objects_Post)

    //@ts-ignore
    const workspace = req._workspace as DBType_Workspace

    const createdGeoObject = await getCore().modules.geoObject.createGeoObject({
        uuid: typeof body.uuid === 'string' ? body.uuid : randomUUID(),
        name: body.name,
        type: body.type,
        sub_type: body.sub_type,
        workspace_id: workspace.id,
        config: body.config
    })

    res.GM.guardSend<ApiType_Reference>(createdGeoObject, ApiSchema_Reference)
}))

router.patch('/geo-object/:geo_object_id', asyncHandler(async(req, res) => {

    const geoObjectId = req.GM.guardParam('geo_object_id', 'id')

    const geoObject = await getCore().modules.geoObject.getGeoObject(geoObjectId)

    if(geoObject === false){
        throw GuardError._410_Gone()
    }

    const body = req.GM.guardBodySchema<ApiType_Geo_Object_Patch>(ApiSchema_Geo_Object_Patch)


    const updatedGeoObject = await getCore().modules.geoObject.updateGeoObjectSafe(geoObject.id, {
        name: typeof body.name === 'string' ? body.name : geoObject.name,
        config: body.config ? body.config : geoObject.config
    })

    res.GM.guardSend((await getCore().modules.geoObject.getGeoObjectsWithTasks([updatedGeoObject]))[0], ApiSchema_Geo_Object)

}))


router.delete('/geo-object/:geo_object_id', asyncHandler(async(req, res) => {

    const geoObjectId = req.GM.guardParam('geo_object_id', 'id')

    const geoObject = await getCore().modules.geoObject.getGeoObject(geoObjectId)

    if(geoObject === false){
        throw GuardError._410_Gone()
    }

    await getCore().modules.geoObject.deleteGeoObject(geoObject.id)

    res.status(200)
    res.send()
}))


export default router
