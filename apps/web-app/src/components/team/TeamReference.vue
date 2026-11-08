<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import ImgReference from '../display/ImgReference.vue';

const props = defineProps<{
    id: number
}>()

</script>

<template>

    <LoadApi :api-method="api.rest.team.get" :config="{params: { teamId: props.id }}" v-slot="team">
        <ImgReference :url="'/team/' + team.data.id" :file-id-or-icon-name="typeof team.data.logo_file_id === 'number' ? team.data.logo_file_id : 'person-square'">{{ team.data.name }}</ImgReference>
    </LoadApi>

</template>

<style scoped lang="scss">

// clone from primevue badge
#container {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;

    #image {
        height: 1em;
        width: auto;
        background-size: contain;
        background-position: center;
    }
}

</style>
