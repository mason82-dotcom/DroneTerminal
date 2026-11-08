import { ADSB_ParsedMessage, parseADSB } from "../../src/adsb/parse";
import { intToBitString } from "../../src/util/test_helpers";

test('parseADSB', ()=>{

    expect(parseADSB({
        downlinkType: 17,
        transponderCapability: 0,
        icaoAddress: parseInt('abcde1', 16),
        contentBits:
            intToBitString(10, 5) +
            intToBitString(2, 3) +
            intToBitString(1243, 6 * 8) +
            intToBitString(0, 24)

    })).toStrictEqual({
        typeCode: 10,
        icaoAddress6charHexLowercase: 'abcde1',
        messageData: [82, 0, 0, 0, 0, 4, 219, 0, 0, 0]
    } as ADSB_ParsedMessage)
})
