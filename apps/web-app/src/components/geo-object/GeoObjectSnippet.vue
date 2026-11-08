<script setup lang="ts">
import { ApiResponse_WorkspaceGeoObjectsGet } from 'openflighthub-api-client-sdk';
import Snippet from '../layout/Snippet.vue';
import GeoObjectTypeBadge from './GeoObjectTypeBadge.vue';
import { GeoObjectFocusEvent } from './GeoObjectEvents.js';
import { inject } from 'vue';

const props = defineProps<{
    geoObject: ApiResponse_WorkspaceGeoObjectsGet[number]
}>()

const mapContainer = inject<HTMLElement>('mapContainer')

function emitFocus(){
    mapContainer!.dispatchEvent(new GeoObjectFocusEvent(props.geoObject.id))
}

</script>

<template>

    <Snippet @click.prevent.stop="emitFocus" class="snippet_geoobject">
        <h3 id="title">{{ props.geoObject.name }} <GeoObjectTypeBadge :type="props.geoObject.type" :sub-type="props.geoObject.sub_type"></GeoObjectTypeBadge></h3>
    </Snippet>

</template>

<style scoped lang="scss">

.snippet_geoobject {
    cursor: pointer;
    border: 0.1em solid transparent;

    &:hover {
        border-color: var(--color-neutral-light);
    }
}

#title {
    display: flex;
    gap: 0.5em;
}

</style>
