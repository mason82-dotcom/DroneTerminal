<script setup lang="ts">
import api from '@/api';

import LoadApi from '@/components/functional/LoadApi.vue';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import Padding from '@/components/layout/Padding.vue';
import List from '@/components/layout/List.vue';
import HubWorkspaceFilePreview from '@/components/workspace/HubWorkspaceFilePreview.vue';
import RemoteControllerSnippet from '@/components/remote_controller/RemoteControllerSnippet.vue';
import { sortByProperty, uniqueByProperty } from '@/util/array';
import Spacing from '@/components/layout/Spacing.vue';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';
import { TabList, Tabs, TabPanel, Tab, TabPanels, DataTable, Column, Button } from 'primevue';
import { getIdQueryFromRouteOrUseDefault } from '@/util/url';
import { useRoute, useRouter } from 'vue-router';
import TimestampDisplayOr from '@/components/display/TimestampDisplayOr.vue';
import { ref } from 'vue';
import ModalVue from '@/components/display/ModalVue.vue';
import IconVue from '@/components/general/IconVue.vue';
import FlightCreateForm from '@/components/flight/FlightCreateForm.vue';

const router = useRouter()

const showAddFlightModal = ref(false)

</script>

<template>

    <Padding>
        <LoadApiWithIdParamInUrl :api-method="api.rest.drone.get" :config="{params: {}}" :id-params="['droneId']" v-slot="drone">
            <Padding id="outer">
                <h1>Drone {{ drone.data.name }}</h1>

                <Tabs :value="getIdQueryFromRouteOrUseDefault('tab', useRoute(), 0)" @update:value="evt=>{router.push({query: {tab:  '' + evt}})}">
                    <TabList>
                        <Tab :value="0">Information</Tab>
                        <Tab :value="1">Live</Tab>
                        <Tab :value="2">Flight</Tab>
                        <Tab :value="3">Media</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel :value="0">
                            <h2>Information</h2>

                            <Spacing></Spacing>

                            <h2>Last Connection</h2>

                            <LoadApi v-if="typeof drone.data.last_connection_id === 'number'" :api-method="api.rest.connection.get" :config="{params: {connectionId: drone.data.last_connection_id}}" v-slot="connection">
                                <Padding>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>
                                                    <RouterLink :to="'/connection/' + connection.data.id">
                                                    {{ connection.data.name }}
                                                    </RouterLink>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Current Remote Controller</td>
                                                <td>
                                                    <RemoteControllerSnippet v-if="typeof connection.data.remote_controller_id === 'number'" :id="connection.data.remote_controller_id"></RemoteControllerSnippet>
                                                    <p v-else>-</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Current Workspace</td>
                                                <td>
                                                    <RouterLink :to="'/workspace/' + connection.data.workspace_id">
                                                        <LoadApi :api-method="api.rest.workspace.get" :config="{params: {workspaceId: connection.data.workspace_id}}" v-slot="workspace">{{ workspace.data.name }}</LoadApi>
                                                    </RouterLink>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Padding>
                            </LoadApi>
                            <Padding v-else>
                            Not connected
                            </Padding>

                        </TabPanel>
                        <TabPanel :value="1">

                            <h2>Live</h2>

                            <RouterLink :to="'/drone/' + drone.data.id + '/live'">View Live</RouterLink>

                        </TabPanel>
                        <TabPanel :value="2">

                            <h2>Flights</h2>

                            <Button @click="showAddFlightModal = true"><IconVue name="plus"></IconVue> Add Flight</Button>

                            <LoadApiArray :api-method="api.rest.drone.flights.get" :config="{params: {droneId: drone.data.id}}" v-slot="flights">

                                <DataTable :value="flights.data" show-gridlines striped-rows sort-field="started_at" paginator :rows="20" :rows-per-page-options="[20, 50, 100]" data-key="id">
                                    <Column>
                                        <template #body="slotProps">
                                            <RouterLink :to="'/flight/' + slotProps.data.id">
                                                View Flight
                                            </RouterLink>
                                        </template>
                                    </Column>
                                    <Column field="started_at" header="Started At" sortable>
                                        <template #body="slotProps">
                                            <TimestampDisplayOr :timestamp="slotProps.data.started_at"></TimestampDisplayOr>
                                        </template>
                                    </Column>
                                    <Column field="landed_at" header="Landed At" sortable>
                                        <template #body="slotProps">
                                            <TimestampDisplayOr :timestamp="slotProps.data.landed_at"></TimestampDisplayOr>
                                        </template>
                                    </Column>
                                    <Column field="ended_at" header="Ended At" sortable>
                                        <template #body="slotProps">
                                            <TimestampDisplayOr :timestamp="slotProps.data.ended_at"></TimestampDisplayOr>
                                        </template>
                                    </Column>
                                </DataTable>
                            </LoadApiArray>
                        </TabPanel>
                        <TabPanel :value="3">

                        <h2>All Drone Media</h2>

                        <LoadApiArray :api-method="api.rest.drone.media.get" :config="{params: {droneId: drone.data.id}}" v-slot="droneMedia">
                            <List :horizontal="true" :fill="true">
                                <RouterLink v-for="media in sortByProperty(uniqueByProperty(droneMedia.data, 'id'), 'id')" :key="media.id" :to="'/drone-media/' + media.id">
                                    <HubWorkspaceFilePreview  class="media_file_preview" :id="media.file_id"></HubWorkspaceFilePreview>
                                </RouterLink>
                            </List>
                        </LoadApiArray>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Padding>




            <ModalVue :visible="showAddFlightModal" @close="showAddFlightModal = false">
                <FlightCreateForm :droneId="drone.data.id" @created="showAddFlightModal = false" @cancel="showAddFlightModal = false"></FlightCreateForm>
            </ModalVue>

        </LoadApiWithIdParamInUrl>
    </Padding>

</template>

<style scoped lang="scss">
#outer {
display: flex;
flex-direction: column;

.media_file_preview {
height: 300px;
width: 300px;
}
}

</style>

