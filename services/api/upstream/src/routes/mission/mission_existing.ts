import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Mission, ApiSchema_Mission_Patch } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Mission, ApiType_Mission_Patch, ApiType_Task } from '../../generated-definitions/api/ApiTypes';
import { getCore } from '../../core';
import { assignObject } from '../../util/typescript';
import { ApiType_Mission_Tasks } from '../../generated-definitions/api/ApiTypes';
import { ApiSchema_Mission_Tasks } from '../../generated-definitions/api/ApiSchemas';
import { DBType_Mission } from '../../generated-definitions/db/DBTypes';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


const router = express.Router()

router.get('/tasks', asyncHandler(async (req, res) => {

    //@ts-ignore
    const mission = req._mission as DBType_Mission

    const tasks = await getCore().modules.mission.getTasksForMission(mission.id)

    const tasksWithGeoObjects: ApiType_Task[] = []

    await Promise.all(tasks.map(task => {
        return new Promise<void>(async (resolve) => {
            tasksWithGeoObjects.push(assignObject(task, {
                geo_objects: await getCore().modules.geoObject.getGeoObjectsWithTasks(await getCore().modules.task.getGeoObjectsForTask(task.id))
            }))
            resolve()
        })
    }))

    res.GM.guardSend<ApiType_Mission_Tasks>(tasksWithGeoObjects, ApiSchema_Mission_Tasks)
}))


router.get('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const mission = req._mission as DBType_Mission

    res.GM.guardSend<ApiType_Mission>(mission, ApiSchema_Mission)
}))


router.patch('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const mission = req._mission as DBType_Mission

    const requestBody = req.GM.guardBodySchema<ApiType_Mission_Patch>(ApiSchema_Mission_Patch)

    const updatedMission = await getCore().modules.mission.updateMissionSafe(mission.id, assignObject(requestBody, {
        updated_by: (await req.GM.getCurrentUser()).id,
        updated_at: new Date().toISOString(),
        state: getCore().modules.mission.validateMissionState(requestBody.state)
    }))

    res.GM.guardSend<ApiType_Mission>(updatedMission, ApiSchema_Mission)
}))

router.delete('/', asyncHandler(async (req, res) => {


    //@ts-ignore
    const mission = req._mission as DBType_Mission

    await getCore().modules.mission.deleteMission(mission.id)

    res.status(200).send()
}))


export default router
