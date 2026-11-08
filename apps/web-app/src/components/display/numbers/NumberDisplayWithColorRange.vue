<script setup lang="ts">
import { generateGradient } from 'typescript-color-gradient';
import NumberDisplay from './NumberDisplay.vue';
import { Badge, Chip, Tag } from 'primevue';
import { computed } from 'vue';
import { getBlackOrWhiteForColor } from '@/util/color';
/**
 * @prop decimals The number of decimals to show. default: 2
 * @prop gradients An array of css color strings. The first color will be used for the lowest value, the last color for the highest value
 */
const props = defineProps<{
    number: number
    decimals?: number
    gradients: string[]
    minValue: number
    maxValue: number
}>()

const style = computed(()=>{
    const gradient = generateGradient(props.gradients, Math.max(props.gradients.length, 10))

    const clampedValue = Math.min(Math.max(props.number, props.minValue), props.maxValue)

    const backgroundColor = gradient[Math.max(0, Math.min(Math.round(clampedValue), gradient.length - 1))]

    return {
        backgroundColor,
        color: getBlackOrWhiteForColor(backgroundColor)
    }
})

</script>

<template>

    <Tag :style="style">
        <NumberDisplay :number="props.number" :decimals="props.decimals"></NumberDisplay>
    </Tag>

</template>
