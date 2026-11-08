<script setup lang="ts">

import api from '@/api';
import PerformOperation from '@/components/general/PerformOperation.vue'
import { computed, onMounted, ref } from 'vue';
import LogoVue from '@/components/branding/LogoVue.vue';
import { useRouter } from 'vue-router';
import IconVue from '@/components/general/IconVue.vue';
import useMainStore from '@/stores/main';
import { goToRedirect } from '@/util/router';
import { Button, InputText } from 'primevue';

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

async function setInitialPassword(){
    await api.rest.auth.passwordSetInitial.post({data: {
        new_password: newPassword2.value
    }})
    store.userSelf.registration_incomplete = false
}

const store = useMainStore()
const router = useRouter()
</script>

<template>

    <PerformOperation v-slot="scope" v-if="store.userSelf.registration_incomplete">

        <div class="centered">
            <span>{{ $t("auth.finish_registration") }}</span>

            <span>{{ $t("auth.new_password") }}</span>
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
                    setInitialPassword().then(()=>{
                        //TODO show success message first
                        goToRedirect(router, '/')
                    }))
                " :disabled="!newPassword1IsValid || !newPassword2IsValid">{{ $t("actions.confirm") }}</Button>
            </div>

        </div>


    </PerformOperation>


    <div v-else class="already_finished">
        <span>Your profile is already complete</span>

        <RouterLink to="/">
            <v-btn type="primary">{{ $t("actions.return_to_home")}}</v-btn>
        </RouterLink>
    </div>

</template>

<style lang="scss" scoped>

.centered {
    display: flex;
    flex-direction: column;
    align-items: center;

    .password_container {
        position: relative;
        margin-top: 0.3em;

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
        justify-content: center;
    }
}

.already_finished {
    align-self: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>
