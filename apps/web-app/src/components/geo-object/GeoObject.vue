<script setup lang="ts">
import MapMarker from '../map/MapMarker.vue';
import { Color } from 'cesium';
import { ApiResponse_WorkspaceGeoObjectsGet } from 'openflighthub-api-client-sdk';
import { getColorForHex } from '@/util/cesium';
import MapPolyline from '../map/MapPolyline.vue';
import MapPolygon from '../map/MapPolygon.vue';
import MapCircle from '../map/MapCircle.vue';
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue';
import MapDrawPoint from '../map/draw/MapDrawPoint.vue';
import { GeoObjectEditEvent, GeoObjectFocusEvent, GeoObjectShowInfoEvent, MapNoGeoObjectSelectedEvent } from '@/components/geo-object/GeoObjectEvents';
import { cloneObject, updateObject } from '@/util/vue';
import MapDrawCircle from '../map/draw/MapDrawCircle.vue';
import MapDrawLine from '../map/draw/MapDrawLine.vue';
import { getCenter } from '@/util/geo_objects.js';
import { mapHelpersType } from '../map/Map.vue';
import Padding from '../layout/Padding.vue';
import IconVue from '../general/IconVue.vue';
import GeoObjectTypeBadge from './GeoObjectTypeBadge.vue';
import TaskSnippet from '../task/TaskSnippet.vue';
import api from '@/api/index.js';
import LoadApi from '../functional/LoadApi.vue';
import { Button } from 'primevue';
import NumberDisplayOrSlot from '../display/numbers/NumberDisplayOrSlot.vue';
import MapDrawPolygon from '../map/draw/MapDrawPolygon.vue';

const props = defineProps<{
    geoObject: ApiResponse_WorkspaceGeoObjectsGet[number]
}>()

const editIsVisible = ref(false)

const infoIsVisible = ref(false)

const mapHelpers = inject<mapHelpersType>('mapHelpers')
const mapContainer = inject<HTMLElement>('mapContainer')

onMounted(() => {
    mapContainer!.addEventListener(GeoObjectEditEvent.EVENT_NAME, onEditEvent)
    mapContainer!.addEventListener(GeoObjectFocusEvent.EVENT_NAME, onFocusEvent)
    mapContainer!.addEventListener(GeoObjectShowInfoEvent.EVENT_NAME, onShowInfoEvent)
    mapContainer!.addEventListener(MapNoGeoObjectSelectedEvent.EVENT_NAME, onMapNoGeoObjectSelectedEvent)
})

onBeforeUnmount(() => {
    mapContainer!.removeEventListener(GeoObjectEditEvent.EVENT_NAME, onEditEvent)
    mapContainer!.removeEventListener(GeoObjectFocusEvent.EVENT_NAME, onFocusEvent)
    mapContainer!.removeEventListener(GeoObjectShowInfoEvent.EVENT_NAME, onShowInfoEvent)
    mapContainer!.removeEventListener(MapNoGeoObjectSelectedEvent.EVENT_NAME, onMapNoGeoObjectSelectedEvent)
})

function onMapNoGeoObjectSelectedEvent(evt: Event){
    if(evt instanceof MapNoGeoObjectSelectedEvent){
        infoIsVisible.value = false
    }
}

function onEditEvent(evt: Event){
    if(evt instanceof GeoObjectEditEvent && evt.geoObjectId !== props.geoObject.id){
        editIsVisible.value = false//TODO only allow editing in specific cases?
    }
    infoIsVisible.value = false
}

function onFocusEvent(evt: Event){
    if(evt instanceof GeoObjectFocusEvent && evt.geoObjectId === props.geoObject.id){
        const center = getCenter([props.geoObject])
        if(center[0] !== 0 || center[1] !== 0){
            mapHelpers!.mapGoTo(center[0], center[1], 5000)
        }
        showInfo()
    }
}

function onShowInfoEvent(evt: Event){
    if(evt instanceof GeoObjectShowInfoEvent){
        infoIsVisible.value = evt.geoObjectId === props.geoObject.id
    }
}


function showEdit(){
    editIsVisible.value = true
    mapContainer!.dispatchEvent(new GeoObjectEditEvent(props.geoObject.id))
}

function hideEdit(){
    editIsVisible.value = false
}

function hideEditAndShowInfo(){
    hideEdit()
    showInfo()
}

function showInfo(){
    mapContainer!.dispatchEvent(new GeoObjectShowInfoEvent(props.geoObject.id))
}

function editDone(newValue: ApiResponse_WorkspaceGeoObjectsGet[number]){
    updateObject(props.geoObject, newValue)
    hideEdit()
    showInfo()
}

</script>

