<script setup lang="ts">
import api from '@/api'
import LoadApi from '@/components/functional/LoadApi.vue';
import LoadApiArrayWithIdParamInUrl from '@/components/functional/LoadApiArrayWithIdParamInUrl.vue';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import FileImageOrIconVue from '@/components/general/FileImageOrIconVue.vue';
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import Spacing from '@/components/layout/Spacing.vue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';
import UserSnippet from '@/components/user/UserSnippet.vue';
import { ref } from 'vue';
import ModalVue from '@/components/display/ModalVue.vue';
import IconVue from '@/components/general/IconVue.vue';
import { Button } from 'primevue';
import TeamCreateForm from '@/components/team/TeamCreateForm.vue';

const showCreateTeamModal = ref(false)

</script>

<template>

    <LoadApiWithIdParamInUrl :api-method="api.rest.organisation.get" :config="{params: {}}" :id-params="['organisationId']" v-slot="organisation">
        <Padding>
            <div id="top">
                <h1>Organisation: {{ organisation.data.name }}</h1>
                <FileImageOrIconVue :file-id="organisation.data.logo_file_id" :icon-name="'buildings-fill'" :size="{em: 2}" :thumbnail="true"></FileImageOrIconVue>
            </div>

            <Spacing></Spacing>

            <h2>Owner</h2>
            <LoadApi :api-method="api.rest.user.get" :config="{params: {userId: organisation.data.owner_user_id}}" v-slot="owner">
                <UserSnippet :user="owner.data"></UserSnippet>
            </LoadApi>

            <Spacing></Spacing>

            <h2>Teams</h2>

            <Spacing></Spacing>

            <Button @click="showCreateTeamModal = true"><IconVue name="plus"></IconVue> Add Team</Button>

            <Spacing></Spacing>

            <LoadApiArrayWithIdParamInUrl :api-method="api.rest.organisation.teams.get" :config="{params: {}}" :id-params="['organisationId']" v-slot="teams">
                <List>
                    <TeamSnippet v-for="team of teams.data" :id="team.id" :key="team.id"></TeamSnippet>
                </List>
                <span v-if="teams.data.length === 0">None</span>
            </LoadApiArrayWithIdParamInUrl>
        </Padding>


        <ModalVue :visible="showCreateTeamModal" @close="showCreateTeamModal = false">
            <TeamCreateForm :organisationId="organisation.data.id" @created="showCreateTeamModal = false" @cancel="showCreateTeamModal = false"></TeamCreateForm>
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
