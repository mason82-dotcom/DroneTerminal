<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
import MapClickListener from '../MapClickListener.vue';
import { updateObject } from '@/util/vue';
import ApiForm from '@/components/functional/form/ApiForm.vue';
import api from '@/api';
import { useToast, IftaLabel } from 'primevue';
import Padding from '@/components/layout/Padding.vue';
import SelectApiColor from '@/components/functional/form/SelectApiColor.vue';
import { ApiResponse_WorkspaceGeoObjectPatch, ApiResponse_WorkspaceGeoObjectsGet, ApiResponse_WorkspaceGeoObjectsPost } from 'openflighthub-api-client-sdk';
import IconVue from '@/components/general/IconVue.vue';
import { getColorForHex } from '@/util/cesium.js';
import MapPolygon from '../MapPolygon.vue';
import MapMarker from '../MapMarker.vue';
import { distance, kinks, lineString, lineToPolygon, midpoint } from '@turf/turf';
import { getColor } from '@/config/colors.js';

const ICON_SIZE = 20
const MIN_DISTANCE_BETWEEN_POINTS = 1 // meters

const props = defineProps<{
    workspaceId: number
    taskId?: number
    existingGeoObject?: ApiResponse_WorkspaceGeoObjectsGet[number]
}>()


onMounted(() => {

    if(props.existingGeoObject){
        if(props.existingGeoObject.type !== 0 || props.existingGeoObject.sub_type !== 2){
            throw new Error('Existing geo object must be of type marking and polygon')
        }

        updateObject(locationData, props.existingGeoObject.config.polygon)

        updateObject(config, toRaw(props.existingGeoObject.config))
    }
})

const locationData = reactive([] as [number, number, number][])

const emit = defineEmits<{
    'create-done': [value: ApiResponse_WorkspaceGeoObjectsPost]
    'edit-done': [value: ApiResponse_WorkspaceGeoObjectPatch]
    cancel: [value: void]
}>()

const toast = useToast()

const config = reactive({
    polygon: locationData,
    color: api.CONSTANTS.GEO_OBJECT_COLORS.BLUE
})

const label = ref(props.existingGeoObject ? props.existingGeoObject.name : '')

const polygonParts = computed(()=>{
    const parts: {from: [number, number, number], to: [number, number, number]}[] = []

    let lastPoint: [number, number, number] | undefined = undefined

    for(const point of locationData){
        if(lastPoint){
            parts.push({from: lastPoint, to: point})
        }
        lastPoint = point
    }

    return parts
})

let preventNextClickTimeMs: number = 0
function preventNextClick(){
    preventNextClickTimeMs = Date.now()
}

function center(from: [number, number, number], to: [number, number, number]): [number, number, number]{
    const c = midpoint(from, to).geometry.coordinates
    return [c[0], c[1], 0]
}

function removePoint(index: number){
    preventNextClick()
    locationData.splice(index, 1)
    propagateLocationData()
}

function insertPointAfter(index: number){
    preventNextClick()

    let from = locationData[index]
    let to = locationData[(index >= locationData.length - 1) ? 0 : index + 1]

    const newPoint = center(from, to)

    locationData.splice(index + 1, 0, newPoint)
    propagateLocationData()
}

function getPointBefore(index: number): [number, number, number]{
    if(index < 0 || index >= locationData.length){
        throw new Error('Index out of bounds: ' + index)
    }
    if(index === 0){
        return locationData[locationData.length - 1]
    } else {
        return locationData[index - 1]
    }
}

function getPointAfter(index: number): [number, number, number]{
    if(index >= locationData.length - 1){
        return locationData[0]
    } else {
        return locationData[index + 1]
    }
}

function addPointAfter(index: number, newPoint: [number, number, number]){


    if(locationData.length === 0){
        locationData.push(newPoint)
    } else {

        if(index < 0){
            index = 0;
        }

        if(index >= locationData.length){
            index = locationData.length - 1;
        }

        const pointBefore = getPointBefore(index)
        const pointAfter = getPointAfter(index)

        if(distance(pointBefore, newPoint, {units: 'meters'}) < MIN_DISTANCE_BETWEEN_POINTS || distance(pointAfter, newPoint, {units: 'meters'}) < MIN_DISTANCE_BETWEEN_POINTS){
            return
        }

        locationData.splice(index + 1, 0, newPoint)
    }

    propagateLocationData()
}

function propagateLocationData(){
    config.polygon = locationData
}

function polygonHasKinks(polygon: [number, number, number?][]): boolean{
    if(polygon.length < 3){
        return false
    }

    const coordinates = [...polygon.map(p => [p[0], p[1]]), [polygon[0][0], polygon[0][1]]]

    return kinks(lineString(coordinates)).features.length > 0
}


//ignores elevation and sets it to 0
function unkinkPolygon(polygon: [number, number, number?][]){
    const coordinates = [...polygon.map(p => [p[0], p[1]]), [polygon[0][0], polygon[0][1]]]

    const polygonWithoutKinks = lineToPolygon(lineString(coordinates))

    return polygonWithoutKinks.geometry.coordinates[0].map(c => [c[0], c[1], 0] as [number, number, number])
}

function updatePoint(index: number, newPoint: [number, number, number?]){
    const newPointWithElevationZero = [newPoint[0], newPoint[1], 0] as [number, number, number]
    locationData[index] = newPointWithElevationZero
    propagateLocationData()
}

