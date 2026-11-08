<script setup lang="ts" generic="
    T extends Record<string, any>[],
    C extends {[key: string]: any, params: Record<string, any>},
    AM extends ((config: C) => Promise<T>),
    PROPS extends {apiMethod: AM, config: Parameters<AM>[0], idParams: string[]},
    IP extends keyof PROPS['config']['params'],
    CP extends IP extends never ? undefined : Pick<PROPS['config']['params'], Exclude<string, IP>>,
    CC extends CP extends undefined ? Omit<PROPS['config'], 'params'> : keyof CP extends never ? Omit<PROPS['config'], 'params'> : Omit<PROPS['config'], 'params'> & {params: CP}">
import LoadApi from '@/components/functional/LoadApi.vue';
import { getIdParamFromRoute } from '@/util/url';
import { updateObject } from '@/util/vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { useRoute } from 'vue-router';
import LoadApiArray from './LoadApiArray.vue';


const props = defineProps</*CC extends undefined ? {
    apiMethod: PROPS['apiMethod']
} : CC extends never ? {
    apiMethod: PROPS['apiMethod']
} : keyof CC extends never ? {
    apiMethod: PROPS['apiMethod']
} : {
    apiMethod: PROPS['apiMethod']
    config: CC
    idParams: IP[]
    dev?: CP
}*/{
    apiMethod: PROPS['apiMethod']
    config: CC
    idParams: IP[]
}>()

const emit = defineEmits<{
    (e: 'change', v: C['params']): void
}>()

const route = useRoute()


onMounted(()=>{

    watch(()=>{
        return route.params
    }, init, {
        deep: true
    })

    //@ts-ignore
    if(typeof props.idParams !== 'undefined'){
        watch(()=>{
            //@ts-ignore
            return props.idParams
        }, init, {
            deep: true
        })
    }

    init()
})


const params = reactive({} as Record<string, number>)

const paramsValid = ref(false)

async function init(){
    if(props.idParams instanceof Object === false){
        return
    }

    const newParams: Record<string, any> = {}

    //@ts-ignore
    for(const paramName of props.idParams){
        const id = getIdParamFromRoute(paramName as string, route)
        if(id < 0){
            paramsValid.value = false
            return
        }

        newParams[paramName as string] = id
    }

    paramsValid.value = true

    updateObject(params, newParams)

    emit('change', params)
}

const filledConfig = computed(()=>{
    //@ts-ignore
    if(typeof props.config === 'undefined'){
        return undefined
    }

    //@ts-ignore
    const baseConfig = JSON.parse(JSON.stringify(props.config)) as PROPS['config']

    Object.assign(baseConfig.params, params)

    return baseConfig
})


</script>

<template>

    <!-- @vue-ignore -->
    <LoadApiArray v-if="paramsValid" :api-method="props.apiMethod" :config="filledConfig" v-slot="scope">

        <slot :data="(scope.data as T)"></slot>

    </LoadApiArray>

</template>

<style scoped lang="scss">

</style>

