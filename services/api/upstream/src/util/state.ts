export function isValidState(state: number, allowedStates: {[key: string]: number}){
    for(const key of Object.keys(allowedStates)){
        if(allowedStates[key] === state){
            return true
        }
    }

    return false
}