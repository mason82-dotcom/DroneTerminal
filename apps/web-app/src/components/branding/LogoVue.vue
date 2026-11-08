<script setup lang="ts">
import { computed, ref } from 'vue';

const LOGO_WIDTH = 1200 / 8
const LOGO_HEIGHT = 1200 / 8


const props = defineProps<{
    size1em?: boolean
}>()


const style = computed(()=>{

    if(props.size1em === true){
        return `height: 1em; width: calc(1em * 1);`
    }

    return `height: ${LOGO_HEIGHT}px; width: ${LOGO_WIDTH}px`
})

</script>

<template>
    <div class="logo" :style="style" ref="logo">
    </div>
</template>

<style scoped lang="scss">

.logo {
    display: inline-block;

    background-image: url('/images/logo.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

</style>
