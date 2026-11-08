<script setup lang="ts">
import { provide, Ref } from 'vue';


const props = defineProps<{
    mapContainer: HTMLElement
}>()

provide('mapContainer', props.mapContainer)

</script>

<template>

    <slot></slot>

</template>

<style scoped lang="scss">



</style>
