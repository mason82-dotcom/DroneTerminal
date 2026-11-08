export function objectsAreEqual(obj1: object, obj2: object): boolean {

    if (obj1 === obj2) {
        return true
    }

    if (typeof obj1 !== typeof obj2) {
        return false
    }

    return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export function objectDiffKeys<A extends string, B extends string>(from: Record<A, any>, to: Record<B, any>): (A | B)[] {
    const differentKeys: (A | B)[] = []

    differentKeys.push(...Object.keys(from).filter(key => !to.hasOwnProperty(key)) as A[])
    differentKeys.push(...Object.keys(to).filter(key => !from.hasOwnProperty(key)) as B[])

    return differentKeys
}
