<script setup lang="ts">
import LoadApiArray from '../functional/LoadApiArray.vue';
import ApiForm from '../functional/form/ApiForm.vue';
import api from '@/api';
import { ApiResponse_MissionPost } from 'openflighthub-api-client-sdk';

const props = defineProps<{
    workspaceId: number
}>()


const emit = defineEmits<{
    created: [ApiResponse_MissionPost]
    cancel: []
}>()

</script>

<template>

    <LoadApiArray :api-method="api.rest.team.allTeams.get" :config="{}" v-slot="teams">
        <ApiForm :apiMethod="api.rest.mission.post" type="create" :params="{}"
            :initial-values="{
                workspace_id: props.workspaceId,
                state: 0
            }"
            :fields="{
                name: {type: 'text', required: true},
                assigned_to_team_id: {type: 'select', required: false, options: teams.data.map(team => ({ label: team.name, value: team.id }))},
                description: {type: 'textarea', required: false},
                notes: {type: 'textarea', required: false},
                state: {type: 'number', required: true},
                workspace_id: {type: 'number', required: true}
            }"
            :editable-fields="['name', 'assigned_to_team_id', 'description', 'notes']"
            title="Create Mission" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>
    </LoadApiArray>

</template>

<style scoped lang="scss">

</style>
