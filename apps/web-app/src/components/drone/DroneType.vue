<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    type: number
}>()

const name = computed(()=>{
    switch(props.type){
        case 0: return 'unknown'
        case 1: return 'DJI Matrice 300'
        case 2: return 'DJI Matrice 30'
        case 3: return 'DJI Matrice 350'
        case 4: return 'DJI Mavic 3'

        default: return 'invalid'
    }
})

</script>

<template>

    {{ name }}

</template>
