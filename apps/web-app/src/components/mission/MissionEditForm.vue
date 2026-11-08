<script setup lang="ts">
import { updateObject } from '@/util/vue.js';
import LoadApiArray from '../functional/LoadApiArray.vue';
import ApiForm from '../functional/form/ApiForm.vue';
import api from '@/api';
import { ApiResponse_MissionGet } from 'openflighthub-api-client-sdk';
import { MISSION_COLOR_MAP, MISSION_STATES } from './states.js';

const props = defineProps<{
    mission: ApiResponse_MissionGet
    onlyShowAssignment?: boolean
}>()


const emit = defineEmits<{
    created: [ApiResponse_MissionGet]
    cancel: []
}>()

</script>

<template>

    <LoadApiArray :api-method="api.rest.team.allTeams.get" :config="{}" v-slot="teams">
        <ApiForm :apiMethod="api.rest.mission.patch" type="edit" :params="{missionId: props.mission.id}"
            :initial-values="props.mission"
            :fields="{
                name: {type: 'text', required: true},
                assigned_to_team_id: {type: 'select', required: false, options: teams.data.map(team => ({ label: team.name, value: team.id })), allowNull: true},
                description: {type: 'textarea', required: false},
                notes: {type: 'textarea', required: false},
                state: {type: 'select', required: true, options: Object.entries(MISSION_STATES).map(([key, value]) => ({ label: key, value })), mappedBadge: {colorMap: MISSION_COLOR_MAP}}
            }"
            :editable-fields="props.onlyShowAssignment ? ['assigned_to_team_id'] : ['name', 'assigned_to_team_id', 'description', 'notes', 'state']"
            title="Edit Mission" @created="(updatedMission) => {
                updateObject(props.mission, updatedMission)
                emit('created', updatedMission)
            }" @cancel="emit('cancel')"></ApiForm>
    </LoadApiArray>

</template>

<style scoped lang="scss">

</style>
