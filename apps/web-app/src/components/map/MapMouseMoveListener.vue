<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted } from 'vue';
import { Viewer } from 'cesium';
import { getElevationAtPosition } from '@/util/terrain';
import { getMapTerrainLocationAt } from '@/util/cesium';

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const emit = defineEmits<{
    'mouse-move': [{longitude: number, latitude: number, height: number}]
    'mouse-move-end': [{longitude: number, latitude: number, height: number}]
}>()

onMounted(()=>{
    mapContainer!.addEventListener('mousemove', onMove)
})

let latestMouseMove = {
    relativeX: 0,
    relativeY: 0
}

async function onMove(evt: MouseEvent){
    if(evt.target !== viewer!.canvas){
        return
    }

    const x = evt.pageX
    const y = evt.pageY
    const bounds = mapContainer!.getBoundingClientRect()

    const containerX = bounds.left + window.scrollX
    const containerY = bounds.top + window.scrollY

    const relativeX = (x - containerX) / bounds.width
    const relativeY = (y - containerY) / bounds.height

    const mouseOverLocation = getMapTerrainLocationAt(viewer!, relativeX, relativeY)

    const elevation = (await getElevationAtPosition(viewer!, mouseOverLocation.longitude, mouseOverLocation.latitude, 'MapMouseMoveListener.onMove')).height

    latestMouseMove = {
        relativeX,
        relativeY
    }

    emit('mouse-move', {
        longitude: mouseOverLocation.longitude,
        latitude: mouseOverLocation.latitude,
        height: elevation
    })

    setTimeout(()=>{
        if(latestMouseMove.relativeX === relativeX && latestMouseMove.relativeY === relativeY){
            emit('mouse-move-end', {
                longitude: mouseOverLocation.longitude,
                latitude: mouseOverLocation.latitude,
                height: elevation
            })
        }
    }, 100)
}


onBeforeUnmount(()=>{
    mapContainer!.removeEventListener('mousemove', onMove)
})

</script>

<template>

</template>
