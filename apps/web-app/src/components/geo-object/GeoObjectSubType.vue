<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    type: number
    subType: number
}>()

const label = computed(()=>{
    switch(props.type){
        case 0: {
            switch(props.subType){
                case 0: return 'Point'
                case 1: return 'Line'
                case 2: return 'Polygon'
                case 3: return 'Circle'
                default: return '?'
            }
        }

        case 1: {
            switch(props.subType){
                case 0: return 'Airplane'
                case 1: return 'Helicopter'
                case 2: return 'UAV'
                case 3: return 'Glider'
                case 4: return 'Chute'
                case 5: return 'Other'
                default: return '?'
            }
        }

        case 2: {
            switch(props.subType){
                case 0: return 'Airplane'
                case 1: return 'Helicopter'
                case 2: return 'UAV'
                case 3: return 'Pilot'
                case 4: return 'Ground Vehicle'
                case 5: return 'Ground Staff'
                case 6: return 'Other'
                default: return '?'
            }
        }

        default: {
            return '?'
        }
    }
})

</script>

<template>

    {{ label }}

</template>
