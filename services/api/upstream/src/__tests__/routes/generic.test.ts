
import request from "supertest"
import app from './../../app'
import makeJestOpenAPI from './_makeJestOpenAPI'

makeJestOpenAPI()


import type * as OpenAPI from 'openapi-types'

import * as fs from 'fs'
const api : OpenAPI.OpenAPI.Document = JSON.parse(fs.readFileSync('./openapi_spec.json', {
    encoding: 'utf-8'
}))


describe('general status codes', ()=>{

    if(!api.paths){
        return
    }

    for(const path of Object.keys(api.paths)){

        const pathObject = api.paths[path]

        for(const method of Object.keys(pathObject as object)){

            const methodObject = (pathObject as object)[method]

            if(methodObject.deprecated){
                continue
            }

            it(`${method.toUpperCase()} ${path} should not return 404`, async()=>{
                const req = request(app)

                let func : (url: string) => request.Test = req[method]


                const f = func(path)

                if(methodObject.security){
                    f.set('Cookie', ['user-auth=session_2'])
                }

                const res = await f.send()

                expect(res.statusCode).not.toEqual(404)//TODO this check does not work!
                expect(('' + res.statusCode).startsWith('5')).not.toBeTruthy()
                expect(res).toSatisfyApiSpec()
            })

            if(methodObject.security){

                let fullPath = path

                if(methodObject.parameters){
                    fullPath = fullPath.replace(/\{([^\}]*)\}/, (match, parameterName) => {

                        const parameterSchema = methodObject.parameters.find(p => p.name === parameterName).schema
                        if(typeof parameterSchema.example !== 'undefined'){
                            return '' + parameterSchema.example
                        } else {
                            throw new Error('unable to replace parameter with example: ' + parameterName)
                        }
                    })
                }

                it(`${method.toUpperCase()} ${fullPath} should return 401 when no auth cookie is provided`, async()=>{

                    const req = request(app)


                    let func : (url: string) => request.Test = req[method]

                    let prep = func(fullPath)

                    const res = await prep
                        .send()

                    expect(res.statusCode).toEqual(401)
                    expect(res).toSatisfyApiSpec()
                })

            }

        }
    }
})
//TODO generate generic test built from api schemas
