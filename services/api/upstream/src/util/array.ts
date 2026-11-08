export function deduplicateIdArray<T extends {id: number}>(arr: T[]) {
    const uniqueArray: T[] = []

    arr.forEach(element => {
        if(!uniqueArray.find(e => e.id === element.id)){
            uniqueArray.push(element)
        }
    })

    return uniqueArray
}