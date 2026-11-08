<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import LiveVideo from './LiveVideo.vue';
import api from '@/api';
import IconVue from '../general/IconVue.vue';
import { ApiResponse_ConnectionGet, ApiResponse_ConnectionLiveShareKeysPost } from 'openflighthub-api-client-sdk';
import { updateObject } from '@/util/vue';
import IconsStacked from '../general/IconsStacked.vue';
import Spacing from '../layout/Spacing.vue';
import ModalVue from '../display/ModalVue.vue';
import ApiForm from '../functional/form/ApiForm.vue';
import dayjs from 'dayjs';
import QRCodeUrl from '../functional/qrcode/QRCodeUrl.vue';

const props = defineProps<{
    connectionId: number
}>()

const myStreamToken = ref('')

const connection = reactive({} as ApiResponse_ConnectionGet)

onMounted(async()=>{
    myStreamToken.value = (await api.rest.auth.streamToken.get()).token

    api.live.subscribeToDbRowUpdate('connections', props.connectionId, updateConnection)//TODO doesnt work with props.connectionId change

    await updateConnection()
})

async function updateConnection(){
    updateObject(connection, await api.rest.connection.get({params: {connectionId: props.connectionId}}))
}

const showFullscreen = ref(false)

const showShare = ref(false)

const createdLiveShareKey = ref<ApiResponse_ConnectionLiveShareKeysPost | null>(null)

    const liveShareUrl = computed(() => {
        if(!createdLiveShareKey.value){
            return ''
        }

        return 'https://hub.openflighthub.org/live/' + props.connectionId + '/' + createdLiveShareKey.value.key
    })

</script>

<template>


    <div id="connection-live-stream" :class="{fullscreen: showFullscreen}">
        <div id="top-info">
            <span>Connection {{ props.connectionId }}</span>
        </div>

        <IconVue id="fullscreen-toggle" :name="showFullscreen ? 'fullscreen-exit' : 'arrows-fullscreen'" @click="showFullscreen = !showFullscreen"></IconVue><!-- TODO replace this custom solution with Fullscreenable.vue -->

        <IconVue id="share-button" name="share" @click="showShare = true"></IconVue>

        <div v-if="!myStreamToken">
            Loading ...
        </div>
        <template v-else>
            <LiveVideo v-if="connection.stream_is_alive === true" class="live_video" :ws-url="'wss://stream.openflighthub.org:3334/ofh/' + props.connectionId + '?auth=' + myStreamToken" :hide-controls="true"></LiveVideo>
            <div v-else class="not_live">
                <IconsStacked :names="['broadcast', 'slash-lg']" :colors="['red', undefined]"></IconsStacked><Spacing></Spacing>Stream Not Alive
            </div>
        </template>

        <ModalVue :visible="showShare" @close="showShare = false">

            <ApiForm v-if="!createdLiveShareKey" type="create" title="Share Live Stream" :api-method="api.rest.connection.liveShareKeys.post" :params="{connectionId: props.connectionId}" :fields="{
                name: {type: 'text'},
                valid_until: {type: 'date-with-time', min: new Date()}
            }" :editable-fields="['name', 'valid_until']" :readable-labels="{valid_until: 'expiration'}" :initial-values="{valid_until: dayjs().add(7, 'day').toISOString()}" @created="key => {
                createdLiveShareKey = key
            }"></ApiForm>

            <div v-if="createdLiveShareKey" id="done-sharing">
                <p>Share this link with others to allow them to view the live stream:</p>
                <br/>
                <p><a :href="liveShareUrl" target="_blank">{{ liveShareUrl }}</a></p>
                <br/>
                <p>
                    <QRCodeUrl :url="liveShareUrl" with-logo></QRCodeUrl>
                </p>
            </div>

        </ModalVue>

    </div>

</template>

<style scoped lang="scss">

#connection-live-stream {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 300px;
    height: calc( 200px + 3em);
    cursor: pointer;
    background-color: var(--neutral-darkest);

    #fullscreen-toggle, #share-button {
        position: absolute;
        font-size: 1.3em;
        top: 0.5em;
        color: var(--primary);

        &:hover {
            color: var(--neutral-light);
        }
    }

    #fullscreen-toggle {
        right: 0.5em;
    }

    #share-button {
        left: 0.5em;
    }

    #top-info {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
        flex-grow: 0;
    }

    .live_video {
        flex-grow: 1;
    }

    &.fullscreen {
        position: fixed;
        top: 0;
        left: 3vw;
        z-index: 10000;
        width: 97vw;
        height: 100vh;
    }

    .not_live {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }
}

#done-sharing {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1em;
}

</style>
