<script setup lang="ts">
/**
 *
 * Usage:
 *
 *
    const mapContainer = ref<HTMLDivElement>()

    <div ref="mapContainer" style="height: 80vh; position: relative;">
        <Map v-if="mapContainer">

        ...

        </Map>

    </div>

    <ProvideMapContainerOutside v-if="mapContainer" :map-container="mapContainer">

        Stuff that uses inject('mapContainer')

    </ProvideMapContainerOutside>
 *
 */


import ProvideMapContainerOutside_Helper from './ProvideMapContainerOutside_Helper.vue';


const props = defineProps<{
    mapContainer: HTMLElement
}>()

</script>

<template>

    <ProvideMapContainerOutside_Helper v-if="props.mapContainer" :map-container="props.mapContainer">
        <slot></slot>
    </ProvideMapContainerOutside_Helper>

</template>

<style scoped lang="scss">



</style>
