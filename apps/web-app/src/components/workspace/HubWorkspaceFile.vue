<script setup lang="ts">
import LoadApi from '../functional/LoadApi.vue';
import api from '@/api';
import Padding from '../layout/Padding.vue';
import { Button } from 'primevue';
import IconVue from '../general/IconVue.vue';
import { downloadUrl } from '@/util/download';
import { computed, onMounted, ref } from 'vue';
import { ApiResponse_FileGet } from 'openflighthub-api-client-sdk';


const props = defineProps<{
    file: ApiResponse_FileGet
    alwaysLoadOriginal?: boolean
}>()

const emits = defineEmits<{
    imageSizeChange: [width: number, height: number]
    focusPointChange: [x: number, y: number]
}>()

const showFullscreen = ref(false)
const wasFullscreenAtLeastOnce = ref(false)

function handleClick(){
    showFullscreen.value = !showFullscreen.value
    if(showFullscreen.value){
        wasFullscreenAtLeastOnce.value = true
    }
}

function closeFullScreen(){
    showFullscreen.value = false
}

const showOriginal = computed(()=>{
    return showFullscreen.value || typeof props.file.thumbnail_format !== 'string' || props.alwaysLoadOriginal === true
})

const view = ref<HTMLElement>(null)

function mouseMove(evt: MouseEvent){
    //@ts-ignore
    const rect = evt.target.getBoundingClientRect()
    const x = evt.clientX - rect.left
    const y = evt.clientY - rect.top

    const ratioX = x / view.value.offsetWidth
    const ratioY = y / view.value.offsetHeight

    emits('focusPointChange', ratioX, ratioY)//TODO fix this! Its not correct because the img inside the view div is adjusting its size to fit into the container
}

onMounted(()=>{
    window.addEventListener('resize', triggerImageSizeChange)
    triggerImageSizeChange()
})

function triggerImageSizeChange(){
    const rect = view.value.getBoundingClientRect()
    emits('imageSizeChange', rect.width, rect.height)
}

</script>

<template>

    <div id="file" :class="{fullscreen: showFullscreen}">
        <div id="view" @click.stop="handleClick" @mousemove="mouseMove" ref="view">
            <img v-show="showOriginal" :src="api.getFileDataUrl(props.file.id)" loading="lazy" fetchpriority="low" :alt="'File ' + props.file.id">
            <img v-show="!showOriginal" :src="api.getFileThumbnailUrl(props.file.id)" loading="lazy" fetchpriority="low" :alt="'File ' + props.file.id + ' Thumbnail'">

            <slot/>
        </div>
        <div id="actions">
            <Padding>
                <div>
                    <Button><IconVue name="download" @click="downloadUrl(api.getFileDataUrl(props.file.id), file.name)"></IconVue></Button>
                    <Button v-show="showFullscreen"><IconVue name="x-lg" @click.self.stop="closeFullScreen"></IconVue></Button>
                </div>
            </Padding>
        </div>
        <div id="info">
            <Padding>
                {{ props.file.name }}
            </Padding>
        </div>
    </div>

</template>

<style scoped lang="scss">

    #file {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        &.fullscreen {
            position: fixed;
            z-index: 100000;
            top: 0;
            left: 0;
            height: 100vh !important;
            width: 100vw !important;
            background: #000;

            #info {
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }

        #view {
            display: flex;
            position: relative;
            flex-grow: 1;
            background: var(--neutral-darkest);

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: center;
                margin: auto;
                background-color: #000;
            }
        }

        #actions {
            display: none;
            position: absolute;
            top: 0;
            width: 100%;
            background: #0006;
            flex-direction: row;
            justify-content: flex-end;

            div {
                display: flex;
                gap: 1em
            }
        }

        &:hover #actions {
            display: flex;
        }

        #info {
            width: 100%;
            background: #0006;
            font-size: 0.8em;
            flex-grow: 0;
        }
    }

</style>
