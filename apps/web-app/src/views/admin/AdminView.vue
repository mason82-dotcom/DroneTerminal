<script setup lang="ts">
import IconVue from '@/components/general/IconVue.vue';
import Padding from '@/components/layout/Padding.vue';
import Spacing from '@/components/layout/Spacing.vue';

</script>

<template>
    <Padding>
        <h1>Admin Area</h1>

        <Spacing></Spacing>

        <div style="display: flex; flex-direction: column; gap: 1em">

            <RouterLink to="/admin/users" class="link"><IconVue name="person-square"></IconVue> Users</RouterLink>

            <RouterLink to="/admin/organisations" class="link"><IconVue name="buildings-fill"></IconVue> Organisations</RouterLink>

            <RouterLink to="/admin/system" class="link"><IconVue name="server"></IconVue> System Dashboard</RouterLink>
        </div>

        <RouterView/>
    </Padding>

</template>
