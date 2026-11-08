<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_TaskPost } from 'openflighthub-api-client-sdk';

const props = defineProps<{
    missionId: number
}>()

const emit = defineEmits<{
    created: [ApiResponse_TaskPost]
    cancel: []
}>()

</script>

<template>

    <ApiForm :apiMethod="api.rest.task.post" type="create" :params="{}"
        :initial-values="{
        mission_id: props.missionId,
        state: 0
        }"
        :fields="{
        name: {type: 'text', required: true},
        description: {type: 'textarea', required: true},
        notes: {type: 'textarea', required: false},
        mission_id: {type: 'number', required: true},
        state: {type: 'number', required: true}
        }"
        :editable-fields="['name', 'description', 'notes']"
        title="Create Task"
        @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">

</style>
