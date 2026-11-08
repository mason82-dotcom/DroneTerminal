/**
 * joins two objects with Object.assign but without modifying the original objects (using JSON stringify under the hood for duplication)
 */
export function joinObjects<B = {[key: string]: any}, A = {[key: string]: any}>(objBase: B, objAdditional: A){
    const copy = JSON.parse(JSON.stringify(objBase))

    return Object.assign(copy, objAdditional) as B & A
}
