<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_TaskGet } from 'openflighthub-api-client-sdk';
import { updateObject } from '@/util/vue.js';
import { TASK_COLOR_MAP, TASK_STATES } from './states.js';

const props = defineProps<{
    task: ApiResponse_TaskGet
}>()

const emit = defineEmits<{
    created: [ApiResponse_TaskGet]
    cancel: []
}>()

</script>

<template>

    <ApiForm :apiMethod="api.rest.task.patch" type="edit" :params="{taskId: props.task.id}"
        :initial-values="props.task"
        :fields="{
            name: {type: 'text', required: true},
            description: {type: 'textarea', required: true},
            notes: {type: 'textarea', required: false},
            state: {type: 'select', required: true, options: Object.entries(TASK_STATES).map(([key, value]) => ({ label: key, value })), mappedBadge: {colorMap: TASK_COLOR_MAP}}
        }"
        :editable-fields="['name', 'description', 'notes', 'state']"
        title="Edit Task"
        @created="(updatedTask)=>{
            updateObject(props.task, updatedTask)
            emit('created', updatedTask)
        }" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">

</style>
