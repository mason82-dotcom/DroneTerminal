<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted } from 'vue';
import { Viewer } from 'cesium';
import { getElevationAtPosition } from '@/util/terrain';
import { getMapTerrainLocationAt } from '@/util/cesium';

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const emit = defineEmits<{
    click: [{longitude: number, latitude: number, height: number}]
}>()

let isDragging = false

onMounted(()=>{
    mapContainer!.addEventListener('click', onClick)

    viewer!.camera.moveStart.addEventListener(startDragging)
    viewer!.camera.moveEnd.addEventListener(stopDragging)
})

onBeforeUnmount(()=>{
    mapContainer!.removeEventListener('click', onClick)

    viewer!.camera.moveStart.removeEventListener(startDragging)
    viewer!.camera.moveEnd.removeEventListener(stopDragging)
})

function startDragging(){
    isDragging = true
}

function stopDragging(){
    isDragging = false
}

async function onClick(evt: MouseEvent){
    if(isDragging){
        return
    }

    if(evt.target !== viewer!.canvas){
        return
    }

    const clickX = evt.pageX
    const clickY = evt.pageY
    const bounds = mapContainer!.getBoundingClientRect()

    const containerX = bounds.left + window.scrollX
    const containerY = bounds.top + window.scrollY

    const relativeX = (clickX - containerX) / bounds.width
    const relativeY = (clickY - containerY) / bounds.height

    const clickedLocation = getMapTerrainLocationAt(viewer!, relativeX, relativeY)

    const elevation = (await getElevationAtPosition(viewer!, clickedLocation.longitude, clickedLocation.latitude, 'MapClickListener.onClick')).height

    emit('click', {
        longitude: clickedLocation.longitude,
        latitude: clickedLocation.latitude,
        height: elevation
    })
}


onBeforeUnmount(()=>{
    mapContainer!.removeEventListener('click', onClick)
})

</script>

<template>

</template>
