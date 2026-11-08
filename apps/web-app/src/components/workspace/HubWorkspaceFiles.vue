<script setup lang="ts">
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import List from '../layout/List.vue';
import HubWorkspaceFile from './HubWorkspaceFile.vue';
import { ApiResponse_FileGet } from 'openflighthub-api-client-sdk';


const props = defineProps<{
    files: ApiResponse_FileGet[] // TODO we should not use the name "id" for this prop as this override the html id attribute
}>()

</script>

<template>

    <List :horizontal="true">
        <HubWorkspaceFile  v-for="file in props.files" :key="file.id" :file="file" class="workspace_file"></HubWorkspaceFile>
    </List>

</template>

<style scoped lang="scss">


.workspace_file {
   width: 15em !important;
   height: 15em !important;
}

</style>
