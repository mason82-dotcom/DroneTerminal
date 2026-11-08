
const OpenApiParser = require('@readme/openapi-parser')
const fs = require('fs')
const path = require('path')

let api = undefined

const deasync = require('deasync')
OpenApiParser.dereference('./openapi_spec.yaml').then(res => {
    api = res
}).catch(error => {
    console.error('Error loading api spec', error)
})

while(api === undefined) {
    deasync.sleep(100)
}

const jsonPath = path.resolve('./openapi_spec.json')
fs.writeFileSync(jsonPath, JSON.stringify(api, null, 2), {
    encoding: 'utf-8'
})
