import { escapeBytes, intToFullByteBitString, encodeIntBytesAsBytes, ESCAPE_CHAR_CODE, intToBitString } from "../../src/util/test_helpers";

test('escapeString', ()=>{
    expect(escapeBytes([ESCAPE_CHAR_CODE, 37, 38])).toStrictEqual([ESCAPE_CHAR_CODE, ESCAPE_CHAR_CODE, 37, 38])
})

test('intToFullByteBitString', ()=>{
    expect(intToFullByteBitString(4, 1)).toStrictEqual('00000100')
    expect(intToFullByteBitString(5, 1)).toStrictEqual('00000101')
    expect(intToFullByteBitString(5, 2)).toStrictEqual('0000000000000101')
    expect(intToFullByteBitString(77, 2)).toStrictEqual('0000000001001101')
})

test('intToBitString', ()=>{
    expect(intToBitString(4, 3)).toStrictEqual('100')
    expect(intToBitString(5, 4)).toStrictEqual('0101')
    expect(intToBitString(5, 3)).toStrictEqual('101')
    expect(intToBitString(77, 9)).toStrictEqual('001001101')
    expect(intToBitString(0, 3)).toStrictEqual('000')
})

test('encodeIntBytesAsString', ()=>{
    expect(encodeIntBytesAsBytes(76, 1)).toStrictEqual([76])
    expect(encodeIntBytesAsBytes(77, 2)).toStrictEqual([0, 77])
    expect(encodeIntBytesAsBytes(12345, 2)).toStrictEqual([48, 57])
})
