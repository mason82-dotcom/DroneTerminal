<script setup lang="ts">
import Snippet from './Snippet.vue';


const props = defineProps<{
    imageUrl: string
    toUrl?: string
}>()

</script>

<template>

    <Snippet :to-url="props.toUrl">
        <div id="snippet-with-image">
            <div id="left" :style="'background-image: url(\'' + props.imageUrl + '\')'">

            </div>
            <div id="right">
                <slot></slot>
            </div>
        </div>
    </Snippet>

</template>

<style scoped lang="scss">

#snippet-with-image {
    display: inline-flex;
    flex-direction: row;
    gap: 1em;

    #left {
        width: 5em;
        height: 5em;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }

    #right {
        display: inline-flex;
        flex-direction: column;
        gap: 0.5em;
    }
}

</style>
