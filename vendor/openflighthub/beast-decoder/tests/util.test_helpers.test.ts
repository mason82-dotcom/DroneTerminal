import { escapeBytes, intToBitString, encodeIntBytesAsBytes, ESCAPE_CHAR_CODE } from "../src/util/test_helpers";

test('escapeString', ()=>{
    expect(escapeBytes([ESCAPE_CHAR_CODE, 37, 38])).toStrictEqual([ESCAPE_CHAR_CODE, ESCAPE_CHAR_CODE, 37, 38])
})

test('intToBitString', ()=>{
    expect(intToBitString(4, 1)).toStrictEqual('00000100')
    expect(intToBitString(5, 1)).toStrictEqual('00000101')
    expect(intToBitString(5, 2)).toStrictEqual('0000000000000101')
    expect(intToBitString(77, 2)).toStrictEqual('0000000001001101')
})

test('encodeIntBytesAsString', ()=>{
    expect(encodeIntBytesAsBytes(76, 1)).toStrictEqual([76])
    expect(encodeIntBytesAsBytes(77, 2)).toStrictEqual([0, 77])
    expect(encodeIntBytesAsBytes(12345, 2)).toStrictEqual([48, 57])
})
