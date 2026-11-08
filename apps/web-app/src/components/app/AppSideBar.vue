<script setup lang="ts">
import LogoVue from '../branding/LogoVue.vue';
import LogoutButton from '@/components/general/LogoutButton.vue';
import useMainStore from '@/stores/main';
import IconVue from '../general/IconVue.vue';
import { ref } from 'vue';
import AppSideBarEntry from './AppSideBarEntry.vue';
import AppSideBarGroup from './AppSideBarGroup.vue';

const store = useMainStore()

const isExtended = ref(false)

</script>

<template>

    <div id="sidebar">

        <div id="inner" @mouseenter="isExtended = true" @mouseleave="isExtended = false">
            <IconVue name="list" @click="isExtended = !isExtended" style="font-size: 25px;"></IconVue>

            <div id="menu" :style="{'display': isExtended ? '' : 'none'}">

                <div id="top">
                    <RouterLink to="/">
                        <LogoVue id="logo" size1em></LogoVue>
                        Home
                    </RouterLink>
                </div>

                <div id="middle">
                    <AppSideBarGroup to="/my-workspaces" name="Workspaces" icon="textarea">
                        <AppSideBarEntry v-for="workspace in store.myWorkspaces" :to="'/workspace/' + workspace.id">{{ workspace.name }}</AppSideBarEntry>
                    </AppSideBarGroup>

                    <AppSideBarGroup :to="'/structure/'" name="Structure" icon="diagram-3-fill"></AppSideBarGroup>
                </div>

                <div id="bottom">
                    <AppSideBarEntry v-if="store.isAdmin" to="/settings" icon="gear">Settings</AppSideBarEntry>
                    <AppSideBarEntry v-if="store.isAdmin" to="/admin" icon="code-square">Admin</AppSideBarEntry>

                    <AppSideBarEntry v-if="store.isLoggedIn" to="/auth/password-change" icon="key">{{ $t('auth.change_password') }}</AppSideBarEntry>
                    <AppSideBarEntry v-else to="/auth/login" icon="key">{{ $t('login.sign_in') }}</AppSideBarEntry>

                    <LogoutButton v-if="store.isLoggedIn"></LogoutButton>

                    <span>© OpenFlightHub 2026</span>
                </div>

            </div>
        </div>

        <div v-if="isExtended" id="cover">

        </div>
    </div>

</template>

<style scoped lang="scss">

#sidebar {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 3;
    flex-grow: 0;
    flex-shrink: 0;
    min-width: var(--sidebar-min-size);
    min-height: 100vh;

    #inner {
        position: absolute;
        z-index: 4;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--neutral-darker);
        height: 100%;

        #menu {
            display: flex;
            flex-direction: column;
            transition: all 0.2s ease;
            height: 100%;

            #top, #middle, #bottom {
                padding: 0.5em 1em;
                gap: 0.5em;
            }

            #top {

            }

            #middle {
                display: flex;
                flex-direction: column;
            }

            #bottom {
                display: flex;
                flex-direction: column;
                margin-top: auto;
                white-space: nowrap;
            }
        }
    }

    #cover {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #0006;
    }
}


</style>
