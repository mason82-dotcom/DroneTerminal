import * as path from 'path'
import jestOpenAPI from 'jest-openapi'

/**
 * loads jestOpenAPI with the spec file
 */
export default function(){
    const apiSpecPath = path.resolve('./openapi_spec.yaml')
    jestOpenAPI(apiSpecPath)
}
