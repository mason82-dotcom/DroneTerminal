<script setup lang="ts">
import api from '@/api';
import LoadApi from '@/components/functional/LoadApi.vue';
import { DataTable, Column } from 'primevue';
import Spacing from '@/components/layout/Spacing.vue';
import FileSizeDisplay from '@/components/display/FileSizeDisplay.vue';
import TimeDisplay from '@/components/display/TimeDisplay.vue';
</script>

<template>

    <h1>Operating System</h1>

    <Spacing></Spacing>

    <LoadApi :api-method="api.rest.admin.system.performance.os.get" :config="{}" v-slot="scope">
        <h2>OS</h2>
        <p>{{ scope.data.os }}</p>

        <Spacing></Spacing>

        <h2>CPU</h2>
        <p>{{ scope.data.cpu }}</p>

        <Spacing></Spacing>

        <h2>Memory</h2>
        <p><FileSizeDisplay :size-in-bytes="scope.data.ram_total - scope.data.ram_free" show-decimals></FileSizeDisplay> / <FileSizeDisplay :size-in-bytes="scope.data.ram_total" show-decimals></FileSizeDisplay> (Used / Total)</p>

        <Spacing></Spacing>

        <h2>Load Average</h2>
        <DataTable :value="[
            {
                name: '1 minute average load',
                value: Math.floor(scope.data.load_avg.avg_1 * 100) + ' %',
            },
            {
                name: '5 minute average load',
                value: Math.floor(scope.data.load_avg.avg_5 * 100) + ' %',
            },
            {
                name: '15 minute average load',
                value: Math.floor(scope.data.load_avg.avg_15 * 100) + ' %',
            }]" :show-headers="false">
            <Column field="name" ></Column>
            <Column field="value"></Column>
        </DataTable>

        <Spacing></Spacing>

        <h2>Uptime</h2>
        <TimeDisplay :time-in-ms="scope.data.uptime" lowest="s"></TimeDisplay>

        <Spacing></Spacing>
    </LoadApi>

</template>
