<script setup lang="ts">
import { ApiResponse_DroneMediaGet } from 'openflighthub-api-client-sdk';
import MapMarker from '../map/MapMarker.vue';
import { Viewer } from 'cesium';
import { compile, computed, inject, onMounted, ref, watch } from 'vue';
import api from '@/api';

const props = defineProps<{
    media: ApiResponse_DroneMediaGet[0]
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')


onMounted(setup)

watch(()=>{
    return props.media
}, setup, {deep: true})

const parsedData = ref<{
    position: {
        longitude: number
        latitude: number
    },
    altitude: number
    camera_heading: number
}>(null)

async function setup(){

    if(typeof props.media.meta !== 'string'){
        return
    }

    try {
        const parsed = JSON.parse(props.media.meta)


        //TODO this should not be done in the frontend
        if(typeof parsed.metadata?.shoot_position?.lat === 'number' && typeof parsed.metadata?.shoot_position?.lng === 'number' && typeof parsed.metadata?.absolute_altitude === 'number' && typeof parsed.metadata?.gimbal_yaw_degree === 'number'){

            parsedData.value = {
                position: {
                    longitude: parsed.metadata.shoot_position.lng,
                    latitude: parsed.metadata.shoot_position.lat
                },
                altitude: parsed.metadata.absolute_altitude,
                camera_heading: parsed.metadata.gimbal_yaw_degree
            }
        }
    } catch (err){
        console.log('no valid position information in drone media', err)
    }

}

const validData = computed(()=>{
    return parsedData.value && !(parsedData.value.position.latitude === 0 && parsedData.value.position.longitude === 0)
})

</script>

<template>

<!-- make sure that elevation is at least at ground level -->
    <MapMarker v-if="validData" :position="[parsedData.position.longitude, parsedData.position.latitude]" :elevation="parsedData.altitude" :icon-url="api.getFileThumbnailUrl(props.media.file_id)" :icon-width="32" :icon-height="32" :bearing="parsedData.camera_heading"></MapMarker>

</template>

<style scoped lang="scss">

#info {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    min-width: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background: var(--neutral-darkest);

    #close {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0.5em;
        background: var(--neutral-dark);
        cursor: pointer;
        transform: all 0.2s ease;

        &:hover {
            background: var(--neutral-darker);
        }
    }

    #inner {
        padding: 1em;
    }
}

</style>
