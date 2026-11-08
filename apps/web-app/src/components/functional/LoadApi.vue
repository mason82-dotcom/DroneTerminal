<script setup lang="ts" generic="
    T extends Record<string, any>,
    C extends any, AM extends ((config: C) => Promise<T>),
    PROPS extends {apiMethod: AM, config: Parameters<AM>[0]}">
import { updateObject } from '@/util/vue';
import { ref, reactive, onMounted, watch } from 'vue';


const props = defineProps</*Parameters<AM>[0] extends Record<string, any> ?*/{
    apiMethod: PROPS['apiMethod'],
    config: PROPS['config']
}>()

const initialLoadDone = ref(false)
const isLoading = ref(true)

const obj = reactive({} as T)

onMounted(()=>{
    watch(()=>{
        return props.apiMethod
    }, load)

    //@ts-ignore
    if(typeof props.config !== 'undefined'){
        watch(()=>{
            //@ts-ignore
            return props.config
        }, load, {
            deep: true
        })
    }

    load()
})


async function load(){
    isLoading.value = true

    //@ts-ignore
    const response = await props.apiMethod(props.config)

    if(response instanceof Array && obj.value instanceof Array === false){
        console.error('Response is an array, you must use <LoadApiArray> instead of <LoadApi>')
    }

    updateObject(obj, response)

    isLoading.value = false

    if(!initialLoadDone.value){
        initialLoadDone.value = true
    }
}

</script>

<template>

    <div id="container">
        <slot v-if="initialLoadDone" :data="obj"/>
        <div id="overlay" v-if="isLoading">
            Loading ...
        </div>
    </div>

</template>

<style scoped lang="scss">
    #container {
        position: relative;

        #overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-width: 20px;
            min-height: 20px;
            z-index: 1;
            background: #000;
            opacity: 20%;
        }
    }
</style>
