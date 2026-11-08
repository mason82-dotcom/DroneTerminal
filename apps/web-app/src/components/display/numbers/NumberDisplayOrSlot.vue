<script setup lang="ts">
import NumberDisplay from './NumberDisplay.vue';

/**
 * @prop decimals The number of decimals to show. default: 2
 */
const props = defineProps<{
    number: number | undefined
    unit?: string
    decimals?: number
}>()

</script>

<template>

    <span>
        <NumberDisplay v-if="typeof props.number === 'number'" :number="props.number" :decimals="props.decimals" :unit="props.unit"></NumberDisplay>
        <slot v-else></slot>
    </span>

</template>
