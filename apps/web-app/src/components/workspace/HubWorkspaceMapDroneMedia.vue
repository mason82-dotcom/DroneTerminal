<script setup lang="ts">
import { ApiResponse_ConnectionGet, ApiResponse_DroneMediaGet } from 'openflighthub-api-client-sdk';
import { Viewer } from 'cesium';
import { inject, onMounted, reactive, watch } from 'vue';
import { updateArray } from '@/util/vue';
import api from '@/api';
import HubWorkspaceMapDroneMediaMarker from './HubWorkspaceMapDroneMediaMarker.vue';

const props = defineProps<{
    connection: ApiResponse_ConnectionGet
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')


const droneMedia = reactive([] as ApiResponse_DroneMediaGet)

onMounted(setup)

watch(()=>{
    return props.connection
}, setup, {deep: true})

async function setup(){

    if(typeof props.connection.drone_id === 'number'){

        updateArray(droneMedia, await api.rest.drone.media.get({params: {droneId: props.connection.drone_id}}))
    }
}

</script>

<template>

    <template v-for="media in droneMedia" :key="media.id">
        <HubWorkspaceMapDroneMediaMarker :media="media"></HubWorkspaceMapDroneMediaMarker>
    </template>

</template>

<style scoped lang="scss">


</style>
