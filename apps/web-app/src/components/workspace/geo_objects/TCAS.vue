<script setup lang="ts">
import { ApiResponse_WorkspaceGeoObjectsGet } from 'openflighthub-api-client-sdk';
import TCAS, { TCAS_Event_Data, TCAS_Options } from './tcas';
import { onMounted, onUnmounted, reactive, watch } from 'vue';
import { updateObject } from '@/util/vue';
import { useToast } from 'primevue';

const props = defineProps<{
    geoObjects: ApiResponse_WorkspaceGeoObjectsGet
    options: TCAS_Options
}>()

let tcas: TCAS | undefined

const activeEvents: TCAS_Event_Data[] = reactive([])

const toast = useToast()

onMounted(()=>{
    tcas = new TCAS(props.geoObjects, props.options)

    tcas.addListener('new', evt => {
        activeEvents.push(evt)


        if(evt.type === 'alert'){
            toast.add({severity: 'error', summary: 'TCAS Alert', detail: `Collision immiment: ${evt.intersection.timeToIntersectionSeconds}  seconds.`, life: 5000})
        } else if(evt.type === 'warning'){
            toast.add({severity: 'warn', summary: 'TCAS Warning', detail: `Possible collision detected: ${evt.intersection.timeToIntersectionSeconds}  seconds.`, life: 5000})
        }
    })

    tcas.addListener('update', evt=>{
        const existing = activeEvents.find(e => e.eventId === evt.eventId)

        if(existing){
            updateObject(existing, evt)
        } else {
            activeEvents.push(evt)
        }
    })

    tcas.addListener('remove', evt=>{
        const existingIndex = activeEvents.findIndex(e => e.eventId === evt.eventId)

        if(existingIndex !== -1){
            activeEvents.splice(existingIndex, 1)
        }

        toast.add({severity: 'success', summary: 'TCAS Clear of Conflict', detail: `The TCAS event between ${evt.aircraftA.name} and ${evt.aircraftB.name} has been resolved.`, life: 5000})
    })
})

watch(()=> props.options, ()=>{
    tcas?.setOptions(props.options)
})

onUnmounted(()=>{
    if(tcas){
        tcas.destroy()
        tcas = undefined
    }
})

function handleTcasEvent(eventData: TCAS_Event_Data) {
    activeEvents.push(eventData)
}

</script>

<template>


</template>

<style scoped lang="scss">

</style>
