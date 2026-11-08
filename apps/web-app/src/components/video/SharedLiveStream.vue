<script setup lang="ts">
import LiveVideo from './LiveVideo.vue';
import Fullscreenable from '../functional/Fullscreenable.vue';

const props = defineProps<{
    connectionId: number
    sharedKey: string
}>()

</script>

<template>


    <Fullscreenable>

        <LiveVideo class="live_video" :ws-url="'wss://stream.openflighthub.org:3334/ofh/' + props.connectionId + '?auth=' + props.sharedKey" :hide-controls="true"></LiveVideo>

    </Fullscreenable>

</template>

<style scoped lang="scss">

</style>
