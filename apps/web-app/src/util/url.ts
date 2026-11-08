import { RouteLocationNormalizedLoadedGeneric, useRouter } from "vue-router"

export function getAnchorUrlForId(id: string){
    return document.location.protocol + '//' + document.location.host + document.location.pathname + '#' + id
}

export function getParamFromRoute(paramName: string, route: RouteLocationNormalizedLoadedGeneric){
    const param = route.params[paramName]
    if(param instanceof Array === false && typeof param !== 'string'){
        throw new Error('could not parse id param from route: ' + paramName)
    }

    return param instanceof Array ? param[0] : param
}


export function getIdParamFromRoute(paramName: string, route: RouteLocationNormalizedLoadedGeneric){
    const param = getParamFromRoute(paramName, route)

    const id = parseInt(param)

    if(isNaN(id)){
        throw new Error('could not parse id param from route: ' + paramName)
    }

    return id
}

export function getIdQueryFromRoute(queryParamName: string, route: RouteLocationNormalizedLoadedGeneric){
    const param = route.query[queryParamName]
    if(param instanceof Array === false && typeof param !== 'string'){
        throw new Error('could not parse id query param from route: ' + queryParamName)
    }

    const id = parseInt('' + (param instanceof Array ? param[0] : param))

    if(isNaN(id)){
        throw new Error('could not parse id query param from route: ' + queryParamName)
    }

    return id
}

export function getStringQueryFromRoute(queryParamName: string, route: RouteLocationNormalizedLoadedGeneric){
    const param = route.query[queryParamName]
    if(param instanceof Array === false && typeof param !== 'string'){
        throw new Error('could not parse string query param from route: ' + queryParamName)
    }

    return '' + (param instanceof Array ? param[0] : param)
}

export function routeHasQueryParam(queryParamName: string, route: RouteLocationNormalizedLoadedGeneric){
    return typeof route.query[queryParamName] !== 'undefined'
}

export function getIdQueryFromRouteOrUseDefault(queryParamName: string, route: RouteLocationNormalizedLoadedGeneric, defaultValue: number){
    try {
        return getIdQueryFromRoute(queryParamName, route)
    } catch (err){
        return defaultValue
    }
}