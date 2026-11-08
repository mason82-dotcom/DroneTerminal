import { makeRequestFunctionType } from "../rest_api"
import { {{#each allTypeDefinitions}} {{this.name}}{{#if @last}}{{else}},{{/if}} {{/each}} } from './rest_api_types'

export function makeStructure(makeRequest: makeRequestFunctionType){
    return {{> _object api}}
}
