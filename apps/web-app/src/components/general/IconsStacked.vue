<script setup lang="ts">
import IconVue, { IconName } from './IconVue.vue';



const props = defineProps<{
    names: IconName[] // first element is on bottom
    colors?: string[]
    buttonIconPos?: 'right' | 'left' | 'top' | 'bottom'
}>()

</script>

<template>

    <div id="container">
        <IconVue v-for="(name, index) in props.names" :key="index" :name="name" :button-icon-pos="props.buttonIconPos" :class="{absolute: index > 0}" :style="'z-index: ' + index" :color="props.colors ? props.colors[index] : undefined"></IconVue>
    </div>

</template>

<style scoped lang="scss">
    #container {
        position: relative;

        .absolute {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
</style>
