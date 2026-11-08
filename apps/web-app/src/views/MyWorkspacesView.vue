<script setup lang="ts">

import WorkspaceSnippet from '@/components/workspace/WorkspaceSnippet.vue';
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import LinkableDeviceInfo from '@/components/link/LinkableDeviceInfo.vue';
import useMainStore from '@/stores/main';

const store = useMainStore()

</script>

<template>

    <LinkableDeviceInfo></LinkableDeviceInfo>

    <Padding>

        <h3>Your Workspaces:</h3>

        <List horizontal>
            <WorkspaceSnippet v-for="workspace, index in store.myWorkspaces" :key="index" :workspace="workspace"></WorkspaceSnippet>
        </List>

    </Padding>

</template>

<style lang="scss" scoped>


</style>