function checkFunction(): true | string {
    if(locationData.length < 3){
        return 'Please select at least 3 locations for the polygon by clicking on the map'
    }

    if(polygonHasKinks(locationData)){
        return 'Polygon intersections are not allowed'
    }

    return true
}

</script>

<template>

    <MapClickListener @click="(loc)=>{
        if(Date.now() < (preventNextClickTimeMs + 200)){
            return
        }

        const locAsNumberArray: [number, number, number] = [loc.longitude, loc.latitude, 0]

        addPointAfter(locationData.length - 1, locAsNumberArray)

    }"></MapClickListener>

    <MapMarker v-if="locationData.length === 1" :position="locationData[0]" icon-url="/images/ui/draw_polygon/remove.png" :icon-width="ICON_SIZE" :icon-height="ICON_SIZE" :background-circle="getColor('accent')" @click-marker="removePoint(0)" draggable @drag-end="preventNextClick" @dragging="(newPoint)=>{updatePoint(0, newPoint)}"></MapMarker>

    <MapPolygon v-if="locationData.length > 1" :points="locationData" :color="getColorForHex(config.color, 0.3)" filled :outline-color="getColorForHex(config.color)" :label="label" :outline-width="8" :clamp-to-ground="true"></MapPolygon>

    <template v-for="part, index in polygonParts">
        <MapMarker :position="center(part.from, part.to)" icon-url="/images/ui/draw_polygon/add.png" :icon-width="ICON_SIZE" :icon-height="ICON_SIZE" :background-circle="getColor('accent')" @click-marker="insertPointAfter(index)"></MapMarker>

        <MapMarker :position="part.to" icon-url="/images/ui/draw_polygon/remove.png" :icon-width="ICON_SIZE" :icon-height="ICON_SIZE" :background-circle="getColor('accent')"  @click-marker="removePoint(index + 1)" draggable @drag-end="preventNextClick()" @dragging="(newPoint)=>{updatePoint(index + 1, newPoint)}"></MapMarker>
    </template>

    <template v-if="locationData.length > 1">
        <MapMarker :position="locationData[0]" icon-url="/images/ui/draw_polygon/remove.png" :icon-width="ICON_SIZE" :icon-height="ICON_SIZE" :background-circle="getColor('accent')" @click-marker="removePoint(0)" draggable @drag-end="preventNextClick" @dragging="(newPoint)=>{updatePoint(0, newPoint)}"></MapMarker>

        <MapMarker :position="center(locationData[0], locationData[locationData.length - 1])" icon-url="/images/ui/draw_polygon/add.png" :icon-width="ICON_SIZE" :icon-height="ICON_SIZE" :background-circle="getColor('accent')" @click-marker="insertPointAfter(locationData.length - 1)"></MapMarker>
    </template>


    <div id="form">
        <Padding>
            <template v-if="props.existingGeoObject">
                <ApiForm :api-method="api.rest.workspace.geoObject.patch" type="edit" title="Edit Polygon" :params="{workspaceId: props.workspaceId, geoObjectId: props.existingGeoObject.id}" :fields="{
                    name: {type: 'text', required: true},
                    config: {type: 'raw', required: true}
                }" :editable-fields="['name']" :initial-values="{
                    name: props.existingGeoObject.name,
                    config
                }" @created="(ref) => {
                    emit('edit-done', ref)
                }" show-cancel-button @cancel="emit('cancel')"
                :watch-initial-values="['config']" :check-function="checkFunction" @change="newData => {
                    label = newData.name || ''
                }" v-slot="{reset}">

                    <IftaLabel>
                        <SelectApiColor field-name="color" @change="newColor => config.color = newColor" :initial-color="config.color"></SelectApiColor>
                        <label for="color">Color</label>
                    </IftaLabel>

                    <IconVue class="edit_close" name="x-lg" interactive @click="reset(); emit('cancel')"></IconVue>

                </ApiForm>
            </template>
            <template v-else>
                <ApiForm :api-method="api.rest.workspace.geoObjects.post" type="create" title="Create Polygon" :params="{workspaceId: props.workspaceId}" :fields="{
                    name: {type: 'text', required: true},
                    type:  {type: 'number', required: true},
                    sub_type:  {type: 'number', required: true},
                    uuid: {type: 'text', required: false},
                    config: {type: 'raw', required: true}
                }" :editable-fields="['name']" :initial-values="{
                    type: 0,
                    sub_type: 2,
                    config
                }" @created="(ref) => {
                    if(typeof props.taskId === 'number'){
                        api.rest.task.linkGeoObject.post({
                            params: {
                                taskId: props.taskId
                            },
                            data: {
                                geo_object_id: ref.id
                            }
                        }).then(()=>{
                            toast.add({severity: 'success', summary: 'Success', detail: 'Polygon linked to task'})
                            emit('create-done', ref)
                        }).catch(err=>{
                            toast.add({severity: 'error', summary: 'Error', detail: 'Could not link polygon to task: ' + err})
                        })
                    } else {
                        emit('create-done', ref)
                    }
                }" show-cancel-button @cancel="emit('cancel')"
                :watch-initial-values="['config']" :check-function="checkFunction" @change="newData => {
                    label = newData.name
                }">

                    <IftaLabel>
                        <SelectApiColor field-name="color" @change="newColor => config.color = newColor" :initial-color="config.color"></SelectApiColor>
                        <label for="color">Color</label>
                    </IftaLabel>

                </ApiForm>
            </template>

            <slot></slot>

        </Padding>
    </div>

</template>

<style scoped lang="scss">
#form {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
}


.edit_close {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    cursor: pointer;
}

</style>
