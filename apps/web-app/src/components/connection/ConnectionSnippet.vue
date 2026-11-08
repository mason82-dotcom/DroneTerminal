<script setup lang="ts">
import api from '@/api';
import Snippet from '../layout/Snippet.vue';
import LoadApi from '../functional/LoadApi.vue';
import RemoteControllerSnippet from '../remote_controller/RemoteControllerSnippet.vue';
import DroneSnippet from '../drone/DroneSnippet.vue';
import LinkVue from '../general/LinkVue.vue';

const props = defineProps<{
    connectionId: number
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.connection.get" :config="{
        params: {
            connectionId: props.connectionId
        }
    }" v-slot="scope">
        <Snippet :to-url="'/connection/' + props.connectionId">
            <LinkVue>Connection {{ scope.data.name }}</LinkVue>

            <RemoteControllerSnippet v-if="typeof scope.data.remote_controller_id === 'number'" :id="scope.data.remote_controller_id"></RemoteControllerSnippet>

            <DroneSnippet v-if="typeof scope.data.drone_id === 'number'" :id="scope.data.drone_id"></DroneSnippet>
        </Snippet>
    </LoadApi>

</template>

<style scoped lang="scss">


</style>
