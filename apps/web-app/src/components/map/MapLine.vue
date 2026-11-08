<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian2, Cartesian3, Cartographic, Color, Entity, HeightReference, LabelStyle, PolylineDashMaterialProperty, VerticalOrigin, Viewer } from 'cesium';
import { getElevationAtPosition } from '@/util/terrain';
import { convertEllipsoidalHeightToOrthometricHeight } from '@/util/geoid';
import { midpoint } from '@turf/turf';


//TODO merge this into MapPolygon

//TODO if line elevation is below cesium terrain, clamp it to ground
const props = defineProps<{
    from: {
        position: [number, number],
        elevation?: number //if not present, marker will sit on the ground
    }
    to: {
        position: [number, number],
        elevation?: number //if not present, marker will sit on the ground
    },
    heightIsRelative?: boolean // relative to ground
    color: Color
    dashed?: boolean
    label?: string
    fontSize?: number
    lineWidth?: number
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')


const myId = '' + getCurrentInstance()?.uid

watch(()=>props.from, update, {deep: true})
watch(()=>props.to, update, {deep: true})
watch(()=>props.color, update, {deep: true})
watch(()=>props.label, update)//TODO only update label
watch(()=>props.fontSize, update)//TODO only update label

onMounted(update)
onBeforeUnmount(()=>{
    removeLine()
    removeLineLabel()
})


async function update(){
    await addLine()
}

function fromHeightIsNotZero(){
    return typeof props.from.elevation === 'number' && props.from.elevation > 0
}

function toHeightIsNotZero(){
    return typeof props.to.elevation === 'number' && props.to.elevation > 0
}

async function addLine(){

    const fromPos = fromHeightIsNotZero() ? Cartographic.fromDegrees(props.from.position[0], props.from.position[1], props.from.elevation) : await getElevationAtPosition(viewer!, props.from.position[0], props.from.position[1], 'MapLine.addLine')

    const toPos = toHeightIsNotZero() ? Cartographic.fromDegrees(props.to.position[0], props.to.position[1], props.to.elevation) : await getElevationAtPosition(viewer!, props.to.position[0], props.to.position[1], 'MapLine.addLine')

    if(props.heightIsRelative && typeof props.from.elevation === 'number'){
        fromPos.height = (await getElevationAtPosition(viewer!, props.from.position[0], props.from.position[1], 'MapLine.addLine')).height + props.from.elevation
    }

    if(props.heightIsRelative && typeof props.to.elevation === 'number'){
        toPos.height = (await getElevationAtPosition(viewer!, props.to.position[0], props.to.position[1], 'MapLine.addLine')).height + props.to.elevation
    }

    let line = viewer!.entities.getById('map-line-' + myId)

    if(line){
        viewer!.entities.remove(line)//TODO dont remove entity, instead update it
    }

    line = viewer!.entities.add({
        id: 'map-line-' + myId,

        polyline: {
            positions: [Cartographic.toCartesian(fromPos), Cartographic.toCartesian(toPos)],
            width: props.lineWidth ?? 3,
            material: props.dashed ? new PolylineDashMaterialProperty({
                color: props.color
            }) : props.color,
            clampToGround: !fromHeightIsNotZero() && !toHeightIsNotZero()
        }
    })


    let label = viewer!.entities.getById('map-line-label-' + myId)

    if(label){
        viewer!.entities.remove(label)//TODO dont remove entity, instead update it
    }

    label = viewer!.entities.add({
        id: 'map-line-label-' + myId,
        position: getCenterPosition(),
        label: {
            text: (props.label ? props.label + ' ' : ''),
            font: (typeof props.fontSize === 'number' ? props.fontSize : 14) + 'pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            heightReference: heightAtCenterIsNotZero() ? props.heightIsRelative ? HeightReference.RELATIVE_TO_TERRAIN : HeightReference.NONE : HeightReference.CLAMP_TO_TERRAIN,
            disableDepthTestDistance: heightAtCenterIsNotZero() ? 5000000 : Number.POSITIVE_INFINITY, // show always above terrain https://community.cesium.com/t/points-labels-stuck-under-terrain/11141
            verticalOrigin: VerticalOrigin.TOP
        }
    })
}

function heightAtCenterIsNotZero(){
    return fromHeightIsNotZero() || toHeightIsNotZero()
}

function heightAtCenter(){
    if(heightAtCenterIsNotZero()){
        return (props.from.elevation! + props.to.elevation!)/2
    } else {
        return 0
    }
}

function getCenterPosition(){
    const center = midpoint(props.from.position, props.to.position)
    const centerHeight = heightAtCenter()

    return Cartesian3.fromDegrees(center.geometry.coordinates[0], center.geometry.coordinates[1], centerHeight + 1)//+1 so its above line
}

function removeLine(){
    viewer!.entities.removeById('map-line-' + myId)
}

function removeLineLabel(){
    viewer!.entities.removeById('map-line-label-' + myId)
}

</script>

<template>

</template>
