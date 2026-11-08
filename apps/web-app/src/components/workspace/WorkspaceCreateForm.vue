<script setup lang="ts">
import { ApiResponse_WorkspaceGet, ApiResponse_WorkspacePost } from 'openflighthub-api-client-sdk';
import ApiForm from '../functional/form/ApiForm.vue';
import api from '@/api/index.js';

const props = defineProps<{
    type: 'team' | 'organisation',
    id: number
}>()

const emit = defineEmits<{
    created: [ApiResponse_WorkspacePost]
    cancel: []
}>()

</script>

<template>

    <ApiForm type="create" title="Create Workspace" :api-method="api.rest.workspace.post" :params="{}" :fields="props.type === 'team' ? {
        name: {type: 'text', required: true},
        latitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 48.1},
        longitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 11.6},
        //@ts-ignore
        team_id: {type: 'number', required: props.type === 'team'}
    } : {
        name: {type: 'text', required: true},
        latitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 48.1},
        longitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 11.6},
        //@ts-ignore
        organisation_id: {type: 'number', required: props.type === 'organisation'},
    }" :editable-fields="['name', 'latitude', 'longitude']" :initial-values="props.type === 'team' ? {
        latitude: 48.1,
        longitude: 11.6,
        team_id: props.id
    } : {
        latitude: 48.1,
        longitude: 11.6,
        organisation_id: props.id
    }" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">



</style>
