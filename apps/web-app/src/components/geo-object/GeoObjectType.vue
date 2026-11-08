<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    type: number
}>()

const label = computed(()=>{
    switch(props.type){
        case 0: return 'Marking'
        case 1: return 'Traffic'
        case 2: return 'Unit'

        default: return '?'
    }
})

</script>

<template>

    {{ label }}

</template>
