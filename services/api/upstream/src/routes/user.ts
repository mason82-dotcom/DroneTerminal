import express from 'express';
import { DBType_User } from '../generated-definitions/db/DBTypes';
import { ApiSchema_User, ApiSchema_User_My_Organisations, ApiSchema_User_My_Teams, ApiSchema_User_Patch, ApiSchema_User_Self } from '../generated-definitions/api/ApiSchemas';
import asyncHandler from 'express-async-handler'
import { ApiType_User, ApiType_User_My_Organisations, ApiType_User_My_Teams, ApiType_User_Patch, ApiType_User_Self } from '../generated-definitions/api/ApiTypes';
import { GuardError } from '../ManInTheMiddleware';
import { assignObject } from '../util/typescript'
import { getCore } from '../core';


const router = express.Router()


router.get('/self', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    res.GM.guardSend<ApiType_User_Self>(
        assignObject(user, {registration_incomplete: typeof user.password !== 'string'}),
        ApiSchema_User_Self
    )

}))


router.get('/my-organisations', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const organisations = await getCore().modules.organisation.getOrganisationsUserHasAccessTo(user)

    res.GM.guardSend<ApiType_User_My_Organisations>(organisations.map(organisation =>{
        return {id: organisation.id, access_type: organisation.owner_user_id === user.id ? 0 : 1}
    }), ApiSchema_User_My_Organisations)
}))

router.get('/my-teams', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const teams = await getCore().modules.team.getTeamsUserHasAccessTo(user)

    res.GM.guardSend<ApiType_User_My_Teams>(teams.map(team => {
        return {id: team.id, access_type: team.owner_user_id === user.id ? 0 : 1}
    }), ApiSchema_User_My_Teams)
}))

router.get('/:user_id', asyncHandler(async (req, res) => {

    await req.GM.guardUserIsAuthenticated()

    const user_id = req.GM.guardParam('user_id', 'id')

    const user = await getCore().modules.user.getUser(user_id)

    if(user === false){
        throw GuardError._410_Gone()
    }

    res.GM.guardSend<ApiType_User>(user, ApiSchema_User)
}))

router.patch('/:user_id', asyncHandler(async (req, res) => {

    const user = await req.GM.guardUserIsAuthenticated()

    const user_id = req.GM.guardParam('user_id', 'id')

    if(user_id !== user.id){
        throw GuardError._403_Forbidden('you can only modify your own account')
    }

    const newUser = req.GM.guardBodySchema<ApiType_User_Patch>(ApiSchema_User_Patch)

    //TODO add additional check for when user wants to change his email (and let them confirm it)

    const updatedUser = await getCore().modules.user.updateUserSafe(user.id, newUser)

    res.GM.guardSend<ApiType_User_Self>(
        assignObject(updatedUser, {registration_incomplete: typeof updatedUser.password !== 'string'}),
        ApiSchema_User_Self
    )
}))

export default router
