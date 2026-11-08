<script setup lang="ts">
import Spacing from '@/components/layout/Spacing.vue';
import { getIdQueryFromRouteOrUseDefault } from '@/util/url';
import { useRoute, useRouter } from 'vue-router';
import ApiEndpointsView from './performance/ApiEndpointsView.vue';
import {Tabs, TabPanels, TabPanel, TabList, Tab} from 'primevue';

const router = useRouter();

</script>

<template>

    <h1>Performance</h1>

    <Spacing></Spacing>

    <Tabs :value="getIdQueryFromRouteOrUseDefault('tab', useRoute(), 0)" @update:value="evt=>{router.push({query: {tab:  '' + evt}})}">
        <TabList>
            <Tab :value="0">Api-Endpoints</Tab>
        </TabList>
        <TabPanels>
            <TabPanel :value="0">
                <ApiEndpointsView></ApiEndpointsView>
            </TabPanel>
        </TabPanels>
    </Tabs>

</template>
