<script setup lang="ts">

import Padding from '@/components/layout/Padding.vue';
import LinkableDeviceInfo from '@/components/link/LinkableDeviceInfo.vue';
import LogoVue from '@/components/branding/LogoVue.vue';



</script>

<template>

    <LinkableDeviceInfo></LinkableDeviceInfo>

    <Padding>

        <div id="header">
            <h1>Welcome to OpenFlightHub!</h1>
            <LogoVue size1em id="logo"></LogoVue>
        </div>

        <Padding>
            <h3 style="text-align: center;">How to use</h3>
            <div id="video">
                <video src="https://www.openflighthub.org/wp-content/uploads/2025/04/connect-your-dji-drone_kiresq.webm" controls></video>
            </div>
        </Padding>

        <Padding>
            <h3>Latest Changes:</h3>
            <ul>
                <li>Show traffic around your drone inside the DJI Pilot App</li>
                <li>Show all map elements from the DJI Pilot App on the website</li>
            </ul>
        </Padding>

    </Padding>

</template>

<style lang="scss" scoped>

#header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 3em;
    gap: 1em;

    #logo {
        font-size: 50px;
    }
}

ul {
    list-style: disc;
}

#video {
    display: flex;
    justify-content: center;
    max-height: 400px;

    video {
        width: 30vw;
        height: auto;
    }
}

</style>
