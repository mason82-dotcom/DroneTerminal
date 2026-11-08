<script setup lang="ts">
import api from '@/api';
import { DataTable, Column } from 'primevue';
import FractionalNumber from './FractionalNumber.vue';
import LoadApi from '@/components/functional/LoadApi.vue';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';

const props = defineProps<{
    endpoint: string
}>()

</script>

<template>

    <LoadApiArray :api-method="api.rest.admin.system.performance.apiEndpoint.details.get" :config="{queryParams: {endpoint: props.endpoint}}" v-slot="scope"><!--TODO method is called twice (something is broken) -->
        <DataTable :value="scope.data" show-gridlines striped-rows sort-field="url" paginator :rows="20" :rows-per-page-options="[20, 50, 100]">
            <Column field="url" header="URL" sortable></Column>
            <Column field="http_method" header="Method" sortable></Column>
            <Column field="total_calls" header="Call Count" sortable></Column>
            <Column field="max_run_time" header="Max Response Time (ms)" sortable></Column>
            <Column field="max_work_time" header="Max Work Time (ms)" sortable></Column>
            <Column field="avg_run_time" header="Average Response Time (ms)" sortable></Column>
            <Column field="avg_work_time" header="Average Work Time (ms)" sortable></Column>
            <Column field="pop_standard_dev_run_time" header="Standard Deviation Run Time (ms)" sortable></Column>
            <Column field="pop_standard_dev_work_time" header="Standard Deviation Work Time (ms)" sortable></Column>
            <Column field="pop_standard_dev_run_time_fractional" header="Standard Deviation Run Time relative to arithmetic mean (pop standard deviation / arithmetic mean)" sortable>
                <template #body="slotProps">
                    <FractionalNumber :number="slotProps.data.pop_standard_dev_run_time_fractional"></FractionalNumber>
                </template>
            </Column>
            <Column field="pop_standard_dev_work_time_fractional" header="Standard Deviation Work Time relative to arithmetic mean (pop standard deviation / arithmetic mean)" sortable>
                <template #body="slotProps">
                    <FractionalNumber :number="slotProps.data.pop_standard_dev_work_time_fractional"></FractionalNumber>
                </template>
            </Column>
        </DataTable>
    </LoadApiArray>

</template>
