<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { ApiResponse_DroneMediaGet } from 'openflighthub-api-client-sdk';
import Map from '../map/Map.vue';
import api from '@/api';
import { updateArray, updateObject } from '@/util/vue';
import { Color, Viewer } from 'cesium';
import MapPolygon from '../map/MapPolygon.vue';
import MapLine from '../map/MapLine.vue';
import MapPolyline from '../map/MapPolyline.vue';
import HubWorkspaceFile from '../workspace/HubWorkspaceFile.vue';
import LoadApi from '../functional/LoadApi.vue';
import { Button } from 'primevue';
import TimestampDisplay from '../display/TimestampDisplay.vue';
import dayjs from 'dayjs';
import TimeDisplay from '../display/TimeDisplay.vue';
import MapMarker from '../map/MapMarker.vue';
import Padding from '../layout/Padding.vue';
import RelativeContainer from '../layout/RelativeContainer.vue';
import IconVue from '../general/IconVue.vue';
import LinkVue from '../general/LinkVue.vue';
import { calculateVisibleTerrainInDirection, TerrainVisibilityResult } from '@/util/terrain';
import MapChessRect from '../map/MapChessRect.vue';

const CLIENT_COVERAGE_ENABLED = false

const props = defineProps<{
    media: ApiResponse_DroneMediaGet[0]
}>()


onMounted(parseData)
watch(()=>{
    return props.media
}, parseData, {deep: true})

const cameraLongitude = ref(0)
const cameraLatitude = ref(0)
const cameraHeight = ref(0)
const cameraHeading = ref(0)
const cameraPitch = ref(0)
const cameraFOV = ref(0)

const hasValidLocationInformation = ref(false)
const hasValidHeightInformation = ref(false)
const hasValidCameraAngleInformation = ref(false)

function parseData(){

    hasValidLocationInformation.value = !!props.media.camera_location?.position
    if(hasValidLocationInformation.value){
        cameraLongitude.value = props.media.camera_location!.position!.longitude
        cameraLatitude.value = props.media.camera_location!.position!.latitude
    } else {
        return
    }

    hasValidHeightInformation.value = typeof props.media.camera_location?.height === 'number'

    if(hasValidHeightInformation.value){
        cameraHeight.value = props.media.camera_location!.height! - 50//TODO fix this hack, looks like dji msl is 50m off german geoid
    }

    if(typeof props.media.camera_angles?.heading === 'number'){
        cameraHeading.value = props.media.camera_angles.heading
    }

    if(typeof props.media.camera_angles?.pitch === 'number'){
        cameraPitch.value = props.media.camera_angles.pitch
    }

    hasValidCameraAngleInformation.value = typeof props.media.camera_angles?.heading === 'number' && typeof props.media.camera_angles?.pitch === 'number'

    // cameraHeading.value = parsedMeta.metadata.gimbal_yaw_degree - 14 //TODO fix heading, looks like gimbal yaw degree is not correct

    cameraFOV.value = 48.5 * 0.8 //is Thermal Image of Mavic3 TODO make it work for visual images too
}

type Location = {
    position: {
        longitude: number
        latitude: number
    }
    elevation: number
    directDistance: number
    debug?: 'failed' | 'hole-start' | 'hole-end'
}

let coverage = reactive<{
    all: (Location & {ray?: {bearing: number, pitch: number, imagePosition: {x: number, y: number}}, meterSize: {horizontal: number, vertical: number}})[]
    outer: Location[]
    holes: Location[][]
}>({all: [], outer: [], holes: []})

onMounted(()=>{
    setTimeout(()=>{
        loadCoverage().catch(()=>{
            setTimeout(loadCoverage, 1000 * 1)
        })
    }, 100)
})

async function loadCoverage(){

    try {
        const response = await fetch('/api/media/ground-coverage/' + props.media.id, {
            method: 'get',
            credentials: 'include'
        })

        if(('' + response.status).startsWith('2') === false){
            throw new Error(response.statusText + ': ' + await response.text())
        }

        const res = JSON.parse(await response.text())
        updateArray(coverage.all, res.coverage.all)
        updateArray(coverage.outer, res.coverage.outer)
        if(coverage.holes.length > 100){
            alert('too many holes')
        } else {
            updateArray(coverage.holes, res.coverage.holes)
        }
    } catch (err){
        console.error('failed to load coverage', err)
        throw err
    }
}

/**
 *
 * @param x to right
 * @param y to bottom
 */
function getClosestLocationForRelativeImagePosition(x: number, y: number){
    let closestRay: typeof coverage.all[0] | false = false
    let closestRayDistance: number = Number.MAX_VALUE

    for(const loc of coverage.all){
        if(!loc.ray){
            continue
        }

        const dist = Math.sqrt((loc.ray.imagePosition.x - x)**2 + (loc.ray.imagePosition.y - y)**2)

        if(dist < closestRayDistance){
            closestRayDistance = dist
            closestRay = loc
        }
    }

    return closestRay
}

