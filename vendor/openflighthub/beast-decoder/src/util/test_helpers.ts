import * as modeSAdsbParser from 'mode-s-adsb-parser'

export const ESCAPE_CHAR_CODE = 0x1a
export const ESCAPE_CHAR = String.fromCharCode(ESCAPE_CHAR_CODE)


export function escapeBytes(buf: number[]){
    let ret: number[] = []

    for(const numb of buf){
        if(numb === ESCAPE_CHAR_CODE){
            ret.push(ESCAPE_CHAR_CODE)
        }

        ret.push(numb)
    }

    return ret
}

export function encodeIntBytesAsBytes(int: number, byteCount: number){
    const bitString = intToBitString(int, byteCount)

    const bytes: number[] = []

    for(let i = 0; i < byteCount; i++){
        bytes[i] = modeSAdsbParser.util.bits_and_bytes.bitStringToUnsignedInteger(bitString.slice(8 * i, 8 * (i+1)))
    }

    return bytes
}

export function intToBitString(int: number, byteCount: number){
    let bitString = (int >>> 0).toString(2)

    while(bitString.length < byteCount * 8){
        bitString = '0' + bitString
    }

    return bitString
}
