<script setup lang="ts">
import { ref, watch, unref, onMounted } from 'vue';
import { ApiResponse_FlightGet } from 'openflighthub-api-client-sdk';
import FlightSimulation from './FlightSimulation.vue';
import { Button } from 'primevue';
import PlayableTrack, { PlayableTrack_State } from '@/components/flight/PlayableTrack';


const props = defineProps<{
    flight : ApiResponse_FlightGet
}>()


const playableTrack = ref<PlayableTrack | undefined>(undefined)

const playableTrackState = ref<PlayableTrack_State>('stopped')

const flightSimulation = ref<InstanceType<typeof FlightSimulation> | null>(null)

const playbackSpeed = ref(1)

async function init(){

    playableTrack.value = new PlayableTrack(unref(props.flight.track))
    playableTrack.value.addListener('stateChange', state => {
        playableTrackState.value = state
    })

    playableTrack.value.addListener('positionUpdate', ({position, meta, progress}) => {
        flightSimulation.value!.setCameraPosition({
            position: {
                longitude: position.longitude,
                latitude: position.latitude,
                height: position.height
            },
            cameraOrientation:{
                heading: meta.calculatedHeading,
                pitch: 0,
                roll: 0
            }
        })
    })
}

onMounted(init)

watch(()=>{
    return props.flight
}, init)

function setPlaybackSpeed(speed: number){
    const speedInConstraints = Math.max(0.1, Math.min(speed, 20))
    playbackSpeed.value = speedInConstraints
    playableTrack.value!.setPlaybackSpeed(speedInConstraints)
}

</script>

<template>

    <div id="container">
        <div id="controls">
            <Button label="Play" :disabled="playableTrackState === 'playing'" @click="playableTrack!.play(true)"></Button>
            <Button label="Pause" :disabled="playableTrackState !== 'playing'" @click="playableTrack!.pause()"></Button>
            <Button label="Stop" :disabled="playableTrackState === 'stopped'" @click="playableTrack!.stop()"></Button>

            <Button label="<<":disabled="playableTrackState !== 'playing'" @click="setPlaybackSpeed(playbackSpeed / 2)"></Button>
            {{ playbackSpeed }}x
            <Button label=">>":disabled="playableTrackState !== 'playing'" @click="setPlaybackSpeed(playbackSpeed * 2)"></Button>

        </div>
        <FlightSimulation ref="flightSimulation"></FlightSimulation>
    </div>

</template>
