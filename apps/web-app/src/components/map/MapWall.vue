<script setup lang="ts">
import { getCurrentInstance, onBeforeUnmount, onMounted, watch } from 'vue';
import { Cartesian2, Cartesian3, Cartographic, CheckerboardMaterialProperty, Color, GridMaterialProperty, sampleTerrainMostDetailed, Viewer } from 'cesium';
import { length, lineString } from '@turf/turf';


const props = defineProps<{
    viewer: Viewer
    points: [number, number, number, number][],//lng, lat, fromElevation, toElevation
    heightIsRelative?: boolean // relative to ground
    color: Color
}>()

const myId = '' + getCurrentInstance()?.uid

watch(()=>props.points, update, {deep: true})
watch(()=>props.color, update, {deep: true})
watch(()=>props.heightIsRelative, update)

onMounted(update)
onBeforeUnmount(()=>{
    removeWall()
})

async function update(){

    await addWall()
}

async function addWall(){

    let positions: Cartesian3[] = []
    let minimumHeights: number[] = []

    if(props.heightIsRelative){
        const terrainHeights = await sampleTerrainMostDetailed(props.viewer.terrainProvider, props.points.map(p => Cartographic.fromDegrees(p[0], p[1])))

        for(let pi = 0; pi < props.points.length; pi++){
            const point = props.points[pi]
            let terrainHeight = terrainHeights[pi].height
            positions.push(Cartesian3.fromDegrees(point[0], point[1], terrainHeight + point[3]))
            minimumHeights.push(terrainHeight + point[2])
        }
    } else {
        for(const point of props.points){
            positions.push(Cartesian3.fromDegrees(point[0], point[1], point[3]))
            minimumHeights.push(point[2])
        }
    }

    let wallLength = length(lineString(positions.map(p => [p.x, p.y])), {units: 'meters'})

    let wall = props.viewer.entities.getById('map-wall-' + myId)

    if(wall){
        props.viewer.entities.remove(wall)//TODO dont remove entity, instead update it
    }

    wall = props.viewer.entities.add({
        id: 'map-wall-' + myId,
        wall: {
            positions: positions,
            minimumHeights,
            material: new CheckerboardMaterialProperty({
                evenColor: props.color.withAlpha(0.6),
                oddColor: props.color.withAlpha(0.4),
                repeat: new Cartesian2(wallLength/(1000 * 4000), 4)//TODO choose values depending on wall length and wall height
            })
        }
    })

}

function removeWall(){
    props.viewer.entities.removeById('map-wall-' + myId)
}

</script>

<template>

</template>
