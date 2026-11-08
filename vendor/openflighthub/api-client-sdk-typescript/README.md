# OpenFlightHub API Client SDK
This is a typescript sdk made to talk to the [OpenFlightHub Api](https://hub.openflighthub.org/api).
**It must be run in the browser!**

## Features
* typescript typings (for parameters, request bodies and returned data)
* automatically handles idempotency

### Dependencies
* none

## Usage

[install via npm](https://www.npmjs.com/package/openflighthub-api-client-sdk):
```
npm i --save openflighthub-api-client-sdk
```


```typescript
import {OpenFlightHubApi} from 'openflighthub-api-client-sdk'

const api = new OpenFlightHubApi({
    restApiBaseUrl: 'https://hub.openflighthub.org/api',
    liveWebsocketBaseUrl: 'wss://hub.openflighthub.org/api/live'
})

// Version

console.log('API Version', api.rest.API_VERSION)
console.log('Client SDK Version', api.VERSION)


// Login

api.rest.auth.login.post({
    username: 'test@openflighthub.org',
    password: '1234'
}).then(response => {
    const myUserId = response.id
})

// Get information for a drone

const FAKE_DRONE_ID = 1

api.rest.drone.get({
    droneId: FAKE_DRONE_ID
}).then(drone => {
    console.log(drone.serial_number)
})

// Get last position of drone

api.rest.drone.lastPosition.get({
    droneId: FAKE_DRONE_ID
}).then(lastPosition => {
    console.log(lastPosition.latitude, lastPosition.latitude)
})

// Get live positions of drone via websocket

api.live.subscribeToDrone(FAKE_DRONE_ID, (event, filter, data)=>{
    console.log('new position of drone', data.id, data.position.latitude, data.position.longitude)
})



// Live connection status

api.live.status.addListener('connected', () => {
    console.log('api is connected')
})

api.live.status.addListener('disconnected', reason => {
    console.log('api is disconnected')
})

```

## Changelog

see [CHANGELOG.md](CHANGELOG.md)

# For Developers

see [dev/README.md](dev/README.md)