<template>


    <template v-if="geoObject.type === 0/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_Type_TYPES.marking */">

        <template v-if="geoObject.sub_type === 0/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_SubType_TYPES.marking*/">

            <MapDrawPoint v-if="editIsVisible && typeof props.geoObject.workspace_id === 'number'" :workspace-id="props.geoObject.workspace_id" :existing-geo-object="cloneObject(props.geoObject)" @edit-done="editDone"  @cancel="hideEditAndShowInfo"></MapDrawPoint>

            <MapMarker v-else :position="geoObject.config.point" :label="geoObject.name" icon-url="/images/geo_objects/markings/0.png" :icon-width="24" :icon-height="24" :show-height-indicator="true" :color="getColorForHex(geoObject.config.color)" @click-marker="showInfo"></MapMarker>

        </template>

        <template v-if="geoObject.sub_type === 1/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_SubType_TYPES.marking*/">

            <MapDrawLine v-if="editIsVisible && typeof props.geoObject.workspace_id === 'number'" :workspace-id="props.geoObject.workspace_id" :existing-geo-object="cloneObject(props.geoObject)" @edit-done="editDone" @cancel="hideEditAndShowInfo"></MapDrawLine>

            <!-- TODO implement configurable clamp to ground-->
            <MapPolyline v-else :points="geoObject.config.line" :color="getColorForHex(geoObject.config.color)" :label="geoObject.name" @click="showInfo"></MapPolyline>
        </template>


        <template v-if="geoObject.sub_type === 2/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_SubType_TYPES.marking*/">


            <MapDrawPolygon v-if="editIsVisible && typeof props.geoObject.workspace_id === 'number'" :workspace-id="props.geoObject.workspace_id" :existing-geo-object="cloneObject(props.geoObject)" @edit-done="editDone" @cancel="hideEditAndShowInfo"></MapDrawPolygon>

            <MapPolygon v-else :points="geoObject.config.polygon/*TODO support multi-array polygon*/" :color="getColorForHex(geoObject.config.color, 0.3)" :filled="true" :outline-color="getColorForHex(geoObject.config.color)" clamp-to-ground @click="showInfo" :label="geoObject.name"></MapPolygon>


        </template>

        <template v-if="geoObject.sub_type === 3/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_SubType_TYPES.marking*/">

            <MapDrawCircle v-if="editIsVisible && typeof props.geoObject.workspace_id === 'number'" :workspace-id="props.geoObject.workspace_id" :existing-geo-object="cloneObject(props.geoObject)" @edit-done="editDone" @cancel="hideEditAndShowInfo"></MapDrawCircle>

            <!-- TODO implement configurable clamp to ground-->
            <MapCircle v-else :label="geoObject.name" :position="geoObject.config.center" :radius="geoObject.config.radius" :color="getColorForHex(geoObject.config.color, 0.3)" :filled="true" :outline-color="getColorForHex(geoObject.config.color)" @click="showInfo"></MapCircle>

        </template>

    </template>

    <template v-if="geoObject.type === 1/* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_Type_TYPES.traffic */">

        <!-- TODO add traffic coverage -->

        <!-- TODO improve logic when to blink -->

        <MapMarker :position="[geoObject.config.longitude, geoObject.config.latitude, geoObject.config.height/* TODO rename to elevation in client sdk */]" :label="geoObject.name + ' ' + Math.floor(geoObject.config.height) + ' m'" :icon-url="'/images/geo_objects/traffic/' + geoObject.sub_type + '.png'" :color="Color.RED" :icon-width="32" :icon-height="32" :show-height-indicator="true" :background-circle="Color.WHITE" :blink="geoObject.config.height < 2000 ? 500 : undefined" :max-visible-distance="1000 * 1000" @click="showInfo"></MapMarker>

    </template>

    <template v-if="geoObject.type === 2 /* TODO use Message_Type_Event_Object_Data_Geo_Object_Type_Type_TYPES.traffic */">

        <MapMarker :position="[geoObject.config.longitude, geoObject.config.latitude, geoObject.config.height/* TODO rename to elevation in client sdk */]" :label="geoObject.name" :icon-url="geoObject.config.symbol" :icon-width="32" :icon-height="32" :show-height-indicator="true" :background-circle="getColorForHex('#2D8CF0')" :max-visible-distance="1000 * 50" @click="showInfo"></MapMarker>

    </template>


    <div v-if="infoIsVisible" id="info">
        <Padding>
            <div style="display: flex; justify-content: space-between;">
                <h3>{{ geoObject.name }}</h3>

                <Button v-if="typeof props.geoObject.workspace_id === 'number'" @click="showEdit"><IconVue name="pencil"></IconVue></Button>
            </div>

            <GeoObjectTypeBadge :type="geoObject.type" :sub-type="geoObject.sub_type"></GeoObjectTypeBadge>

            <template v-if="geoObject.type === 0">
                <h4>Tasks</h4>

                <template v-for="taskRef of geoObject.tasks">
                    <LoadApi :api-method="api.rest.task.get" :config="{params: {taskId: taskRef.id}}" v-slot="task">
                        <TaskSnippet :task="task.data"></TaskSnippet>
                    </LoadApi>
                </template>
            </template>

            <template v-if="geoObject.type === 1">
                <table class="uncolored">
                    <tbody>
                        <tr>
                            <td>Elevation</td>
                            <td>
                                <NumberDisplayOrSlot :number="geoObject.config.height" :decimals="0" unit="m MSL">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Heading</td>
                            <td>
                                <NumberDisplayOrSlot :number="geoObject.config.heading" :decimals="0" unit="°">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>
                                <NumberDisplayOrSlot :number="typeof geoObject.config.speed === 'number' ? geoObject.config.speed * 3.6 : undefined" :decimals="0" unit=" km/h">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>

            <template v-if="geoObject.type === 2">
                <table class="uncolored">
                    <tbody>
                        <tr>
                            <td>Elevation</td>
                            <td>
                                <NumberDisplayOrSlot :number="geoObject.config.height" :decimals="0" unit="m MSL">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Heading</td>
                            <td>
                                <NumberDisplayOrSlot :number="geoObject.config.heading" :decimals="0" unit="°">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>
                                <NumberDisplayOrSlot :number="typeof geoObject.config.speed === 'number' ? geoObject.config.speed * 3.6 : undefined" :decimals="0" unit=" km/h">
                                    <span>?</span>
                                </NumberDisplayOrSlot>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>

        </Padding>
    </div>


</template>

<style scoped lang="scss">

#info {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
}

</style>
