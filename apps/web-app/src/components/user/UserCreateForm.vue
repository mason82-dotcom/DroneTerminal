<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_AdminUsersPost } from 'openflighthub-api-client-sdk';

const emit = defineEmits<{
    created: [ApiResponse_AdminUsersPost]
    cancel: []
}>()

</script>

<template>

    <ApiForm type="create" title="Create User" :api-method="api.rest.admin.users.post" :params="{}" :fields="{
        name: {type: 'text'},
        email: {type: 'email', required: true}
    }" :editable-fields="['name', 'email']" :initial-values="{}" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">

</style>
