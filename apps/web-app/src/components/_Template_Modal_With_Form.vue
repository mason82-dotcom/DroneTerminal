<script setup lang="ts">
import { ref } from 'vue';
import * as TemplateForm from './_Template_Form.vue';
import ModalVue from './display/ModalVue.vue';


const showModal = ref(false)

</script>

<template>

    <Button @click="showModal = true"><IconVue name="plus-lg"></IconVue>Invite Team</Button>

    <ModalVue :visible="showModal" @close="showModal = false">

        <TemplateForm.default :data="{id: 1, name: 'xyz'}" @created="showModal = false" @cancel="showModal = false"></TemplateForm.default>

    </ModalVue>

</template>

<style scoped lang="scss">

</style>
