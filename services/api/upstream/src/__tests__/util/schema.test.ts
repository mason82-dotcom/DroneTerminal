import { filterObject, validate } from './../../util/schema'

describe('filterObject()', ()=>{

    test('no additional properties', async()=>{

        const data = filterObject({
            a: true
        }, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(data).toEqual({
            a: true
        })
    })

    test('top level additional property', async()=>{

        const data = filterObject({
            a: true,
            b: true
        }, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(data).toEqual({
            a: true
        })
    })

    test('second level additional property', async()=>{

        const data = filterObject({
            a: {
                x: true,
                y: true
            }
        }, {
            properties: {
                a: {
                    properties: {
                        x: {
                            type: 'boolean'
                        }
                    }
                }
            }
        })

        expect(data).toEqual({
            a: {
                x: true
            }
        })
    })

    test('required properties', ()=>{

        const data = filterObject({
            a: {
                x: true,
                y: true
            }
        }, {
            required: ['a'],
            properties: {
                a: {
                    properties: {
                        x: {
                            type: 'boolean'
                        }
                    }
                },
                b: {
                    type: 'string'
                }
            }
        })

        expect(data).toEqual({
            a: {
                x: true
            }
        })

    })

})




describe('validate()', ()=>{

    test('no data non strict', async()=>{

        const valid = validate({}, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(valid).toEqual(true)
    })

    test('no data non strict, required', async()=>{

        const valid = validate({}, {
            required: ['a'],
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(typeof valid).toBe('string')
    })

    test('no data strict', async()=>{

        const valid = validate({}, {
            type: 'object',
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(valid).toEqual(true)
    })

    test('no data strict, required', async()=>{

        const valid = validate({}, {
            type: 'object',
            required: ['a'],
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(typeof valid).toBe('string')
    })

    test('data non strict', async()=>{

        const valid = validate({
            a: true
        }, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(valid).toEqual(true)
    })


    test('data strict', async()=>{

        const valid = validate({
            a: true
        }, {
            type: 'object',
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(valid).toEqual(true)
    })

    test('data to not be touched', async()=>{

        const data = {
            a: true,
            b: true
        }

        const valid = validate(data, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        })

        expect(valid).toEqual(true)
        expect(data).toEqual({
            a: true,
            b: true
        })
    })

    test('data to be touched when skipping serialisation', async()=>{

        const data = {
            a: true,
            b: true
        }

        const valid = validate(data, {
            properties: {
                a: {
                    type: 'boolean'
                }
            }
        }, true)

        expect(valid).toEqual(true)
        expect(data).toEqual({
            a: true
        })
    })

})


