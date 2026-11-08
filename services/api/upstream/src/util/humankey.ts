export function createSimpleHumanReadableCode(length: number){
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789'//no "l" or "1" or "I" or "O" or "0" to avoid confusion

    let result = ''
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}