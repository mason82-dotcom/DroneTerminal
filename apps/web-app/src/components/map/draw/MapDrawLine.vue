<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRaw } from 'vue';
import MapClickListener from '../MapClickListener.vue';
import { cloneObject, updateArray, updateObject } from '@/util/vue';
import ApiForm from '@/components/functional/form/ApiForm.vue';
import api from '@/api';
import { useToast, IftaLabel } from 'primevue';
import Padding from '@/components/layout/Padding.vue';
import SelectApiColor from '@/components/functional/form/SelectApiColor.vue';
import { ApiResponse_WorkspaceGeoObjectPatch, ApiResponse_WorkspaceGeoObjectsGet, ApiResponse_WorkspaceGeoObjectsPost } from 'openflighthub-api-client-sdk';
import IconVue from '@/components/general/IconVue.vue';
import { getColorForHex } from '@/util/cesium.js';
import MapMouseMoveListener from '../MapMouseMoveListener.vue';
import MapLine from '../MapLine.vue';

const props = defineProps<{
    workspaceId: number
    taskId?: number
    existingGeoObject?: ApiResponse_WorkspaceGeoObjectsGet[number]
}>()


onMounted(() => {

    if(props.existingGeoObject){
        if(props.existingGeoObject.type !== 0 || props.existingGeoObject.sub_type !== 1){
            throw new Error('Existing geo object must be of type marking and line')
        }

        updateObject(locationData, props.existingGeoObject.config.line)
        editMode.value = 'both-set'

        updateObject(config, toRaw(props.existingGeoObject.config))
    }
})

const hasLocation = computed(()=>{
    return locationData.length === 2 && locationData[0] instanceof Array && locationData[1] instanceof Array
})

const locationData = reactive([] as [number, number, number][])

let editMode = ref<'empty' | 'first-set' | 'both-set'>('empty')

const emit = defineEmits<{
    'create-done': [value: ApiResponse_WorkspaceGeoObjectsPost]
    'edit-done': [value: ApiResponse_WorkspaceGeoObjectPatch]
    cancel: [value: void]
}>()

const toast = useToast()

const config = reactive({
    line: locationData,
    color: api.CONSTANTS.GEO_OBJECT_COLORS.BLUE
})

const label = ref(props.existingGeoObject ? props.existingGeoObject.name : '')

</script>

<template>

    <MapClickListener @click="(loc)=>{

        const locAsNumberArray: [number, number, number] = [loc.longitude, loc.latitude, loc.height]

        switch(editMode){
            case 'empty':
                updateArray(locationData, [locAsNumberArray, locAsNumberArray])
                editMode = 'first-set'
                break
            case 'first-set':
                locationData[1] = locAsNumberArray
                editMode = 'both-set'
                break
            case 'both-set':
                //reset

                updateArray(locationData, [locAsNumberArray, locAsNumberArray])
                editMode = 'first-set'
                break
        }

        config.line = cloneObject(locationData)

    }"></MapClickListener>

    <MapMouseMoveListener @mouse-move-end="loc => {
        if(editMode === 'first-set'){
            locationData[1] = [loc.longitude, loc.latitude, loc.height]
        }
    }"></MapMouseMoveListener>

    <MapLine v-if="editMode !== 'empty'" :from="{position: [locationData[0][0], locationData[0][1]], elevation: locationData[0][2]}" :to="{position: [locationData[1][0], locationData[1][1]], elevation: locationData[1][2]}" :color="getColorForHex(config.color)" :label="label" :line-width="8"></MapLine>

    <div id="form">
        <Padding>
            <template v-if="props.existingGeoObject">
                <ApiForm :api-method="api.rest.workspace.geoObject.patch" type="edit" title="Edit Line" :params="{workspaceId: props.workspaceId, geoObjectId: props.existingGeoObject.id}" :fields="{
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
                <ApiForm :api-method="api.rest.workspace.geoObjects.post" type="create" title="Create Line" :params="{workspaceId: props.workspaceId}" :fields="{
                    name: {type: 'text', required: true},
                    type:  {type: 'number', required: true},
                    sub_type:  {type: 'number', required: true},
                    uuid: {type: 'text', required: false},
                    config: {type: 'raw', required: true}
                }" :editable-fields="['name']" :initial-values="{
                    type: 0,
                    sub_type: 1,
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
                            toast.add({severity: 'success', summary: 'Success', detail: 'Line linked to task'})
                            emit('create-done', ref)
                        }).catch(err=>{
                            toast.add({severity: 'error', summary: 'Error', detail: 'Could not link line to task: ' + err})
                        })
                    } else {
                        emit('create-done', ref)
                    }
                }" show-cancel-button @cancel="emit('cancel')"
                :watch-initial-values="['config']" :check-function="()=>hasLocation === true ? true : 'Please select locations for the line by clicking on the map'" @change="newData => {
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
