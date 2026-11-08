<script setup lang="ts" generic="
    T extends void | Record<string, any>,
    C extends {data: Record<string, any>, params?: Record<string, any>}, AM extends ((config: C) => Promise<T>),
    PROPS extends {apiMethod: AM, config: Parameters<AM>[0]},
    EF extends (keyof PROPS['config']['data'])[],
    IV extends Omit<PROPS['config']['data'], EF[number]> & Partial<PROPS['config']['data']>">
import { FormSubmitEvent } from '@/util/primevue';
import { Form } from '@primevue/forms';
import { Button, Checkbox, Select, InputNumber, IftaLabel, InputText, useToast, DatePicker, Textarea  } from 'primevue';
import { ref, watch } from 'vue';
import { FormResolverOptions } from '@primevue/forms';
import InputMapLocation from './InputMapLocation.vue';
import SelectMappedBadge from './SelectMappedBadge.vue';
import { cloneObject } from '@/util/vue.js';
import dayjs from 'dayjs';

export type Field<FieldType, DataShape extends Record<string, string> = Record<string, string>> = FieldType extends 'text' ? FieldTypeText : FieldType extends 'email' ? FieldTypeEmail : FieldType extends 'number' ? FieldTypeNumber : FieldType extends 'select' ? FieldTypeSelect : FieldType extends 'checkbox' ? FieldTypeCheckbox : FieldType extends 'date-with-time' ? FieldTypeDateWithTime : FieldType extends 'raw' ? FieldTypeRaw : FieldType extends 'map-location' ? FieldTypeMapLocation<DataShape> : FieldType extends 'textarea' ? FieldTypeTextarea : FieldBase<FieldType>

export type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'date-with-time' | 'raw' | 'map-location' | 'textarea'

export type FieldBase<FieldType> = {
    type: FieldType
    required?: boolean
}

export interface FieldTypeText extends FieldBase<'text'> {
}

export interface FieldTypeEmail extends FieldBase<'email'> {
}

export interface FieldTypeNumber extends FieldBase<'number'> {
}

export interface FieldTypeSelect extends FieldBase<'select'> {
    options: {
        value: any
        label: string
    }[]
    allowNull?: boolean
    mappedBadge?: {
        colorMap: {
            value: number
            color: string
        }[]
    }
}

export interface FieldTypeCheckbox extends FieldBase<'checkbox'> {
}

export interface FieldTypeDateWithTime extends FieldBase<'date-with-time'> {
    onlyDate?: boolean // if true, time will be ignored and set to 00:00:00
    max?: Date // maximum date that can be selected
    min?: Date // minimum date that can be selected
    noSeconds?: boolean // if true, seconds will be ignored and set to 00
}

export interface FieldTypeRaw extends FieldBase<'raw'> {
}

export interface FieldTypeMapLocation<DataShape extends Record<string, string>> extends FieldBase<'map-location'> {
    longitudeField: keyof DataShape
    latitudeField: keyof DataShape
    defaultValue: number
}

export interface FieldTypeTextarea extends FieldBase<'textarea'> {
    minRows?: number
    placeholder?: string
}



const toast = useToast()

const props = defineProps<{
    type: 'create' | 'edit' | 'action'
    title: string
    confirmLabel?: string
    showCancelButton?: boolean
    apiMethod: PROPS['apiMethod']
    params: PROPS['config'] extends Record<string, any> ? PROPS['config']['params'] : never
    fields: Record<keyof PROPS['config']['data'], Field<FieldType, PROPS['config']['data']>>
    editableFields: EF
    initialValues: IV
    readableLabels?: Partial<Record<keyof PROPS['config']['data'], string>>
    watchInitialValues?: (keyof IV)[]
    checkFunction?: () => (true | string)
}>()

const emit = defineEmits<{
    created: [createdObject: T]//TODO rename to done
    cancel: []
    change: [formData: PROPS['config']['data']]
}>()

const form = ref()

if(props.watchInitialValues){
    for(const fieldName of props.watchInitialValues){
        watch(() => props.initialValues[fieldName], (newValue) => {
            form.value!.setFieldValue(fieldName, newValue)
        }, {deep: true})
    }
}

const isSending = ref(false)
const errorMessage = ref('')

