<script setup lang="ts">
import api from '@/api';
import { DataTable, Column } from 'primevue';
import ApiEndpointDetailView from './ApiEndpointDetailView.vue';
import { ref } from 'vue';
import FractionalNumber from './FractionalNumber.vue';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';
import { FilterMatchMode } from '@primevue/core/api';
import {InputText, Select} from 'primevue';


const expandedRows = ref<string[]>([])


const filters = ref({
    endpoint: { value: null, matchMode: FilterMatchMode.CONTAINS },
    http_method: { value: null, matchMode: FilterMatchMode.EQUALS }
})

</script>

<template>

    <LoadApiArray :api-method="api.rest.admin.system.performance.apiEndpoints.get" :config="{}" v-slot="scope"><!--TODO method is called twice (something is broken) -->
        <DataTable :value="scope.data" show-gridlines striped-rows sort-field="endpoint" v-model:filters="filters" filter-display="row" :global-filter-fields="['endpoint', 'http_method']" paginator :rows="20" :rows-per-page-options="[20, 50, 100]" data-key="endpoint" :expanded-rows="expandedRows">
            <Column expander></Column>
            <Column field="endpoint" header="Endpoint" sortable filter-field="endpoint">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Filter by endpoint" />
                </template>
            </Column>
            <Column field="http_method" header="Method" sortable :filter-match-mode-options="[{label: 'Equals', value: FilterMatchMode.EQUALS}]" filter-field="http_method">
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" :options="['get', 'post', 'patch', 'delete', 'put']" @change="filterCallback()" placeholder="Filter by method" />
                </template>
            </Column>
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

            <template #expansion="slotProps">
                <ApiEndpointDetailView :endpoint="slotProps.data.endpoint"></ApiEndpointDetailView>
            </template>
        </DataTable>
    </LoadApiArray>

</template>
