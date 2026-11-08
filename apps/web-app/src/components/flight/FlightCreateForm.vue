<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_FlightPost } from 'openflighthub-api-client-sdk';

const props = defineProps<{
    droneId: number
}>()

const emit = defineEmits<{
    created: [ApiResponse_FlightPost]
    cancel: []
}>()

</script>

<template>

    <ApiForm type="create" title="Add Flight" :api-method="api.rest.flight.post" :params="{}" :fields="{
        drone_id: {type: 'number', required: true},
        started_at: {type: 'date-with-time', required: true, noSeconds: true, max: new Date()},
        landed_at: {type: 'date-with-time', noSeconds: true, max: new Date()},
        ended_at: {type: 'date-with-time', noSeconds: true, max: new Date()},
        track: {type: 'raw'}
    }" :editable-fields="['started_at', 'ended_at', 'landed_at']" :initial-values="{
        drone_id: props.droneId
    }" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">

</style>
