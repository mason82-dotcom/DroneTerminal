<script setup lang="ts">
import { computed } from 'vue';
import { MISSION_STATES } from './states';


const props = defineProps<{
    state: number
}>()

const label = computed(()=>{
    return Object.entries(MISSION_STATES).find(([_, value]) => value === props.state)?.[0] ?? '?'
})

</script>

<template>

    {{ label }}

</template>
