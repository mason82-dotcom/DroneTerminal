<script setup lang="ts">
import ModalVue from '@/components/display/ModalVue.vue';
import { computed, ref } from 'vue';
import Map from '@/components/map/Map.vue';
import { InputText, InputNumber, InputGroup, InputGroupAddon, Button } from 'primevue';
import IconVue from '@/components/general/IconVue.vue';

const DEFAULT_MAX_FRACTION_DIGITS = 6

const model = defineModel<{
    longitude: number
    latitude: number
}>()

const emit = defineEmits<{
    (e: 'change', value: {longitude: number, latitude: number}): void
}>()

const props = defineProps<{
    idLongitude: string
    idLatitude: string
    nameLongitude:  string
    nameLatitude:  string
    startHeight?: number // default 1000
    defaultLocation: {
        longitude: number
        latitude: number
    }
    maxFractionDigits?: number
}>()

const mapContainer = ref<HTMLElement>()

const maxFractionDigits = computed(() => {
    if(typeof props.maxFractionDigits === 'number'){
        return props.maxFractionDigits
    }

    return DEFAULT_MAX_FRACTION_DIGITS
})

const valueAsString = computed(() => {
    if(model.value){
        if(typeof model.value.latitude === 'number' && !isNaN(model.value.latitude) && typeof model.value.longitude === 'number' && !isNaN(model.value.longitude)) {
            return '' + model.value.latitude.toFixed(maxFractionDigits.value) + ', ' + model.value.longitude.toFixed(maxFractionDigits.value)
        }
    }

    return ''
})

function updateModelFromTextSoon(evt: InputEvent) {
    setTimeout(()=>{//wait until input value is updated
        const parts = (evt.target as HTMLInputElement).value.split(',')
        if (parts.length === 2) {
            const lat = parseFloat(parts[0])
            const lng = parseFloat(parts[1])
            if (!isNaN(lat) && !isNaN(lng)) {
                model.value = {
                    latitude: lat,
                    longitude: lng
                }
            }
        }
    }, 0)
}

const modalVisible = ref(false)

function changeLocation(latitude: number, longitude: number){
    model.value = {latitude, longitude}

    const inputElementLongitude = document.querySelector(`input[name="${props.nameLongitude}"]`)! as HTMLInputElement
    inputElementLongitude.value = '' + longitude
    inputElementLongitude.dispatchEvent(new Event('change'))

    const inputElementLatitude = document.querySelector(`input[name="${props.nameLatitude}"]`)! as HTMLInputElement
    inputElementLatitude.value = '' + latitude
    inputElementLatitude.dispatchEvent(new Event('change'))

    emit('change', {latitude, longitude})
}

</script>

<template>

    <InputNumber :id="props.idLongitude" :name="props.nameLongitude" style="display: none;" :max-fraction-digits="props.maxFractionDigits ?? DEFAULT_MAX_FRACTION_DIGITS"></InputNumber>
    <InputNumber :id="props.idLatitude" :name="props.nameLatitude" style="display: none;" :max-fraction-digits="props.maxFractionDigits ?? DEFAULT_MAX_FRACTION_DIGITS"></InputNumber>

    <InputGroup>
        <InputText v-model="valueAsString" :id="props.idLongitude + '_' + props.idLatitude" :name="props.nameLongitude + '_' + props.nameLatitude" @input="updateModelFromTextSoon"></InputText>
        <InputGroupAddon @click.stop.prevent="modalVisible = true">
            <IconVue name="map" style="cursor: pointer;"></IconVue>
        </InputGroupAddon>
    </InputGroup>

    <ModalVue :visible="modalVisible" @close="modalVisible = false">
        <div id="map-container" ref="mapContainer">
            <Map v-if="mapContainer" :map-container="mapContainer" :start-point="{longitude: model?.longitude ?? props.defaultLocation.longitude, latitude: model?.latitude ?? props.defaultLocation.latitude}" :start-height="props.startHeight ?? 1000" style="height: 100%; width: 100%;" :forceTopDown="true" @location-changed="loc => changeLocation(loc.latitude, loc.longitude)">
                <IconVue name="plus-lg" id="crosshair"></IconVue>
            </Map>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 1em;">
            <Button @click="modalVisible = false">OK</Button>
        </div>
    </ModalVue>

</template>

<style scoped lang="scss">

#map-container {
    position: relative;
    width: 400px;
    height: 400px;
    overflow: hidden;

    #crosshair {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        font-size: 2em;
        color: red;
        z-index: 2;
    }

}

</style>
