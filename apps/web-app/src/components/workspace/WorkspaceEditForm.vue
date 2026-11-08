<script setup lang="ts">
import { ApiResponse_WorkspaceGet } from 'openflighthub-api-client-sdk';
import ApiForm from '../functional/form/ApiForm.vue';
import api from '@/api/index.js';
import { updateObject } from '@/util/vue.js';

const props = defineProps<{
    workspace: ApiResponse_WorkspaceGet
}>()

const emit = defineEmits<{
    created: [ApiResponse_WorkspaceGet]
    cancel: []
}>()

</script>

<template>

    <ApiForm :apiMethod="api.rest.workspace.patch" :params="{workspaceId: props.workspace.id}" type="edit"
        :initial-values="props.workspace"
        :fields="{
            name: {type: 'text', required: true},
            latitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 48.1},
            longitude: {type: 'map-location', required: true, latitudeField: 'latitude', longitudeField: 'longitude', defaultValue: 11.6}
        }"
        :editable-fields="['name', 'latitude', 'longitude']"
        title="Edit Workspace"
        @created="(updatedWorkspace) =>{
            updateObject(props.workspace, updatedWorkspace)
            emit('created', updatedWorkspace)
        }" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">



</style>
