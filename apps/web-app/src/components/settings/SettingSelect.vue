<script setup lang="ts" generic="N extends SettingName">
import { setSetting, SettingName, resetSetting, SettingType, getSetting } from '@/util/settings';
import { Select } from 'primevue';
import { computed, ref, watch } from 'vue';


const props = defineProps<{
    settingName: N
    possibleValues: {label: string, value: SettingType<N>}[]
}>()

const normalizedPossibleValues = computed(()=>{
    return props.possibleValues.map(v => ({value: v.value.toString(), label: v.label}))
})

const selectedValue = ref(getSetting(props.settingName))


watch(()=>selectedValue.value, (newValue) => {
    if(newValue === null){
        resetSetting(props.settingName)
    } else {
        setSetting(props.settingName, newValue as any)
    }
})

const myId = computed(()=>{
    return `setting-select-${props.settingName}`
})

</script>

<template>

    <label :for="myId">{{ props.settingName }}
        <Select v-model="selectedValue" :id="myId" :options="normalizedPossibleValues" option-label="label" option-value="value"/>
    </label>

</template>

<style scoped lang="scss">



</style>
