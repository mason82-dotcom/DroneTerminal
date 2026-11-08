<script setup lang="ts">
import api from '@/api';

import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import FlightSimulation from '@/components/flight/FlightSimulation.vue';
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { getIdParamFromRoute } from '@/util/url';
import { useRoute } from 'vue-router';
import { bearing } from '@turf/turf';
import ConnectionLiveStream from '@/components/video/ConnectionLiveStream.vue';
import Map from '@/components/map/Map.vue';
import LoadApi from '@/components/functional/LoadApi.vue';
import SmoothMovement, { Position } from '@/components/flight/SmoothMovement';
import TimeDisplay from '@/components/display/TimeDisplay.vue';

const flightSimulation = ref<InstanceType<typeof FlightSimulation> | null>(null)

let lastPosition: Position | undefined = undefined
let lastHeading: number | undefined = undefined

const smoothMovement = new SmoothMovement(10)

smoothMovement.addListener('position-update', ({ position, time }) => {

   viewDelayMs.value = Date.now() - time

   flightSimulation.value?.setCameraPosition({
      position: {
         longitude: position.longitude,
         latitude: position.latitude,
         height: position.height
      },
      cameraOrientation: {
         heading: lastPosition ? calculateHeadingBetweenPoints(lastPosition, position) : 0,
         pitch: -10,
         roll: 0
      },
      flyToDuration: 0.1,
      fov: 100//TODO real drone fov of wide camera?
   })

   lastPosition = position
})

onMounted(()=>{
   api.live.subscribeToDronePosition(getIdParamFromRoute('droneId', useRoute()), (event, filter, data) => {
      smoothMovement.addPosition(data.position, new Date(data.position.reported_at).getTime())
   })
})

onBeforeUnmount(()=>{
   smoothMovement.destroy()
})

type Point = {
   height: number;
   longitude: number;
   latitude: number;
}

/**
 * @returns return deegrees, 0 = north, 90 = east
 */
function calculateHeadingBetweenPoints(pointA: Point, pointB: Point): number {
   const ret = bearing([pointA.longitude, pointA.latitude], [pointB.longitude, pointB.latitude])

   if(pointA.latitude === pointB.latitude && pointA.longitude === pointB.longitude){
      return lastHeading ?? 0
   } else {
      lastHeading = ret
      return ret
   }
}

const viewerIsLoaded = ref(false)

const viewDelayMs = ref(0)

const mapContainer = ref<HTMLElement>()
</script>

<template>

   <Padding>

      <LoadApiWithIdParamInUrl :api-method="api.rest.drone.get" :config="{params: {}}" :id-params="['droneId']" v-slot="drone">
         <Padding id="outer">
            <h1>Drone {{ drone.data.name }}</h1>

            <div id="live-content">
               <LoadApi v-if="typeof drone.data.last_connection_id === 'number'" :api-method="api.rest.connection.get" :config="{params: {connectionId: drone.data.last_connection_id}}" v-slot="connection">
                  <LoadApi :api-method="api.rest.workspace.get" :config="{params: {workspaceId: connection.data.workspace_id}}" v-slot="workspace">
                     <div ref="mapContainer">
                        <Map v-if="mapContainer" :map-container="mapContainer" :start-point="{longitude: workspace.data.longitude, latitude: workspace.data.latitude}" :start-height="0" @viewer-loaded="viewerIsLoaded = true">
                           <FlightSimulation v-if="viewerIsLoaded" ref="flightSimulation"></FlightSimulation>
                           <span>Delay: <TimeDisplay :time-in-ms="viewDelayMs"></TimeDisplay></span>
                        </Map>
                     </div>
                  </LoadApi>
               </LoadApi>
               <ConnectionLiveStream v-if="typeof drone.data.last_connection_id === 'number'" :connection-id="drone.data.last_connection_id"></ConnectionLiveStream>
               <div v-else id="no-connection">Drone has no active connection</div>
            </div>

         </Padding>
      </LoadApiWithIdParamInUrl>
   </Padding>

</template>

<style scoped lang="scss">

#live-content {
   display: flex;
   flex-direction: row;
   gap: 1em;

   & > * {
      width: 50%;
      height: 100%;
   }
}

#no-connection {
   display: flex;
   align-items: center;
   justify-content: center;
   height: 100%;
   width: 100%;
   color: #999;
   font-size: 1.2em;
}

</style>

