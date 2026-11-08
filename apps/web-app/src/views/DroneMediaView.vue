<script setup lang="ts">
import api from '@/api';

import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import DroneMedia from '@/components/drone/DroneMedia.vue';

</script>

<template>

   <LoadApiWithIdParamInUrl :api-method="api.rest.media.get" :config="{params: {}}" :id-params="['mediaId']" v-slot="media">
      <Padding id="outer">
         <h1>Drone media {{ media.data.file_name }}</h1>

         <DroneMedia :media="media.data" class="drone_media"></DroneMedia>

      </Padding>
   </LoadApiWithIdParamInUrl>

</template>

<style scoped lang="scss">
#outer {
   display: flex;
   flex-direction: column;
   height: calc(100vh - 4em); // 4em for heading
   width: calc(100vw - var(--sidebar-min-size));

   .drone_media {
      flex-grow: 1;
   }
}

</style>

