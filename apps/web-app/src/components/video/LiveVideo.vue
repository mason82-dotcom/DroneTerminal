<script setup lang="ts">
import { computed, inject, provide, ref, reactive, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import * as ovenplayer from 'ovenplayer'
import IconVue from '../general/IconVue.vue';


const props = defineProps<{
    wsUrl: string // e.g. ws://stream.rocks:3333/app/key
    hideControls?: boolean
}>()

const myId = '' + getCurrentInstance()?.uid
const video = ref<HTMLDivElement | null>(null)

const notSupported = ref(false)

const player = ref<ovenplayer.OvenPlayerInstance | null>(null)
const isPlaying = ref(false)

onMounted(()=>{
    if(!window.RTCPeerConnection){
        notSupported.value = true
    }

    video.value!.id = myId

    setupPlayer()
})

onBeforeUnmount(()=>{
    if(player.value){
        player.value.remove()
    }

    clearTimeout(timeoutHandle)
})

let timeoutHandle: any

function setupPlayer(){

    if(notSupported.value){
        return
    }

    if(player.value){
        player.value.remove()
    }

    if(timeoutHandle !== undefined){
        clearTimeout(timeoutHandle)
    }

    isPlaying.value = false

    try {
        player.value = ovenplayer.create(myId, {
            autoStart: true,
            autoFallback: true,
            mute: true,
            controls: props.hideControls !== true,
            sources: [{
                type: 'webrtc',
                file: props.wsUrl
            }],
            webrtcConfig: {
                timeoutMaxRetry: 999,
                connectionTimeout: 5000
            }
        })
    } catch (err){
        console.warn('failed to setup ovenplayer for livevideo', myId, video.value)
    }

    player.value!.on('stateChanged', evt => {
        isPlaying.value = evt.newstate === 'playing'
    })

    timeoutHandle = setTimeout(()=>{
        if(!isPlaying.value){
            setupPlayer()//retry
        }
    }, 1000 * 10)
}

</script>

<template>

    <div id="container" :class="[{hide_controls: props.hideControls === true}]">

        <template v-if="notSupported">Your device does not support WebRTC!</template>

        <template v-else>
            <div id="video" ref="video">

            </div>
            <div id="info-overlay" v-if="isPlaying">
                <div id="live">
                    <IconVue name="record2"></IconVue>live
                </div>
            </div>
            <div id="disconnected-cover" v-else>
                <IconVue name="arrow-repeat"></IconVue>&nbsp;connecting ...
            </div>
        </template>
    </div>

</template>

<style scoped lang="scss">

#container {
    position: relative;
    max-width: 100vw;
    max-height: 100vh;

    #disconnected-cover, #info-overlay {
        position: absolute;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #disconnected-cover {
        background: #222;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #info-overlay {
        padding: 0.5em;

        #live {
            font-size: 0.8em;
            display: inline-flex;
            padding: 0.1em 0.4em 0.1em 0.2em;
            color: red;
            border: 0.1em solid red;
            border-radius: 0.2em;
        }
    }
}

</style>

<style lang="scss">

#container.hide_controls .up-ui {
    display: none !important;
}

</style>
