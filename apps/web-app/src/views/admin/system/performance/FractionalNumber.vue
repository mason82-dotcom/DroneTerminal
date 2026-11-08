<script setup lang="ts">
import NumberDisplayWithColorRange from '@/components/display/numbers/NumberDisplayWithColorRange.vue';

const props = defineProps<{
    number: number
}>()

</script>

<template>

    <NumberDisplayWithColorRange :number="props.number" :decimals="2" :gradients="['#38761d', '#cc0000']" :minValue="0" :maxValue="10"></NumberDisplayWithColorRange>

</template>
