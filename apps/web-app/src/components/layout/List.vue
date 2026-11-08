<script setup lang="ts">

const props = defineProps<{
    horizontal?: boolean
    fill?: boolean
}>()

</script>

<template>

    <div id="list" :style="'flex-direction: ' + (props.horizontal ? 'row' : 'column')" :class="{grow: props.fill}">
        <slot></slot>
    </div>

</template>

<style scoped lang="scss">

#list {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
}

</style>

<style lang="scss">
    #list.grow > * {
        flex-grow: 1;
    }
</style>
