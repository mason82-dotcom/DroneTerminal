<script setup lang="ts">
/**
 * @prop decimals The number of decimals to show. default: 2
 */
const props = defineProps<{
    number: number
    unit?: string
    decimals?: number
}>()

</script>

<template>

    <span>{{ props.number.toFixed(props.decimals ?? 2)  + (props.unit ?? '') }}</span>

</template>
