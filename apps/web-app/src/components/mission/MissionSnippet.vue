<script setup lang="ts">
import { ApiResponse_MissionGet } from 'openflighthub-api-client-sdk';
import Snippet from '../layout/Snippet.vue';
import MissionBadge from './MissionBadge.vue';
import LoadApiArray from '../functional/LoadApiArray.vue';
import api from '@/api';
import List from '../layout/List.vue';
import TaskSnippet from '../task/TaskSnippet.vue';
import { ref } from 'vue';
import IconVue from '../general/IconVue.vue';
import TeamReference from '../team/TeamReference.vue';

const props = defineProps<{
    mission: ApiResponse_MissionGet
    showTasks?: boolean
}>()

const extendTasks = ref(false)

</script>

<template>

    <Snippet :to-url="'/mission/' + props.mission.id">
        <h3 id="title">{{ props.mission.name }} <MissionBadge :state="props.mission.state"></MissionBadge></h3>

        <h4>Assigned to:
            <TeamReference v-if="typeof props.mission.assigned_to_team_id === 'number'" :id="props.mission.assigned_to_team_id"></TeamReference>
            <span v-else>-</span>
        </h4>


        <p id="description">{{ props.mission.description }}</p>

        <template v-if="props.showTasks">
            <LoadApiArray :api-method="api.rest.mission.tasks.get" :config="{params: {missionId: props.mission.id}}" v-slot="tasks">
                <h4 @click.stop.prevent="extendTasks = !extendTasks" style="cursor: pointer;">Tasks ({{ tasks.data.length }}) <IconVue :name="extendTasks ? 'caret-up-fill' : 'caret-down-fill'"></IconVue></h4>

                <List v-if="extendTasks">
                    <TaskSnippet v-for="task in tasks.data" :key="task.id" :task="task"></TaskSnippet>
                </List>
            </LoadApiArray>
        </template>

    </Snippet>

</template>

<style scoped lang="scss">

#title {
    display: flex;
    gap: 0.5em;
}

#description {
    font-style: italic;
}

</style>
