<script setup lang="ts">
import api from '@/api';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import ModalVue from '@/components/display/ModalVue.vue';
import { provide, ref } from 'vue';
import SplitVue from '@/components/layout/SplitVue.vue';
import Map from '@/components/map/Map.vue';
import TaskGeoObjects from '@/components/task/TaskGeoObjects.vue';
import LoadApi from '@/components/functional/LoadApi.vue';
import IconVue from '@/components/general/IconVue.vue';
import { Button } from 'primevue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';
import { getCenterOfTaskGeoObjects } from '@/util/geo_objects';
import TaskStateBadge from '@/components/task/TaskStateBadge.vue';
import TaskEditForm from '@/components/task/TaskEditForm.vue';
import GeoObjectSnippet from '@/components/geo-object/GeoObjectSnippet.vue';
import List from '@/components/layout/List.vue';
import MapDrawMenu from '@/components/map/MapDrawMenu.vue';
import ProvideMapContainerOutside from '@/components/map/outside_map_container/ProvideMapContainerOutside.vue';

const mapContainer = ref<HTMLDivElement>()

const showTaskEditModal = ref(false)

</script>

<template>

    <LoadApiWithIdParamInUrl :api-method="api.rest.task.get" :config="{params: {}}" :id-params="['taskId']" v-slot="task">
        <Padding>
            <div style="display: flex; justify-content: space-between; gap: 1em;">
                <h1>Task: {{ task.data.name }} <Button @click="showTaskEditModal = true"><IconVue name="pencil"></IconVue></Button></h1>

                <RouterLink :to="'/mission/' + task.data.mission_id">View Mission</RouterLink>
            </div>

            <LoadApi :api-method="api.rest.mission.get" :config="{params: {missionId: task.data.mission_id}}" v-slot="mission">
                <LoadApi :api-method="api.rest.workspace.get" :config="{params: {workspaceId: mission.data.workspace_id}}" v-slot="workspace">

                    <SplitVue class="split_view_outer">
                        <template #left_or_top>

                            <div ref="mapContainer" style="height: 80vh; position: relative;">
                                <Map v-if="mapContainer" :map-container="mapContainer!" :start-point="getCenterOfTaskGeoObjects(task.data, workspace.data)" :start-height="10000" :start-camera-heading="0" :start-camera-pitch="-90">

                                    <TaskGeoObjects :workspace-id="mission.data.workspace_id" :task="task.data"></TaskGeoObjects>

                                    <MapDrawMenu :workspace-id="mission.data.workspace_id" :task-id="task.data.id"></MapDrawMenu>

                                </Map>
                            </div>

                        </template>
                        <template #right_or_bottom>

                            <div>
                                <ProvideMapContainerOutside v-if="mapContainer" :map-container="mapContainer">

                                    <table class="uncolored">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h3>State</h3>
                                                </td>
                                                <td>
                                                    <TaskStateBadge :state="task.data.state"></TaskStateBadge>
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
                                                    <p>{{ task.data.description }}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3>Notes</h3>
                                                </td>
                                                <td>
                                                    <p>{{ task.data.notes }}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <h3>Related GeoObjects</h3>

                                    <List>
                                        <GeoObjectSnippet v-for="geoObject of task.data.geo_objects.sort((a, b)=> a.id - b.id)" :key="geoObject.id" :geo-object="geoObject"></GeoObjectSnippet>
                                    </List>
                                </ProvideMapContainerOutside>
                            </div>

                        </template>
                    </SplitVue>

                    <ModalVue :visible="showTaskEditModal" @close="showTaskEditModal = false">
                        <TaskEditForm :task="task.data" @created="showTaskEditModal = false" @cancel="showTaskEditModal = false"></TaskEditForm>
                    </ModalVue>
                </LoadApi>
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

