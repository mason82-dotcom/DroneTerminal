import express from 'express';
import asyncHandler from 'express-async-handler'
import { ApiSchema_Info_Collision_Objects } from '../../generated-definitions/api/ApiSchemas';
import { ApiType_Info_Collision_Objects } from '../../generated-definitions/api/ApiTypes';
import { getCore } from '../../core';

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {

    const longitude = req.GM.guardQueryParam('longitude', 'number')
    const latitude = req.GM.guardQueryParam('latitude', 'number')
    const radius = req.GM.guardQueryParam('radius', 'number')

    if(radius <= 0){
        res.GM.guardSend<ApiType_Info_Collision_Objects>([], ApiSchema_Info_Collision_Objects)
        return
    }

    const hasAreaDirectlyAvailable = await getCore().modules.geoObject.collisionObjectsManager.hasCollisionObjectsDirectlyAvailable(longitude, latitude, radius)

    if(hasAreaDirectlyAvailable === false || hasAreaDirectlyAvailable.state === 'stale'){

        res.status(204)//no content, but client can expect that there are collision objects in this area, just not directly available yet. Client can decide to show a loading state or not
        res.GM.guardSend<ApiType_Info_Collision_Objects>([], ApiSchema_Info_Collision_Objects)

        getCore().modules.geoObject.collisionObjectsManager.loadCollisionObjects(hasAreaDirectlyAvailable === false ? {longitude, latitude, radiusInMeters: radius} : hasAreaDirectlyAvailable.area).catch(console.error)

        return
    }

    const ret = await getCore().modules.geoObject.collisionObjectsManager.getCollisionObjects(longitude, latitude, radius)

    res.GM.guardSend<ApiType_Info_Collision_Objects>(ret, ApiSchema_Info_Collision_Objects)
}))


export default router
