<script setup lang="ts">
import { ref, useSlots } from 'vue';
import IconVue, { IconName } from '../general/IconVue.vue';

const props = defineProps<{
    name: string
    icon?: IconName
    to?: string
}>()

const openGroup = ref(false)

const slots = useSlots()

</script>

<template>

    <div id="sidebar-group">

        <div id="group-header" @mouseenter="openGroup = true">
            <RouterLink v-if="typeof props.to === 'string'" :to="props.to">
                <IconVue v-if="props.icon" class="icon" :name="props.icon"></IconVue>{{ props.name }}<IconVue v-if="$slots.default" class="open_close_icon" :name="openGroup ? 'caret-up-square-fill' : 'caret-down-square'" @click.prevent="openGroup = !openGroup"></IconVue>
            </RouterLink>
            <template v-else>
                <IconVue v-if="props.icon" class="icon" :name="props.icon"></IconVue>{{ props.name }}<IconVue v-if="$slots.default" class="open_close_icon" :name="openGroup ? 'caret-up-square-fill' : 'caret-down-square'" @click.prevent="openGroup = !openGroup"></IconVue>
            </template>
        </div>

        <div id="inner">
            <slot v-if="openGroup"></slot>
        </div>

    </div>

</template>

<style scoped lang="scss">

#sidebar-group {
    white-space: nowrap;

    #group-header {
        .icon {
            margin-right: 1em;
        }

        .open_close_icon {
            margin-left: 1em;
        }
    }

    #inner {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding: 0.5em 1.5em 0 1.5em;
    }
}

</style>
