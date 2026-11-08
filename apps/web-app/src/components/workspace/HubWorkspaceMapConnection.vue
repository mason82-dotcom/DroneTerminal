<script setup lang="ts">
import { ApiResponse_ConnectionGet, ApiResponse_DroneLastPositionGet, ApiResponse_RemoteControllerLastPositionGet } from 'openflighthub-api-client-sdk';
import MapMarker from '../map/MapMarker.vue';
import { Color, Viewer } from 'cesium';
import { computed, inject, onMounted, reactive, watch } from 'vue';
import { updateObject } from '@/util/vue';
import api from '@/api';
import MapLine from '../map/MapLine.vue';
import HubWorkspaceMapDrone from './HubWorkspaceMapDrone.vue';
import { getColor } from '@/config/colors';

const props = defineProps<{
    connection: ApiResponse_ConnectionGet
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const lastDronePosition = reactive({} as ApiResponse_DroneLastPositionGet)

const isValidLastDronePosition = computed(()=>{
    return typeof lastDronePosition.height === 'number'
})

onMounted(setup)

watch(()=>{
    return props.connection
}, setup, {deep: true})

async function setup(){

    if(typeof props.connection.remote_controller_id === 'number'){
        api.live.subscribeToRemoteControllerPosition(props.connection.remote_controller_id, (evt, filter, data)=>{
            updateObject(lastRemoteControllerPosition, data)
        })

        updateObject(lastRemoteControllerPosition, await api.rest.remoteController.lastPosition.get({params: {
            remoteControllerId: props.connection.remote_controller_id
        }}))
    }
}

const lastRemoteControllerPosition = reactive({} as ApiResponse_RemoteControllerLastPositionGet)
const isValidLastRemoteControllerPosition = computed(()=>{
    return typeof lastRemoteControllerPosition.height === 'number'
})


</script>

<template>

    <HubWorkspaceMapDrone v-if="typeof props.connection.drone_id === 'number'" :drone-id="props.connection.drone_id" :map-container="mapContainer!" :viewer="viewer!" @drone-position="(pos)=>updateObject(lastDronePosition, pos)"></HubWorkspaceMapDrone>

    <MapMarker v-if="isValidLastRemoteControllerPosition" :map-container="mapContainer!" :position="[lastRemoteControllerPosition.longitude, lastRemoteControllerPosition.latitude]" :elevation="lastRemoteControllerPosition.height" :viewer="viewer!" :label="'RC #' + props.connection.remote_controller_id" icon-url="/images/remote_controller/icon.png" :icon-width="32" :icon-height="32" :color="getColor('accent')"></MapMarker>

    <MapLine v-if="isValidLastDronePosition && isValidLastRemoteControllerPosition" :map-container="mapContainer!" :from="{position: [lastDronePosition.longitude, lastDronePosition.latitude], elevation: lastDronePosition.height}" :to="{position: [lastRemoteControllerPosition.longitude, lastRemoteControllerPosition.latitude], elevation: lastRemoteControllerPosition.height}" :viewer="viewer!" :color="getColor('accent')"></MapLine>

</template>

<style scoped lang="scss">

</style>
