<script setup lang="ts">
import api from '@/api';
import List from '@/components/layout/List.vue';

import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import ConnectionSnippet from '@/components/connection/ConnectionSnippet.vue';
import HubWorkspaceMap from '@/components/workspace/HubWorkspaceMap.vue';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Button } from 'primevue';
import Padding from '@/components/layout/Padding.vue';
import { useRoute, useRouter } from 'vue-router';
import { getIdQueryFromRouteOrUseDefault } from '@/util/url';
import ConnectionLiveStream from '@/components/video/ConnectionLiveStream.vue';
import HubWorkspaceFiles from '@/components/workspace/HubWorkspaceFiles.vue';
import DroneSnippet from '@/components/drone/DroneSnippet.vue';
import { uniqueProperty } from '@/util/array';
import LoadApiArrayWithIdParamInUrl from '@/components/functional/LoadApiArrayWithIdParamInUrl.vue';
import MissionSnippet from '@/components/mission/MissionSnippet.vue';
import ModalVue from '@/components/display/ModalVue.vue';
import { ref } from 'vue';
import IconVue from '@/components/general/IconVue.vue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';
import {DataTable, Column} from 'primevue';
import MissionCreateForm from '@/components/mission/MissionCreateForm.vue';
import WorkspaceInviteTeamForm from '@/components/workspace/WorkspaceInviteTeamForm.vue';

const router = useRouter()

const showCreateMissionModal = ref(false)

const showInviteTeamModal = ref(false)

</script>

<template>

   <LoadApiWithIdParamInUrl :api-method="api.rest.workspace.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="workspace">
      <Padding>
         <h1>Workspace {{ workspace.data.name }}</h1>

         <LoadApiArrayWithIdParamInUrl :api-method="api.rest.workspace.connections.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="connections">

            <Tabs :value="getIdQueryFromRouteOrUseDefault('tab', useRoute(), 0)" @update:value="evt=>{router.push({query: {tab:  '' + evt}})}">
               <TabList>
                  <Tab :value="0">Map</Tab>
                  <Tab :value="1">Missions</Tab>
                  <Tab :value="2">Drones</Tab>
                  <Tab :value="3">Streams</Tab>
                  <Tab :value="4">Files</Tab>
                  <Tab :value="5">Connections</Tab>
                  <Tab :value="6">Special Views</Tab>
                  <Tab :value="7">Settings</Tab>
               </TabList>
               <TabPanels>
                  <TabPanel :value="0">
                     <HubWorkspaceMap :workspace-id="workspace.data.id" :connections="connections.data" :longitude="workspace.data.longitude" :latitude="workspace.data.latitude" style="width: 100%; height: 70vh;"></HubWorkspaceMap>
                  </TabPanel>
                  <TabPanel :value="1">
                     <LoadApiArrayWithIdParamInUrl :api-method="api.rest.workspace.missions.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="missions">

                        <Button @click="showCreateMissionModal = true"><IconVue name="plus-lg"></IconVue> Create Mission</Button>
                        <List>
                           <MissionSnippet v-for="mission of missions.data.sort((a, b) => a.id - b.id)" :mission="mission" show-tasks></MissionSnippet>
                        </List>

                        <ModalVue :visible="showCreateMissionModal" @close="showCreateMissionModal = false">
                           <MissionCreateForm :workspace-id="workspace.data.id" @created="showCreateMissionModal = false" @cancel="showCreateMissionModal = false"></MissionCreateForm>
                        </ModalVue>

                     </LoadApiArrayWithIdParamInUrl>
                  </TabPanel>
                  <TabPanel :value="2">
                     <List>
                        <DroneSnippet v-for="droneId in uniqueProperty(connections.data, 'drone_id').sort()" :id="droneId!"></DroneSnippet>
                     </List>
                  </TabPanel>
                  <TabPanel :value="3">
                     <List :horizontal="true">
                        <ConnectionLiveStream v-for="connection in connections.data.sort((a, b) => a.id - b.id)" :key="connection.id" :connectionId="connection.id"></ConnectionLiveStream>
                     </List>
                  </TabPanel>
                  <TabPanel :value="4">
                     <LoadApiArrayWithIdParamInUrl :api-method="api.rest.workspace.files.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="workspaceFiles">
                        <HubWorkspaceFiles :files="workspaceFiles.data"></HubWorkspaceFiles>
                     </LoadApiArrayWithIdParamInUrl>
                  </TabPanel>
                  <TabPanel :value="5">
                     <List>
                        <ConnectionSnippet v-for="connection in connections.data.sort((a, b) => a.id - b.id)" :workspace-id="workspace.data.id" :connection-id="connection.id"></ConnectionSnippet>
                     </List>
                  </TabPanel>
                  <TabPanel :value="6">
                     <h3>Special Views:</h3>
                     <List>
                        <RouterLink :to="'/workspace/' + workspace.data.id + '/air-space-monitoring'">Air Space Monitoring</RouterLink>
                     </List>
                  </TabPanel>
                  <TabPanel :value="7">
                     <!-- TODO only users that own workspace (team or organization) should be able to edit -->



                        <h3>Access</h3>

                        <LoadApiArrayWithIdParamInUrl :api-method="api.rest.workspace.permissions.get" :config="{params: {}}" :id-params="['workspaceId']" v-slot="permissions">

                           <Button @click="showInviteTeamModal = true"><IconVue name="plus-lg"></IconVue>Invite Team</Button>

                           <ModalVue :visible="showInviteTeamModal" @close="showInviteTeamModal = false">
                              <WorkspaceInviteTeamForm :workspace="workspace.data" @created="showInviteTeamModal = false" @cancel="showInviteTeamModal = false"></WorkspaceInviteTeamForm>
                           </ModalVue>

                           <DataTable :value="permissions.data" show-gridlines striped-rows sort-field="team_id" :sort-order="1">
                              <Column field="team_id" hidden sortable></Column>
                              <Column field="team" header="Team" sortable>
                                 <template #body="slotProps">
                                    <TeamSnippet :id="slotProps.data.team_id"></TeamSnippet>
                                 </template>
                              </Column>
                              <Column field="actions" header="">
                                 <template #body="slotProps">
                                       <Button severity="danger" @click="api.rest.workspace.kickTeam.post({
                                          params: {workspaceId: workspace.data.id},
                                          data: {team_id: slotProps.data.team_id}
                                          })"><IconVue name="x-lg"></IconVue>Kick Team</Button>
                                 </template>
                              </Column>
                        </DataTable>

                        </LoadApiArrayWithIdParamInUrl>

                  </TabPanel>
               </TabPanels>
            </Tabs>

         </LoadApiArrayWithIdParamInUrl>

      </Padding>
   </LoadApiWithIdParamInUrl>

</template>

<style scoped lang="scss">

</style>

