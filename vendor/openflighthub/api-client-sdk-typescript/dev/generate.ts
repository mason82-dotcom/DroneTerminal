
//TODO: validate structure of response, if doesnt match, throw an error, so we dont get weird unexpected stuff in the frontend
/* BEGIN TEMPLATING STUFF */

import * as fs from 'fs'
import * as path from 'path'

import * as handlebars from 'handlebars'
import { execSync } from 'child_process'


const PACKAGE_JSON_PATH = path.join(__dirname, '../../package.json')
const TEMPLATES_PATH = path.join(__dirname, './templates')
const LOG_FOLDER_PATH = path.join(__dirname, './log')
const API_SPEC_PATH = path.resolve('../../api/openapi_spec.yaml')
const CLIENT_SDK_VERSION_PATH = path.join(__dirname, '..', 'client_sdk.version')
const GENERATED_FOLDER_PATH = path.join(__dirname, '../../src/generated')
const DIST_FOLDER_PATH = path.join(__dirname, '../dist')
const WEBSOCKET_API_DEFINITIONS_PATH = path.resolve('../../api/src/live-websocket/definitions')
const GENERATED_WEBSOCKET_DEFINITIONS_PATH = path.join(GENERATED_FOLDER_PATH, 'websocket-definitions')
const GENERATED_CLIENT_SDK_VERSION_PATH = path.join(GENERATED_FOLDER_PATH, 'client_sdk_version.ts')

