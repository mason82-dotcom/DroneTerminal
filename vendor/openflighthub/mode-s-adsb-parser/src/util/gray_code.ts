// source https://rosettacode.org/wiki/Gray_code#JavaScript

export function encodeGrayCode (number) {
    return number ^ (number >> 1)
}

export function decodeGrayCode (encodedNumber) {
    let number = encodedNumber

    while (encodedNumber >>= 1) {
        number ^= encodedNumber
    }

    return number
}