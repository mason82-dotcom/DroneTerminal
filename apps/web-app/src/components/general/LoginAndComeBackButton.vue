<script setup lang="ts">
import { Button } from 'primevue';
import { useRouter } from 'vue-router';

const router = useRouter()

async function loginWithRedirect(){
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.value.fullPath
        }
    })
}

</script>

<template>

    <Button @click="loginWithRedirect" variant="text">{{ $t("login.login") }}</Button>

</template>

<style scoped lang="scss">


</style>
