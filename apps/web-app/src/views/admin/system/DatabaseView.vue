<script setup lang="ts">
import Spacing from '@/components/layout/Spacing.vue';
import { useRouter } from 'vue-router';
import {Column, DataTable, Tab, TabList, Tabs, TabPanels, TabPanel} from 'primevue';
import api from '@/api';
import FileSizeDisplay from '@/components/display/FileSizeDisplay.vue';
import { getIdQueryFromRouteOrUseDefault } from '@/util/url';
import { useRoute } from 'vue-router';
import LoadApi from '@/components/functional/LoadApi.vue';

const router = useRouter();

</script>

<template>

    <h1>Database</h1>

    <Spacing></Spacing>

    <LoadApi :api-method="api.rest.admin.system.database.info.get" :config="{}" v-slot="info">

        <Tabs :value="getIdQueryFromRouteOrUseDefault('tab', useRoute(), 0)" @update:value="evt=>{router.push({query: {tab:  '' + evt}})}">
            <TabList>
                <Tab :value="0">General</Tab>
                <Tab :value="1">Tables</Tab>
            </TabList>

            <TabPanels>
                <TabPanel :value="0">

                    <table>
                        <tbody>
                            <tr>
                                <td>Total Size:</td>
                                <td><FileSizeDisplay :size-in-bytes="info.data.database.size" :lowest="'MB'"></FileSizeDisplay></td>
                            </tr>
                            <tr>
                                <td>Version:</td>
                                <td>{{ info.data.database.version }}</td>
                            </tr>
                        </tbody>
                    </table>

                </TabPanel>
                <TabPanel :value="1">

                    <DataTable :value="info.data.tables" sort-field="name" show-headers show-gridlines>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="size" header="Size" sortable>
                            <template #body="slotProps">
                                <FileSizeDisplay :size-in-bytes="slotProps.data.size" :lowest="'KB'"></FileSizeDisplay>
                            </template>
                        </Column>
                        <Column field="row_count" header="Rows" sortable></Column>
                    </DataTable>

                </TabPanel>
            </TabPanels>
        </Tabs>
    </LoadApi>

</template>