const viewerIsLoaded = ref(false)
let viewer: Viewer = null // if we make Viewer a reactive object, performance goes down the tube ...

const mapContainer = ref<HTMLElement>()


let hasCalculatedLastFocusPoint = ref(false)
let currentFocusPoint: {x: number, y: number, location: ReturnType<typeof getClosestLocationForRelativeImagePosition>} = reactive({
    x: 0.5,
    y: 0.5,
    location: false
})
let lastTimeFocusPointHasChanged = Date.now()

function focusPointChange(x: number, y: number){
    hasCalculatedLastFocusPoint.value = false
    lastTimeFocusPointHasChanged = Date.now()
    currentFocusPoint.x = x
    currentFocusPoint.y = y
}

setInterval(()=>{
    if(!hasCalculatedLastFocusPoint.value && (Date.now() - lastTimeFocusPointHasChanged) > 1000){
        console.log('calculcating current focus point')
        hasCalculatedLastFocusPoint.value = true
        currentFocusPoint.location = getClosestLocationForRelativeImagePosition(currentFocusPoint.x, currentFocusPoint.y)
    }
}, 100)

const viewSize = reactive({
    width: 0,
    height: 0
})

const coverageClient = reactive({} as TerrainVisibilityResult)

function refreshCoverageClientSoon(){
    if(!CLIENT_COVERAGE_ENABLED){
        return
    }
    setTimeout(refreshCoverageClient, 100)
}

async function refreshCoverageClient(){
    updateObject(coverageClient, await calculateVisibleTerrainInDirection(viewer, {
        headingDeg: cameraHeading.value,
        maxDistanceMeters: 5000,
        observerLonLat: [cameraLongitude.value, cameraLatitude.value],
        observerHeightMsl: hasValidHeightInformation ? cameraHeight.value : undefined
    }))
}

</script>

