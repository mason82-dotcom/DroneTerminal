<script setup lang="ts">
import api from '@/api';
import List from '@/components/layout/List.vue';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import LoadApiArrayWithIdParamInUrl from '@/components/functional/LoadApiArrayWithIdParamInUrl.vue';
import TaskSnippet from '@/components/task/TaskSnippet.vue';
import ModalVue from '@/components/display/ModalVue.vue';
import { ref } from 'vue';
import SplitVue from '@/components/layout/SplitVue.vue';
import Map from '@/components/map/Map.vue';
import TaskGeoObjects from '@/components/task/TaskGeoObjects.vue';
import LoadApi from '@/components/functional/LoadApi.vue';
import IconVue from '@/components/general/IconVue.vue';
import { Button } from 'primevue';
import TaskCreateForm from '@/components/task/TaskCreateForm.vue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';
import MissionEditForm from '@/components/mission/MissionEditForm.vue';
import MissionBadge from '@/components/mission/MissionBadge.vue';

const showCreateTaskModal = ref(false)

const mapContainer = ref<HTMLDivElement>()

const showMissionEditModal = ref(false)

</script>

<template>

    <LoadApiWithIdParamInUrl :api-method="api.rest.mission.get" :config="{params: {}}" :id-params="['missionId']" v-slot="mission">
        <Padding>
            <div style="display: flex; justify-content: space-between; gap: 1em;">
                <h1>Mission: {{ mission.data.name }} <Button @click="showMissionEditModal = true"><IconVue name="pencil"></IconVue></Button></h1>

                <RouterLink :to="'/workspace/' + mission.data.workspace_id">View Workspace</RouterLink>
            </div>

            <LoadApi :api-method="api.rest.workspace.get" :config="{params: {workspaceId: mission.data.workspace_id}}" v-slot="workspace">
                <LoadApiArrayWithIdParamInUrl :api-method="api.rest.mission.tasks.get" :config="{params: {}}" :id-params="['missionId']" v-slot="tasks">

                    <SplitVue class="split_view_outer">
                        <template #left_or_top>

                            <SplitVue horizontal>
                                <template #left_or_top>
                                    <div ref="mapContainer" style="height: 60vh; position: relative;">
                                        <Map v-if="mapContainer" :map-container="mapContainer!" :start-point="{longitude: workspace.data.longitude, latitude: workspace.data.latitude}" :start-height="10000" :start-camera-heading="0" :start-camera-pitch="-90"><!-- implement calculating start point from task geoobjects -->

                                            <!-- TODO this is kind of unperformant because there is duplication for every task (geoobjects are bound to the same workspace)-->

                                            <TaskGeoObjects v-for="task of tasks.data" :key="task.id" :workspace-id="mission.data.workspace_id" :task="task"></TaskGeoObjects>

                                        </Map>
                                    </div>
                                </template>

                                <template #right_or_bottom>
                                    <div>

                                        <table class="uncolored">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <h3>State</h3>
                                                    </td>
                                                    <td>
                                                        <MissionBadge :state="mission.data.state"></MissionBadge>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h3>Assigned to</h3>
                                                    </td>
                                                    <td>
                                                        <TeamSnippet v-if="typeof mission.data.assigned_to_team_id === 'number'" :id="mission.data.assigned_to_team_id"></TeamSnippet>
                                                        <span v-else>-</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h3>Description</h3>
                                                    </td>
                                                    <td>
                                                        <p>{{ mission.data.description }}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h3>Notes</h3>
                                                    </td>
                                                    <td>
                                                        <p>{{ mission.data.notes }}</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </SplitVue>

                        </template>
                        <template #right_or_bottom>

                            <div>
                                <div style="display: flex; justify-content: space-between;">
                                    <h2>Tasks</h2>

                                    <Button @click="showCreateTaskModal = true"><IconVue name="plus-lg"></IconVue> Create Task</Button>
                                </div>

                                <List style="margin-top: 0.5em">
                                    <TaskSnippet v-for="task in tasks.data.sort((a, b) => a.id - b.id)" :key="task.id" :task="task" show-geo-objects></TaskSnippet>
                                </List>

                                <ModalVue :visible="showCreateTaskModal" @close="showCreateTaskModal = false">
                                    <TaskCreateForm :missionId="mission.data.id" @created="showCreateTaskModal = false" @cancel="showCreateTaskModal = false"></TaskCreateForm>
                                </ModalVue>
                            </div>

                        </template>
                    </SplitVue>

                    <ModalVue :visible="showMissionEditModal" @close="showMissionEditModal = false">
                        <MissionEditForm :mission="mission.data" @created="showMissionEditModal = false" @cancel="showMissionEditModal = false"></MissionEditForm>
                    </ModalVue>

                </LoadApiArrayWithIdParamInUrl>
            </LoadApi>
        </Padding>
    </LoadApiWithIdParamInUrl>

</template>

<style scoped lang="scss">

.split_view_outer {
    max-height: 93vh;

    & > * {
        overflow-y: auto;
    }
}
</style>

