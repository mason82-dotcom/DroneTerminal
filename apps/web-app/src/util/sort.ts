export function sortArrayById<T extends {id: number}>(arr: T[]){

    if((arr instanceof Array) === false){
        return []
    }

    return arr.sort((a, b) => {
        if(a.id < b.id){
            return -1
        }

        if(a.id > b.id){
            return -1
        }

        return 0
    })
}