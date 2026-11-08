<script setup lang="ts">
import { computed, StyleValue } from 'vue';


const props = defineProps<{
    x: number
    y: number
    zIndex?: number
}>()

const style = computed(() => {

    const towardsTop = props.y > 0.5
    const towardsLeft = props.x > 0.5

    return {
        position: 'absolute',
        top: '' + (props.y * 100) + '%',
        left: '' + (props.x * 100) + '%',
        transform: (towardsLeft ? 'translateX(-100%)' : '') + (towardsTop ? 'translateY(-100%)' : ''),
        zIndex: props.zIndex
    } as StyleValue
})


const markerStyle = computed(() => {

    const towardsTop = props.y > 0.5
    const towardsLeft = props.x > 0.5

    return {
        position: 'absolute',
        top: towardsTop ? '100%' : 0,
        left: towardsLeft ? '100%' : 0,
        transform: 'translateX(-50%) translateY(-50%)'
    } as StyleValue
})

</script>

<template>

    <div :style="style">
        <slot/>

        <div :style="markerStyle">
            <slot name="marker"></slot>
        </div>
    </div>

</template>

<style scoped lang="scss">


</style>
