<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian3, Color, Entity, Viewer } from 'cesium';
import { lengthToDegrees } from '@turf/turf';


const props = defineProps<{
    center: [number, number]
    rectSizeMeters: number
    color: Color
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

let polygon: Entity | undefined

const myId = '' + getCurrentInstance()?.uid

watch(()=>props.color, update, {deep: true})
watch(()=>props.center, update, {deep: true})

onMounted(update)
onBeforeUnmount(()=>{
    removeAll()
})

async function update(){

    if(polygon){
        removeAll()
    }

    await addAll()
}

function getChessRectPolygon(position: [number, number]){
    const horizontalBlock = getDegreeChessBlock(position[0])
    const verticalBlock = getDegreeChessBlock(position[1])
    return [[
        horizontalBlock.lower, verticalBlock.lower
    ], [
        horizontalBlock.upper, verticalBlock.lower
    ], [
        horizontalBlock.upper, verticalBlock.upper
    ], [
        horizontalBlock.lower, verticalBlock.upper
    ]]
}

function getDegreeChessBlock(deg: number){
    const blockSize = lengthToDegrees(props.rectSizeMeters, 'meters')
    const d = deg / blockSize
    const lower = Math.floor(d) * blockSize
    const upper = Math.ceil(d) * blockSize

    return {
        lower,
        upper
    }
}

async function addAll(){


    const positions: Cartesian3[] = getChessRectPolygon(props.center).map(p => Cartesian3.fromDegrees(p[0], p[1]))

    polygon = viewer!.entities.add({
        id: 'map-polygon-' + myId,
        polygon: {
            //@ts-ignore
            hierarchy: {
                positions
            },
            filled: true,
            material: props.color,
            perPositionHeight: false,
        }
    })
}



function removeAll(){
    if(polygon){
        viewer!.entities.remove(polygon)
        polygon = undefined
    }
}

onBeforeUnmount(removeAll)

</script>

<template>

</template>
