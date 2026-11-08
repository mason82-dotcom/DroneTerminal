<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_AdminOrganisationsPost } from 'openflighthub-api-client-sdk';
import LoadApiArray from '../functional/LoadApiArray.vue';

const emit = defineEmits<{
    created: [ApiResponse_AdminOrganisationsPost]
    cancel: []
}>()

</script>

<template>


    <LoadApiArray :api-method="api.rest.admin.users.get" :config="{}" v-slot="users">
        <ApiForm type="create" title="Create Organisation" :api-method="api.rest.admin.organisations.post" :params="{}" :fields="{
            name: {type: 'text', required: true},
            logo_file_id: {type: 'number'},
            owner_user_id: {type: 'select', required: true, options: users.data.map(user => ({value: user.id, label: user.name}))}
        }" :editable-fields="['name', 'owner_user_id']" :initial-values="{}" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>
    </LoadApiArray>

</template>

<style scoped lang="scss">

</style>
