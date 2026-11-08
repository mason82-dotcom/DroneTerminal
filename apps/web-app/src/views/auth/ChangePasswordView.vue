<script setup lang="ts">

import api from '@/api';
import useMainStore from '@/stores/main';
import PerformOperation from '@/components/general/PerformOperation.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import IconVue from '@/components/general/IconVue.vue';
import { goToRedirect } from '@/util/router';
import { Button, InputText } from 'primevue';

const store = useMainStore()
const router = useRouter()

const currentPassword = ref('')
const newPassword1 = ref('')
const newPassword2 = ref('')

const newPassword1IsValid = computed(()=>{
    if(newPassword1.value.length < 10){
        return false
    }

    return true
})

const newPassword2IsValid = computed(()=>{
    if(!newPassword1IsValid.value){
        return false
    }

    if(newPassword1.value !== newPassword2.value){
        return false
    }

    return true
})

async function changePassword(){
    await api.rest.auth.passwordChange.post({data: {
        current_password: currentPassword.value,
        new_password: newPassword2.value
    }})
}

</script>

<template>

    <PerformOperation v-slot="scope">

        <div class="centered">
            <span>{{ $t("auth.current_password") }}</span>
            <div class="password_container">
                <InputText type="password" autocomplete="current-password" minlength="10" v-model="currentPassword"></InputText>
            </div>

            <h2>{{ $t("auth.new_password") }}</h2>
            <span class="restrictions">{{ $t("auth.password_restrictions") }}</span>
            <div class="password_container">
                <InputText type="password" autocomplete="new-password" v-model="newPassword1"></InputText>
                <IconVue class="valid_icon" name="check" v-if="newPassword1IsValid"></IconVue>
            </div>

            <span>{{ $t("auth.repeat_new_password") }}</span>
            <div class="password_container">
                <InputText type="password" autocomplete="new-password" v-model="newPassword2"></InputText>
                <IconVue class="valid_icon" name="check" v-if="newPassword2IsValid"></IconVue>
            </div>


            <div class="button_group">
                <Button @click="scope.watch(
                    changePassword().then(()=>{
                        //TODO show success

                        goToRedirect(router, '/')
                    }))
                " :disabled="currentPassword.length === 0 || !newPassword1IsValid || !newPassword2IsValid">{{ $t("actions.save_changes")}}</Button>
                <Button @click="router.back()">{{ $t("actions.cancel") }}</Button>
            </div>

        </div>


    </PerformOperation>

</template>

<style lang="scss" scoped>

.centered {
    display: flex;
    flex-direction: column;
    align-items: center;

    .password_container {
        position: relative;
        margin-top: 0.3em;
        margin-bottom: 1em;

        .valid_icon {
            font-size: 30px;
            position: absolute;
            left: 100%;
            color: #279B27;
        }
    }

    .restrictions {
        color: var(--neutral-light);
        margin: 0.3em 0;
    }

    .button_group {
        display: flex;
        gap: 0.5em;
        margin-top: 1em;
    }
}

</style>
