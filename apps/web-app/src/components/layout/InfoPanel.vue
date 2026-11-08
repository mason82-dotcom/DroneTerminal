<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { deviceSupportsOpenFlightHubConnectLink, OpenFlightHubConnectLinkManager } from '@/sdks/openflighthub-connect-link-sdk';
import Padding from './Padding.vue';
import IconVue from '../general/IconVue.vue';

const props = defineProps<{
    title?: string
    inline?: boolean
}>()

const supportsOpenFlightHubConnectLink = ref(false)
const isLinkedToOpenFlightHubConnect = ref(false)

onMounted(async ()=>{
    const supports = deviceSupportsOpenFlightHubConnectLink()
    if(supports){

        const manager = new OpenFlightHubConnectLinkManager()
        if(await manager.deviceIsLinked()){
            isLinkedToOpenFlightHubConnect.value = true
        }

        supportsOpenFlightHubConnectLink.value = supports
    }
})

const show = ref(true)


</script>

<template>

    <div id="info-panel" :class="{inline: props.inline}" v-if="show">
        <Padding>
            <div id="title">
                <IconVue id="info-icon" name="info-circle"></IconVue>{{ props.title || $t("info_panel.information") }}
            </div>
            <IconVue v-if="!props.inline" id="close" name="x-lg" @click="show = false"></IconVue>
            <Padding>
                <slot></slot>
            </Padding>
        </Padding>
    </div>

</template>

<style lang="scss" scoped>

#info-panel {
    display: inline-flex;
    flex-direction: column;
    border: 0.1em solid var(--neutral-light);

    &:not(.inline){
        position: fixed;
        z-index: 10;
        top: 1em;
        left: 50%;
        transform: translateX(-50%);
        background: var(--neutral-dark);
    }

    #title {
        font-style: italic;
    }

    #info-icon {
        margin-right: 0.5em;
    }

    #close {
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        transition: all 0.2s ease;

        &:hover {
            color: var(--neutral-lighter);
        }
    }
}

</style>
