

// typescript compatible version of Object.keys()
export const objectKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

// typescript compatible version of Object.assign()
export const assignObject = Object.assign as <T extends object, U extends object>(target: T, source: U) => T & U

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
export type WithPartial<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }
