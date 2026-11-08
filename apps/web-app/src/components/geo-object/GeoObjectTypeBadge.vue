<script setup lang="ts">
import MappedBadge from '../display/MappedBadge.vue';
import GeoObjectSubType from './GeoObjectSubType.vue';

const props = defineProps<{
    type: number
    subType: number
}>()

const COLOR_MAP = [{
    value: 0, color: '#bcbcbc'
}, {
    value: 1, color: '#a00'
}, {
    value: 2, color: '#6fa8dc'
}]

</script>

<template>

    <MappedBadge :value="props.type" :color-map="COLOR_MAP">
        <GeoObjectSubType :type="props.type" :sub-type="props.subType"></GeoObjectSubType>
    </MappedBadge>

</template>
