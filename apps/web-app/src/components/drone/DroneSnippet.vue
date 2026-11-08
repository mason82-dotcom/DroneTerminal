<script setup lang="ts">
import api from '@/api';
import SnippetWithImage from '../layout/SnippetWithImage.vue';
import LoadApi from '../functional/LoadApi.vue';
import DroneType from './DroneType.vue';
import CopyToClipboard from '../functional/CopyToClipboard.vue';

const props = defineProps<{
    id: number
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.drone.get" :config="{params: {droneId: props.id}}" v-slot="scope">
        <SnippetWithImage :image-url="'/images/drone/type/' + scope.data.type + '.png'" :to-url="'/drone/' + scope.data.id">
            <h3>{{ scope.data.name }}</h3>
            <h4>Type: <DroneType :type="scope.data.type"></DroneType></h4>
            <h4><CopyToClipboard :value="scope.data.serial_number">SN: {{ scope.data.serial_number }}</CopyToClipboard></h4>
        </SnippetWithImage>
    </LoadApi>

</template>

<style scoped lang="scss">

</style>
