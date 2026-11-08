<script setup lang="ts">
import { Cartesian3, PerspectiveFrustum, Viewer, Math as MathCesium } from 'cesium';
import { inject } from 'vue';
import MapCollisionObjects from '../info/collision-objects/MapCollisionObjects.vue';


const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

function setCameraPosition(config: {
    position: {
        longitude: number
        latitude: number
        height: number
    }
    cameraOrientation?: {
        heading: number
        pitch: number
        roll: number
    }
    fov?: number
    flyToDuration?: number
}){

    if(!viewer || !mapContainer){
        console.error('Viewer or mapContainer was not provided (must be used within <Map> component!)')
        return
    }

    if(typeof config.flyToDuration === 'number'){
        viewer.camera.flyTo({
            destination: Cartesian3.fromDegrees(config.position.longitude, config.position.latitude, config.position.height),
            orientation: config.cameraOrientation ? {
                heading: MathCesium.toRadians(config.cameraOrientation.heading),
                pitch: MathCesium.toRadians(config.cameraOrientation.pitch),
            } : undefined,
            duration: config.flyToDuration
        })
    } else {
        viewer.camera.setView({
            destination: Cartesian3.fromDegrees(config.position.longitude, config.position.latitude, config.position.height),
            orientation: config.cameraOrientation ? {
                heading: MathCesium.toRadians(config.cameraOrientation.heading),
                pitch: MathCesium.toRadians(config.cameraOrientation.pitch),
            } : undefined
        })
    }

    if(typeof config.fov === 'number'){
        viewer.camera.frustum = new PerspectiveFrustum({
            fov: MathCesium.toRadians(config.fov),
            aspectRatio: viewer.canvas.clientWidth / viewer.canvas.clientHeight
        })
    }
}

defineExpose({
    setCameraPosition
})

</script>

<template>

    <div>
        <slot v-bind="{setCameraPosition}"></slot>
        <MapCollisionObjects></MapCollisionObjects>
    </div>

</template>

<style scoped lang="scss">



</style>
