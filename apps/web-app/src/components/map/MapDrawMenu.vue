<script setup lang="ts">
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { Button } from 'primevue';
import MapDrawPoint from '../map/draw/MapDrawPoint.vue';
import ImageVue from '../general/ImageVue.vue';
import { GeoObjectEditEvent } from '@/components/geo-object/GeoObjectEvents';
import MapDrawCircle from './draw/MapDrawCircle.vue';
import MapDrawLine from './draw/MapDrawLine.vue';
import MapDrawPolygon from './draw/MapDrawPolygon.vue';

const props = defineProps<{
    workspaceId: number
    taskId?: number
}>()

const mapContainer = inject<HTMLElement>('mapContainer')

type ShowingType = 'none' | 'draw-point' | 'draw-line' | 'draw-circle' | 'draw-polygon'
const showing = ref<ShowingType>('none')

let editEventId = -1

function select(showingType: ShowingType){
    if(showing.value === showingType){
        showing.value = 'none'
    } else {
        showing.value = showingType
        mapContainer!.dispatchEvent(new GeoObjectEditEvent(--editEventId))
    }
}


onMounted(() => {
    mapContainer!.addEventListener(GeoObjectEditEvent.EVENT_NAME, onEditEvent)
})

onBeforeUnmount(() => {
    mapContainer!.removeEventListener(GeoObjectEditEvent.EVENT_NAME, onEditEvent)
})

function onEditEvent(evt: Event){
    if(evt instanceof GeoObjectEditEvent && evt.geoObjectId !== editEventId){
        showing.value = 'none'
    }
}

</script>

<template>

    <div id="draw-menu">
        <Button @click="select('draw-point')" :severity="showing === 'draw-point' ? 'secondary' : undefined"><ImageVue url="/images/geo_objects/markings/0.png" :size="{em: 0.8}"></ImageVue></Button>

        <Button @click="select('draw-line')" :severity="showing === 'draw-line' ? 'secondary' : undefined"><ImageVue url="/images/geo_objects/markings/1.png" :size="{em: 0.8}"></ImageVue></Button>

        <Button @click="select('draw-circle')" :severity="showing === 'draw-circle' ? 'secondary' : undefined"><ImageVue url="/images/geo_objects/markings/3.png" :size="{em: 0.8}"></ImageVue></Button>

        <Button @click="select('draw-polygon')" :severity="showing === 'draw-polygon' ? 'secondary' : undefined"><ImageVue url="/images/geo_objects/markings/2.png" :size="{em: 0.8}"></ImageVue></Button>
    </div>

    <template v-if="showing === 'draw-point'">
        <MapDrawPoint :workspace-id="props.workspaceId" :task-id="props.taskId" @create-done="select('none')" @cancel="select('none')"></MapDrawPoint>
    </template>

    <template v-if="showing === 'draw-line'">
        <MapDrawLine :workspace-id="props.workspaceId" :task-id="props.taskId" @create-done="select('none')" @cancel="select('none')"></MapDrawLine>
    </template>

    <template v-if="showing === 'draw-circle'">
        <MapDrawCircle :workspace-id="props.workspaceId" :task-id="props.taskId" @create-done="select('none')" @cancel="select('none')"></MapDrawCircle>
    </template>

    <template v-if="showing === 'draw-polygon'">
        <MapDrawPolygon :workspace-id="props.workspaceId" :task-id="props.taskId" @create-done="select('none')" @cancel="select('none')"></MapDrawPolygon>
    </template>

</template>

<style scoped lang="scss">

#draw-menu {
    position: absolute;
    top: 50%;
    left: 5px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    gap: 0.5em;
}

</style>
