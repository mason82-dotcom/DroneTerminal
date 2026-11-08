<script setup lang="ts">
import api from '@/api';
import LoadApiArray from '@/components/functional/LoadApiArray.vue';
import List from '@/components/layout/List.vue';
import Padding from '@/components/layout/Padding.vue';
import Spacing from '@/components/layout/Spacing.vue';
import UserSnippet from '@/components/user/UserSnippet.vue';
import { ref } from 'vue';
import ModalVue from '@/components/display/ModalVue.vue';
import ApiForm from '@/components/functional/form/ApiForm.vue';
import IconVue from '@/components/general/IconVue.vue';
import { Button } from 'primevue';
import UserCreateForm from '@/components/user/UserCreateForm.vue';

const showCreateModal = ref(false)

</script>

<template>
    <Padding>
        <h1>Users</h1>

        <Spacing></Spacing>

        <Button @click="showCreateModal = true"><IconVue name="plus"></IconVue> Add User</Button>

        <Spacing></Spacing>

        <LoadApiArray :api-method="api.rest.admin.users.get" :config="{}" v-slot="users">
            <List horizontal>
                <UserSnippet v-for="user of users.data" :key="user.id" :user="user"></UserSnippet>
            </List>
        </LoadApiArray>

    </Padding>


    <ModalVue :visible="showCreateModal" @close="showCreateModal = false">
        <UserCreateForm @created="showCreateModal = false" @cancel="showCreateModal = false"></UserCreateForm>
    </ModalVue>

</template>
