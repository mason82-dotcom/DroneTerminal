<script setup lang="ts" generic="T extends any">
import { Select } from 'primevue';
import MappedBadge from '@/components/display/MappedBadge.vue';


const props = defineProps<{
    fieldName: string
    initialColor?: string
    options: {label: string, value: T}[]
    required?: boolean
    colorMap: {value: T, color: string}[]
}>()

const emit = defineEmits<{
    change: [value: T]
}>()

</script>

<template>

    <Select :id="fieldName" :name="fieldName" :options="props.options" option-value="value" option-label="label" :required="props.required" fluid @update:model-value="emit('change', $event)">
        <template #option="slotProps">
            <MappedBadge :value="slotProps.option.value" :color-map="props.colorMap">{{ slotProps.option.label }}</MappedBadge>
        </template>
    </Select>

</template>
