<script setup lang="ts">
import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian3, Cartographic, Color, Entity, HeightReference, LabelStyle, Viewer } from 'cesium';
import { getElevationAtPosition } from '@/util/terrain';
import { ClickMyEntityHandle, setupClickMyEntity } from '@/util/cesium';
import { lineString, length, distance, midpoint, center } from '@turf/turf';


//TODO if line elevation is below cesium terrain, clamp it to ground
const props = defineProps<{
    points: [number, number, number?][],
    clampToGround?: boolean
    heightIsRelative?: boolean // relative to ground
    color: Color
    filled?: boolean
    outlineColor?: Color
    outlineWidth?: number,
    label?: string
}>()

const viewer = inject<Viewer>('cesiumViewer')
const mapContainer = inject<HTMLElement>('mapContainer')

const myId = '' + getCurrentInstance()?.uid

let polygonClickMyEntityHandle: ClickMyEntityHandle


const emit = defineEmits<{
    'click': []
}>()

watch(()=>props.points, update, {deep: true})
watch(()=>props.clampToGround, update, {deep: true})
watch(()=>props.heightIsRelative, update)
watch(()=>props.color, update, {deep: true})
watch(()=>props.filled, update, {deep: true})
watch(()=>props.outlineColor, update, {deep: true})
watch(()=>props.outlineWidth, update)
watch(()=>props.label, update)

onMounted(update)
onBeforeUnmount(()=>{
    removeAll()
})

async function update(){
    await addAll()
}

async function addAll(){


    const positions: Cartesian3[] = []
    for(const p of props.points){

        let cartographicPosition: Cartographic

        const lng = p[0]
        const lat = p[1]
        const elevation = p[2]

        if(props.clampToGround){
            cartographicPosition = Cartographic.fromDegrees(lng, lat)
        } else if(typeof elevation !== 'number' || elevation === 0){
            cartographicPosition = await getElevationAtPosition(viewer!, lng, lat, 'MapPolygon.addAll')
            cartographicPosition.height += 10//10 to always show above terrain
        } else {
            if(props.heightIsRelative === true){
                const terrainHeight = (await getElevationAtPosition(viewer!, lng, lat, 'MapPolygon.addAll')).height
                cartographicPosition = Cartographic.fromDegrees(lng, lat, terrainHeight + elevation)
            } else {
                cartographicPosition = Cartographic.fromDegrees(lng, lat, elevation)
            }
        }

        positions.push(Cartographic.toCartesian(cartographicPosition))
    }

    let polygon = viewer!.entities.getById('map-polygon-' + myId)

    if(polygon){
        viewer!.entities.remove(polygon)//TODO dont remove entity, instead update it
    }

    polygon = viewer!.entities.add({
        id: 'map-polygon-' + myId,
        polygon: {
            //@ts-ignore
            hierarchy: {
                positions
            },
            filled: true,
            material: props.color,
            outline: true,
            outlineColor: props.outlineColor || props.color,
            perPositionHeight: false, //props.clampToGround !== false
        }
    })

    //extra polyline because outlineWidth is bugged in cesium and will never be fixed

    positions.push(positions[0])// polyline needs the first point again

    let outline = viewer!.entities.getById('map-polygon-outline-' + myId)

    if(outline){
        viewer!.entities.remove(outline)//TODO dont remove entity, instead update it
    }

    outline = viewer!.entities.add({
        id: 'map-polygon-outline-' + myId,
        polyline: {
            positions,
            width: typeof props.outlineWidth === 'number' ? props.outlineWidth : 3,
            clampToGround: props.clampToGround,
            material: props.outlineColor || props.color
        }
    })



    const centerPosition = await getCenterPosition()

    let label = viewer!.entities.getById('map-polygon-label-' + myId)

    if(label){
        viewer!.entities.remove(label)//TODO dont remove entity, instead update it
    }

    label =  viewer!.entities.add({
        id: 'map-polygon-label-' + myId,
        position: Cartesian3.fromDegrees(centerPosition.longitude, centerPosition.latitude),
        label: {
            text: (props.label ? props.label + ' ' : ''),
            font: '14pt monospace',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            heightReference: HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, // show always above terrain https://community.cesium.com/t/points-labels-stuck-under-terrain/11141
        }
    })



    if(polygonClickMyEntityHandle){
        polygonClickMyEntityHandle.destroy()
    }

    polygonClickMyEntityHandle = setupClickMyEntity(mapContainer!, viewer!, polygon, ()=>{
        emit('click')
    })
}


async function getCenterPosition(){
    if(props.points.length === 0){
        return {longitude: 0, latitude: 0}
    }

    const line = lineString(props.points.map(p => [p[0], p[1]]))

    const centerPoint = center(line)
    return {longitude: centerPoint.geometry.coordinates[0], latitude: centerPoint.geometry.coordinates[1]}
}


function removeAll(){
    viewer!.entities.removeById('map-polygon-' + myId)
    viewer!.entities.removeById('map-polygon-outline-' + myId)
    viewer!.entities.removeById('map-polygon-label-' + myId)


    if(polygonClickMyEntityHandle){
        polygonClickMyEntityHandle.destroy()
    }
}

</script>

<template>

</template>
