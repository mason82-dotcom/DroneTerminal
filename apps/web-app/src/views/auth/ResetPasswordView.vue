<script setup lang="ts">

import api from '@/api';
import PerformOperation from '@/components/general/PerformOperation.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { goToRedirect } from '@/util/router';
import { Button, IftaLabel, InputText } from 'primevue';
const router = useRouter()

const email = ref('')

async function resetPassword(){
    await api.rest.auth.passwordReset.post({data: {
        username: email.value
    }})
}

</script>

<template>

    <PerformOperation v-slot="scope">

        <div class="centered">
            <span>{{ $t("auth.reset_password_now") }}</span>

            <IftaLabel>
                <InputText type="email" placeholder="email@example.org" autocomplete="username" v-model="email"></InputText>
                <label for="username">{{ $t("auth.email")}}</label>
            </IftaLabel>

            <div class="button_group">
                <Button @click="scope.watch(
                    resetPassword().then(()=>{
                        //TODO show success message first
                        goToRedirect(router, '/')
                    }))
                " :disabled="email.length === 0">{{ $t("actions.confirm") }}</Button>

                <Button @click="router.back()">{{ $t("actions.cancel") }}</Button>
            </div>

        </div>


    </PerformOperation>

</template>

<style lang="scss" scoped>

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;

        .profile_picture {
            width: 5em;
            height: 5em;
        }
    }
}

.centered {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        margin-top: 0.5em;
    }

    .button_group {
        display: flex;
        gap: 1em;
        margin-top: 1em;
    }
}

</style>
