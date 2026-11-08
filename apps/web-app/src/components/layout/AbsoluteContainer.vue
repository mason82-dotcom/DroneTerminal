<script setup lang="ts">
import { computed, StyleValue } from 'vue';


const props = defineProps<{
    x: number
    y: number
    zIndex?: number
}>()

const style = computed(() => {

    return {
        position: 'absolute',
        top: '' + props.y + 'px',
        left: '' + props.x + 'px',
        zIndex: props.zIndex
    } as StyleValue
})


</script>

<template>

    <div :style="style">
        <slot/>
    </div>

</template>

<style scoped lang="scss">


</style>
