<script setup lang="ts">
import { ApiResponse_WorkspaceGet } from 'openflighthub-api-client-sdk';
import ApiForm from '../functional/form/ApiForm.vue';
import api from '@/api/index.js';
import LoadApiArray from '../functional/LoadApiArray.vue';

const props = defineProps<{
    workspace: ApiResponse_WorkspaceGet
}>()

const emit = defineEmits<{
    created: []
    cancel: []
}>()

</script>

<template>

    <LoadApiArray :api-method="api.rest.workspace.permissions.get" :config="{params: {workspaceId: props.workspace.id}}" v-slot="permissions">
        <LoadApiArray :api-method="api.rest.team.allTeams.get" :config="{}" v-slot="allTeams">
            <ApiForm type="action" title="Invite Team" :api-method="api.rest.workspace.inviteTeam.post" :params="{
                workspaceId: props.workspace.id
            }" :fields="{
                team_id: {type: 'select', required: true, options: allTeams.data.filter(team => !permissions.data.find(permission => permission.team_id === team.id)).map(team => ({value: team.id, label: team.name}))}
            }" :initial-values="{}" :editable-fields="['team_id']" @created="emit('created')" @cancel="emit('cancel')"></ApiForm>
        </LoadApiArray>
    </LoadApiArray>

</template>

<style scoped lang="scss">



</style>
