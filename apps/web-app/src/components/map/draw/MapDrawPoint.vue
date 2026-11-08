<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue';
import MapClickListener from '../MapClickListener.vue';
import { updateObject } from '@/util/vue';
import MapMarker from '../MapMarker.vue';
import ApiForm from '@/components/functional/form/ApiForm.vue';
import api from '@/api';
import { useToast, IftaLabel } from 'primevue';
import Padding from '@/components/layout/Padding.vue';
import SelectApiColor from '@/components/functional/form/SelectApiColor.vue';
import { ApiResponse_WorkspaceGeoObjectPatch, ApiResponse_WorkspaceGeoObjectsGet, ApiResponse_WorkspaceGeoObjectsPost } from 'openflighthub-api-client-sdk';
import IconVue from '@/components/general/IconVue.vue';
import { getColorForHex } from '@/util/cesium.js';

const props = defineProps<{
    workspaceId: number
    taskId?: number
    existingGeoObject?: ApiResponse_WorkspaceGeoObjectsGet[number]
}>()


onMounted(() => {

    if(props.existingGeoObject){
        if(props.existingGeoObject.type !== 0 || props.existingGeoObject.sub_type !== 0){
            throw new Error('Existing geo object must be of type marking and point')
        }

        updateObject(locationData, {
            longitude: props.existingGeoObject.config.point[0],
            latitude: props.existingGeoObject.config.point[1],
            height: props.existingGeoObject.config.point[2]
        })

        updateObject(config, toRaw(props.existingGeoObject.config))

        hasLocation.value = true
    }
})

const hasLocation = ref(false)
const locationData = reactive({
    longitude: 0,
    latitude: 0,
    height: 0
})

const emit = defineEmits<{
    'create-done': [value: ApiResponse_WorkspaceGeoObjectsPost]
    'edit-done': [value: ApiResponse_WorkspaceGeoObjectPatch]
    cancel: [value: void]
}>()

const toast = useToast()

const config = reactive({
    point: [locationData.longitude, locationData.latitude, locationData.height] as [number, number, number],
    color: api.CONSTANTS.GEO_OBJECT_COLORS.BLUE
})

const label = ref(props.existingGeoObject ? props.existingGeoObject.name : '')

</script>

<template>

    <MapClickListener @click="(loc)=>{
        hasLocation = true
        updateObject(locationData, loc)
        config.point[0] = loc.longitude
        config.point[1] = loc.latitude
        config.point[2] = loc.height
    }"></MapClickListener>

    <MapMarker v-if="hasLocation" :position="[locationData.longitude, locationData.latitude, locationData.height]" icon-url="/images/geo_objects/markings/0.png" :icon-width="24" :icon-height="24" :color="getColorForHex(config.color)" :label="label">
    </MapMarker>

    <div id="form">
        <Padding>
            <template v-if="props.existingGeoObject">
                <ApiForm :api-method="api.rest.workspace.geoObject.patch" type="edit" title="Edit Point" :params="{workspaceId: props.workspaceId, geoObjectId: props.existingGeoObject.id}" :fields="{
                    name: {type: 'text', required: true},
                    config: {type: 'raw', required: true}
                }" :editable-fields="['name']" :initial-values="{
                    name: props.existingGeoObject.name,
                    config
                }" @created="(ref) => {
                    emit('edit-done', ref)
                }" show-cancel-button @cancel="emit('cancel')"
                :watch-initial-values="['config']" @change="newData => {
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
                <ApiForm :api-method="api.rest.workspace.geoObjects.post" type="create" title="Create Point" :params="{workspaceId: props.workspaceId}" :fields="{
                    name: {type: 'text', required: true},
                    type:  {type: 'number', required: true},
                    sub_type:  {type: 'number', required: true},
                    uuid: {type: 'text', required: false},
                    config: {type: 'raw', required: true}
                }" :editable-fields="['name']" :initial-values="{
                    type: 0,
                    sub_type: 0,
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
                            toast.add({severity: 'success', summary: 'Success', detail: 'Point linked to task'})
                            emit('create-done', ref)
                        }).catch(err=>{
                            toast.add({severity: 'error', summary: 'Error', detail: 'Could not link point to task: ' + err})
                        })
                    } else {
                        emit('create-done', ref)
                    }
                }" show-cancel-button @cancel="emit('cancel')"
                :watch-initial-values="['config']" :check-function="()=>hasLocation === true ? true : 'Please select a location for the point by clicking on the map'" @change="newData => {
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
