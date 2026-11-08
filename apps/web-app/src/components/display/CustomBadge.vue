<script setup lang="ts">
import { getBlackOrWhiteForColor } from '@/util/color';
import { computed } from 'vue';

/**
 * @prop defaultColor: default: #222
 */
const props = defineProps<{
    color: string
}>()

const style = computed(()=>{
    return {
        backgroundColor: props.color,
        color: getBlackOrWhiteForColor(props.color)
    }
})

</script>

<template>

    <span id="span" :style="style">
        <slot></slot>
    </span>

</template>

<style scoped lang="scss">

// clone from primevue badge
#span {
    display: inline-flex;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
    background: #020617;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 1.5rem;
    height: 1.5rem;
}

</style>
