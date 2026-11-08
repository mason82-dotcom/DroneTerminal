<script setup lang="ts">
import { ApiResponse_ConnectionGet } from 'openflighthub-api-client-sdk';
import { nextTick, ref, watch } from 'vue';
import HubWorkspaceMapConnection from './HubWorkspaceMapConnection.vue';
import { geoidIsLoaded } from '@/util/geoid';
import Checkbox from 'primevue/checkbox'
import { Button } from 'primevue';
import HubWorkspaceMapDroneMedia from './HubWorkspaceMapDroneMedia.vue';
import Map from '../map/Map.vue';
import HubWorkspaceGeoObjects from './geo_objects/HubWorkspaceGeoObjects.vue';
import Fullscreenable from '../functional/Fullscreenable.vue';
import MapCollisionObjects from '../info/collision-objects/MapCollisionObjects.vue';
import MapDrawMenu from '../map/MapDrawMenu.vue';

const props = defineProps<{
    connections: ApiResponse_ConnectionGet[]
    longitude: number
    latitude: number
    workspaceId: number
    forceTopDown?: boolean
}>()

const mapContainer = ref<HTMLElement>()

const sidebarIsOpen = ref(false)
const showMedia = ref(false)
const showCollisionObjects = ref(false)
const showDipul = ref(false)
const hideMissionGeoObjects = ref(false)

watch(()=> props.workspaceId, ()=>{
    console.log('workspaceId changed, forcing update of map')
    forceReRenderMap()
})

function forceReRenderMap(){
    const mapContainerValue = mapContainer.value
    mapContainer.value = undefined

    nextTick(()=>{
        mapContainer.value = mapContainerValue
    })
}

</script>

<template>

    <Fullscreenable flex="row">
        <div id="map-container" ref="mapContainer">
            <Map id="map" v-if="mapContainer" :map-container="mapContainer" :start-point="{longitude: props.longitude, latitude: props.latitude}" :start-height="10000" :start-camera-pitch="-90" :force-top-down="props.forceTopDown" :show-dipul="showDipul">

                <MapCollisionObjects v-if="showCollisionObjects"></MapCollisionObjects>

                <template v-if="geoidIsLoaded">
                    <HubWorkspaceMapConnection v-for="connection in props.connections" :key="connection.id" :connection="connection"></HubWorkspaceMapConnection><!-- TODO once we implemented making geoobject units from drone connections, we can delete this -->

                    <HubWorkspaceGeoObjects :workspace-id="props.workspaceId" :initial-longitude="props.longitude" :initial-latitude="props.latitude" :hide-mission-geo-objects="hideMissionGeoObjects"></HubWorkspaceGeoObjects>
                </template>

                <template v-if="showMedia">
                    <HubWorkspaceMapDroneMedia v-for="connection in props.connections" :key="connection.id" :connection="connection"></HubWorkspaceMapDroneMedia>
                </template>

                <MapDrawMenu :workspace-id="props.workspaceId"></MapDrawMenu>

            </Map>
        </div>

        <div id="sidebar">
            <Button @click="sidebarIsOpen = !sidebarIsOpen" id="sidebar-close">
                <template v-if="sidebarIsOpen">&gt;&gt;</template>
                <template v-else>&lt;&lt;</template>
            </Button>
            <div v-show="sidebarIsOpen" id="sidebar-inner">
                <label for="show-media">
                    <Checkbox v-model="showMedia" binary input-id="show-media"></Checkbox>
                    Show Media
                </label>
                <label for="show-collision-objects">
                    <Checkbox v-model="showCollisionObjects" binary input-id="show-collision-objects"></Checkbox>
                    Show Collision Objects
                </label>
                <label for="show-dipul-layer">
                    <Checkbox v-model="showDipul" binary input-id="show-dipul-layer"></Checkbox>
                    Show DIPUL Layer
                </label>
                <label for="hide-mission-geo-objects">
                    <Checkbox v-model="hideMissionGeoObjects" binary input-id="hide-mission-geo-objects"></Checkbox>
                    Hide Mission Geo Objects
                </label>
            </div>
        </div>
    </Fullscreenable>

</template>

<style scoped lang="scss">


#map-container {
    position: relative;
    flex-shrink: 1;
    flex-grow: 1;

    // #map {
    //     height: 100%;
    //     width: 100%;
    // }

}

#sidebar {
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    flex-grow: 0;
    background: var(--neutral-darker);

    #sidebar-close {
        height: 100%;
    }

    #sidebar-inner {
        display: flex;
        flex-direction: column;
        gap: 0.5em;

        padding: 0.5em;

        label {
            cursor: pointer;

            .p-checkbox {
                margin-right: 0.5em;
            }
        }

    }
}

</style>
