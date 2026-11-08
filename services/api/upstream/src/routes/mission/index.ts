import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Mission, ApiSchema_Mission_Patch, ApiSchema_Mission_Post, ApiSchema_Reference } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Mission, ApiType_Mission_Patch, ApiType_Mission_Post, ApiType_Task } from '../../generated-definitions/api/ApiTypes';
import { GuardError } from '../../ManInTheMiddleware';
import { getCore } from '../../core';
import { assignObject } from '../../util/typescript';
import { ApiType_Mission_Tasks } from '../../generated-definitions/api/ApiTypes';
import { ApiSchema_Mission_Tasks } from '../../generated-definitions/api/ApiSchemas';
import { DBType_Mission_StateType } from '../../generated-definitions/db/DBTypes';
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

    const requestBody = req.GM.guardBodySchema<ApiType_Mission_Post>(ApiSchema_Mission_Post)

    await req.GM.guardUserHasPermissionForWorkspace(requestBody.workspace_id)


    const assignedTeamId = requestBody.assigned_to_team_id
    if(typeof assignedTeamId === 'number'){
        const team = await getCore().modules.team.getTeam(assignedTeamId)
        if(team === false){
            throw GuardError._400_invalidBody('assigned_to_team_id')
        }
    }

    const currentUserId = (await req.GM.getCurrentUser()).id

    const mission = await getCore().modules.mission.createMission(assignObject(requestBody, {
        created_by: currentUserId,
        updated_by: currentUserId,
        state: getCore().modules.mission.validateMissionState(requestBody.state)
    }))

    res.GM.guardSend<ApiType_Mission>(mission, ApiSchema_Reference)
}))


import missionExistingRoute from './mission_existing'

router.use('/:mission_id', asyncHandler(async (req, res, next) => {//TODO make sure if this check actually happens first before any other processing

    const missionId = req.GM.guardParam('mission_id', 'id')

    const mission = await getCore().modules.mission.getMission(missionId)

    if(mission === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardUserHasPermissionForWorkspace(mission.workspace_id)

    //@ts-ignore
    req._mission = mission

    next()

}), missionExistingRoute)

export default router
