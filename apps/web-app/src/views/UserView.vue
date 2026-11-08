<script setup lang="ts">
import api from '@/api'
import FileImageOrIconVue from '@/components/general/FileImageOrIconVue.vue';
import Spacing from '@/components/layout/Spacing.vue';
import Padding from '@/components/layout/Padding.vue';
import LoadApiWithIdParamInUrl from '@/components/functional/LoadApiWithIdParamInUrl.vue';
import TeamSnippet from '@/components/team/TeamSnippet.vue';

</script>

<template>

    <LoadApiWithIdParamInUrl :api-method="api.rest.user.get" :config="{params: {}}" :id-params="['userId']" v-slot="user">
        <Padding>
            <div id="top">
                <h1>User: {{ user.data.name }}</h1>
                <FileImageOrIconVue :file-id="undefined /* at some point support profile pictures */" :icon-name="'person-square'" :size="{em: 2}" :thumbnail="true"></FileImageOrIconVue>
            </div>

            <Spacing></Spacing>

            <TeamSnippet v-if="typeof user.data.team_id == 'number'" :id="user.data.team_id"></TeamSnippet>
            <p v-else>No team assigned</p>

        </Padding>
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
