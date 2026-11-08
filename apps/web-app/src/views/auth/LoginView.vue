<script setup lang="ts">
import useMainStore from "@/stores/main";
import { ref } from "vue";
import api from "@/api";

import IconVue from "@/components/general/IconVue.vue";
import { Button, Password, InputText, IftaLabel } from "primevue";
import { useRouter } from "vue-router";

const store = useMainStore()

const router = useRouter()

const username = ref('')
const password = ref('')

const loginError = ref(false)

const isLoggingIn = ref(false)

async function login(){
    isLoggingIn.value = true

    store.login(username.value, password.value).then(()=>{

        router.push({
            name: 'home',
            query: router.currentRoute.value.query
        })

    }).catch(err => {
        loginError.value = true
        isLoggingIn.value = false
    })
}

function handleKeyUp(evt: KeyboardEvent){
    if(evt.key.toLowerCase() === 'enter' && username.value.length > 0 && password.value.length > 0){
        login()
    }
}

</script>

<template>

    <div>

        <div v-if="store.apiUnavailable">Service currently not available, sorry!</div>

        <div v-else class="login_form">

            <div id="input_fields">
                <IftaLabel>
                    <InputText id="username" name="username" v-model="username" autocomplete="username" @keyup="handleKeyUp" :disabled="isLoggingIn"/>
                    <label for="username">{{ $t("login.username")}}</label>
                </IftaLabel>

                <div>
                    <IftaLabel>
                        <Password id="password" name="password" type="password" v-model="password" autocomplete="current-password" @keyup="handleKeyUp" :disabled="isLoggingIn" :feedback="false"/>
                        <label for="password">{{ $t("login.password")}}</label>
                    </IftaLabel>

                    <div class="reset_password_container">
                        <a class="reset_password" href="/auth/password-reset"> {{ $t("login.reset_password") }}</a>
                    </div>
                </div>
            </div>

            <div class="buttons">
                <Button :label="$t('login.sign_in')" @click="login">
                    <template #icon>
                        <IconVue name="arrow-right" buttonIconPos="right"></IconVue>
                    </template>
                </Button>
            </div>

            <template v-if="loginError">
                <span>{{ $t("login.auth_error") }}</span>
            </template>

        </div>
    </div>

</template>

<style scoped lang="scss">

.login_form {
    display: flex;
    flex-direction: column;
    gap: 2em;

    #input_fields {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

    .reset_password_container {
        margin-top: 0.5em;

        .reset_password {
            font-size: 14px;
            color: var(--neutral-light);

            &:hover {
                color: var(--neutral-lighter);
            }
        }
    }

    .buttons {
        display: flex;
        justify-content: center;
    }
}

@media only screen and (max-width: 800px) {
    .login_form #input_fields {
        flex-direction: row !important;
    }
}

</style>