function cleanupData(data: FormSubmitEvent['values']): PROPS['config']['data']{
    const cleanData: Record<string, any> = {}

    for (const fieldName of Object.keys(props.fields)){

        cleanData[fieldName] = props.initialValues[fieldName]

        if(typeof data[fieldName] === 'undefined'){
            continue
        }

        if(props.fields[fieldName].type === 'date-with-time'){
            if(props.fields[fieldName].onlyDate){
                const date = new Date(data[fieldName])
                cleanData[fieldName] = new Date(date.setHours(0, 0, 0, 0)).toISOString()
            } else if (props.fields[fieldName].noSeconds){
                const date = new Date(data[fieldName])
                cleanData[fieldName] = new Date(date.setSeconds(0, 0)).toISOString()
            } else {
                cleanData[fieldName] = new Date(data[fieldName]).toISOString()
            }
        } else if (props.fields[fieldName].type === 'raw'){
            cleanData[fieldName] = data[fieldName]
        } else if (props.fields[fieldName].type === 'checkbox'){
            cleanData[fieldName] = !!data[fieldName]
        } else if (props.fields[fieldName].type === 'number'){
            cleanData[fieldName] = Number(data[fieldName])
        } else if(props.fields[fieldName].type === 'email' || props.fields[fieldName].type === 'text'){
            cleanData[fieldName] = '' + data[fieldName]
        } else if(props.fields[fieldName].type === 'map-location'){
            cleanData[fieldName] = Number(data[fieldName])
        } else {
            cleanData[fieldName] = data[fieldName]
        }
    }

    return cleanData
}

function emitChange(){
    setTimeout(()=>{//wait until form is updated with values

        const values = form.value.states

        const data: Record<string, any> = {}

        for(const fieldName of Object.keys(values)){
            data[fieldName] = values[fieldName].value
        }

        emit('change', cleanupData(data))
    }, 0)
}

async function save(evt: FormSubmitEvent){

    if(props.checkFunction){
        const checkResult = props.checkFunction()
        if(checkResult !== true){
            errorMessage.value = '' + checkResult
            return
        }
    }

    isSending.value = true
    errorMessage.value = ''

    const cleanData = cleanupData(evt.values)

    try {
        const response = await props.apiMethod({params: props.params, data: cleanData} as PROPS['config'])

        emit('created', response)

        toast.add({severity: 'success', summary: props.type === 'create' ? 'Created successfully' : props.type === 'edit' ? 'Saved successfully' : 'Action completed successfully', life: 3000})
    } catch (err){
        errorMessage.value = '' + err
    }

    isSending.value = false
}

// TODO implement custom validation (especially required for map-location)
// :resolver="resolveValidation"
async function resolveValidation(e: FormResolverOptions){
    const errors: Record<string, string> = {}

    for(const fieldName of Object.keys(props.fields)){
        if(props.fields[fieldName].required){
            if(typeof e.values[fieldName] === 'undefined' || e.values[fieldName] === null || e.values[fieldName] === ''){
                errors[fieldName] = 'This field is required'
            }
        }

        if(props.fields[fieldName].type === 'email' && typeof e.values[fieldName] === 'string' && e.values[fieldName].length > 0){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(e.values[fieldName])){
                errors[fieldName] = 'Please enter a valid email address'
            }
        }
    }

    return errors
}

function withNullOption(options: {value: any, label: string}[]): {value: any, label: string}[]{
    return [{value: null, label: 'None'}, ...cloneObject(options)]
}

</script>

