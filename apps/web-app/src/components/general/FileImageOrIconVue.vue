<script setup lang="ts">
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import ImageVue from './ImageVue.vue';
import IconVue, { IconName } from './IconVue.vue';


const props = defineProps<{
    fileId?: number
    iconName: IconName
    size: {pixel: number} | {em: number}
    thumbnail?: boolean
}>()
</script>

<template>


    <LoadApi v-if="typeof props.fileId === 'number'" :api-method="api.rest.file.get" :config="{params: {fileId: props.fileId}}" v-slot="file">
        <ImageVue :url="props.thumbnail ? api.getFileThumbnailUrl(file.data.id) : api.getFileDataUrl(file.data.id)" :size="props.size" :alt="file.data.name"></ImageVue>
    </LoadApi>
    <IconVue v-else :name="props.iconName" :size="props.size"></IconVue>

</template>
