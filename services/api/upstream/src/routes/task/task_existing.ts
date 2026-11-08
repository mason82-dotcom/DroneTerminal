import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import { ApiSchema_Task, ApiSchema_Task_Patch } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Task, ApiType_Task_Patch } from '../../generated-definitions/api/ApiTypes';
import { GuardError } from '../../ManInTheMiddleware';
import { getCore } from '../../core';
import { assignObject } from '../../util/typescript';
import { DBType_Task } from '../../generated-definitions/db/DBTypes';
import { ApiType_Task_Link_Geo_Object, ApiType_Task_Unlink_Geo_Object } from '../../generated-definitions/api/ApiTypes';
import { ApiSchema_Task_Link_Geo_Object, ApiSchema_Task_Unlink_Geo_Object } from '../../generated-definitions/api/ApiSchemas';
import { delete_Task_Geo_Object, insert_Task_Geo_Object } from '../../generated-definitions/db/DBHelpers';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const task = req._task as DBType_Task

    res.GM.guardSend<ApiType_Task>(assignObject(task, {
        geo_objects: await getCore().modules.geoObject.getGeoObjectsWithTasks(await getCore().modules.task.getGeoObjectsForTask(task.id))
    }), ApiSchema_Task)
}))


router.patch('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const task = req._task as DBType_Task

    const requestBody = req.GM.guardBodySchema<ApiType_Task_Patch>(ApiSchema_Task_Patch)

    const updatedTask = await getCore().modules.task.updateTaskSafe(task.id, assignObject(requestBody, {
        updated_by: (await req.GM.getCurrentUser()).id,
        updated_at: new Date().toISOString(),
        state: getCore().modules.task.validateTaskState(requestBody.state)
    }))

    res.GM.guardSend<ApiType_Task>(assignObject(updatedTask, {
        geo_objects: await getCore().modules.geoObject.getGeoObjectsWithTasks(await getCore().modules.task.getGeoObjectsForTask(task.id))
    }), ApiSchema_Task)
}))

router.delete('/', asyncHandler(async (req, res) => {

    //@ts-ignore
    const task = req._task as DBType_Task

    await getCore().modules.task.deleteTask(task.id)

    res.status(200).send()
}))



router.post('/link-geo-object', asyncHandler(async (req, res) => {

    //@ts-ignore
    const task = req._task as DBType_Task

    const requestBody = req.GM.guardBodySchema<ApiType_Task_Link_Geo_Object>(ApiSchema_Task_Link_Geo_Object)

    const existingLink = await db.oneOrNone('SELECT * FROM task_geo_objects WHERE task_id = ${taskId} AND geo_object_id = ${geoObjectId}', {
        taskId: task.id,
        geoObjectId: requestBody.geo_object_id
    })

    if(existingLink){
        throw GuardError._400_BadRequest('Link between task and geo object already exists')
    }

    await insert_Task_Geo_Object({
        task_id: task.id,
        geo_object_id: requestBody.geo_object_id
    })

    res.send()
}))

router.post('/unlink-geo-object', asyncHandler(async (req, res) => {

    //@ts-ignore
    const task = req._task as DBType_Task

    const requestBody = req.GM.guardBodySchema<ApiType_Task_Unlink_Geo_Object>(ApiSchema_Task_Unlink_Geo_Object)

    const existingLink = await db.oneOrNone('SELECT * FROM task_geo_objects WHERE task_id = ${taskId} AND geo_object_id = ${geoObjectId}', {
        taskId: task.id,
        geoObjectId: requestBody.geo_object_id
    })

    if(!existingLink){
        throw GuardError._400_BadRequest('Link between task and geo object does not exist')
    }

    await delete_Task_Geo_Object(pgp.as.format('WHERE task_id = ${taskId} AND geo_object_id = ${geoObjectId}', {
        taskId: task.id,
        geoObjectId: requestBody.geo_object_id
    }))

    res.send()
}))



export default router
