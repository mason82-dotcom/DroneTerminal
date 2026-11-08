import { calculateUnambigiousLocation, decodeBasics } from "../../src/adsb/decode";
import { parseADSB } from "../../src/adsb/parse";
import { parseModeS } from "../../src/mode-s/parse";
import { bitStringToFullBytes, bufferToBytes, bytesToFullBitString, byteToShortBitString } from "../../src/util/bits_and_bytes";
import { intToBitString, intToFullByteBitString } from "../../src/util/test_helpers";



test('calculateUnambigiousLocation', ()=>{

    const message1 = Buffer.from('8D40621D58C386435CC412692AD6', 'hex')

    const message1decodedBasics = decodeBasics(parseADSB(parseModeS(bufferToBytes(message1))))

    const message2 = Buffer.from('8D40621D58C382D690C8AC2863A7', 'hex')
    const message2decodedBasics = decodeBasics(parseADSB(parseModeS(bufferToBytes(message2))))

    expect(message1decodedBasics.locationInformation.locationAvailable).toStrictEqual(true)
    expect(message2decodedBasics.locationInformation.locationAvailable).toStrictEqual(true)

    if(message1decodedBasics.locationInformation.locationAvailable && message2decodedBasics.locationInformation.locationAvailable){
        expect(calculateUnambigiousLocation([message1decodedBasics.locationInformation.location, message2decodedBasics.locationInformation.location])).toStrictEqual({
            latitude: 52.2572021484375,
            longitude: 3.91937255859375
        })
    }
})

