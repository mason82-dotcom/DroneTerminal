<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

export type Unit = 'B' | 'KB' | 'MB' | 'GB' | 'TB'

const props = defineProps<{
    sizeInBytes: number
    lowest?: Unit //TODO implement lowest
    showDecimals?: boolean
}>()

const unit = ref<Unit>('B')
const sizeValueWithDecimals = ref(0)

onMounted(generate)
watch(()=>{
    return props.lowest
}, generate)
watch(()=>{
    return props.showDecimals
}, generate)
watch(()=>{
    return props.sizeInBytes
}, generate)

function generate(){
    const tB = props.sizeInBytes / (1000 * 1000 * 1000 * 1000)
    if(tB >= 1){
        unit.value = 'TB'
        sizeValueWithDecimals.value = tB
        return
    }

    const gB = props.sizeInBytes / (1000 * 1000 * 1000)
    if(gB >= 1){
        unit.value = 'GB'
        sizeValueWithDecimals.value = gB
        return
    }

    const mB = props.sizeInBytes / (1000 * 1000)
    if(mB >= 1){
        unit.value = 'MB'
        sizeValueWithDecimals.value = mB
        return
    }

    const kB = props.sizeInBytes / 1000
    if(kB >= 1){
        unit.value = 'KB'
        sizeValueWithDecimals.value = kB
        return
    }

    const b = props.sizeInBytes

    unit.value = 'B'
    sizeValueWithDecimals.value = b
}

</script>

<template>

    <span>{{ sizeValueWithDecimals.toFixed(props.showDecimals ? 2 : 0) }} {{ unit }}</span>

</template>

<style scoped lang="scss">



</style>
