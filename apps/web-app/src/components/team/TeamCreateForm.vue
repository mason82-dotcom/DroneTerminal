<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_TeamPost } from 'openflighthub-api-client-sdk';
import LoadApiArray from '../functional/LoadApiArray.vue';

const props = defineProps<{
    organisationId: number
}>()

const emit = defineEmits<{
    created: [ApiResponse_TeamPost]
    cancel: []
}>()

</script>

<template>

    <LoadApiArray :api-method="api.rest.organisation.users.get" :config="{params: {organisationId}}" v-slot="users">
        <ApiForm type="create" title="Create Team" :api-method="api.rest.team.post" :params="{}" :fields="{
            name: {type: 'text', required: true},
            logo_file_id: {type: 'number'},
            organisation_id: {type: 'number', required: true},
            owner_user_id: {type: 'select', required: true, options: users.data.map(user => ({value: user.id, label: user.name}))}
        }" :editable-fields="['name', 'owner_user_id']" :initial-values="{organisation_id: organisationId}" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>
    </LoadApiArray>

</template>

<style scoped lang="scss">

</style>
