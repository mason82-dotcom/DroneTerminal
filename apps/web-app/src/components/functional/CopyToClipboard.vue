<script setup lang="ts">
import { computed, inject, provide, ref, reactive } from 'vue';
import {writeToClipboard} from '../../util/clipboard'


const props = defineProps<{
    value: string
}>()

let isHandlingClick = false
async function handleClick(){
    if(isHandlingClick){
        return
    }

    try {
        showNotification.value++
        isHandlingClick = true

        await writeToClipboard(props.value)
    } finally{
        isHandlingClick = false

        setTimeout(()=>{

            if(showNotification.value > 0){
                showNotification.value--
            }

        }, 1000 * 2)
    }

}

const showNotification = ref(0)

</script>

<template>

    <div id="wrapper" @click.self.prevent="handleClick">
        <div id="notification" v-if="showNotification > 0">Copied</div>
        <slot></slot>
    </div>

</template>

<style scoped lang="scss">

#wrapper {
    position: relative;
    display: inherit;
    cursor: copy;

    #notification {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        padding: 0.5em;
        border-radius: 0.2em;
        background: var(--neutral-darkest);
        color: var(--neutral-light);
    }
}

</style>
