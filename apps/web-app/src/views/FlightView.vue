<script setup lang="ts">
import api from '@/api';

import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import List from '@/components/layout/List.vue';
import HubWorkspaceFilePreview from '@/components/workspace/HubWorkspaceFilePreview.vue';
import Map from '@/components/map/Map.vue';
import { ref } from 'vue';
import { Color, Viewer } from 'cesium';
import { ApiResponse_DroneCurrentFlightGet } from 'openflighthub-api-client-sdk';
import * as turf from '@turf/turf'
import MapPolyline from '@/components/map/MapPolyline.vue';
import TimestampDisplay from '@/components/display/TimestampDisplay.vue';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';
import FlightPlayback from '@/components/flight/FlightPlayback.vue';


function getCenterPointForFlight(flight: ApiResponse_DroneCurrentFlightGet){

   const points = flight.track.map(t => turf.point([t.longitude, t.latitude]))

   const center = turf.center(turf.featureCollection(points))

   return {
      longitude: center.geometry.coordinates[0],
      latitude: center.geometry.coordinates[1]
   }
}

function getMaxHeightForFlight(flight: ApiResponse_DroneCurrentFlightGet){
   let maxHeight = -1

   for(const t of flight.track){
      if(t.height > maxHeight){
         maxHeight = t.height
      }
   }

   if(flight.track.length === 0){
      return 3000
   }

   return maxHeight
}

const mapContainer = ref<HTMLElement>()

</script>

<template>

   <LoadApiWithIdParamInUrl :api-method="api.rest.flight.get" :config="{params: {}}" :id-params="['flightId']" v-slot="flight">
      <Padding>
         <div id="outer">

            <h1>Flight {{ flight.data.id }}</h1>

            <div id="top">

               <div id="info">
                  <h3>Started at <TimestampDisplay :timestamp="flight.data.started_at"></TimestampDisplay></h3>
                  <h3>Landed at <TimestampDisplay v-if="flight.data.landed_at" :timestamp="flight.data.landed_at"></TimestampDisplay><span v-else>-</span></h3>
                  <h3>Ended at <TimestampDisplay v-if="flight.data.ended_at" :timestamp="flight.data.ended_at"></TimestampDisplay><span v-else>-</span></h3>
               </div>

               <div id="map-container" ref="mapContainer">
                  <template v-if="flight.data.track.length === 0">
                     Invalid Location
                  </template>

                  <Map v-else-if="mapContainer" id="map" :map-container="mapContainer" :start-point="getCenterPointForFlight(flight.data)" :start-height="getMaxHeightForFlight(flight.data) + 200" :start-camera-pitch="-90">

                     <FlightPlayback :flight="flight.data"></FlightPlayback>

                     <MapPolyline :points="flight.data.track.map(t => {
                           return [t.longitude, t.latitude, t.height]
                     })" :color="Color.BLUE"></MapPolyline>

                  </Map>

               </div>

            </div>

            <h1>Flight Media</h1>
            <LoadApiArray :api-method="api.rest.flight.media.get" :config="{params: {flightId: flight.data.id}}" v-slot="flightMedia">
               <List :horizontal="true">
                  <template v-for="media in flightMedia.data">
                     <RouterLink :to="'/drone-media/' + media.id">
                        <HubWorkspaceFilePreview  class="media_file_preview" :id="media.file_id"></HubWorkspaceFilePreview>
                     </RouterLink>
                  </template>
               </List>
            </LoadApiArray>
         </div>
      </Padding>
   </LoadApiWithIdParamInUrl>

</template>

<style scoped lang="scss">
#outer {
   display: flex;
   flex-direction: column;
   width: 100%;

   #top {
      display: flex;
      flex-direction: row;
      width: 100%;

      #info {
         width: 50%;
      }

      #map-container {
         height: 50vh;
         width: 50%;
      }
   }
}

.media_file_preview {
   width: 300px;
   height: 300px;
}

</style>

