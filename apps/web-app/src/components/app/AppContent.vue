<script setup lang="ts">

const props = defineProps<{
    fullWidth?: boolean
}>()

</script>

<template>

    <div id="content" :style="'width:' + (props.fullWidth ? '100%' : '')">

        <div id="inner">
            <slot></slot>
        </div>

    </div>

</template>

<style scoped lang="scss">

#content {
    position: relative;
    display: flex;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 2;
    max-width: calc(100vw - var(--sidebar-min-size));

    #inner {
        position: relative;
        height: 100%;
        width: 100%;
    }
}


</style>
