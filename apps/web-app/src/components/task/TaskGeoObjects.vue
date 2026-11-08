<script setup lang="ts">
import api from '@/api'
import {onMounted, onUnmounted, reactive} from 'vue'
import { ApiResponse_TaskGet, ApiResponse_WorkspaceGeoObjectsGet } from 'openflighthub-api-client-sdk';
import { updateArray, updateObject } from '@/util/vue';
import GeoObject from '../geo-object/GeoObject.vue';

const props = defineProps<{
    task: ApiResponse_TaskGet
    workspaceId: number
}>()

const geoObjects = reactive<ApiResponse_WorkspaceGeoObjectsGet>([])

onMounted(setup)

async function setup(){

    const workspace = await api.rest.workspace.get({params: {workspaceId: props.workspaceId}})

    updateArray(geoObjects, props.task.geo_objects)

    api.live.subscribeToGeoObjects(props.workspaceId, (event, filter, data)=>{

        const existingElementIndex = geoObjects.findIndex(me => me.uuid === data.uuid)
        const existingElement = geoObjects[existingElementIndex]

        if (data.event_type === 'update' && existingElement){
            updateObject(existingElement, data.data!)
        }

    })
}

function destroy(){
    //TODO unsubscribe
}

onUnmounted(destroy)

</script>

<template>

    <GeoObject v-for="geoObject of geoObjects" :key="geoObject.id" :geo-object="geoObject"></GeoObject>

</template>

<style scoped lang="scss">

</style>