<template>

    <h2>{{ props.title }}</h2>

    <Form ref="form" v-slot="$form" :initial-values="props.initialValues" @submit="save" :validate-on-mount="true" :validate-on-value-update="true" :validate-on-blur="true">

        <template v-if="props.fields">
            <div id="fields">

                <template v-for="fieldName of Object.keys(props.fields)">

                    <template v-if="props.editableFields.includes(fieldName)">
                        <template v-if="props.fields[fieldName].type === 'text'">
                            <IftaLabel>
                                <InputText :id="fieldName" :name="fieldName" :required="props.fields[fieldName].required" fluid :minlength="props.fields[fieldName].required ? 1 : undefined" @update:model-value="emitChange"></InputText>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'email'">
                            <IftaLabel>
                                <InputText :id="fieldName" :name="fieldName" :required="props.fields[fieldName].required" fluid :minlength="props.fields[fieldName].required ? 1 : undefined" type="email" @update:model-value="emitChange"></InputText>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'number'">
                            <IftaLabel>
                                <InputNumber :id="fieldName" :name="fieldName" fluid :required="props.fields[fieldName].required" @update:model-value="emitChange"></InputNumber>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'checkbox'">
                            <IftaLabel>
                                <Checkbox :id="fieldName" :name="fieldName" :required="props.fields[fieldName].required" @update:model-value="emitChange"></Checkbox>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'select'">
                            <IftaLabel>
                                <SelectMappedBadge v-if="props.fields[fieldName].mappedBadge" :field-name="fieldName" :options="props.fields[fieldName].options" :required="props.fields[fieldName].required" :color-map="props.fields[fieldName].mappedBadge.colorMap" @change="emitChange"></SelectMappedBadge>
                                <Select v-else :id="fieldName" :name="fieldName" :options="props.fields[fieldName].allowNull ? withNullOption(props.fields[fieldName].options) : props.fields[fieldName].options" option-value="value" option-label="label" :required="props.fields[fieldName].required" fluid @update:model-value="emitChange"></Select>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'date-with-time'">
                            <IftaLabel>
                                <DatePicker :id="fieldName" :model-value="dayjs(props.initialValues[fieldName]).toDate()" :name="fieldName" :required="props.fields[fieldName].required" :show-time="props.fields[fieldName].onlyDate !== true" hour-format="24" :max-date="props.fields[fieldName].max" :min-date="props.fields[fieldName].min" fluid @update:model-value="emitChange"></DatePicker>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'raw'">
                            <!-- hidden -->
                        </template>

                        <template v-else-if="props.fields[fieldName].type === 'map-location'">
                            <template v-if="props.fields[fieldName].longitudeField === fieldName"><!-- only render once for longitude field -->
                                <IftaLabel>
                                    <InputMapLocation :model-value="{
                                        longitude: props.initialValues[props.fields[fieldName].longitudeField.toString()] as number,
                                        latitude: props.initialValues[props.fields[fieldName].latitudeField.toString()] as number
                                        }" :id-longitude="props.fields[fieldName].longitudeField" :id-latitude="props.fields[fieldName].latitudeField.toString()" :name-longitude="props.fields[fieldName].longitudeField" :name-latitude="props.fields[fieldName].latitudeField.toString()" :default-location="{longitude: props.fields[fieldName].defaultValue, latitude: props.fields[fieldName].defaultValue}" :start-height="10000" @change="location => {
                                            //@ts-ignore
                                            props.initialValues[props.fields[fieldName].longitudeField.toString()] = location.longitude
                                            //@ts-ignore
                                            props.initialValues[props.fields[fieldName].latitudeField.toString()] = location.latitude
                                            emitChange()
                                        }"></InputMapLocation>
                                    <label :for="props.fields[fieldName].longitudeField.toString() + '_' + props.fields[fieldName].latitudeField.toString()">{{ (props.readableLabels?.[props.fields[fieldName].longitudeField] ?? 'Longitude')+ ' / ' + (props.readableLabels?.[props.fields[fieldName].latitudeField] ?? 'Latitude') }}</label>
                                </IftaLabel>
                            </template>
                        </template>


                        <template v-else-if="props.fields[fieldName].type === 'textarea'">
                            <IftaLabel>
                                <Textarea :id="fieldName" :name="fieldName" :required="props.fields[fieldName].required" :rows="props.fields[fieldName].minRows ?? 3" :placeholder="props.fields[fieldName].placeholder" @update:model-value="emitChange"></Textarea>
                                <label :for="fieldName">{{ props.readableLabels?.[fieldName] ?? fieldName }}</label>
                            </IftaLabel>
                        </template>

                        <template v-else>
                            Unsupported field type "{{ (props.fields[fieldName] as Field<FieldType>).type }}" for field {{ fieldName }}.
                        </template>
                    </template>

                </template>

                <slot v-bind="{reset: ()=>{
                    $form.reset()
                    emit('change', props.initialValues)
                }}"></slot>
            </div>
        </template>

        <div id="buttons">
            <Button type="submit" :label="props.confirmLabel ?? (props.type === 'create' ? 'Create' : props.type === 'edit' ? 'Save' : 'OK')" :disabled="isSending"></Button>
            <Button v-if="showCancelButton" label="Cancel" class="p-button-secondary" @click="$form.reset(); emit('cancel')"></Button>
        </div>

        <div v-if="errorMessage" id="error">
            <h3>Error:</h3>
            <p>{{ errorMessage }}</p>
        </div>
    </Form>

</template>

<style scoped lang="scss">

#fields {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 0
}
#buttons {
    display: flex;
    justify-content: center;
    gap: 1em;
}

#error {
    color: var(--error);
}

</style>
