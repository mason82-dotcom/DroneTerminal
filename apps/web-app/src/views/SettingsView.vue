<script setup lang="ts">

import { setSetting, resetSettings } from '@/util/settings';
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import { Button } from 'primevue';

import useMainStore from "@/stores/main"
import SettingSelect from '@/components/settings/SettingSelect.vue';
const store = useMainStore()

//TODO automatically generate user inputs from settings and make it reactive

function reset(){
    if(!confirm('Are you sure you want to reset all settings? This cannot be undone!')){
        return
    }

    resetSettings()
    document.location.reload()
}

</script>

<template>

    <Padding>

        <h3>Settings:</h3>

        <List>
            <div v-if="store.isAdmin" class="settings">
                <SettingSelect settingName="map-provider" :possibleValues="[{
                    label: 'Sentinel',
                    value: 'sentinel'
                }, {
                    label: 'Bing',
                    value: 'bing'
                }, {
                    label: 'OpenStreetMap',
                    value: 'openstreetmap'
                }, {
                    label: 'Bayern LDBV',
                    value: 'bayern'
                }]"/>

                <SettingSelect settingName="terrain-provider" :possibleValues="[{
                    value: 'cesium',
                    label: 'Cesium'
                }, {
                    value: 'ofh-siplinger',
                    label: 'OFH Siplinger'
                }]"/>

                <label>Reset Settings&nbsp;<Button @click="reset">Reset All Settings</Button></label>
            </div>
        </List>

    </Padding>

</template>

<style lang="scss" scoped>

.settings {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

</style>
