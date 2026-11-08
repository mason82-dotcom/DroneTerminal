// docs see https://mode-s.org/1090mhz/content/mode-s/1-basics.html

import { ModeS_ParsedMessage_Type_ExtendedSquitter} from '../mode-s/parse'
import { Byte, parseBitStructure, bitStringToFullBytes, bitStringToUnsignedInteger } from '../util/bits_and_bytes'


export type ADSB_ParsedMessage = {
    icaoAddress6charHexLowercase: string
    typeCode: number /*
        1–4 	Aircraft identification
        5–8 	Surface position
        9–18 	Airborne position (w/Baro Altitude)
        19 	Airborne velocities
        20–22 	Airborne position (w/GNSS Height)
        23–27 	Reserved
        28 	Aircraft status
        29 	Target state and status information
        31 	Aircraft operation status
    */
    messageData: Byte[]
}


export type CprData = {
    cprFormat: 'odd' | 'even'
    cprEncodedPosition: {
        latitude: number
        longitude: number
    }
}

export function parseADSB(modeSmessage: ModeS_ParsedMessage_Type_ExtendedSquitter): ADSB_ParsedMessage {

    const structMessage = parseBitStructure(modeSmessage.contentBits, [{
        name: 'typeCode',
        bits: 5
    }, {
        name: 'data',
        bits: 56 - 5
    }])


    //TODO implement parity

    return {
        icaoAddress6charHexLowercase: modeSmessage.icaoAddress.toString(16).toLowerCase(),
        typeCode: bitStringToUnsignedInteger(structMessage.get('typeCode')),
        messageData: bitStringToFullBytes(modeSmessage.contentBits)
    }

}
