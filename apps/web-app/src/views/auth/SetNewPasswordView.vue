<script setup lang="ts">

import api from '@/api';
import PerformOperation from '@/components/general/PerformOperation.vue'
import { computed, onMounted, ref } from 'vue';
import LogoVue from '@/components/branding/LogoVue.vue';
import { useRouter } from 'vue-router';
import IconVue from '@/components/general/IconVue.vue';
import { goToRedirect } from '@/util/router';
import { Button, InputText } from 'primevue'
const router = useRouter()

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

async function setNewPassword(){
    await api.rest.auth.passwordSetNew.post({data: {
        code: resetCode.value,
        new_password: newPassword2.value
    }})
}

const resetCode = ref('')

onMounted(()=>{
    let code = router.currentRoute.value.query['code']
    if(code instanceof Array){
        code = code[0]
    }

    if(typeof code === 'string' && code.length > 0){
        resetCode.value = code
    }
})

</script>

<template>

    <PerformOperation v-slot="scope" v-if="resetCode.length > 0">

        <div class="centered">
            <v-form>
                <h2>{{ $t("auth.new_password") }}</h2>
                <br>
                <span class="restrictions">{{ $t("auth.password_restrictions") }}</span>
                <div class="password_container">
                    <InputText type="password" autocomplete="new-password" v-model="newPassword1"></InputText>
                    <IconVue class="valid_icon" name="check" v-if="newPassword1IsValid"></IconVue>
                </div>

                <br>

                <span>{{ $t("auth.repeat_new_password") }}</span>
                <div class="password_container">
                    <InputText type="password" autocomplete="new-password" v-model="newPassword2" :rules="[v => v.length > 5]"></InputText>
                    <IconVue class="valid_icon" name="check" v-if="newPassword2IsValid"></IconVue>
                </div>

                <br>

                <div class="button_group">
                    <Button type="submit" @click="scope.watch(
                        setNewPassword().then(()=>{
                            //TODO show success message first
                            goToRedirect(router, '/')
                        }))
                    " :disabled="!newPassword1IsValid || !newPassword2IsValid">{{ $t("actions.confirm") }}</Button>
                    <Button @click="router.back()">{{ $t("actions.cancel") }}</Button>
                </div>
            </v-form>

        </div>


    </PerformOperation>

    <div v-else class="no_code">
        <span>No valid reset code provided.</span>

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
        gap: 0.5em;
    }
}

.no_code {
    align-self: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>
