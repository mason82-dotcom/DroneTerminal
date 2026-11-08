import express from 'express';
import asyncHandler from 'express-async-handler'
import pgp from 'pg-promise'
import {getMillisecondsSinceUnix} from '../../../../util/time'
import { ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post, ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response, ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response, ApiType_Dji_Pilot_2_Api_Map_Elements_Delete_Response, ApiType_Dji_Pilot_2_Api_Map_Elements_Put, ApiType_Dji_Pilot_2_Api_Map_Elements_Put_Response } from '../../../../generated-definitions/api/ApiTypes';
import { ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post, ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response, ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response, ApiSchema_Dji_Pilot_2_Api_Map_Elements_Delete_Response, ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put, ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put_Response } from '../../../../generated-definitions/api/ApiSchemas';
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

import { DBType_Geo_Object, DBType_Geo_Object_Type_TYPES } from '../../../../generated-definitions/db/DBTypes';
import dayjs from 'dayjs';

import {getDJIGeoJsonForGeoObject, getDJIMapElementTypeForGeoObject, getGeoObjectConfigForDJIMapElementContent, getGeoObjectSubTypeForDJIMapElementType} from '../../../../util/dji'
import { getCore } from '../../../../core';
import { GuardError } from '../../../../ManInTheMiddleware';

const router = express.Router()


router.post('/element-groups/:group_id/elements', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post>(ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post)

    const geoObject = await getCore().modules.geoObject.createGeoObject({
        uuid: body.id,
        name: body.name,
        workspace_id: connection.workspace_id,
        type: DBType_Geo_Object_Type_TYPES.marking,
        sub_type: getGeoObjectSubTypeForDJIMapElementType(body.resource.type),
        config: getGeoObjectConfigForDJIMapElementContent(body.resource.content, getGeoObjectSubTypeForDJIMapElementType(body.resource.type))
    })

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response>({
        code: 0,
        data: {
            id: geoObject.uuid
        },
        message: 'success'
    }, ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response)

}))

// note: already existing pins on the controller are not being synced when you link the controller (sync can be triggered by changing e.g. the color)
router.get('/element-groups', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    const geoObjects = await db.manyOrNone<DBType_Geo_Object>('SELECT * FROM geo_objects WHERE workspace_id = ${workspace_id} AND type = ${type}', {
        workspace_id: connection.workspace_id,
        type: DBType_Geo_Object_Type_TYPES.marking
    })

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response>({
        code: 0,
        data: [
            {

                "id": connection.workspace_uuid,
                "type": 2,
                'name': 'From OpenFlightHub Server',
                "is_lock": false,
                "create_time": 1,
                "elements": geoObjects.map(element=>{

                    const ret: ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response['data'][0]['elements'][0] = {
                        id: element.uuid,
                        name: element.name,
                        create_time: getMillisecondsSinceUnix(element.created_at),
                        update_time: getMillisecondsSinceUnix(element.updated_at),
                        resource: {
                            type: getDJIMapElementTypeForGeoObject(element.sub_type as unknown as 0 | 1 | 2 | 3),
                            content: getDJIGeoJsonForGeoObject(element)
                        }
                    }

                    return ret
                })
            }
        ],
        message: 'success'
    }, ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response)

}))

router.put('/elements/:element_uuid', asyncHandler(async (req, res) => {//TODO when this happens to quickly after creation, we might think this geoobject does not exist yet

    const connection = await req.GM.getCurrentConnection()

    const elementUUID = req.GM.guardParam('element_uuid', 'uuid')

    const existingGeoObject = await getCore().modules.geoObject.getGeoObject(elementUUID)

    if(existingGeoObject === false){
        throw GuardError._410_Gone()
    }

    await req.GM.guardConnectionHasPermissionForWorkspace(existingGeoObject.workspace_id)

    const body = req.GM.guardBodySchema<ApiType_Dji_Pilot_2_Api_Map_Elements_Put>(ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put)

    await getCore().modules.geoObject.updateGeoObject(elementUUID, {
        updated_at: dayjs().toISOString(),
        name: body.name,
        config: getGeoObjectConfigForDJIMapElementContent(body.content,
            //@ts-ignore
            existingGeoObject.sub_type)
    })

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Map_Elements_Put_Response>({
        code: 0,
        data: {
            id: elementUUID
        },
        message: 'success'
    }, ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put_Response)

}))

router.delete('/elements/:element_uuid', asyncHandler(async (req, res) => {

    const connection = await req.GM.getCurrentConnection()

    const elementUUID = req.GM.guardParam('element_uuid', 'uuid')


    const existingElement = await req.GM.guardDBGone(()=>{
        return db.one<DBType_Geo_Object>('SELECT * FROM geo_objects ' + pgp.as.format('WHERE uuid = ${uuid}', {uuid: elementUUID}))
    })

    await req.GM.guardConnectionHasPermissionForWorkspace(existingElement.workspace_id)

    await getCore().modules.geoObject.deleteGeoObject(existingElement.id)

    res.GM.guardSend<ApiType_Dji_Pilot_2_Api_Map_Elements_Delete_Response>({
        code: 0,
        data: {
            id: existingElement.uuid
        },
        message: 'success'
    }, ApiSchema_Dji_Pilot_2_Api_Map_Elements_Delete_Response)

}))

export default router
