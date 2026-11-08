<script setup lang="ts">
import { ref, onMounted } from 'vue';

import IconVue from '../general/IconVue.vue';
import { Button } from 'primevue';
import AbsoluteContainer from '../layout/AbsoluteContainer.vue';

const props = defineProps<{
    flex?: 'row' | 'column' // display flex
}>()

const container = ref(null as HTMLDivElement)

const isFullScreen = ref(false)

onMounted(async()=>{
    container.value.addEventListener('fullscreenchange', evt=>{
        isFullScreen.value =document.fullscreenElement && document.fullscreenElement === container.value ? true : false
    })
})

function toggleFullscreen(){
    if(document.fullscreenElement && document.fullscreenElement === container.value){
        document.exitFullscreen()
    } else {
        container.value.requestFullscreen()
    }
}

</script>

<template>

    <div id="container" ref="container" :class="{fullscreen: isFullScreen}" :flex="props.flex">

        <slot></slot>

        <AbsoluteContainer :x="10" :y="10" :z-index="200">
            <Button @click.stop="toggleFullscreen()">
                <IconVue id="toggle-fullscreen" :name="isFullScreen ? 'fullscreen-exit' : 'arrows-fullscreen'"></IconVue>
            </Button>
        </AbsoluteContainer>

    </div>

</template>

<style scoped lang="scss">

#container {
    position: relative;
    height: 100%;
    width: 100%;

    &[flex] {
        display: flex;

        &[flex="row"] {
            flex-direction: row;
        }

        &[flex="column"] {
            flex-direction: column;
        }
    }

    #toggle-fullscreen {
        cursor: pointer;
    }
}

</style>