<template>

    <div id="drone-media-container">
        <div class="media_file">
            <div class="file">
                <LoadApi class="load_api" :api-method="api.rest.file.get" :config="{params: {fileId: props.media.file_id}}" v-slot="file">
                    <HubWorkspaceFile :file="file.data" always-load-original class="workspace_file" @focus-point-change="focusPointChange" @image-size-change="(width, height)=>{
                        viewSize.width = width
                        viewSize.height = height
                    }">

                        <RelativeContainer v-if="currentFocusPoint.location" :x="currentFocusPoint.location.ray.imagePosition.x" :y="currentFocusPoint.location.ray.imagePosition.y">
                            <Padding class="ray_info" @mousemove.stop @click.stop>
                                <div class="list">
                                    <div>Distance:&nbsp;{{ currentFocusPoint.location.directDistance }}m</div>
                                    <div>Elevation:&nbsp;{{ Math.round(currentFocusPoint.location.elevation) }}m</div>
                                    <div>Long:&nbsp;{{ currentFocusPoint.location.position.longitude.toFixed(6) }}</div>
                                    <div>Lat:&nbsp;{{ currentFocusPoint.location.position.latitude.toFixed(6) }}</div>
                                    <LinkVue :url="`https://www.outdooractive.com/en/map/?wt=(${currentFocusPoint.location.position.latitude},${currentFocusPoint.location.position.longitude})#zc=20,${currentFocusPoint.location.position.longitude},${currentFocusPoint.location.position.latitude}`" :force-new-tab="true">Outdooractive</LinkVue>
                                    <LinkVue :url="`https://www.google.com/maps/search/?api=1&query=${currentFocusPoint.location.position.latitude}%2C${currentFocusPoint.location.position.longitude}`" :force-new-tab="true">Google Maps</LinkVue>
                                </div>

                                <div class="icon_inner">
                                    <IconVue name="person-arms-up" :style="{'color':'#0f0', 'font-size': '' + (1.5/*TODO fix this x1.5 hack, the original data should be returning twice */ * 1.8 /* average human size */ * currentFocusPoint.location.meterSize.vertical * viewSize.height) + 'px'}"></IconVue>
                                </div>
                            </Padding>

                            <template v-slot:marker>
                                <IconVue name="person-arms-up" :style="{'color':'#0f0', 'font-size': '' + (1.5/*TODO fix this x1.5 hack, the original data should be returning twice */ * 1.8 /* average human size */ * currentFocusPoint.location.meterSize.vertical * viewSize.height) + 'px'}"></IconVue>
                            </template>

                        </RelativeContainer>

                    </HubWorkspaceFile>


                </LoadApi>
            </div>
            <div class="info">
                <div>
                    Captured at: <TimestampDisplay v-if="props.media.captured_at" :timestamp="props.media.captured_at"></TimestampDisplay><span v-else>?</span>
                </div>
                <div>
                    Uploaded at: <TimestampDisplay :timestamp="props.media.received_at"></TimestampDisplay>
                    <template v-if="typeof props.media.captured_at === 'number'">&nbsp;(<TimeDisplay v-if="props.media.captured_at" :time-in-ms="dayjs(props.media.received_at).diff(props.media.captured_at, 'ms')" lowest="s"></TimeDisplay>&nbsp;later)
                    </template>
                </div>
                <div>
                    Location:
                    <div v-if="props.media.camera_location" style="padding-left: 1em">
                        <div>Lng {{ props.media.camera_location.position?.longitude }}</div>
                        <div>Lat {{ props.media.camera_location.position?.latitude }}</div>
                        <div v-if="typeof props.media.camera_location?.height === 'number'">{{ props.media.camera_location?.height }} MSL</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="media_map" ref="mapContainer">
            <template v-if="hasValidLocationInformation">

                <Map v-if="mapContainer" :map-container="mapContainer" :start-point="{longitude: cameraLongitude, latitude: cameraLatitude}" :start-height="hasValidHeightInformation ? cameraHeight : 5000" :start-camera-heading="hasValidCameraAngleInformation ? cameraHeading : undefined" :start-camera-pitch="hasValidCameraAngleInformation ? cameraPitch : -90" :disable-user-control="false" :camera-f-o-v="cameraFOV" @viewer-loaded="(v)=>{viewer = v; viewerIsLoaded = true; refreshCoverageClientSoon()}" v-slot="map">

                    <div id="reset-camera-view">
                        <Button @click="map.resetCamera()">Reset</Button>
                    </div>

                    <MapMarker :position="[cameraLongitude, cameraLatitude]" :elevation="hasValidHeightInformation ? cameraHeight : undefined" :bearing="hasValidCameraAngleInformation ? cameraHeading : undefined" icon-url="/images/drone/icon.png" :icon-width="32" :icon-height="32" :color="Color.CYAN"></MapMarker>

                    <template v-if="coverage.all.length > 0 && false">
                        <MapLine v-for="p in coverage.all":from="{position: [cameraLongitude, cameraLatitude], elevation: cameraHeight}" :to="{position: [p.position.longitude, p.position.latitude], elevation: p.elevation}" :color="(p.debug === 'failed' ? Color.RED : p.debug === 'hole-start' ? Color.YELLOW : p.debug == 'hole-end' ? Color.ORANGE : Color.WHITE).withAlpha(0.4)"></MapLine>
                    </template>

                    <template v-if="coverage.holes.length > 0">
                        <MapPolygon v-for="hole in coverage.holes" :points="hole.map(p => [p.position.longitude, p.position.latitude, p.elevation])" :clamp-to-ground="true" :color="Color.RED.withAlpha(0.3)" :filled="true"></MapPolygon>

                    </template>

                    <MapPolyline key="outer" :points="coverage.outer.length === 0 ? [] : coverage.outer.concat(coverage.outer[0]).map(p => [p.position.longitude, p.position.latitude, p.elevation])" :clamp-to-ground="true" :color="Color.GREENYELLOW.withAlpha(0.5)"></MapPolyline>

                    <template v-if="(coverageClient.all instanceof Array)">
                        <MapChessRect v-for="point of coverageClient.all" :center="[point.longitude, point.latitude]" :color="point.visible ? Color.GREEN.withAlpha(0.5) : Color.RED.withAlpha(0.5)" :rect-size-meters="coverageClient.radialStepMeters"></MapChessRect>
                    </template>

                </Map>

            </template>
            <div v-else>No valid location</div>
        </div>
    </div>

</template>

<style scoped lang="scss">

#drone-media-container {
    display: flex;
    flex-direction: row;
    height: 100%;

    .media_file, .media_map {
        flex-grow: 1;
        width: 50%;
    }

    .media_file {
        display: flex;
        flex-direction: column;

        .file {
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0;
            display: flex;

            .load_api {
                flex-grow: 1;
            }
        }
    }

    .media_map {
        position: relative;

        #reset-camera-view {
            position: absolute;
            z-index: 1;
            top: 0;
            left: 50%;
            padding: 0.5em;
            transform: translateX(-50%);
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .ray_info {
        display: flex;
        flex-direction: row;
        gap: 5px;
        background-color: #222a;
        border-radius: 0.5em;
        position: relative;

        .list {
            display: flex;
            flex-direction: column;
        }

        .icon_inner {
            background: black;
            padding: 5px;
            line-height: 0;
            height: fit-content;
        }
    }
}

</style>
