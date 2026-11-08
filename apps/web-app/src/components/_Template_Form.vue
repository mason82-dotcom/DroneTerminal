<script setup lang="ts">
import api from '@/api';
import ApiForm from './functional/form/ApiForm.vue';
import { ApiResponse_UserPatch } from 'openflighthub-api-client-sdk';

const props = defineProps<{
    data: {
        id: number,
        name: string
    }
}>()

const emit = defineEmits<{
    created: [ApiResponse_UserPatch]
    cancel: []
}>()

</script>

<template>

    <ApiForm :apiMethod="api.rest.user.patch" :params="{userId: props.data.id}" type="edit"
        :initial-values="props.data"
        :fields="{
            name: {type: 'text', required: true},
            email: {type: 'text'},
            locale: {type: 'text'}
        }"
        :editable-fields="['name']"
        title="Edit"
        @created="(updatedObject) => emit('created', updatedObject)"></ApiForm>

</template>

<style scoped lang="scss">

</style>
