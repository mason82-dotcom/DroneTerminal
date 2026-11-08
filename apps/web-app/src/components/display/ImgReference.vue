<script setup lang="ts">
import api from '@/api';
import { RouterLink } from 'vue-router';
import IconVue, { IconName } from '../general/IconVue.vue';

const props = defineProps<{
    fileIdOrIconName: number | IconName
    url: string
}>()

</script>

<template>

    <RouterLink :to="props.url">
        <div id="container">
            <div v-if="typeof props.fileIdOrIconName === 'number'" id="image" :style="{ backgroundImage: 'url(' + api.getFileDataUrl(props.fileIdOrIconName) + ')' }"></div>
            <IconVue v-else :name="props.fileIdOrIconName"></IconVue>
            <span>
                <slot></slot>
            </span>
        </div>
    </RouterLink>

</template>

<style scoped lang="scss">

// clone from primevue badge
#container {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.2em 0.5em;
    border-radius: 0.5em;
    background: var(--neutral-darkest);

    #image {
        height: 1em;
        width: auto;
        background-size: contain;
        background-position: center;
    }

    &:hover {
        background-color: var(--neutral-dark);
    }
}

</style>
