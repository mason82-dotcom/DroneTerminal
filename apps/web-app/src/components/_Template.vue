<script setup lang="ts">
import { computed, inject, provide, ref, reactive } from 'vue';


const props = defineProps<{
    myProp?: boolean
}>()

const computedValue = computed(() => {
    return true
})

</script>

<template>

    Template for Vue Component

</template>

<style scoped lang="scss">



</style>
