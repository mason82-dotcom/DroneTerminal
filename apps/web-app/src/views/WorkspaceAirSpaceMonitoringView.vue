<script setup lang="ts">
import api from '@/api';

import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import LoadApiArrayWithIdParamInUrl from '@/components/functional/LoadApiArrayWithIdParamInUrl.vue';
import { ref } from 'vue';
import Fullscreenable from '@/components/functional/Fullscreenable.vue';
import Map from '@/components/map/Map.vue';
import HubWorkspaceGeoObjects from '@/components/workspace/geo_objects/HubWorkspaceGeoObjects.vue';
import HubWorkspaceMapConnection from '@/components/workspace/HubWorkspaceMapConnection.vue';
import IconVue from '@/components/general/IconVue.vue';

const mapContainer = ref<HTMLElement>()

</script>

<template>

   <LoadApiWithIdParamInUrl :api-method="api.rest.workspace.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="workspace">
      <Padding>
         <h1>Workspace {{ workspace.data.name }}</h1>

         <LoadApiArrayWithIdParamInUrl :api-method="api.rest.workspace.connections.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="connections">

            <Fullscreenable flex="row">
               <div id="map-container" ref="mapContainer">
                  <Map id="map" v-if="mapContainer" :map-container="mapContainer" :start-point="{longitude: workspace.data.longitude, latitude: workspace.data.latitude}" :start-height="50000" :start-camera-pitch="-90" force-top-down>

                     <HubWorkspaceMapConnection v-for="connection in connections.data" :key="connection.id" :connection="connection"></HubWorkspaceMapConnection><!-- TODO once we implemented making geoobject units from drone connections, we can delete this -->

                     <HubWorkspaceGeoObjects :workspace-id="workspace.data.id" :initial-longitude="workspace.data.longitude" :initial-latitude="workspace.data.latitude" show-only-aircraft :traffic-options="{tcas: {bubbleRadius: 10000, warningTime: 1800, alertTime: 900}}"></HubWorkspaceGeoObjects>

                  </Map>
               </div>
            </Fullscreenable>


         </LoadApiArrayWithIdParamInUrl>

      </Padding>
   </LoadApiWithIdParamInUrl>

</template>

<style scoped lang="scss">
#map-container {
   width: 100%;
   height: 70vh;
}
</style>

