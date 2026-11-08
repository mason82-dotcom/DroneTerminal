<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian3, Color, HeightReference, Viewer, Cartographic, LabelStyle, PolylineDashMaterialProperty } from 'cesium';
import * as turf from '@turf/turf'
import { getElevationAtPosition } from '@/util/terrain';
import { setupClickMyEntity, ClickMyEntityHandle } from '@/util/cesium';

//TODO if line elevation is below cesium terrain, clamp it to ground
const props = defineProps<{
    position: [number, number, number?]
    radius: number
    clampToGround?: boolean
    color: Color
    outlineColor?: Color
    filled?: boolean
    outlineWidth?: number
    label?: string
    outlineDashed?: boolean
}>()

const emit = defineEmits<{
    click: []
}>()

let circleClickMyEntityHandle: ClickMyEntityHandle

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const myId = '' + getCurrentInstance()?.uid

watch(()=>props.position, update, {deep: true})
watch(()=>props.radius, update, {deep: true})
watch(()=>props.clampToGround, update, {deep: true})
watch(()=>props.color, update, {deep: true})
watch(()=>props.outlineColor, update, {deep: true})
watch(()=>props.filled, update, {deep: true})
watch(()=>props.outlineWidth, update, {deep: true})
watch(()=>props.label, update, {deep: true})
watch(()=>props.outlineDashed, update, {deep: true})

onMounted(update)
onBeforeUnmount(()=>{
    removeCircle()
    removeOutline()
})

async function update(){
    await addCircle()
    await addOutline()
}

async function addCircle(){

    const height = props.clampToGround ? undefined : (typeof props.position[2] === 'number' ? props.position[2] : (await getElevationAtPosition(viewer!, props.position[0], props.position[1], 'MapCircle.addCircle')).height)

    let circle = viewer!.entities.getById('map-circle-' + myId)

    if(circle){
        viewer!.entities.remove(circle)//TODO dont remove entity, instead update it
    }



    circle = viewer!.entities.add({
        id: 'map-circle-' + myId,

        position: Cartesian3.fromDegrees(props.position[0], props.position[1], height),

        label: typeof props.label === 'string' ? {
            text: props.label,
            font: '14pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            heightReference: props.clampToGround ? HeightReference.CLAMP_TO_TERRAIN: heightIsNotZero() ? HeightReference.NONE : HeightReference.CLAMP_TO_TERRAIN,
            disableDepthTestDistance: typeof height === 'number' ? 5000000 : Number.POSITIVE_INFINITY, // show always above terrain https://community.cesium.com/t/points-labels-stuck-under-terrain/11141
        } : undefined,

        ellipse: {
            semiMinorAxis: props.radius,
            semiMajorAxis: props.radius,
            fill: props.filled,
            material: props.color,
            height,
            heightReference: props.clampToGround ? HeightReference.CLAMP_TO_GROUND : undefined
        }
    })

    if(circleClickMyEntityHandle){
        circleClickMyEntityHandle.destroy()
    }

    circleClickMyEntityHandle = setupClickMyEntity(mapContainer!, viewer!, circle, ()=>{
        emit('click')
    })
}

function heightIsNotZero(){
    return typeof props.position[2] === 'number' && props.position[2] > 0
}

async function addOutline(){

    //extra polyline because outlineWidth is bugged in cesium and will never be fixed

    const turfCircle = turf.circle([props.position[0], props.position[1]], props.radius, {units: 'meters'})

    const circleHeight = props.clampToGround ? 0 : ( typeof props.position[2] === 'number' ? props.position[2] : (await getElevationAtPosition(viewer!, props.position[0], props.position[1], 'MapCircle.addOutline')).height )

    const positions = turfCircle.geometry.coordinates[0].map(c => {
        const cartographicPosition = Cartographic.fromDegrees(c[0], c[1], circleHeight)
        return Cartographic.toCartesian(cartographicPosition)
    })

    let outline = viewer!.entities.getById('map-circle_outline-' + myId)

    if(outline){
        viewer!.entities.remove(outline)//TODO dont remove entity, instead update it
    }

    outline = viewer!.entities.add({
        id: 'map-circle_outline-' + myId,
        polyline: {
            positions,
            width: typeof props.outlineWidth === 'number' ? props.outlineWidth : 3,
            clampToGround: props.clampToGround,
            material: props.outlineDashed ? new PolylineDashMaterialProperty({
                color: props.outlineColor || props.color,
                dashLength: 32
            }) : (props.outlineColor || props.color),
        }
    })
}

function removeCircle(){
    viewer!.entities.removeById('map-circle-' + myId)

    if(circleClickMyEntityHandle){
        circleClickMyEntityHandle.destroy()
    }
}

function removeOutline(){
    viewer!.entities.removeById('map-circle_outline-' + myId)
}


</script>

<template>

</template>
