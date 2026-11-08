
// for unit testing
function mock_$t(key: string, ...args){
    return key
}


const IS_TEST_ENVIRONMENT = process.env.JEST_WORKER_ID !== undefined

// Documentation:
// https://kazupon.github.io/vue-i18n/guide/formatting.html

import deasync from 'deasync'
import i18next, { TFunction, TOptions } from 'i18next'
import Backend from 'i18next-fs-backend'
import {lstatSync, readdirSync} from 'fs'
import {join, resolve} from 'path'

const FALLBACK_LANG = 'en'

let i18n : TFunction

if(!IS_TEST_ENVIRONMENT){
    const languages = readdirSync(resolve('i18n')).filter((fileName) => {
        const joinedPath = join(resolve('i18n'), fileName)
        const isDirectory = lstatSync(joinedPath).isDirectory()
        return !isDirectory
    }).map(filename => filename.replace(/\.json/, ''))


    //@ts-ignore
    i18next.use(Backend).init({
        lng: 'en', // if you're using a language detector, do not define the lng option
        fallbackLng: FALLBACK_LANG,
        returnEmptyString: false,

        preload: languages,

        backend: {
            loadPath: './i18n/{{lng}}.json'
        }
    }).then(res => {
        console.log('i18next is initialized')
        i18n = res
    }).catch(err => {
        console.error('failed to load translations', err)
        process.exit(1)
    })


    deasync.loopWhile(()=>{
        return i18n === undefined
    })
}


function $t(key: string | string[]) : string
function $t(key: string | string[], lang: string) : string
function $t(key: string | string[], lang: string, options: TOptions): string
function $t(key: string | string[], lang: string, defaultValue: string, options: TOptions): string
function $t(...args: any[]) : string {

    if(IS_TEST_ENVIRONMENT){
        return 'test'
    }

    const keyOrKeys = args[0]

    const lang = args[1]

    const defaultValue = typeof args[2] === 'string' ? args[2] : undefined

    const options = typeof args[2] === 'string' ? args[3] : args[2]

    const res = defaultValue === undefined ? i18next.t(keyOrKeys, Object.assign(options || {}, {
        lng: lang
    })) : i18next.t(keyOrKeys, defaultValue, Object.assign(options || {}, {
        lng: lang
    }))

    if(typeof res === 'string'){
        return res
    } else if(typeof res == 'object' && typeof res['res '] === 'string'){
        return res['res']
    } else {
        console.error('i18n $t()', 'unsupported i18next.t() result', res)
        return keyOrKeys
    }
}


//@ts-ignore
export default $t