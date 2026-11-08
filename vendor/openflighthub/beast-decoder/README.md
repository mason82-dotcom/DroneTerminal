# Beast Decoder
Parses messages coming from a BEAST TCP port. For example out.adsb.lol:1337 [adsb.lol](https://www.adsb.lol/docs/overview/introduction/)

**Currently supported:**
* Mode S
* ADSB (ModeS Extended Squitter)
* DEBUG

**Not yet supported:**
* Mode AC

## Usage

[install via npm](https://www.npmjs.com/package/beast-decoder):
```
npm i --save beast-decoder
```


```typescript

import { BeastHandler } from 'beast-decoder'
import net from 'net'


const handler = new BeastHandler()

handler.addListener('aircraft_new', (ac)=>{
    console.log('new aircraft', ac)
})

handler.addListener('aircraft_update', (ac)=>{
    console.log('updated aircraft', ac)
})

handler.addListener('aircraft_update_with_location', (ac)=>{
    console.log('updated aircraft location', ac)
})

handler.addListener('warning', (w)=>{
    console.warn(w.message, w.context)
})

const socket: new net.Socket()
socket.connect({
    port: 1337,
    host: 'out.adsb.lol',
    family: 4 // force ipv4
})

socket.on('data', data =>{
    handler.handleBeastData(data)
})


socket.on('close', ()=>{
    handler.stop()
})

```

## Dependencies
* [mode-s-adsb-parser](https://github.com/OpenFlightHub/mode-s-adsb-parser) (same Author as this library)

## Changelog

see [CHANGELOG.md](CHANGELOG.md)

# For Developers

see [DEV.md](DEV.md)
