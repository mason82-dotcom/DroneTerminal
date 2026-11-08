<script setup lang="ts">
import Snippet from '../layout/Snippet.vue';
import LinkVue from '../general/LinkVue.vue';
import FileImageOrIconVue from '../general/FileImageOrIconVue.vue';
import { ApiResponse_UserGet } from 'openflighthub-api-client-sdk';


const props = defineProps<{
    user: ApiResponse_UserGet
}>()

</script>

<template>

    <Snippet :min-width="100" centered horizontal :to-url="'/user/' + props.user.id">
        <FileImageOrIconVue :file-id="undefined/*TODO props.user.logo_file_id*/" :icon-name="'person-square'" :size="{em: 2}" :thumbnail="true"></FileImageOrIconVue>

        <LinkVue>{{ props.user.name }}</LinkVue>

        <slot></slot>
    </Snippet>

</template>
