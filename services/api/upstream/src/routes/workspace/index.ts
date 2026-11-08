import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Reference, ApiSchema_Workspace, ApiSchema_Workspaces_Post } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Workspace, ApiType_Workspaces_Post } from '../../generated-definitions/api/ApiTypes';
import { GuardError } from '../../ManInTheMiddleware';
import { getCore } from '../../core';
import { assignObject } from '../../util/typescript';
import existingWorkspaceRoute from './existing_workspace'

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


router.get('/my-workspaces', asyncHandler(async (req, res) => {

    const user = await req.GM.getCurrentUser()

    if(typeof user.team_id !== 'number'){
        req.GM.guardSend([], {type: 'array'})
        return
    }

    const workspaces = await db.manyOrNone('SELECT workspaces.* FROM workspaces INNER JOIN workspace_permissions ON workspace_permissions.workspace_id = workspaces.id WHERE workspace_permissions.team_id = ${team_id};', {
        team_id: user.team_id
    })

    req.GM.guardSend<ApiType_Workspace[]>(workspaces, {type: 'array', items: ApiSchema_Workspace})

}))


router.post('/', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Workspaces_Post>(ApiSchema_Workspaces_Post)


    if(typeof requestBody.team_id === 'number' && typeof requestBody.organisation_id === 'number'){
        throw GuardError._400_invalidBody('team_id and organisation_id cannot both be set')
    }

    if(typeof requestBody.team_id === 'number'){
        const team = await getCore().modules.team.getTeam(requestBody.team_id)
        if(team === false){
            throw GuardError._410_Gone('team_id')
        }
    }

    if(typeof requestBody.organisation_id === 'number'){
        const organisation = await getCore().modules.organisation.getOrganisation(requestBody.organisation_id)
        if(organisation === false){
            throw GuardError._410_Gone('organisation_id')
        }
    }

    const currentUser = await req.GM.getCurrentUser()

    const workspace = await getCore().modules.workspace.createWorkspace({
        name: requestBody.name,
        latitude: requestBody.latitude,
        longitude: requestBody.longitude,
        created_by: currentUser.id,
        owner_team_id: typeof requestBody.team_id === 'number' ? requestBody.team_id : undefined,
        owner_organisation_id: typeof requestBody.organisation_id === 'number' ? requestBody.organisation_id : undefined
    })

    if(typeof requestBody.team_id === 'number'){
        await getCore().modules.workspace.inviteTeam(workspace.id, requestBody.team_id)
    }

    res.GM.guardSend<ApiType_Workspace>(workspace, ApiSchema_Reference)
}))


router.use('/:workspace_id', asyncHandler(async (req, res, next) => {

    const workspaceId = req.GM.guardParam('workspace_id', 'id')

    await req.GM.guardUserHasPermissionForWorkspace(workspaceId)

    const workspace = await getCore().modules.workspace.getWorkspace(workspaceId)

    if(workspace === false){
        throw GuardError._410_Gone()
    }

    //@ts-ignore
    req._workspace = workspace

    next()
}), existingWorkspaceRoute)


export default router
