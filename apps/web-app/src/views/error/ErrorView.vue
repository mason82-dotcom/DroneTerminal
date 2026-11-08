<script setup lang="ts">

import IconVue from '@/components/general/IconVue.vue';
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps<{
    code: number
    message: string
}>()

</script>

<template>

    <div id="error">

        <IconVue name="cloud-lightning" id="icon"></IconVue>

        <h1>Error {{ props.code }}: {{ props.message }}</h1>

        <Button @click="router.back()">Go Back</Button>
    </div>

</template>

<style scoped lang="scss">

#error {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    #icon {
        font-size: 80px;
        color: var(--primary);
    }
}

</style>
