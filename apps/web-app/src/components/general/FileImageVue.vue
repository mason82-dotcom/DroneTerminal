<script setup lang="ts">
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import ImageVue from './ImageVue.vue';


const props = defineProps<{
    fileId: number
    size: {pixel: number} | {em: number} | {percent: number}
    thumbnail?: boolean
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.file.get" :config="{params: {fileId: props.fileId}}" v-slot="file">
        <ImageVue :url="props.thumbnail ? api.getFileThumbnailUrl(file.data.id) : api.getFileDataUrl(file.data.id)" :size="props.size" :alt="file.data.name"></ImageVue>
    </LoadApi>

</template>
