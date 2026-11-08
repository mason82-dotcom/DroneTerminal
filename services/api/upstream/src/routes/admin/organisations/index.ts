import express from 'express';
import { ApiSchema_Admin_Organisation_Post, ApiSchema_Admin_Organisations, ApiSchema_Reference } from '../../../generated-definitions/api/ApiSchemas';
import asyncHandler from 'express-async-handler'
import { ApiType_Admin_Organisation_Post, ApiType_Admin_Organisations, ApiType_Reference } from '../../../generated-definitions/api/ApiTypes';
import { getCore } from '../../../core';
import { select_Organisation } from '../../../generated-definitions/db/DBHelpers';



const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {

    const organisations = await select_Organisation('')

    res.GM.guardSend<ApiType_Admin_Organisations>(
        organisations,
        ApiSchema_Admin_Organisations
    )
}))

router.post('/', asyncHandler(async (req, res) => {

    const requestBody = req.GM.guardBodySchema<ApiType_Admin_Organisation_Post>(ApiSchema_Admin_Organisation_Post)

    const organisation = await getCore().modules.organisation.createOrganisation(requestBody)

    res.GM.guardSend<ApiType_Reference>(
        organisation,
        ApiSchema_Reference
    )
}))

export default router
