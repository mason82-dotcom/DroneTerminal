<script setup lang="ts" generic="
    V extends any,
    M extends {value: V, color: string}[]
">
import { computed } from 'vue';
import CustomBadge from './CustomBadge.vue';
/**
 * @prop defaultColor: default: #222
 */
const props = defineProps<{
    value: V
    colorMap: M
    defaultColor?: string
}>()

const color = computed(() => {
    const mapping = props.colorMap.find(m => m.value === props.value)
    return mapping ? mapping.color : props.defaultColor ?? '#222'
})

</script>

<template>

    <CustomBadge :color="color">
        <slot></slot>
    </CustomBadge>

</template>

<style scoped lang="scss">

</style>
