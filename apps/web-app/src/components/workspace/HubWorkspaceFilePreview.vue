<script setup lang="ts">
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import Padding from '../layout/Padding.vue';


const props = defineProps<{
    id: number // TODO we should not use the name "id" for this prop as this override the html id attribute
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.file.get" :config="{params: {fileId: props.id}}" v-slot="file">

        <div id="file" >
            <div id="view">
                <img :src="api.getFileThumbnailUrl(props.id)" loading="lazy" fetchpriority="low" :alt="'File ' + props.id + ' Thumbnail'">
            </div>
            <div id="info">
                <Padding>
                    {{ file.data.name }}
                </Padding>
            </div>
        </div>
    </LoadApi>

</template>

<style scoped lang="scss">

    #file {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        #view {
            flex-grow: 1;

            img {
                object-fit: contain;
                object-position: center;
                margin: auto;
                width: 100%;
                height: 100%;
                background-color: #000;
            }
        }

        #info {
            width: 100%;
            background: #0006;
            font-size: 0.8em;
            flex-grow: 0;
        }
    }

</style>
