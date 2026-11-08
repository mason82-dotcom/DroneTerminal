<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

export type Unit = 'ms' | 's' | 'm' | 'h' | 'd'

const props = defineProps<{
    timeInMs: number
    lowest?: Unit//TODO implement lowest
    showDecimals?: boolean
}>()

const unit = ref<Unit>('ms')
const timeValueWithDecimals = ref(0)

onMounted(generate)
watch(()=>{
    return props.lowest
}, generate)
watch(()=>{
    return props.showDecimals
}, generate)
watch(()=>{
    return props.timeInMs
}, generate)

function generate(){
    const day = props.timeInMs / (1000 * 60 * 60 * 24)
    if(day >= 1){
        unit.value = 'd'
        timeValueWithDecimals.value = day
        return
    }

    const h = props.timeInMs / (1000 * 60 * 60)
    if(h >= 1){
        unit.value = 'h'
        timeValueWithDecimals.value = h
        return
    }

    const m = props.timeInMs / (1000 * 60)
    if(m >= 1){
        unit.value = 'm'
        timeValueWithDecimals.value = m
        return
    }

    const s = props.timeInMs / 1000
    if(s >= 1){
        unit.value = 's'
        timeValueWithDecimals.value = s
        return
    }

    const ms = props.timeInMs

    unit.value = 'ms'
    timeValueWithDecimals.value = ms
}

</script>

<template>

    <span>{{ $t("time_and_data.time." + unit, !props.showDecimals ? Math.floor(timeValueWithDecimals) : timeValueWithDecimals) }}</span>

</template>

<style scoped lang="scss">



</style>
