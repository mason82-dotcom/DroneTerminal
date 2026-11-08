<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    type: number
}>()

const name = computed(()=>{
    switch(props.type){
        case 0: return 'unknown'
        case 1: return 'DJI RC Plus'
        case 2: return 'DJI RC Pro Enterprise'
        case 3: return 'DJI RC Plus 2'
        case 4: return 'DJI Smart Controller'

        default: return 'invalid'
    }
})

</script>

<template>

    {{ name }}

</template>
