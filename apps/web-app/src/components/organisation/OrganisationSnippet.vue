<script setup lang="ts">
import Snippet from '../layout/Snippet.vue';
import LinkVue from '../general/LinkVue.vue';
import FileImageOrIconVue from '../general/FileImageOrIconVue.vue';
import { ApiResponse_OrganisationGet } from 'openflighthub-api-client-sdk';


const props = defineProps<{
    organisation: ApiResponse_OrganisationGet
}>()

</script>

<template>

    <Snippet :min-width="100" centered horizontal :to-url="'/organisation/' + props.organisation.id">
        <FileImageOrIconVue :file-id="props.organisation.logo_file_id" :icon-name="'buildings-fill'" :size="{em: 2}" :thumbnail="true"></FileImageOrIconVue>

        <LinkVue>{{ props.organisation.name }}</LinkVue>
    </Snippet>

</template>
