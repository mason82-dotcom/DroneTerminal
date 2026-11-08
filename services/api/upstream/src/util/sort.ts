export function sortByISODateString(a: string, b: string): number {//TODO test
    return new Date(a).getTime() - new Date(b).getTime()
}