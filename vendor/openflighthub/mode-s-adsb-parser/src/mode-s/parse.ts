// docs see https://mode-s.org/1090mhz/content/mode-s/1-basics.html

import { bitStringToUnsignedIntegerSafe, bitStringToUnsignedIntegerSafeRangeFromBits, bytesToFullBitString, parseBitStructure, Byte, bitStringToFullBytes } from '../util/bits_and_bytes'


export type ModeS_ParsedMessage = {
    downlinkType: Byte
    contentBits: string
}

export interface ModeS_ParsedMessage_Type_ExtendedSquitter extends ModeS_ParsedMessage {
    downlinkType: 17
    transponderCapability: 0 | 4 | 5 | 6 | 7 /*
        0 = level 1 transponder
        1-3 = reserved
        4 = level 2+ transponder, with ability to set transponderCapability to 7, ON GROUND
        5 = level 2+ transponder, with ability to set transponderCapability to 7, AIRBORNE
        6 = level 2 transponder, with ability to set transponderCapability to 7, either ON GROUND or AIRBONE
        7 = Signifies the Downlink Request value is 0, or the Flight Status is 2, 3, 4, or 5, either airborne or on the ground
    */
    icaoAddress: number // 24 bits
}


export function parseModeS(bytes: Byte[]){

    // see https://mode-s.org/1090mhz/content/introduction.html#mode-s-format

    const bits = bytesToFullBitString(bytes)

    //TODO implement parity

    // parity check see: https://mode-s.org/1090mhz/content/mode-s/1-basics.html#sec:parity


    if(bits.substring(0, 2) === '11'){
        // special format 24

        //TODO
        throw new Error('unsupported mode s downlink type "24"')

    } else {

        const struct = parseBitStructure(bits, [{
            name: 'downlinkType',
            bits: 5
        }, {
            name: 'rest',
            bits: -1
        }])

        const downlinkType = bitStringToUnsignedIntegerSafeRangeFromBits(struct.get('downlinkType'), 5)

        if(downlinkType >= 16){
            // long 112 bit format

            const longStruct = parseBitStructure(struct.get('rest'), [{
                name: 'data',
                bits: 83
            }, {
                name: 'parity',
                bits: 24
            }])


            if(downlinkType === 17){
                // Mode S Extended Squitter

                // parity check see: https://mode-s.org/1090mhz/content/mode-s/1-basics.html#sec:parity



                const extendedSquitterStruct = parseBitStructure(longStruct.get('data'), [{
                    name: 'transponderCapability',
                    bits: 3
                }, {
                    name: 'icaoAircraftAddress',
                    bits: 24
                }, {
                    name: 'content',
                    bits: 56
                }])


                const ret: ModeS_ParsedMessage_Type_ExtendedSquitter = {
                    downlinkType,

                    transponderCapability: bitStringToUnsignedIntegerSafe(extendedSquitterStruct.get('transponderCapability'), [0, 4, 5, 6, 7], 'transponderCapability'),

                    icaoAddress: bitStringToUnsignedIntegerSafeRangeFromBits(extendedSquitterStruct.get('icaoAircraftAddress'), 24, 'icaoAircraftAddress'),

                    contentBits: extendedSquitterStruct.get('content')
                }

                return ret
            }

            //TODO
            throw new Error('unsupported mode s downlink type: "' + downlinkType + '"')

        } else {
            // short 56 bit format

            const shortStruct = parseBitStructure(struct.get('rest'), [{
                name: 'data',
                bits: 27
            }, {
                name: 'parity',
                bits: 24
            }])

            throw new Error('unsupported mode s downlink type: "' + downlinkType + '"')
        }
    }
}

export function checkCrcParity(dataBitString: string, parityBitString: string){
    //TODO
}

type Bit = 0 | 1


const PARITY_BIT_COUNT = 24
function calculateCrcParity(dataBitString: string){

    const dataAndParityBitString = dataBitString + (Array(PARITY_BIT_COUNT).fill('0').join(''))

    const ret = crc(dataAndParityBitString, true)

    return ret
}

export function crc(dataAndParityBitString: string, encode: boolean){

    // implementation see https://github.com/junzis/pyModeS/blob/master/src/pyModeS/py_common.py

    const generator: Bit[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1]

    let msgnpbin = dataAndParityBitString.split('').map(v => v === '1' ? 1 : 0)

    if(encode){
        msgnpbin = overwritePartOfArray(msgnpbin, 0, Array(PARITY_BIT_COUNT).fill('0'))
    }

    for(let i = 0; i < msgnpbin.length - PARITY_BIT_COUNT; i++){
        if(msgnpbin[i] === 0){
            continue
        }

        const xOred = xOrBits(msgnpbin.slice(i, i + generator.length), generator)

        msgnpbin = overwritePartOfArray(msgnpbin, i, xOred)
    }

    // last 24 bits
    const msgbin = msgnpbin.slice(msgnpbin.length - 24).join('')

    const reminderBits = msgbin.substring(1, msgbin.length - 1)// TODO why cutoff first and last bit ???

    return reminderBits


    function xOrBits(bits: Bit[], xor: Bit[]){
        const ret: Bit[] = []

        for(let i = 0; i < bits.length; i++){
            ret[i] = (bits[i] ^ xor[i]) as Bit
        }

        return ret
    }


    /**
     * does not modify original array!
     * only overwrites existing array elements! the length of the returned array is the same as of the original "array" parameter
     */
    function overwritePartOfArray<T extends any>(array: Array<T>, start: number, withArray: Array<T>){

        if(start > array.length){
            throw new Error('start can not be larger than array.length')
        }

        const arrayToWrite = withArray.slice(0, array.length - start)

        return array.slice(0, start).concat(...arrayToWrite)
    }

}
