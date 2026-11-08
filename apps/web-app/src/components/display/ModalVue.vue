<script setup lang="ts">
import IconVue from '../general/IconVue.vue';

/**
 * @prop maxWidth optional max width of the modal content, default is 600px
 */
const props = defineProps<{
    visible: boolean
    maxWidth?: string
}>()

const emit = defineEmits<{
    show: []
    close: []
}>()

</script>

<template>

    <div id="modal" v-if="props.visible">
        <div id="modal-content" :style="{maxWidth: props.maxWidth ?? '600px'}">
            <IconVue id="close-icon" name="x-lg" @click="emit('close')"></IconVue>
            <slot></slot>
        </div>
    </div>

</template>

<style scoped lang="scss">

#modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

#modal-content {
    padding: 1.5em;
    position: relative;
    background-color: var(--text-background);
    border-radius: 1em;
    overflow: auto;
}

#close-icon {
    position: absolute;
    top: 0.3em;
    right: 0.3em;
    z-index: 1;
    cursor: pointer;
}

</style>