export function generate(){
    const start = Date.now()
    handlebars.registerHelper("raw-helper", function(options) {
        return options.fn()
    })

    const templateFiles = fs.readdirSync(TEMPLATES_PATH)

    if(templateFiles){
        templateFiles.filter(val => val.startsWith('_')).forEach(val => {
            handlebars.registerPartial(val.replace(/\.template(.ts)?/, ''), fs.readFileSync(path.join(TEMPLATES_PATH, val), {
                encoding: 'utf-8'
            }))
        })
    }

    function render(templateName: string, config: object, suffix?: string){
        const templatePath = path.join(TEMPLATES_PATH, templateName + '.template' + (suffix || ''))

        return handlebars.compile(fs.readFileSync(templatePath, {
            encoding: 'utf-8'
        }))(config)
    }

    /* END TEMPLATING STUFF */


    function recursivelyDereferenceOpenApiSpec(ctx: object, glob: object){
        if(ctx instanceof Array){
            return ctx.map(val => recursivelyDereferenceOpenApiSpec(val, glob))
        } else if(ctx instanceof Object){
            if(ctx['$ref']){
                const schema = recursivelyDereferenceOpenApiSpec(getReferencedSchema(glob, ctx['$ref']), glob)
                return schema
            } else {
                const ret = {}

                for(const key of Object.keys(ctx)){
                    ret[key] = recursivelyDereferenceOpenApiSpec(ctx[key], glob)
                }

                return ret
            }

        } else {
            return ctx
        }
    }

    const schemaCache = {}

    function getReferencedSchema(openApiSpec: object, ref: string){

        if(schemaCache[ref]){
            return schemaCache[ref]
        }

        let ctx = openApiSpec

        const split = ref.split('/').filter(val => val !== '#' && val !== '')

        while(split.length > 0){
            const key = split.splice(0, 1)

            ctx = ctx[key[0]]

            if(!ctx){
                throw new Error('$ref not found: "' + ref + '"')
            }

            if(ctx['$ref']){
                ctx = recursivelyDereferenceOpenApiSpec(ctx, openApiSpec)
            }
        }

        schemaCache[ref] = ctx

        return ctx
    }

    if(!fs.existsSync(WEBSOCKET_API_DEFINITIONS_PATH)){
        throw new Error('could not find ' + WEBSOCKET_API_DEFINITIONS_PATH + '. Did you forget to checkout the "api" repository?')
    }

    if(fs.existsSync(GENERATED_WEBSOCKET_DEFINITIONS_PATH)){
        fs.rmSync(GENERATED_WEBSOCKET_DEFINITIONS_PATH, {
            recursive: true,
            force: true
        })
    }

    fs.mkdirSync(GENERATED_WEBSOCKET_DEFINITIONS_PATH)
    for(const file of fs.readdirSync(WEBSOCKET_API_DEFINITIONS_PATH, 'utf-8')){
        if(file !== '.' && file !== '..'){
            fs.copyFileSync(path.join(WEBSOCKET_API_DEFINITIONS_PATH, file), path.join(GENERATED_WEBSOCKET_DEFINITIONS_PATH, file))
        }
    }

    const clientSdkVersion = fs.readFileSync(CLIENT_SDK_VERSION_PATH, {encoding: 'utf-8'})

    fs.writeFileSync(GENERATED_CLIENT_SDK_VERSION_PATH, 'export const CLIENT_SDK_VERSION = "' + clientSdkVersion +'";\n', 'utf-8')

    console.log('updating package.lock version ...')
    const packageFileContents = fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8')
    const packageFileAsObject = JSON.parse(packageFileContents)
    packageFileAsObject.version = clientSdkVersion
    fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageFileAsObject, null, 2) + '\n', 'utf-8')

    if(!fs.existsSync(LOG_FOLDER_PATH)){
        fs.mkdirSync(LOG_FOLDER_PATH)
    }

    if(!fs.existsSync(API_SPEC_PATH)){
        throw new Error('could not find ' + API_SPEC_PATH + '. Did you forget to checkout the "api" repository?')
    }

    const yaml = require('js-yaml')
    const openApiSpec = yaml.load(fs.readFileSync(API_SPEC_PATH, 'utf8'))
    fs.writeFileSync(path.join(LOG_FOLDER_PATH, 'spec_parsed.json'), JSON.stringify(openApiSpec, null, 2))


    const doc = recursivelyDereferenceOpenApiSpec(openApiSpec, openApiSpec)
    fs.writeFileSync(path.join(LOG_FOLDER_PATH, 'spec_dereferenced.json'), JSON.stringify(doc, null, 2))

    const apiVersion = openApiSpec.info.version

    const api = {
        properties: [{
            name: 'API_VERSION',
            value: "'" + apiVersion + "'"
        }]
    }


    const allReturnTypeDefinitions: {name: string, typeString: string}[] = [{name: 'integer', typeString: 'number'}]


    for(const path of Object.keys(doc.paths)){
        const pathObject = doc.paths[path]

        for(const method of Object.keys(pathObject)){

            const pathParts = path.split('/')
            pathParts.push(method)

            const methodObject = pathObject[method]

            console.log('  processing', path, method)

            if(methodObject['x-no-sdk']){
                continue
            }

            const functionParams : any[] = []

            if(methodObject.parameters){
                const tUrlParam = '{' + methodObject.parameters.filter(param => param.in === 'path')
                    .map(param => camelcasify(param.name) + ': ' + schemaToTypescriptType(param.schema)).join(',') + '}'

                functionParams.push({
                    name: 'params',
                    type: tUrlParam === '{}' ? undefined : tUrlParam
                })

                const tQueryParam = '{' + methodObject.parameters.filter(param => param.in === 'query')
                    .map(param => camelcasify(param.name) + ': ' + schemaToTypescriptType(param.schema)).join(',') + '}'

                functionParams.push({
                    name: 'queryParams',
                    type: tQueryParam === '{}' ? undefined : tQueryParam
                })
            }

            let theContentType: string = ''

            if(methodObject.requestBody && methodObject.requestBody.content){

                const paramTypes : any[] = []

                for(const contentType of Object.keys(methodObject.requestBody.content)){

                    theContentType = contentType // TODO support multiple content types?
                    const c = methodObject.requestBody.content[contentType]

                    switch(contentType){
                        case 'application/json':
                        case 'multipart/form-data': {
                            paramTypes.push(c.schema)
                        } break

                        default: {
                            throw new Error('requestBody content type is not supported: "' + contentType + '" ' + path)
                        }
                    }
                }

                functionParams.push({
                    name: 'data',
                    type: schemaToTypescriptType({anyOf: paramTypes})
                })
            }



            let returnTypeName = 'ApiResponse_' + pathParts.filter(p => !p.startsWith('{')).map(p => {
                p = p.replace(/[^\w-]/g, '')
                return p.split('-').map(part => part.substring(0,1).toUpperCase() + part.substring(1).toLowerCase()).join('')
            }).join('')

            if(methodObject.responses['200'].content){
                allReturnTypeDefinitions.push({
                    name: returnTypeName,
                    typeString: schemaToTypescriptType(methodObject.responses['200'].content[Object.keys(methodObject.responses['200'].content)[0]].schema)
                })
            } else {
                returnTypeName = 'void'
            }


            function configParamOrEmpty(name: string){
                const fP = functionParams.find(param => param.name === name)
                return fP && typeof fP.type !== 'undefined' ? `${name}: config.${name}` : ''
            }


            const functionConfigs = [
                functionParams.filter(fp => typeof fp.type !== 'undefined' && fp.name === 'params').length === 0 ? '' : functionParams.filter(fp => fp.name === 'params').map(fp => fp.name + ': ' + fp.type).join(', '),
                functionParams.filter(fp => typeof fp.type !== 'undefined' && fp.name === 'queryParams').length === 0 ? '' : functionParams.filter(fp => fp.name === 'queryParams').map(fp => fp.name + ': ' + fp.type).join(', '),
                functionParams.filter(fp => typeof fp.type !== 'undefined' && fp.name === 'data').length === 0 ? '' : functionParams.filter(fp => fp.name === 'data').map(fp => fp.name + ': ' + fp.type).join(', '),
            ].filter(val => val !== '')

            const apiFunction = {
                functionConfig: functionConfigs.length === 0 ? '' : `config: {
                    ${functionConfigs.join(',\n')}
                }`,
                returnType: returnTypeName,
                requestConfig: `{
                    url: '${path.replace(/\{([^\}]+)\}/g, (match, p1) => {
                        return '{' + camelcasify(p1) + '}'
                    })}',
                    method: '${method.toLowerCase()}',
                    isFormData: ${theContentType === 'multipart/form-data' ? 'true' : 'false'},
                    ${[
                        configParamOrEmpty('params'),
                        configParamOrEmpty('data'),
                        configParamOrEmpty('queryParams')
                    ].filter(val => val !== '').join(',\n')}
                }`,
                deprecated: methodObject.deprecated
            }

            const pathPartsConverted = pathParts.filter(val => val !== '' && !val.match(/^\{.*\}$/)).map(val => camelcasify(val))

            recursivelySet(api, pathPartsConverted, apiFunction)
        }
    }


    console.info('generating .ts file ...')

    if(!fs.existsSync(GENERATED_FOLDER_PATH)){
        fs.mkdirSync(GENERATED_FOLDER_PATH)
    }

    fs.writeFileSync(path.join(GENERATED_FOLDER_PATH, 'rest_api_structure.ts'), render('rest_api_structure', {api, allTypeDefinitions: allReturnTypeDefinitions}, '.ts'))
    fs.writeFileSync(path.join(GENERATED_FOLDER_PATH, 'rest_api_types.ts'), render('rest_api_types', {allTypeDefinitions: allReturnTypeDefinitions}, '.ts'))

    console.info('beautifying ...')

    execSync('npx tsfmt -r ' + path.join(GENERATED_FOLDER_PATH, 'rest_api_structure.ts'), {
        encoding: 'utf-8',
        cwd: DIST_FOLDER_PATH,
    })

    execSync('npx tsfmt -r ' + path.join(GENERATED_FOLDER_PATH, 'rest_api_types.ts'), {
        encoding: 'utf-8',
        cwd: DIST_FOLDER_PATH
    })

    console.log('done in', Date.now() - start, 'ms')
}

