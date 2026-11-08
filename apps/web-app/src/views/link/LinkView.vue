<script setup lang="ts">

import { useRouter } from 'vue-router';
import { computed } from 'vue';
import LinkableDeviceInfo from '@/components/link/LinkableDeviceInfo.vue';

const router = useRouter()

const isMainView = computed(()=>{
   return router.currentRoute.value.name === 'link'
})

</script>

<template>

   <div v-if="isMainView">

      <h1>Connect Link</h1>

      <LinkableDeviceInfo :inline="true"></LinkableDeviceInfo>

   </div>
   <RouterView v-else>

   </RouterView>

</template>

<style scoped lang="scss">

</style>

