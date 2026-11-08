<script setup lang="ts">
import Snippet from '../layout/Snippet.vue';
import LinkVue from '../general/LinkVue.vue';
import { ApiResponse_WorkspaceGet } from 'openflighthub-api-client-sdk';


const props = defineProps<{
    workspace: ApiResponse_WorkspaceGet
}>()

</script>

<template>

    <Snippet :min-height="100" :min-width="100" centered :to-url="'/workspace/' + props.workspace.id">
        <LinkVue>{{ props.workspace.name }}</LinkVue>
    </Snippet>

</template>


<style lang="scss" scoped>

</style>