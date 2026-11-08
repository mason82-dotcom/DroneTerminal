import { makeStructure } from './generated/rest_api_structure'
import { method } from './generated/rest_api_types'

let apiBaseUrl = ''

function RestApi(baseURL?: string){

    if(!baseURL){
        baseURL = document.location.hostname === 'localhost' ? 'http://localhost:6001' : (document.location.protocol + '//' + document.location.hostname + '/api')
    }

    if(!baseURL.endsWith('/')){
        baseURL += '/'
    }

    apiBaseUrl = baseURL

    return makeStructure(makeRequest)

}

export default RestApi


const REST_API_TIMEOUT = 1000 * 10

let apiAuth: String

export type makeRequestFunctionType = typeof makeRequest

async function makeRequest<T>(config: {
    url: string
    method: method
    isFormData: boolean
    params?: object
    queryParams?: object
    data?: object
}): Promise<T> {
    return new Promise((resolve, reject)=>{

        if (config.url.startsWith('/')) {
            config.url = config.url.substring(1)
        }

        const urlWithParamsAndQuery = config.url.replace(/\{([^\}]+)\}/g, (match, p1) => {
            if (!config.params) {
                reject('url contains param "' + p1 + '" but no params are defined')
                return ''
            }

            if (typeof config.params[p1] !== 'string' && typeof config.params[p1] !== 'number') {
                reject('url contains param "' + p1 + '" but no valid value for this param was provided (string or number)')
                return ''
            }

            return '' + config.params[p1]
        }) + (config.queryParams ? '?' + Object.keys(config.queryParams).map(key => key + '=' + encodeURIComponent(config.queryParams[key])).join('&') : '')

        if (config.method === 'patch' && config.data instanceof Object && Object.keys(config.data).length === 0) {
            reject('you can not perform a patch operation with empty data')
            return ''
        }


        if (config.isFormData && config.data instanceof Object) {//convert data object to form data
            const form = new FormData()
            for (const key of Object.keys(config.data)) {
                if (config.data[key] === undefined) {
                    continue
                }

                if (config.data[key] instanceof Array) {
                    for (const entry of config.data[key]) {
                        form.append(key, entry)
                    }
                } else {
                    form.set(key, config.data[key])
                }
            }

            config.data = form
        }

        const headers: {[key: string]: string}= {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }

        if(apiAuth){
            headers.Cookie = 'user-auth=' + apiAuth
        }

        const abortController = new AbortController()

        const request = new Request(apiBaseUrl + urlWithParamsAndQuery, {
            signal: abortController.signal,
            //@ts-ignore
            body: config.data === undefined ? undefined : (config.isFormData ? config.data : JSON.stringify(config.data)),
            method: config.method.toUpperCase(),
            cache: 'no-store',
            headers,
            credentials: 'same-origin'
        })

        let fetchIsDone = false

        let rejectedDueToTimeout = false

        setTimeout(()=>{
            if(fetchIsDone){
                return
            }
            rejectedDueToTimeout = true

            abortController.abort('Fatal: timeout when trying to make api call')

            reject('Fatal: timeout when trying to make api call')

        }, REST_API_TIMEOUT)

        fetch(request).then(response => {
            fetchIsDone = true

            if (response.headers['set-cookie']) {
                const authValue = (response.headers['set-cookie'] as string[])
                    .find(cookie => cookie.includes('user-auth'))
                    ?.match(new RegExp(`^user-auth=(.+?);`))
                    ?.[1]

                if (authValue) {
                    apiAuth = authValue
                    console.info('api is now authenticated:', authValue)
                }
            }

            if (response.ok) {
                if (response.body) {
                    response.text().then(text => {
                        if(text.length === 0){
                            resolve(undefined as T)
                        } else {
                            try {
                                const parsed = JSON.parse(text)
                                resolve(parsed)
                            } catch(err){
                                reject(err)
                            }
                        }

                    }).catch(err => {
                        console.error('error while response.text()', err)
                        reject(err)
                    })
                } else {
                    resolve(undefined as T)
                    return
                }
            } else {
                const isFatal = ('' + response.status).startsWith('5') || ('' + response.status) === '404'//404 is fatal because that means the api endpoint does not exists (possible API version mismatch between client and server)

                //the magic word "Fatal" must be at the begining of the error message, to tell the webapp it is a general unrecoverable server error
                const prefix = `${isFatal ? 'Fatal ' : ''}OpenFlightHub API Error`

                if (response.body) {
                    response.text().then(body => {
                        reject(`${prefix} @ ${config.method.toUpperCase()} ${urlWithParamsAndQuery} : ${response.statusText} ${body}`)
                    }).catch(reject)
                } else {
                    reject(`${prefix} @ ${config.method.toUpperCase()} ${urlWithParamsAndQuery} : ${response.statusText}`)
                }
            }
        }).catch(reason => {
            if(rejectedDueToTimeout){
                return
            } else {
                reject(reason)
            }
        })
    })
}
