import express from 'express';
import { ApiSchema_Reference, ApiSchema_Team, ApiSchema_Team_All_Teams, ApiSchema_Team_Invite_Member, ApiSchema_Team_Invite_Member_Post_Response, ApiSchema_Team_Members, ApiSchema_Team_Patch, ApiSchema_Team_Post, ApiSchema_Team_Workspaces } from '../generated-definitions/api/ApiSchemas';
import asyncHandler from 'express-async-handler'
import { ApiType_Reference, ApiType_Team, ApiType_Team_All_Teams, ApiType_Team_Invite_Member, ApiType_Team_Invite_Member_Post_Response, ApiType_Team_Members, ApiType_Team_Patch, ApiType_Team_Post, ApiType_Team_Workspaces } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { getCore } from '../core';
import { select_Team } from '../generated-definitions/db/DBHelpers';


const router = express.Router()


router.get('/all-teams', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const teams = await select_Team('')

    res.GM.guardSend<ApiType_Team_All_Teams>(teams, ApiSchema_Team_All_Teams)
}))

router.get('/:team_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')

    if(await getCore().modules.team.userCanViewTeam((await req.GM.getCurrentUser()).id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    const team = await getCore().modules.team.getTeam(team_id)

    if(team === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend<ApiType_Team>(team, ApiSchema_Team)
}))

router.patch('/:team_id', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')

    if(await getCore().modules.team.userCanEditTeam(user.id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    const newTeam = req.GM.guardBodySchema<ApiType_Team_Patch>(ApiSchema_Team_Patch)

    const updatedTeam = await getCore().modules.team.updateTeamSafe(team_id, newTeam)

    res.GM.guardSend<ApiType_Team>(
        updatedTeam,
        ApiSchema_Team
    )
}))


router.post('/:team_id/invite-member', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')

    const team = await getCore().modules.team.getTeam(team_id)

    if(team === false){
        throw GuardError._410_Gone()
    }

    const currentUser = await req.GM.getCurrentUser()

    if(await getCore().modules.team.userOwnsTeam(currentUser.id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    const invitedUser = await getCore().modules.team.inviteUserToTeam(team_id, req.GM.guardBodySchema<ApiType_Team_Invite_Member>(ApiSchema_Team_Invite_Member).email, currentUser.id)

    if(invitedUser === false){
        throw GuardError._400_BadRequest('user already in a different team')
    }

    res.GM.guardSend<ApiType_Team_Invite_Member_Post_Response>(
        invitedUser,
        ApiSchema_Team_Invite_Member_Post_Response
    )
}))


router.delete('/:team_id/member/:user_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')


    const team = await getCore().modules.team.getTeam(team_id)

    if(team === false){
        throw GuardError._410_Gone()
    }

    const user_id = req.GM.guardParam('user_id', 'id')

    const user = await getCore().modules.user.getUser(user_id)

    if(user === false){
        throw GuardError._410_Gone()
    }

    if(user.team_id !== team_id){
        throw GuardError._400_BadRequest('user is not a member of this team')
    }

    if(await getCore().modules.team.userOwnsTeam((await req.GM.getCurrentUser()).id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    await getCore().modules.user.removeUserFromTeam(user_id)

    res.send()
}))

router.get('/:team_id/members', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')

    const team = await getCore().modules.team.getTeam(team_id)

    if(team === false){
        throw GuardError._410_Gone()
    }

    if(await getCore().modules.team.userCanViewTeam((await req.GM.getCurrentUser()).id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    res.GM.guardSend<ApiType_Team_Members>(await getCore().modules.team.getTeamMembers(team_id), ApiSchema_Team_Members)
}))

router.post('/', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const requestBody = req.GM.guardBodySchema<ApiType_Team_Post>(ApiSchema_Team_Post)

    const organisation = await getCore().modules.organisation.getOrganisation(requestBody.organisation_id)

    if(organisation === false){
        throw GuardError._400_invalidBody('organisation_id')
    }

    if(await getCore().modules.organisation.userOwnsOrganisation(user.id, organisation.id) === false){
        throw GuardError._403_Forbidden()
    }

    const ownerUser = await getCore().modules.user.getUser(requestBody.owner_user_id)

    if(ownerUser === false){
        throw GuardError._400_invalidBody('owner_user_id')
    }

    const team = await getCore().modules.team.createTeam(requestBody)

    res.GM.guardSend<ApiType_Reference>(
        team,
        ApiSchema_Reference
    )
}))


router.get('/:team_id/workspaces', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const team_id = req.GM.guardParam('team_id', 'id')

    if(await getCore().modules.team.userCanViewTeam((await req.GM.getCurrentUser()).id, team_id) === false){
        throw GuardError._403_Forbidden()
    }

    const workspaces = await getCore().modules.team.getWorkspacesForTeam(team_id)

    if(workspaces === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend<ApiType_Team_Workspaces>(workspaces, ApiSchema_Team_Workspaces)
}))

export default router
