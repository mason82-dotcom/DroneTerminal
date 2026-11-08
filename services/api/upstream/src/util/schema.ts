import Ajv from 'ajv'
import {JSONSchema4} from './types/JSONSchema'

const ajv = new Ajv({removeAdditional: 'all', strictTypes: false})
ajv.addKeyword('example')// this comes from openapi spec
ajv.addFormat('uuid', /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)
ajv.addFormat('time', /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9])$/)
ajv.addFormat('timestamptz', /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/)
ajv.addFormat('binary', /.*/)

/**
 * returns a copy of an object, with all properties/items removed that are not defined in the schema. It will also remove all properties with value null. wWll throw FilterError if obj is not valid according to schema
 * @param obj
 * @param schema if additionalProperties or additionalItems is not set, it will be set to true
 */
export function filterObject<T>(obj: object, schema: JSONSchema4): T{
    const data = JSON.parse(JSON.stringify(obj, function (this, key, value){
        return value === null ? undefined : value
    }))

    const valid = validate(data, schema, true)

    if(valid !== true){
        throw new FilterError(valid)
    }

    return data
}

export class FilterError extends Error {

}

/**
 * @param obj
 * @param schema if additionalProperties or additionalItems is not set, it will be set to true
 * @returns true or a string describing the error
 */
export function validate(obj: object, schema: JSONSchema4, skipSerialization = false): true | string{

    if(schema.oneOf){//TODO only allow a single schema to match, not any (that would be anyOf implementation)
        let lastError : true | string = ''

        for(const o of schema.oneOf){
            const v = validate(obj, o, skipSerialization)
            if(v === true){
                return true
            } else {
                lastError = v
            }
        }

        return lastError
    }

    if(schema.allOf){
        let errors = [] as string[]

        for(const o of schema.allOf){
            const v = validate(obj, o, skipSerialization)
            if(v !== true){
                errors.push(v)
            }
        }
        if(errors.length === 0){
            return true
        }

        return errors.join(',')
    }

    //TODO why serialization here? shouldnt we serialize at the top of the function?
    let data
    if(!skipSerialization){
        data = JSON.parse(JSON.stringify(obj))
    } else {
        data = obj
    }


    if(schema.anyOf){
        let foundValidAnyOf: true | string = ''

        for(const s of schema.anyOf){
            const val = validate(obj, s)

            if(val === true){
                foundValidAnyOf = true
                break
            }
            foundValidAnyOf = val
        }

        if(foundValidAnyOf !== true){
            return 'anyOf (direct) failed: ' + foundValidAnyOf + '. Object: ' + JSON.stringify(obj, null, 2) + ' against schema: ' + JSON.stringify(schema.anyOf, null, 2)
        }

        return true
    }

    // by default prevent additionaProperties
    if(!schema.type || schema.type === 'object'){
        if(schema.additionalProperties === undefined){
            schema.additionalProperties = false
        }
    } else if(schema.type === 'array' && schema.items instanceof Array){
        if(schema.additionalItems === undefined){
            schema.additionalItems = false
        }
    } else if(schema.type === 'array' && schema.items instanceof Object &&
        //@ts-ignore
        (schema.items.anyOf || schema.items.allOf)){

        if(data instanceof Array === false){
            return '. is not an array'
        }

        //@ts-ignore
        if(schema.items.anyOf){
            for(const d of data){

                let foundValidAnyOf: true | string = ''

                //@ts-ignore
                for(const s of schema.items.anyOf){
                    const val = validate(d, s)

                    if(val === true){
                        foundValidAnyOf = true
                        break
                    }
                    foundValidAnyOf = val
                }

                if(foundValidAnyOf !== true){
                    return 'anyOf failed: '+ foundValidAnyOf + '. Object: ' + JSON.stringify(d, null, 2) + ' against schema: ' + JSON.stringify(
                        //@ts-ignore
                        schema.items.anyOf,
                    null, 2)
                }
            }

            return true
        }

        //@ts-ignore
        if(schema.items.allOf){
            for(const d of data){

                //@ts-ignore
                for(const s of schema.items.allOf){
                    const val = validate(d, s)

                    if(val === true){
                        continue
                    }

                    return '?allOf? failed for ' + val
                }
            }

            return true
        }
    }


    const val = ajv.compile(schema)
    const valid = val(data)
    const errors = val.errors

    if(valid === true){
        return true
    } else {
        return '' + errors.map(e => (e.instancePath !== '' ? e.instancePath + ': ' : '') + e.message).join(', ')
    }
}