function recursivelySet(ctx, pathParts, func){
    const pathPart = pathParts.splice(0, 1)[0]

    if(!ctx.properties){
        ctx.properties = []
    }

    let index = ctx.properties.findIndex(val => val.name === pathPart)

    if(pathParts.length > 0){

        if(index === -1){
            ctx.properties.push({name: pathPart, obj: {}})
            index = ctx.properties.length - 1
        }

        const newContext = ctx.properties[index].obj

        recursivelySet(newContext, pathParts, func)
    } else {
        if(index !== -1){
            throw new Error('conflicting path: "' + pathPart + '" @ ' + func.requestParams.split(',')[0])
        }

        ctx.properties.push({name: pathPart, func: func})
    }
}

function camelcasify(val){
    const lowerCase = val.toLowerCase()

    const words = lowerCase.replace(/[^a-zA-Z0-9]/g, '_').split('_').filter(val => val !== '')

    const ret = words.map((val, index) => {
        if(index === 0){
            return val
        } else {
            return val.substring(0, 1).toUpperCase() + val.substring(1)
        }
    }).join('')

    if(ret === ''){
        throw new Error('camelcasify failed for "' + val + '"')
    }

    return ret
}

function schemaToTypescriptType(schema: any){

    if(schema['allOf']){
        let obj = {}

        if(Object.keys(schema).length > 1){
            throw new Error('schemas that use "allOf" are not allowed to have any other entrys!')
        }

        Object.assign(obj, schema)
        delete obj['allOf']

        while(schema['allOf'].length > 0){
            const sc = schema['allOf'].splice(0, 1)[0]

            for(const key of Object.keys(sc)){
                if(typeof obj[key] === 'undefined'){
                    obj[key] = sc[key]
                }
            }

            if(sc.type !== 'object'){//only supported for objects
                console.error(schema)
                throw new Error('allOf is only supported for object!')
            }

            if(sc.properties){
                if(!obj['properties']){
                    obj['properties'] = {}
                }

                for(const key of Object.keys(sc.properties)){
                    if(typeof obj['properties'][key] === 'undefined' || typeof sc.properties[key]['x-const'] !== undefined){
                        obj['properties'][key] = sc.properties[key]
                    }
                }
            }

            if(sc.required){
                if(!obj['required']){
                    obj['required'] = []
                }

                for(const k of sc.required){
                    if(!obj['required'].includes(k)){
                        obj['required'].push(k)
                    }
                }
            }
        }

        schema = obj
    } else if(schema['oneOf'] || schema['anyOf']){
        const cf = schema['oneOf'] || schema['anyOf']

        return '(' + cf.map(val => schemaToTypescriptType(val)).join('|') + ')'
    }

    if(typeof schema['x-const'] !== 'undefined'){
        return schema['x-const']
    }

    switch(schema.type){
        case 'null':
        case 'boolean':
        case 'number':
        case 'integer':
            return schema.type


        case 'string':
            return schema.format == 'binary' ? 'File' : 'string'

        case 'array': {

            if(typeof schema.maxItems === 'number' && schema.maxItems === schema.minItems){
                return '[' + (new Array(schema.maxItems).fill(schemaToTypescriptType(schema.items)).join(', ')) + ']'
            } else {
                return schemaToTypescriptType(schema.items) + '[]'
            }
        }

        case 'object': return (schema.properties ? ('{' + Object.entries(schema.properties).map(prop => '' + prop[0] + (schema.required && schema.required.includes(prop[0]) ? '' : '?') + ': ' + schemaToTypescriptType(prop[1])).join(',') + '}') : '{}')

        default: {
            if(schema.properties){
                console.warn('missing schema.type, asuming its an object', schema)
                schema.type = 'object'
                return schemaToTypescriptType(schema)
            }

            console.error('schema', schema)
            throw new Error('unsupported schema type: "' + schema.type + '"')
        }
    }
}
