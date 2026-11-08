<script setup lang="ts">


const route = useRoute()

const routeIsAuth = computed(()=>{
    return route.path.startsWith('/auth')
})

import { computed, defineComponent, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import AppSideBar from '@/components/app/AppSideBar.vue';
import AppContent from '@/components/app/AppContent.vue';
import BackgroundVue from '../branding/BackgroundVue.vue';
import AutomaticFileDownload from '@/automatic-file-download/AutomaticFileDownload.vue';
import { ConfirmDialog, Toast } from 'primevue';

const animateBackground = computed(()=>{
    return route.name === 'login'
})

// export default defineComponent({

//     components: { RouterView, App, AppSideBar, AppContent, AppBackground }

// })

</script>

<template>

    <div id="app">

        <BackgroundVue id="background" :animated="animateBackground" :style="!animateBackground ? 'opacity: 0.05' : ''" />

        <AppSideBar v-if="!routeIsAuth">
        </AppSideBar>

        <AppContent :full-width="!routeIsAuth">
            <RouterView/>
        </AppContent>

        <AutomaticFileDownload></AutomaticFileDownload>

        <Toast>
            <!-- was once a fix for weird vue warnings related to $pcTabs
            <template #closeicon>
                <span class="p-toast-close-icon" aria-hidden="true">&times;</span>
            </template>
            -->
        </Toast>
        <ConfirmDialog></ConfirmDialog>
    </div>

</template>

<style scoped lang="scss">

#app {
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    overflow-y: auto;
    background: var(--neutral-darkest);

    #background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;
        width: 100vw;
        height: 100vh;
    }
}

</style>
