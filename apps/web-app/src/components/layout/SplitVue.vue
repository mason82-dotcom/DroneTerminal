<script setup lang="ts">

const props = defineProps<{
    horizontal?: boolean
}>()

</script>

<template>

    <div id="split" :class="{horizontal: props.horizontal}">
        <slot name="left_or_top"></slot>
        <slot name="right_or_bottom"></slot>
    </div>

</template>

<style scoped lang="scss">

#split {
    display: flex;
    flex-direction: row;
    gap: 1em;

    &:not(.horizontal) > * {
        width: 50%;
    }

    &.horizontal {
        flex-direction: column;


        > * {
            height: 50%;
        }
    }
}


</style>
