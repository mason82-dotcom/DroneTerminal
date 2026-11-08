import express from 'express';
import { DBType_User } from '../../../generated-definitions/db/DBTypes';
import { ApiSchema_Admin_Organisation_Post, ApiSchema_Admin_Users, ApiSchema_Admin_Users_Post, ApiSchema_Reference } from '../../../generated-definitions/api/ApiSchemas';
import asyncHandler from 'express-async-handler'
import { ApiType_Admin_Organisation_Post, ApiType_Admin_Users, ApiType_Admin_Users_Post, ApiType_Reference } from '../../../generated-definitions/api/ApiTypes';
import { getCore } from '../../../core';
import { select_User } from '../../../generated-definitions/db/DBHelpers';
import { assignObject } from '../../../util/typescript';



const router = express.Router()


router.get('/', asyncHandler(async (req, res) => {

    const users = await select_User('')

    res.GM.guardSend<ApiType_Admin_Users>(
        users.map(user => {
            return assignObject(user, {registration_incomplete: typeof user.password !== 'string'})
        }),
        ApiSchema_Admin_Users
    )
}))

router.post('/', asyncHandler(async (req, res) => {

    const currentUser = await req.GM.getCurrentUser()

    const userToCreate = req.GM.guardBodySchema<ApiType_Admin_Users_Post>(ApiSchema_Admin_Users_Post)

    let createdUser: DBType_User

    if(typeof userToCreate.name === 'string' && userToCreate.name.length > 0){
        createdUser = await getCore().modules.user.createUser({
            email: userToCreate.email,
            name: userToCreate.name
        }, currentUser.id)
    } else {
        createdUser = await getCore().modules.user.createUserFromEmail(userToCreate.email, currentUser.id)
    }

    res.GM.guardSend<ApiType_Reference>(
        createdUser,
        ApiSchema_Reference
    )
}))

export default router
