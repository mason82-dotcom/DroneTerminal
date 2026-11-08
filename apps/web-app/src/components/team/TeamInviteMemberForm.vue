<script setup lang="ts">
import api from '@/api';
import ApiForm from '../functional/form/ApiForm.vue';
import { ApiResponse_TeamInviteMemberPost } from 'openflighthub-api-client-sdk';

const props = defineProps<{
    teamId: number
}>()

const emit = defineEmits<{
    created: [ApiResponse_TeamInviteMemberPost]
    cancel: []
}>()

</script>

<template>

    <ApiForm type="create" title="Invite Member" confirm-label="Invite" :api-method="api.rest.team.inviteMember.post" :params="{teamId: props.teamId}" :fields="{
            email: {type: 'email', required: true}
        }" :editable-fields="['email']" :initial-values="{}" @created="emit('created', $event)" @cancel="emit('cancel')"></ApiForm>

</template>

<style scoped lang="scss">

</style>
