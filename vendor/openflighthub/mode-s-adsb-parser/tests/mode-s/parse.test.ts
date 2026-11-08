import { checkCrcParity, ModeS_ParsedMessage, parseModeS } from "../../src/mode-s/parse";
import { bitStringToFullBytes, bytesToFullBitString, bufferToBytes, parseBitStructure } from "../../src/util/bits_and_bytes";
import { intToBitString } from "../../src/util/test_helpers";

// test('parseModeS', ()=>{

//     const contentBits = ''

//     expect(parseModeS(bitStringToFullBytes(
//         intToBitString(15, 5) +
//         intToBitString(5, 3) +
//         intToBitString(2025, 24) +
//         contentBits +
//         bytesToFullBitString([1, 2, 3])//TODO implement parity correctly
//     ))).toStrictEqual({
//         downlinkType: 17,
//         transponderCapability: 5,
//         icaoAddress: 2025,
//         contentBits,
//     } as ModeS_ParsedMessage)
// })

test('parseModeS', ()=>{

    const contentBits = '10001101' + '01011010' + '10101010' + '10001101' + '01011010' +
        '10001101' + '01011010'

    expect(parseModeS(bitStringToFullBytes(
        intToBitString(17, 5) +
        intToBitString(5, 3) +
        intToBitString(2025, 24) +
        contentBits +
        bytesToFullBitString([1, 2, 3])//TODO implement parity correctly
    ))).toStrictEqual({
        downlinkType: 17,
        transponderCapability: 5,
        icaoAddress: 2025,
        contentBits,
    } as ModeS_ParsedMessage)
})


test('parseModeS', ()=>{

    const message = Buffer.from('8D40621D58C382D690C8AC2863A7', 'hex')

    expect(parseModeS(bufferToBytes(message))).toStrictEqual({
        downlinkType: 17,
        transponderCapability: 5,
        icaoAddress: 4219421,
        contentBits: '01011000110000111000001011010110100100001100100010101100',
    } as ModeS_ParsedMessage)
})


test('parseModeS', ()=>{

    const message = Buffer.from('8D40621D58C386435CC412692AD6', 'hex')

    expect(parseModeS(bufferToBytes(message))).toStrictEqual({
        downlinkType: 17,
        transponderCapability: 5,
        icaoAddress: 4219421,
        contentBits: '01011000110000111000011001000011010111001100010000010010',
    } as ModeS_ParsedMessage)
})

test('checkCrcParity', ()=>{

    const message = Buffer.from('8D40621D58C386435CC412692AD6', 'hex')

    const bits = bytesToFullBitString(bufferToBytes(message))
    const contentBits = bits.substring(5, 5 + 83)
    const parityBits = bits.substring(5 + 83)

    expect(checkCrcParity(contentBits, parityBits)).toStrictEqual(true)
})
