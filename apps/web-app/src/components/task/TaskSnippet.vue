<script setup lang="ts">
import { ApiResponse_TaskGet } from 'openflighthub-api-client-sdk';
import Snippet from '../layout/Snippet.vue';
import TaskStateBadge from './TaskStateBadge.vue';
import IconVue from '../general/IconVue.vue';
import { ref } from 'vue';
import List from '../layout/List.vue';
import GeoObjectSnippet from '../geo-object/GeoObjectSnippet.vue';

const props = defineProps<{
    task: ApiResponse_TaskGet
    showDescription?: boolean
    showGeoObjects?: boolean
}>()

const geoObjectsExtended = ref(false)

</script>

<template>

    <Snippet :to-url="'/task/' + props.task.id">
        <h3 id="title">{{ props.task.name }} <TaskStateBadge :state="props.task.state"></TaskStateBadge></h3>
        <p v-if="props.showDescription" id="description">{{ props.task.description }}</p>

        <template v-if="props.showGeoObjects">
            <h4 @click.stop.prevent="geoObjectsExtended = !geoObjectsExtended" style="cursor: pointer;">Related GeoObjects ({{ props.task.geo_objects.length }})<IconVue :name="geoObjectsExtended ? 'caret-up-fill' : 'caret-down-fill'"></IconVue></h4>

            <List v-if="geoObjectsExtended">
                <GeoObjectSnippet v-for="geoObject of props.task.geo_objects.sort((a, b)=> a.id - b.id)" :key="geoObject.id" :geo-object="geoObject"></GeoObjectSnippet>
            </List>
        </template>

    </Snippet>

</template>

<style scoped lang="scss">

#title {
    display: flex;
    gap: 0.5em;
}

#description {
    font-style: italic;
}

</style>
