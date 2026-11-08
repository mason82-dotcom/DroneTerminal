
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import Main from './Main.vue'
import { makeRouter } from '@/router'

import { createI18n } from 'vue-i18n'

import './assets/main.scss'

const pinia = createPinia()
const app = createApp(Main)


import { loadGeoid } from './util/geoid.js'
loadGeoid()

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        }
    }
})

//@ts-ignore
app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
})

import { ToastService } from 'primevue'
app.use(ToastService)
import { ConfirmationService } from 'primevue'
app.use(ConfirmationService)

const router = makeRouter(pinia)
app.use(router)
app.use(pinia)




import useMainStore from './stores/main'
const store = useMainStore()

import api from './api'

let apiIsReconnected = false

api.live.status.addListener('connected', ()=>{//TODO when reconneting but not logged in this will flicker
    store.apiDisconnected = false
    apiIsReconnected = true
})

api.live.status.addListener('disconnected', reason=>{

    if(reason === 'logout'){
        store.isForceLoggedOut = true
    }

    if(reason === 'tcp_reset'){
        reportError('websocket tcp_reset')
    }

    if(apiIsReconnected){
        apiIsReconnected = false
    }

    setTimeout(()=>{
        if(!apiIsReconnected){
            store.apiDisconnected = true
        }
    }, 1000 * 2)//if api is not reconnecting within 2 seconds, set apiDisconnected
})

app.config.globalProperties.window = window
app.config.globalProperties.document = document
app.config.globalProperties.AbortSignal = AbortSignal

// internationalisation

import * as en from './i18n/en.json'
import * as de from './i18n/de.json'
import { definePreset } from '@primevue/themes'

const FALLBACK_LOCALE = 'en'

export const i18nInstance = createI18n({
    locale: FALLBACK_LOCALE,
    fallbackLocale: FALLBACK_LOCALE,
    messages: {
        //@ts-ignore
        en, de
    }
})
app.config.globalProperties.i18n = i18nInstance.global

app.use(i18nInstance)

app.provide('i18n', i18nInstance.global)

window.addEventListener('keydown', evt => {
    if(evt.ctrlKey && evt.shiftKey && evt.code === 'KeyD'){
        evt.preventDefault()

        console.info('enabling translation key debugging')
        //@ts-ignore
        i18nInstance.global.locale = 'debug'
        //@ts-ignore
        i18nInstance.global.fallbackLocale = 'debug'
    }
})


app.mount('#ofh')


//prevent default drag and drop behaviour (= show file)
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    window.addEventListener(eventName, evt=>{
        evt.preventDefault()
    })
})
