<script setup lang="ts">
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import Spacing from '@/components/layout/Spacing.vue';
import IconVue from '@/components/general/IconVue.vue';

</script>

<template>

    <Padding>
        <h1>System Overview</h1>

        <Spacing></Spacing>

        <List horizontal>
            <RouterLink to="/admin/system/os" class="link"><IconVue name="plugin"></IconVue> Operating System</RouterLink>
            <RouterLink to="/admin/system/performance" class="link"><IconVue name="speedometer"></IconVue> Performance</RouterLink>
            <RouterLink to="/admin/system/database" class="link"><IconVue name="database"></IconVue> Database</RouterLink>
        </List>

        <Spacing></Spacing>

        <RouterView/>
    </Padding>

</template>
