<script setup lang="ts">
import Fullscreenable from '@/components/functional/Fullscreenable.vue';
import SharedLiveStream from '@/components/video/SharedLiveStream.vue';
import { getIdParamFromRoute, getParamFromRoute } from '@/util/url';
import { useRoute } from 'vue-router';

const route = useRoute()
const connectionId = getIdParamFromRoute('connectionId', route)
const sharedKey = getParamFromRoute('sharedKey', route)

</script>

<template>

    <SharedLiveStream :connection-id="connectionId" :shared-key="sharedKey"></SharedLiveStream>

</template>
