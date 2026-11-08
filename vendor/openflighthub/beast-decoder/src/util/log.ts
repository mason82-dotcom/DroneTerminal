import { isDevEnvironment } from "./env"

export function logsAreEnabled(){
    return isDevEnvironment()
}

export function logError(...args: any){
    if(logsAreEnabled()){
        console.error.apply(null, args)
    }
}

export function logWarning(...args: any){
    if(logsAreEnabled()){
        console.warn.apply(null, args)
    }
}
