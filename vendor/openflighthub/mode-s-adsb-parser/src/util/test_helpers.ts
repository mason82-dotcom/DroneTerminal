import { bitStringToUnsignedInteger, Byte } from "./bits_and_bytes"

export const ESCAPE_CHAR_CODE = 0x1a
export const ESCAPE_CHAR = String.fromCharCode(ESCAPE_CHAR_CODE)


export function escapeBytes(buf: Byte[]){
    let ret: Byte[] = []

    for(const numb of buf){
        if(numb === ESCAPE_CHAR_CODE){
            ret.push(ESCAPE_CHAR_CODE)
        }

        ret.push(numb)
    }

    return ret
}

export function encodeIntBytesAsBytes(int: number, byteCount: number){
    const bitString = intToFullByteBitString(int, byteCount)

    const bytes: Byte[] = []

    for(let i = 0; i < byteCount; i++){
        bytes[i] = bitStringToUnsignedInteger(bitString.slice(8 * i, 8 * (i+1)))
    }

    return bytes
}

export function intToFullByteBitString(int: number, byteCount: number){
    let bitString = (int >>> 0).toString(2)

    while(bitString.length < byteCount * 8){
        bitString = '0' + bitString
    }

    return bitString
}

export function intToBitString(int: number, bitCount: number){
    let bitString = (int >>> 0).toString(2)

    if(bitString.length > bitCount){
        throw new Error('supplied int (' + int + ') bit representation is long then the defined bitCount: ' + bitCount)
    }

    while(bitString.length < bitCount){
        bitString = '0' + bitString
    }

    return bitString
}
