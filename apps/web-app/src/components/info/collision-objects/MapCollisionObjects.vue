<script setup lang="ts">
import api from '@/api';
import { Viewer } from 'cesium';
import { inject, reactive, ref } from 'vue';
import CollisionObject from './CollisionObject.vue';
import { bearing, distance, radiansToDegrees } from '@turf/turf';
import { ApiResponse_InfoCollisionObjectsGet } from 'openflighthub-api-client-sdk';
import { updateArray, updateObject } from '@/util/vue';
import { getMapCenter } from '@/util/cesium';

const viewer = inject<Viewer>('cesiumViewer')

const COLLISION_OBJECTS_RADIUS = 2000

const objects = ref([] as ApiResponse_InfoCollisionObjectsGet)

const currentQueryParams = reactive(calculcateQueryParams())
const currentCameraHeading = ref(0)

function calculcateQueryParams(){
    const DEFAULT = {
        latitude: 0,
        longitude: 0,
        radius: 0
    }

    if(!viewer){
        return DEFAULT
    } else {

        let mapCenter = getMapCenter(viewer)

        if(mapCenter.latitude === 0 && mapCenter.longitude === 0){
            return DEFAULT
        }

        return {
            latitude: mapCenter.latitude,
            longitude: mapCenter.longitude,
            radius: COLLISION_OBJECTS_RADIUS
        }
    }
}


loadCollisionObjects(true)
// TODO moveEnd is not sufficient, we must also listen to changes of rotation(and maybe zoom?)
viewer!.scene.camera.moveEnd.addEventListener(()=>{

    const newQueryParams = calculcateQueryParams()

    const distanceToCurrentPosition = distance(
        [newQueryParams.longitude, currentQueryParams.latitude],
        [currentQueryParams.longitude, newQueryParams.latitude],
        {units: 'meters'}
    )

    if(distanceToCurrentPosition > COLLISION_OBJECTS_RADIUS / 4){
        // trigger reload
        updateObject(currentQueryParams, newQueryParams)
        loadCollisionObjects()
        return
    } else {

        const newCameraHeading = radiansToDegrees(viewer!.camera.heading)
        if(newCameraHeading !== currentCameraHeading.value){
            currentCameraHeading.value = newCameraHeading
            updateShownObjects()
        }
    }

})

async function loadCollisionObjects(forceReload = false){

    if(!currentQueryParams){
        return
    }

    if(forceReload){
        updateObject(currentQueryParams, calculcateQueryParams())
    }

    if(currentQueryParams.radius === 0){
        return

    }

    const collisionResponse = await api.rest.info.collisionObjects.get({queryParams: currentQueryParams})

    if(!collisionResponse){//code 204: no content yet (is loading)

        setTimeout(()=>{//TODO not the smoothest code...
            loadCollisionObjects(true)
        }, 5000)
        return
    }

    updateArray(objects.value, collisionResponse)

    updateShownObjects()
}

const shownObjects = reactive<ApiResponse_InfoCollisionObjectsGet>([])

function updateShownObjects(){
    const visibleObjects = filterVisible(objects.value)

    let removedCount = 0
    let addedCount = 0
    let updatedCount = 0

    // remove objects that are not visible anymore
    for(let i = 0; i < shownObjects.length; i++){
        if(!visibleObjects.find(o => o.id === shownObjects[i].id)){
            // remove
            shownObjects.splice(i, 1)
            removedCount++
            i--
        }
    }

    visibleObjects.forEach(vo => {
        const foundIndex = shownObjects.findIndex(so => so.id === vo.id)
        if(foundIndex >= 0){
            //update existing object

            for(const key of Object.keys(vo)){
                //@ts-ignore
                if(vo[key] !== shownObjects[foundIndex][key]){
                    // only update if something has changed, otherwise it can lead to performance issues because of too many updates
                    updateObject(shownObjects[foundIndex], vo)
                    updatedCount++
                    break
                }
            }
        }
    })

    // insert new
    const objectsToAdd = visibleObjects.filter(vo => !shownObjects.find(so => so.id === vo.id))
    shownObjects.push(...objectsToAdd)
    addedCount += objectsToAdd.length
}

function filterVisible(objects: ApiResponse_InfoCollisionObjectsGet){
    if(!viewer){
        return []
    }

    const cameraHeading = radiansToDegrees(viewer.camera.heading)

    const visibleObjects: ApiResponse_InfoCollisionObjectsGet = []

    for(const object of objects){

        const markingCenterPoint = object.marking.type === 0
            ? {longitude: object.marking.longitude, latitude: object.marking.latitude}
            : {
                longitude: object.marking.points.reduce((sum, point) => sum + point.longitude, 0) / object.marking.points.length,
                latitude: object.marking.points.reduce((sum, point) => sum + point.latitude, 0) / object.marking.points.length,
            }

        const mapCenterPos = getMapCenter(viewer)

        if(mapCenterPos.latitude === 0 && mapCenterPos.longitude === 0){
            console.error('mapcenter is invalid')
        }

        const objectHeading = bearing(
            [mapCenterPos.longitude, mapCenterPos.latitude],
            [markingCenterPoint.longitude, markingCenterPoint.latitude]
        )

        //TODO check heading formats of cesium and turf, maybe need to convert one to another
        if(Math.abs(objectHeading - cameraHeading) > 90){
            //continue // TODO fix and enable
        }

        const distanceToCamera = distance(
            [markingCenterPoint.longitude, markingCenterPoint.latitude],
            [mapCenterPos.longitude, mapCenterPos.latitude],
            {units: 'meters'}
        )

        if(distanceToCamera > COLLISION_OBJECTS_RADIUS && object.marking.type !== 1){//ignore polyline objects, because they can be very long and should be visible even if their center point is far away
            continue
        }

        visibleObjects.push(object)
    }

    return visibleObjects
}

</script>

<template>


    <CollisionObject v-for="obj of shownObjects" :key="'' + obj.id" :object="obj"></CollisionObject>

</template>

<style scoped lang="scss">



</style>
