import { byteToShortBitString, byteToFullBitString, bytesToFullBitString, bitStringToFullBytes, bitStringToUnsignedInteger, bitStringToUnsignedIntegerSafe, bitStringToUnsignedIntegerSafeRanges, bitStringToUnsignedIntegerSafeRangeFromBits, parseBitStructure, bufferToBytes } from "../../src/util/bits_and_bytes";

test('byteToShortBitString', ()=>{
    expect(byteToShortBitString(4)).toStrictEqual('100')
    expect(byteToShortBitString(37)).toStrictEqual('100101')
})

test('byteToFullBitString', ()=>{
    expect(byteToFullBitString(4)).toStrictEqual('00000100')
    expect(byteToFullBitString(37)).toStrictEqual('00100101')
})

test('bytesToFullBitString', ()=>{
    expect(bytesToFullBitString([4, 37])).toStrictEqual('00000100' + '00100101')
})

test('bitStringToFullBytes', ()=>{
    expect(bitStringToFullBytes('00000100' + '00010000')).toStrictEqual([4, 16])
    expect(()=>{
        bitStringToFullBytes('10')
    }).toThrow()
})

test('bitStringToUnsignedInteger', ()=>{
    expect(bitStringToUnsignedInteger('1010')).toStrictEqual(10)
    expect(()=>{
        bitStringToUnsignedInteger('x')
    }).toThrow()
})

test('bitStringToUnsignedIntegerSafe', ()=>{
    expect(bitStringToUnsignedIntegerSafe('00010001', [17])).toStrictEqual(17)
    expect(()=>{
        bitStringToUnsignedIntegerSafe('1', [0])
    }).toThrow()
})

test('bitStringToUnsignedIntegerSafeRanges', ()=>{
    expect(bitStringToUnsignedIntegerSafeRanges('100', [[0, 4]])).toStrictEqual(4)
    expect(bitStringToUnsignedIntegerSafeRanges('100', [[3, 4]])).toStrictEqual(4)
    expect(bitStringToUnsignedIntegerSafeRanges('100', [[4, 4]])).toStrictEqual(4)
    expect(()=>{
        bitStringToUnsignedIntegerSafeRanges('100', [[5, 8]])
    }).toThrow()
})

test('bitStringToUnsignedIntegerSafeRangeFromBits', ()=>{
    expect(bitStringToUnsignedIntegerSafeRangeFromBits('100', 3)).toStrictEqual(4)
    expect(bitStringToUnsignedIntegerSafeRangeFromBits('100', 4)).toStrictEqual(4)
    expect(()=>{
        bitStringToUnsignedIntegerSafeRangeFromBits('100', 2)
    }).toThrow()
})

test('parseBitStructure', ()=>{
    expect(parseBitStructure('101', [{
        name: 'a',
        bits: 2
    }, {
        name: 'b',
        bits: 1
    }])).toStrictEqual(new Map<string, string>()
        .set('a', '10')
        .set('b', '1')
    )

    expect(parseBitStructure('1011', [{
        name: 'a',
        bits: 2
    }, {
        name: 'b',
        bits: -1
    }])).toStrictEqual(new Map<string, string>()
        .set('a', '10')
        .set('b', '11')
    )

    expect(()=>{
        parseBitStructure('100', [{
            name: 'a',
            bits: 4
        }])
    }).toThrow()

    expect(()=>{
        parseBitStructure('100', [{
            name: 'a',
            bits: 2
        }, {
            name: 'b',
            bits: 2
        }])
    }).toThrow()


    expect(()=>{
        parseBitStructure('1', [{
            name: 'a',
            bits: -1
        }, {
            name: 'b',
            bits: 1
        }])
    }).toThrow()

    expect(()=>{
        parseBitStructure('1', [{
            name: 'a',
            bits: 0
        }])
    }).toThrow()

})


test('bufferToBytes', ()=>{
    expect(bufferToBytes(Buffer.from([255, 2]))).toStrictEqual([255, 2])

    expect(bufferToBytes(Buffer.from([256, 2]))).toStrictEqual([0, 2])
})
