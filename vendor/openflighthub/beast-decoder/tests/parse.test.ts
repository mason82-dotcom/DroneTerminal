import { BeastParsedFrame, BeastParsedFrameType, parseBeastSocketData, parseBeastFrame, parseBeastLine } from "../src/parse";
import { encodeIntBytesAsBytes, ESCAPE_CHAR, ESCAPE_CHAR_CODE, escapeBytes } from "../src/util/test_helpers";



test('parseBeastLine', ()=>{
    //TODO
})

test('parseBeastFrame', ()=>{
    //TODO
})

test('parseBeastSocketData', ()=>{

    const socketData: number[] = [ESCAPE_CHAR_CODE, ...escapeBytes([0x31, ...encodeIntBytesAsBytes(12345, 6), ...encodeIntBytesAsBytes(127, 1), ...encodeIntBytesAsBytes(42, 1), ...encodeIntBytesAsBytes(43, 1)])]

    const parsed = parseBeastSocketData(Buffer.from(socketData))

    expect(parsed).toStrictEqual([{
        type: "MODE_AC",
        mlatTimestamp: 12345,
        signalLevel: 127,
        dataBytes: [42, 43]
    } as BeastParsedFrame<BeastParsedFrameType>])
})
