<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian3, Cartographic, Color, HeightReference, LabelStyle, Viewer } from 'cesium';
import { getElevationAtPosition } from '@/util/terrain';
import { distance, length, lineString, midpoint } from '@turf/turf';
import { setupClickMyEntity, ClickMyEntityHandle } from '@/util/cesium';


//TODO if line elevation is below cesium terrain, clamp it to ground
const props = defineProps<{
    points: [number, number, number][],//lng, lat, elevation
    clampToGround?: boolean,
    heightIsRelative?: boolean // relative to ground
    color: Color
    label?: string
    fontSize?: number
    lineWidth?: number
}>()

const emit = defineEmits<{
    click: []
}>()

let polylineClickMyEntityHandle: ClickMyEntityHandle


const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const myId = '' + getCurrentInstance()?.uid

watch(()=>props.points, update, {deep: true})
watch(()=>props.clampToGround, update, {deep: true})
watch(()=>props.heightIsRelative, update)
watch(()=>props.color, update, {deep: true})
watch(()=>props.label, update)//TODO only update label
watch(()=>props.fontSize, update)//TODO only update label

onMounted(update)
onBeforeUnmount(()=>{
    removePolyline()
    removePolylineLabel()
})

async function update(){

    await addPolyline()
}

async function getCenterPosition(){
    if(props.points.length === 0){
        return {longitude: 0, latitude: 0, height: 0}
    }

    const line = lineString(props.points.map(p => [p[0], p[1]]))

    const lineLength = length(line, {units: 'meters'})
    let centerLongitude: number | undefined = undefined
    let centerLatitude: number | undefined = undefined

    let centerHeight = 0
    let walkedDistance = 0
    for(let i = 0; i < props.points.length - 1; i++){
        const currentPoint = props.points[i]
        const nextPoint = props.points[i + 1]

        const segmentLength = distance([currentPoint[0], currentPoint[1]], [nextPoint[0], nextPoint[1]], {units: 'meters'})
        if(walkedDistance + segmentLength > (lineLength / 2)){
            let currentHeight = currentPoint[2]
            if(currentHeight === 0){
                currentHeight = (await getElevationAtPosition(viewer!, currentPoint[0], currentPoint[1], 'MapPolyline.getCenterPosition')).height
            }
            let nextHeight = nextPoint[2]
            if(nextHeight === 0){
                nextHeight = (await getElevationAtPosition(viewer!, nextPoint[0], nextPoint[1], 'MapPolyline.getCenterPosition')).height
            }

            centerHeight = (currentHeight + nextHeight) / 2
            const centerPoint = midpoint([currentPoint[0], currentPoint[1]], [nextPoint[0], nextPoint[1]])
            centerLongitude = centerPoint.geometry.coordinates[0]
            centerLatitude = centerPoint.geometry.coordinates[1]
            break
        }

        walkedDistance += segmentLength
    }

    if(typeof centerLongitude !== 'number' || typeof centerLatitude !== 'number'){
        throw new Error('failed to calculate center height for polyline')
    }

    return {longitude: centerLongitude, latitude: centerLatitude, height: centerHeight + 1}//+1 so its above line
}

async function addPolyline(){


    const positions: Cartesian3[] = []
    for(const p of props.points){

        let cartographicPosition: Cartographic

        const lng = p[0]
        const lat = p[1]
        const elevation = p[2]

        if(props.clampToGround){
            cartographicPosition = Cartographic.fromDegrees(lng, lat)
        } else if(typeof elevation !== 'number' || elevation === 0){
            cartographicPosition = await getElevationAtPosition(viewer!, lng, lat, 'MapPolyline.addPolyline')
            cartographicPosition.height += 10//10 to always show above terrain
        } else {
            if(props.heightIsRelative === true){
                const terrainHeight = (await getElevationAtPosition(viewer!, lng, lat, 'MapPolyline.addPolyline')).height
                cartographicPosition = Cartographic.fromDegrees(lng, lat, terrainHeight + elevation)
            } else {
                cartographicPosition = Cartographic.fromDegrees(lng, lat, elevation)
            }
        }

        positions.push(Cartographic.toCartesian(cartographicPosition))
    }

    let polyline = viewer!.entities.getById('map-polyline-' + myId)

    if(polyline){
        viewer!.entities.remove(polyline)//TODO dont remove entity, instead update it
    }

    polyline = viewer!.entities.add({
        id: 'map-polyline-' + myId,
        polyline: {
            positions,
            width: props.lineWidth ?? 4,
            clampToGround: props.clampToGround === true,
            material: props.color
        }
    })

    const centerPosition = await getCenterPosition()

    let label = viewer!.entities.getById('map-polyline-label-' + myId)

    if(label){
        viewer!.entities.remove(label)//TODO dont remove entity, instead update it
    }

    label =  viewer!.entities.add({
        id: 'map-polyline-label-' + myId,
        position: Cartesian3.fromDegrees(centerPosition.longitude, centerPosition.latitude, centerPosition.height),
        label: {
            text: (props.label ? props.label + ' ' : ''),
            font: (typeof props.fontSize === 'number' ? props.fontSize : 14) + 'pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            heightReference: HeightReference.NONE,
            disableDepthTestDistance: centerPosition.height !== 0 ? 5000000 : Number.POSITIVE_INFINITY, // show always above terrain https://community.cesium.com/t/points-labels-stuck-under-terrain/11141
        }
    })

    if(polylineClickMyEntityHandle){
        polylineClickMyEntityHandle.destroy()
    }

    polylineClickMyEntityHandle = setupClickMyEntity(mapContainer!, viewer!, polyline, ()=>{
        emit('click')
    })
}

function removePolyline(){
    viewer!.entities.removeById('map-polyline-' + myId)

    if(polylineClickMyEntityHandle){
        polylineClickMyEntityHandle.destroy()
    }
}

function removePolylineLabel(){
    viewer!.entities.removeById('map-polyline-label-' + myId)
}


</script>

<template>

</template>
