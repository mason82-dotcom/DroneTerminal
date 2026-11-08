# Documentation for the websocket protocol

**Note: all the definitions are actually defined in the `api` repository, this client sdk then implements some helper functions for easier usage. This document serves only as a general information!**

## Authentication

The api uses the same authentication like the REST API (cookies). If you call the `/auth/login` endpoint (or similar ones), the required cookie will be set. This cokkie must be transmitted when performing the http upgrade call to `/api/live`.

## General Protocol

The socket talk to each other with strings (not binary). The string MUST be a JSON encoded object. Both `server to client` and `client to server` share this base schema:

```javascript
{
    "type": "string", // "error" or "answer"
    "data": "?", // if "type" === "error" data is a string, otherwise it can be any kind of data (including undefined)
    "messageId": 0 // the sender increments this messageId. Unless he wants to answer to a message, then this is the same id as the id of the message he wants to answer to
}
```

**When to use "error":**
This should be used only if a critical error happens. E.g. the JSON can not be parsed, which means we can not read the messageId, which means we can not answer to this message.


### Client to Server
The client can send following additional messages:

#### Subscribe to event
```javascript
{
    "type": "subscribe",
    "data": {
        "event": "string",
        "filter": "string"
    }
    "messageId": ++messageIdCounter
}
```

Following events are supported

##### `drone_position`

Subscribe to position events of a drone

```javascript
{
    "type": "subscribe",
    "data": {
        "event": "drone_position",
        "filter": "1" // droneId: 1
    }
    "messageId": ++messageIdCounter
}
```

##### `drone_telemetry`

Subscribe to telemetry events of a drone

```javascript
{
    "type": "subscribe",
    "data": {
        "event": "drone_telemetry",
        "filter": "1" // droneId: 1
    }
    "messageId": ++messageIdCounter
}
```

##### `remote_controller_position`

Subscribe to position events of a remote controller

```javascript
{
    "type": "subscribe",
    "data": {
        "event": "remote_controller_position",
        "filter": "1" // remoteControllerId: 1
    }
    "messageId": ++messageIdCounter
}
```


##### `traffic`

Subscribe to position events of a remote controller

```javascript
{
    "type": "subscribe",
    "data": {
        "event": "traffic",
        "filter": "42.0$10.0$200" // latitude $ longitude $ radius     Note: radius unit is meters
    }
    "messageId": ++messageIdCounter
}
```

##### `db_row_update`

Subscribe to changes of existing database records.

```javascript
{
    "type": "subscribe",
    "data": {
        "event": "db_row_update",
        "filter": "mytable%1" // table: "mytable", rowId: 1
    }
    "messageId": ++messageIdCounter
}
```


### Server to Client
The client can receive following additional messages:

#### Event trigger
```javascript
{
    "type": "event",
    "data": {
        "event": "string", // name of the event
        "filter": "string",
        "eventData": "?" // depends on the event
    }
    "messageId": 42
}
```

Following events are supported

##### `drone_position`

live positions of a drone

```javascript
{
    "type": "event",
    "data": {
        "event": "drone_position",
        "filter": "1", // droneId: 1
        "eventData": {
            "id": 1,
            "position": {
                "latitude": 42.0,
                "longitude": 10.0,
                "height": 1234.0, // height above WGS 84 ellipsoid
                "reported_at": "string" // ISO 8601 encoded timestamp
            }
        }
    }
    "messageId": 42
}
```

##### `drone_telemetry`

live telemetry of a drone

```javascript
{
    "type": "event",
    "data": {
        "event": "drone_telemetry",
        "filter": "1", // droneId: 1
        "eventData": {
            "id": 1,
            "telemetry": {
                "capacity_percent_left": 42.0,
                "reported_at": "string" // ISO 8601 encoded timestamp
            }
        }
    }
    "messageId": 42
}
```
##### `remote_controller_position`

live positions of a remote controller

```javascript
{
    "type": "event",
    "data": {
        "event": "remote_controller_position",
        "filter": "1", // remoteControllerId: 1
        "eventData": {
            "id": 1,
            "position": {
                "latitude": 42.0,
                "longitude": 10.0,
                "height": 1234.0, // height above WGS 84 ellipsoid
                "reported_at": "string" // ISO 8601 encoded timestamp
            }
        }
    }
    "messageId": 42
}
```


##### `traffic`

live positions of traffic (other aircraft)

```javascript
{
    "type": "event",
    "data": {
        "event": "traffic",
        "filter": "1", // droneId: 1
        "eventData": {
            "id": "someid", //any string (format subject to change)
            "position": {
                "latitude": 42.0,
                "longitude": 10.0,
                "height": 1234.0, // height above WGS 84 ellipsoid
                "reported_at": "string" // ISO 8601 encoded timestamp
            }
        }
    }
    "messageId": 42
}
```
##### `workspace_drones_position`

live positions of all drones in a workspace

```javascript
{
    "type": "event",
    "data": {
        "event": "workspace_drones_position",
        "filter": "1", // workspaceId: 1
        "eventData": {
            "id": 1,
            "serial_number": "string"
            "position": {
                "latitude": 42.0,
                "longitude": 10.0,
                "height": 1234.0, // height above WGS 84 ellipsoid
                "reported_at": "string" // ISO 8601 encoded timestamp
            }
        }
    }
    "messageId": 42
}
```
##### `workspace_drones_media`

Get notified if any drone in the workspace has uploaded new media

```javascript
{
    "type": "event",
    "data": {
        "event": "workspace_drones_media",
        "filter": "1", // workspaceId: 1
        "eventData": {
            "id": 1,
            "workspace_id": 2,
            "drone_id": 3,
            "flight_id": 4,
            "file_id": 5,
            "drone_serial_number": "string"
        }
    }
    "messageId": 42
}
```

##### `db_row_update`

changes of existing database records.

```javascript
{
    "type": "event",
    "data": {
        "event": "db_row_update",
        "filter": "mytable%1", // table: mytable, row id: 1
        "eventData": {
            "id": 1,
            "table": "mytable"
        }
    }
    "messageId": 42
}
```

##### `map_element`

Changes of map elements

```javascript
{
    "type": "event",
    "data": {
        "event": "db_row_update",
        "filter": "mytable%1", // table: mytable, row id: 1
        "eventData": {
            "event_type": "create" // or "update" or "delete"
            "uuid": "string"
            "data": { // undefined if event_type is "delete"
                "created_at": "string" //iso 8601
                "updated_at": "string" //iso 8601
                "name": "string"
                "type": 0 // 0 = point, 1 = line, 2 = polygon, 7 = circle
                "coordinates": []// depends on type
                "longitude": 0 // depends on type
                "latitude": 0 // depends on type
                "elevation": 0 // depends on type
                "radius": 0 // depends on type
            }
        }
    }
}
```