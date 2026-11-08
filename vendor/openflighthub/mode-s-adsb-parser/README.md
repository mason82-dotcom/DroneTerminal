# ADSB / Mode S Parser
Parses Mode S Extended Messages (so called ADSB messages)

### Dependencies
* none

### Test Coverage
see [coverage/lcov-report/index.html](coverage/lcov-report/index.html)

## Usage

[install via npm](https://www.npmjs.com/package/mode-s-adsb-parser):
```
npm i --save mode-s-adsb-parser
```


```typescript

//Mode S
import {parseModeS} from 'mode-s-adsb-parser'

// parsing does minimal work and just makes sure the structure is correct
const parsedModeSMessage = parseModeS([255, 255, 255, 255, 255])

// decodeLocation will only decode the location part of the message (so you can tell wether this is an interesting packet for you, and you want to fully decode it)
decodeLocation()


// fully decodes the message into values that is human readable, self explanatory and uses real world units
decode()



// ADSB
import {parseADSB, decodeBasics} from 'mode-s-adsb-parser'

// downlinkFormat 19 = ADSB (or so call Mode-S Extended Squitter) Message
if(parsedModeS.downlinkFormat === 19){

    // parsing does minimal work and just makes sure the structure is correct
    const parsedADSBMessage = parseADSB(parsedModeSMessage)

    // decodeLocation will only decode the location part of the message (so you can tell wether this is an interesting packet for you, and you want to fully decode it)
    const decodedADSBMessageBasics = decodeBasics(parsedADSBMessage)

    if(decodedADSBMessageBasics.icaoAddress6charHexLowercase === 'ac09f4'){

        // fully decodes the message into values that is human readable, self explanatory and uses real world units
        decode(parsedADSBMessage)
    }
}

/* Decoding positon of a transponder
    Transponders do not just send gps coordinates, they encode it to save data bits.
    Because of that, you need multiple messages to reliably calculate the gps coordinates.

    In order to get unambigious (globally unique) aircraft position, you need 2 messages of type Airborne Position or Surface Position. One of the message has to be cpr format "odd", the other one has to be cpr format "even".

    The time difference between these 2 messages should be low (TODO: how low exactly?)


    Once you have computed the unambigious position, you can use a shortcut once you receive a new position message.
    But this only works if the distance between the two message is less than 180 nautical miles.

    You should enforce this distance limit e.g. by limiting the time between those two messages (e.g. 5 minutes works until mach 3.2 or 4000 km/h )
*/

```

## Changelog

see [CHANGELOG.md](CHANGELOG.md)

# For Developers

see [DEV.md](DEV.md)
