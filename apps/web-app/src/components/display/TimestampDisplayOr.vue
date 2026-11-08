<script setup lang="ts">
import TimestampDisplay from './TimestampDisplay.vue';

const props = defineProps<{
    timestamp?: string //ISO string
    customInvalidText?: string //default: -
}>()

</script>

<template>

    <TimestampDisplay v-if="typeof props.timestamp === 'string' && props.timestamp.length > 0" :timestamp="props.timestamp" :invalid-text="props.customInvalidText || '-'"></TimestampDisplay>
    <span v-else>{{ props.customInvalidText || '-' }}</span>

</template>

<style scoped lang="scss">



</style>
