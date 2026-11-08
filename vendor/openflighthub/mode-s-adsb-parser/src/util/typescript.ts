
// typescript compatible version of Object.keys()
export const objectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// typescript compatible version of Object.assign()
export const assignObject = Object.assign as <T extends object, U extends object>(obj: T, other: U) => T & U


/* Add Missing Properties to an object */

export function addMissingProperties<Base extends object, Full extends Base>(base: Base, additional: OnlyAdditionalProperties<Base, Full>) : Full{

    const ret = assignObject(base, additional)

    //@ts-ignore
    return ret
}

export type OnlyAdditionalProperties<Base extends Record<string, any>, Extend extends Base> = Omit<Extend, keyof Base>



/* How to use */

/*
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

/* COMPUTE RANGE https://catchts.com/range-numbers#part_1 */

export type ComputeRange<
  N extends number,
  Result extends Array<unknown> = [],
> =
(Result['length'] extends N
    ? Result
    : ComputeRange<N, [...Result, Result['length']]>
)

/* HOW TO USE */

// 0 , 1, 2 ... 998
type NumberRange = ComputeRange<999>[number]



/* COMPUTE RANGE FROM https://catchts.com/range-numbers#part_2 */

type Add<A extends number, B extends number> = [...ComputeRange<A>, ...ComputeRange<B>]['length']

export type ComputeRangeFrom<
  From extends number,
  Length extends number,
  Result extends Array<unknown> = [],
> =
(Result['length'] extends Length
    ? Result
    : ComputeRangeFrom<From, Length, [...Result, Add<Result['length'], From>]>
)

/* How to use */

// 5, 6
type NumberRangeFrom = ComputeRangeFrom<5, 2>[number]
