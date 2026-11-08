<script setup lang="ts">

import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import api from '@/api';
import OrganisationSnippet from '@/components/organisation/OrganisationSnippet.vue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';
import LoadApi from '@/components/functional/LoadApi.vue';

</script>

<template>

    <Padding>

        <h3>Your Organisations:</h3>

        <LoadApiArray :api-method="api.rest.user.myOrganisations.get" :config="{}" v-slot="myOrganisations">
            <List>
                <template v-for="organisation in myOrganisations.data" :key="organisation.id">
                    <LoadApi :api-method="api.rest.organisation.get" :config="{params: {organisationId: organisation.id}}" v-slot="organisation_full">
                        <OrganisationSnippet :organisation="organisation_full.data"></OrganisationSnippet>
                    </LoadApi>
                </template>
                <i v-if="myOrganisations.data.length === 0">None</i>
            </List>
        </LoadApiArray>

        <br>

        <h3>Your Teams:</h3>

        <LoadApiArray :api-method="api.rest.user.myTeams.get" :config="{}" v-slot="myTeams">
            <List>
                <TeamSnippet v-for="team in myTeams.data" :key="team.id" :id="team.id"></TeamSnippet>
                <i v-if="myTeams.data.length === 0">None</i>
            </List>
        </LoadApiArray>

    </Padding>

</template>

<style lang="scss" scoped>


</style>
