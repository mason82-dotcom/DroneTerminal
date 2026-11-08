
// typescript compatible version of Object.keys()
export const objectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// typescript compatible version of Object.assign()
export const assignObject = Object.assign as <T extends object, U extends object>(obj: T, other: U) => T & U

//TODO this is very close to being absolutely nice, if we could make it so the second generic is not mandatory but infered from param Base
export function addMissingProperties<Base extends object, Full extends Base>(base: Base, additional: OnlyAdditionalProperties<Base, Full>) : Full{

    const ret = assignObject(base, additional)

    //@ts-ignore
    return ret
}

export type OnlyAdditionalProperties<Base extends Record<string, any>, Extend extends Base> = Omit<Extend, keyof Base>



/* example usage
type Base = {
    bober: number
}

interface Extend extends Base {
    kurrwa: boolean
}

const all = addMissingProperties<Base, Extend>({
    bober: 42
}, {

})


const base1: Base = {
    bober: 42
}

const all2 = addMissingProperties<Base, Extend>(base1, {

})
*/



export type Byte = ComputeRange<256>[number]


export type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> =
  /**
   * If length of Result is equal to N,
   * stop recursion and return Result
   */
  (Result['length'] extends N
    ? Result
    /**
     * Otherwise, call ComputeRange recursively with same N,
     * but with extendsd Result - add Result.length to current Result
     *
     * First step:
     * Result is [] -> ComputeRange is called with [...[], 0]
     *
     * Second step:
     * Result is [0] -> ComputeRange is called with [...[0], 1]
     *
     * Third step:
     * Result is [0, 1] -> ComputeRange is called with [...[0, 1], 2]
     *
     * ComputeRange is called until Result will meet a length requirement
     */
    : ComputeRange<N, [...Result, Result['length']]>
  )

/* usage

// 0 , 1, 2 ... 998
export type NumberRange = ComputeRange<999>[number]

*/
