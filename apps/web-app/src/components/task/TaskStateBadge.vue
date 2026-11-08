<script setup lang="ts">
import MappedBadge from '../display/MappedBadge.vue';
import { TASK_COLOR_MAP } from './states.js';
import TaskState from './TaskState.vue';


const props = defineProps<{
    state: number
}>()

</script>

<template>

    <MappedBadge :value="props.state" :color-map="TASK_COLOR_MAP">
        <TaskState :state="props.state"></TaskState>
    </MappedBadge>

</template>
