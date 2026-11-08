<script setup lang="ts">


//TODO add little example on how to use

import { ref } from 'vue';
import IconVue from './IconVue.vue';

const isLocked = ref(false)
const errorMessage = ref('')
const showSuccess = ref(false)
let showSuccessHideTimeout

function watch(promise: Promise<any>){
    promise.then(success).catch(error)
}

function begin(){
    isLocked.value = true
    if(typeof showSuccessHideTimeout === 'number'){
        clearTimeout(showSuccessHideTimeout)
        showSuccessHideTimeout = undefined
    }
}

function success(){
    errorMessage.value = ''
    isLocked.value = false
    showSuccess.value = true
    showSuccessHideTimeout = setTimeout(()=>{
        showSuccess.value = false
    }, 1000 * 2)
}

function error(err: Error){
    console.error(err)
    errorMessage.value = err.message
    isLocked.value = false
}

</script>

<template>

    <div :class="['content', {is_locked: isLocked}]">
        <slot :watch="watch" :begin="begin" :success="success" :error="error" />
    </div>

    <template v-if="errorMessage">

        <SpacerVue></SpacerVue>

        <div class="error">
            <span><IconVue name="exclamation-circle" class="icon"></IconVue>Error</span>
            <span>{{ errorMessage }}</span>
        </div>

    </template>

</template>

<style scoped lang="scss">

.content {
    position: relative;

    &:after {
        display: none;
        content: '';
        background-color: transparent;
        cursor: not-allowed;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &.is_locked {
        &:after {
            display: block;
        }
    }
}

.error {
    background: var(--error);
    padding: 1em 1em 1em;
    border-radius: 0.2em;

    .icon {
        margin-right: 0.5em;
    }
}


</style>
