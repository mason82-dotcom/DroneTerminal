<script setup lang="ts">
import api from '@/api';
import SnippetWithImage from '../layout/SnippetWithImage.vue';
import LoadApi from '../functional/LoadApi.vue';
import RemoteControllerType from './RemoteControllerType.vue';
import CopyToClipboard from '../functional/CopyToClipboard.vue';

const props = defineProps<{
    id: number
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.remoteController.get" :config="{params: {remoteControllerId: props.id}}" v-slot="scope">
        <SnippetWithImage :image-url="'/images/remote_controller/type/' + scope.data.type + '.png'">
            <h3>Type: <RemoteControllerType :type="scope.data.type"></RemoteControllerType></h3>
            <h4><CopyToClipboard :value="scope.data.serial_number">SN: {{ scope.data.serial_number }}</CopyToClipboard></h4>
        </SnippetWithImage>
    </LoadApi>

</template>
