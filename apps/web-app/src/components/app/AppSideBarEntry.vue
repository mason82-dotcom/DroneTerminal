<script setup lang="ts">
import IconVue, { IconName } from '../general/IconVue.vue';

const props = defineProps<{
    icon?: IconName
    to: string
}>()
</script>

<template>

    <RouterLink :to="props.to" id="link">
        <IconVue v-if="typeof props.icon === 'string'" id="icon" :name="props.icon"></IconVue><slot></slot>
    </RouterLink>

</template>

<style scoped lang="scss">

#link {
    white-space: nowrap;

    #icon {
        margin-right: 1em;
    }
}

</style>
