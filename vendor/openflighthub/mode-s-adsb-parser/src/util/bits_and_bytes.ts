
import type {ComputeRange} from './typescript'

export type BitStructureDefinition<N extends string> = BitStructureDefinitionEntry<N>[]

export type BitStructureDefinitionEntry<N extends string> = {
    name: N
    bits: number // -1 for all remaining bits (only last entry can do that!)
}

export type Byte = ComputeRange<256>[number]

type Unboxed<T> = T extends (infer U)[] ? U : T

export type BitStructure<N extends string, D extends BitStructureDefinition<N>> = Map<Unboxed<D>['name'], string>

export function parseBitStructure<N extends string, D extends BitStructureDefinition<N>, FN extends Unboxed<D>['name'], >(bitString: string, structureDefinition: D): BitStructure<N, D>{

    const ret: BitStructure<N, D> = new Map<FN, string>()

    let currentIndex = 0

    for(const def of structureDefinition){
        if(def.bits < -1 || def.bits === 0){
            throw new Error('structureDefinition is invalid at "' + def.name + '" bits can not be: ' + def.bits)
        }
    }

    const totalDefinitionMinLength = structureDefinition.length === 1 ? structureDefinition[0].bits : (structureDefinition.map(d => d.bits).filter(b => b >= 0).reduce((prev, cur)=>(prev || 0) + cur))

    if(bitString.length < totalDefinitionMinLength){
        throw new Error('bitString is shorter then structureDefinition requires (' + totalDefinitionMinLength + '): ' + bitString.length)
    }

    for(let i = 0; i < structureDefinition.length; i++){
        const def = structureDefinition[i]

        let nextIndex = currentIndex + def.bits

        if(def.bits === -1){
            if(i < structureDefinition.length - 1){
                throw new Error('only last entry in structureDefinition can set "bits" to -1')
            }

            nextIndex = bitString.length
        }

        const bits = bitString.slice(currentIndex, nextIndex)

        ret.set(def.name, bits)
        currentIndex = nextIndex
    }

    return ret
}


/**
 * @see bytesToFullBitString()
 */
export function bytesToFullBitString(bytes: Byte[]){
    let str = ''

    bytes.forEach(byte => {
        str += byteToFullBitString(byte)
    })

    return str
}

/**
 * e.g. (5) => "101"
 * @returns no leading zeros
 */
export function byteToShortBitString(byte: Byte){
    return (byte >>> 0).toString(2)
}

/**
 * e.g. (5) => "00000101"
 * @see byteToShortBitString()
 */
export function byteToFullBitString(byte: Byte){
    let ret = byteToShortBitString(byte)

    while(ret.length < 8){
        ret = '0' + ret
    }

    return ret
}



/**
 * e.g. ("101") => 5
 * @see bitStringToUnsignedIntegerSafe()
 */
export function bitStringToUnsignedInteger<N extends number>(bitString: string) : N {
    if(bitString.length > 64){
        throw new Error('bitString exceeds 64 bits (c limit for long integer): ' + bitString.length)
    }

    const bigInt = BigInt('0b' + (bitString || 0))

    const ret = BigInt.asUintN(64, bigInt)

    if(ret < Number.MAX_SAFE_INTEGER && ret > Number.MIN_SAFE_INTEGER){
        const numb = parseInt('' + Number(ret).valueOf())

        return numb as N
    } else {
        throw new Error('number is larger than max safe js integer')
    }
}


/**
 * performs a check if resulting number is an allowed value
 * Note: typescript typing is only safe for allowedValues [0, ... , 999]
 * @see bitStringToUnsignedInteger()
 * @see bitStringToUnsignedIntegerSafeRanges()
 */
export function bitStringToUnsignedIntegerSafe<N extends ComputeRange<999>[number]>(bitString: string, allowedValues: N[], debugLabel?: string) : N {

    const numb = bitStringToUnsignedInteger(bitString)

    if(!allowedValues.includes(numb as N)){
        throw new Error('unsignedInteger value is not allowed: ' + numb + (debugLabel ? ' (for "' + debugLabel + '")' : ''))
    }

    return numb as N
}

/**
 *
 * @param bits above 8, correct typescript typing is not supported anymore
 * @returns
 */
export function bitStringToUnsignedIntegerSafeRangeFromBits<B extends number, N =
    B extends 1 ? ComputeRange<2>[number] :
    B extends 2 ? ComputeRange<4>[number] :
    B extends 3 ? ComputeRange<8>[number] :
    B extends 4 ? ComputeRange<16>[number] :
    B extends 5 ? ComputeRange<32>[number] :
    B extends 6 ? ComputeRange<64>[number] :
    B extends 7 ? ComputeRange<128>[number] :
    B extends 8 ? ComputeRange<256>[number] :
    number>(bitString: string, bits: B, debugLabel?: string){

    const numb = bitStringToUnsignedIntegerSafeRanges(bitString, [[0, (2 ** bits) - 1]], debugLabel)

    return numb as N
}

/**
 * performs a check if resulting number is an allowed value
 * @param allowedRanges e.g. [[from, to], [from, to]]
 * @see bitStringToUnsignedInteger()
 * @see bitStringToUnsignedIntegerSafe()
 */
export function bitStringToUnsignedIntegerSafeRanges(bitString: string, allowedRanges: [number, number][], debugLabel?: string){

    const numb = bitStringToUnsignedInteger(bitString)

    for(const range of allowedRanges){
        if(numb >= range[0] && numb <= range[1]){
            return numb
        }
    }

    throw new Error('unsignedInteger value is not allowed: ' + numb + (debugLabel ? ' (for "' + debugLabel + '")' : ''))
}

export function bitStringToFullBytes(bitString: string){
    if((bitString.length % 8) !== 0){
        throw new Error('bitString.length is not a multiple of 8: ' + bitString.length)
    }

    const bytes: Byte[] = []

    for(let i = 0; i < bitString.length; i+=8){
        bytes.push(bitStringToUnsignedIntegerSafeRangeFromBits(bitString.slice(i, i + 8), 8))
    }

    return bytes
}


export function bufferToBytes(buffer: Buffer<ArrayBufferLike>){
    const ret: Byte[] = []

    for(const byte of buffer){
        ret.push(byte as Byte)
    }

    return ret
}
