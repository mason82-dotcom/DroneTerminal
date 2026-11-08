<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    timestamp: string //ISO string
    invalidText?: string //Text to display if the timestamp is invalid (e.g. null or empty)
}>()

const date = computed(()=>{
    return new Date(props.timestamp)
})

</script>

<template>

    {{ props.invalidText && isNaN(date.getTime()) ? props.invalidText : date.toLocaleString() }}

</template>

<style scoped lang="scss">



</style>
