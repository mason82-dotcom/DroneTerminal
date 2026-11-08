<script setup lang="ts">
import { computed } from 'vue';
import IconVue from './IconVue.vue';

const props = defineProps<{
    url?: string
    forceNewTab?: boolean
}>()

const isExternal = computed(()=>{
    if(typeof props.url !== 'string'){
        return false
    }

    if(props.url.startsWith('http://') || props.url.startsWith('https://')){
        const url = new URL(props.url)
        return url.hostname !== document.location.hostname
    } else {
        return false
    }
})

const target = computed(()=>{
    if(isExternal.value || props.forceNewTab){
        return '_blank'
    } else {
        return ''
    }
})

</script>

<template>

    <a :class="['link', isExternal ? 'external' : '']" :href="props.url" :target="target">
        <IconVue v-if="isExternal" name="box-arrow-up-right" id="external-icon"></IconVue>
        <slot></slot>
    </a>

</template>

<style lang="scss" scoped>

    .link {
        text-decoration: underline;
        cursor: pointer;
        color: var(--neutral-light);
        white-space: nowrap;

        #external-icon {
            margin-right: 0.5em;
        }

        &:hover {
            color: var(--neutral-lighter) !important;
        }

        &:visited {
            color: var(--neutral-light);
        }
    }

</style>
