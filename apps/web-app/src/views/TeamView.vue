<script setup lang="ts">
import api from '@/api'
import FileImageOrIconVue from '@/components/general/FileImageOrIconVue.vue';
import Spacing from '@/components/layout/Spacing.vue';
import UserSnippet from '@/components/user/UserSnippet.vue';
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import LoadApiArrayWithIdParamInUrl from '@/components/functional/LoadApiArrayWithIdParamInUrl.vue';
import LoadApi from '@/components/functional/LoadApi.vue';
import ModalVue from '@/components/display/ModalVue.vue';
import ApiForm from '@/components/functional/form/ApiForm.vue';
import { ref } from 'vue';
import IconVue from '@/components/general/IconVue.vue';
import { Button, useConfirm, useToast, TabPanel, TabList, Tab, Tabs, TabPanels } from 'primevue';
import { getIdQueryFromRouteOrUseDefault } from '@/util/url';
import { useRoute, useRouter } from 'vue-router';
import WorkspaceSnippet from '@/components/workspace/WorkspaceSnippet.vue';
import WorkspaceCreateForm from '@/components/workspace/WorkspaceCreateForm.vue';
import TeamInviteMemberForm from '@/components/team/TeamInviteMemberForm.vue';

const showInviteMemberModal = ref(false)

const confirm = useConfirm()
const toast = useToast()
const router = useRouter()

function removeMember(teamId: number, userId: number) {
    confirm.require({
        message: 'Are you sure you want to remove this member from the team?',
        header: 'Confirm Removal',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            api.rest.team.member.delete({params: {teamId, userId}}).then(() => {
                toast.add({severity: 'success', summary: 'Member Removed', detail: 'The member has been removed from the team.'})
            }).catch(err => {
                toast.add({severity: 'error', summary: 'Error', detail: '' + err})
            })
        }
    })
}

const showCreateWorkspaceModal = ref(false)

</script>

<template>

    <LoadApiWithIdParamInUrl :api-method="api.rest.team.get" :config="{params: {}}" :id-params="['teamId']" v-slot="team">
        <Padding>
            <div id="top">
                <h1>Team: {{ team.data.name }}</h1>
                <FileImageOrIconVue :file-id="team.data.logo_file_id" :icon-name="'person-square'" :size="{em: 2}" :thumbnail="true"></FileImageOrIconVue>
            </div>

            <Spacing></Spacing>

            <h2>Owner</h2>
            <LoadApi :api-method="api.rest.user.get" :config="{params: {userId: team.data.owner_user_id}}" v-slot="owner">
                <UserSnippet :user="owner.data"></UserSnippet>
            </LoadApi>

            <Tabs :value="getIdQueryFromRouteOrUseDefault('tab', useRoute(), 0)" @update:value="evt=>{router.push({query: {tab:  '' + evt}})}">
                <TabList>
                  <Tab :value="0">Workspaces</Tab>
                  <Tab :value="1">Members</Tab>
                  <Tab :value="2">Settings</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel :value="0">
                        <h2>Workspaces</h2>

                        <Spacing></Spacing>

                        <Button @click="showCreateWorkspaceModal = true"><IconVue name="plus"></IconVue> Add Workspace</Button>

                        <LoadApiArrayWithIdParamInUrl :api-method="api.rest.team.workspaces.get" :config="{params: {}}" :id-params="['teamId']" v-slot="workspaces">
                            <List>
                                <WorkspaceSnippet v-for="workspace of workspaces.data" :key="workspace.id" :workspace="workspace">

                                </WorkspaceSnippet>
                            </List>
                            <span v-if="workspaces.data.length === 0">None</span>
                        </LoadApiArrayWithIdParamInUrl>


                        <ModalVue :visible="showCreateWorkspaceModal" @close="showCreateWorkspaceModal = false">
                            <WorkspaceCreateForm :type="'team'" :id="team.data.id" @created="showCreateWorkspaceModal = false" @cancel="showCreateWorkspaceModal = false"></WorkspaceCreateForm>
                        </ModalVue>

                    </TabPanel>
                    <TabPanel :value="1">

                        <h2>Members</h2>

                        <Spacing></Spacing>

                        <Button @click="showInviteMemberModal = true"><IconVue name="plus"></IconVue> Invite Member</Button>

                        <LoadApiArrayWithIdParamInUrl :api-method="api.rest.team.members.get" :config="{params: {}}" :id-params="['teamId']" v-slot="members">
                            <List>
                                <LoadApi v-for="member in members.data" :key="member.id" :api-method="api.rest.user.get" :config="{params: {userId: member.id}}" v-slot="user">
                                    <UserSnippet :user="user.data">
                                        <IconVue name="trash" @click.stop.prevent="removeMember(team.data.id, user.data.id)"></IconVue>
                                    </UserSnippet>
                                </LoadApi>
                            </List>
                            <span v-if="members.data.length === 0">None</span>
                        </LoadApiArrayWithIdParamInUrl>

                    </TabPanel>
                    <TabPanel :value="2">

                        <h2>Settings</h2>

                        <Spacing></Spacing>

                        TODO
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Padding>


        <ModalVue :visible="showInviteMemberModal" @close="showInviteMemberModal = false">
            <TeamInviteMemberForm :team-id="team.data.id" @created="showInviteMemberModal = false" @cancel="showInviteMemberModal = false"></TeamInviteMemberForm>
        </ModalVue>

    </LoadApiWithIdParamInUrl>

</template>

<style lang="scss" scoped>

#top {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;

    h1 {
        margin: 0;
    }
}

</style>
