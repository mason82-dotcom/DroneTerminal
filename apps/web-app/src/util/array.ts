
export function uniqueProperty<O extends Record<string, any>, K extends keyof O>(input: O[], propertyName: K){
    const unique: O[K][] = []

    for(const obj of input){

        if(typeof obj[propertyName] !== undefined){
            if(!unique.includes(obj[propertyName])){
                unique.push(obj[propertyName])
            }
        }
    }

    return unique
}

export function uniqueByProperty<O extends Record<string, any>, K extends keyof O>(input: O[], propertyName: K){
    const unique: O[] = []

    for(const obj of input){

        if(typeof obj[propertyName] !== undefined){
            if(!unique.find(u => u[propertyName] === obj[propertyName])){
                unique.push(obj)
            }
        }
    }

    return unique
}

/**
 * sorts in place
 */
export function sortByProperty<O extends Record<string, any>, K extends keyof O>(input: O[], propertyName: K){
    return input.sort((a, b)=>{
        const aP = a[propertyName]
        const bP = b[propertyName]

        if(aP < bP){
            return -1
        }

        if(aP === bP){
            return 0
        }

        return 1
    })
}
