<script setup lang="ts">
import MappedBadge from '../display/MappedBadge.vue';
import MissionState from './MissionState.vue';
import { MISSION_COLOR_MAP } from './states.js';


const props = defineProps<{
    state: number
}>()




</script>

<template>

    <MappedBadge :value="props.state" :color-map="MISSION_COLOR_MAP">
        <MissionState :state="props.state"></MissionState>
    </MappedBadge>

</template>
