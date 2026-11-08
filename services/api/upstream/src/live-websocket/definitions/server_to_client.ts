
export type Message<T extends Message_Type> = {
    type: T
    data: Message_Data<T>
    messageId: number
}

export type Message_Type = 'error' | 'answer' | 'event'

export type Message_Data<T extends Message_Type> = T extends 'answer' ? Message_Type_Answer_Data<any> : T extends 'event' ? Message_Type_Event_Object<Message_Type_Event_Type> : T extends 'error' ? string : unknown

export type Message_Type_Answer_Data<R extends any> = {
    success: boolean
    result: R
}

export type Message_Type_Event_Type = 'db_row_update' | 'drone_position' | 'drone_telemetry' | 'remote_controller_position' | 'workspace_drones_position' | 'drone_media' | 'workspace_drones_media' | 'geo_object' | 'mission' | 'task'

export type Message_Type_Event_Object<T extends Message_Type_Event_Type> = {
    event: T
    filter: string
    eventData: Message_Type_Event_Object_Data<T>
}

//TODO this result into an OR and not a fixed typing...
export type Message_Type_Event_Object_Data<T extends Message_Type_Event_Type> = T extends 'remote_controller_position' ? Message_Type_Event_Object_Data_Remote_Controller_Position : T extends 'drone_position' ? Message_Type_Event_Object_Data_Drone_Position : T extends 'drone_telemetry' ? Message_Type_Event_Object_Data_Drone_Telemetry : T extends 'db_row_update' ? Message_Type_Event_Object_Data_DbRowUpdate : T extends 'workspace_drones_position' ? Message_Type_Event_Object_Data_Workspace_Drone_Position : T extends 'drone_media' ? Message_Type_Event_Object_Data_Drone_Media : T extends 'workspace_drones_media' ? Message_Type_Event_Object_Data_Workspace_Drone_Media : T extends 'geo_object' ? Message_Type_Event_Object_Data_Geo_Object : T extends 'mission' ? Message_Type_Event_Object_Data_Mission : T extends 'task' ? Message_Type_Event_Object_Data_Task : unknown

export type Message_Type_Event_Object_Data_Remote_Controller_Position = {
    id: number
    position: {
        latitude: number
        longitude: number
        height: number
        reported_at: string
    }
}

export type Message_Type_Event_Object_Data_Drone_Position = {
    id: number
    serial_number: string
    position: {
        latitude: number
        longitude: number
        height: number
        reported_at: string
    }
}


export type Message_Type_Event_Object_Data_Workspace_Drone_Position = Message_Type_Event_Object_Data_Drone_Position

export type Message_Type_Event_Object_Data_Drone_Telemetry = {
    id: number
    telemetry: {
        capacity_percent_left: number
        reported_at: string
    }
}

export type Message_Type_Event_Object_Data_DbRowUpdate = {
    table: string
    id: string
}

export type Message_Type_Event_Object_Data_Drone_Media = {
    id: number
    workspace_id: number
    drone_id: number
    flight_id: number
    file_id: number
    drone_serial_number: string
}

export type Message_Type_Event_Object_Data_Workspace_Drone_Media = Message_Type_Event_Object_Data_Drone_Media


export type Message_Type_Event_Object_Data_Geo_Object<GeoObjectEventType = 'create' | 'update' | 'delete'> = {
    event_type: GeoObjectEventType
    uuid: string
    data: GeoObjectEventType extends 'delete' ? undefined : Message_Type_Event_Object_Data_Geo_Object_Type
}

export type Message_Type_Event_Object_Data_Mission<MissionEventType = 'create' | 'update' | 'delete'> = {
    event_type: MissionEventType
    data: MissionEventType extends 'delete' ? undefined : Message_Type_Event_Object_Data_Mission_Type
}

export type Message_Type_Event_Object_Data_Task<TaskEventType = 'create' | 'update' | 'delete'> = {
    event_type: TaskEventType
    data: TaskEventType extends 'delete' ? undefined : Message_Type_Event_Object_Data_Task_Type
}

// following code is copied from /generated-definitions/db/DBTypes.ts

export type Message_Type_Event_Object_Data_Geo_Object_Type = Message_Type_Event_Object_Data_Geo_Object_Type_Base<0, 0> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<0, 1> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<0, 2> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<0, 3> |
Message_Type_Event_Object_Data_Geo_Object_Type_Base<1, 0> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<1, 1> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<1, 2> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<1, 3> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<1, 4> |
Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 0> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 1> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 2> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 3> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 4> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 5> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<2, 6> |
Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 0> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 1> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 2> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 3> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 4> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 5> | Message_Type_Event_Object_Data_Geo_Object_Type_Base<3, 6>

export type Message_Type_Event_Object_Data_Geo_Object_Type_Base<type extends Message_Type_Event_Object_Data_Geo_Object_Type_TypeType, sub_type extends Message_Type_Event_Object_Data_Geo_Object_Type_SubTypeType<type>> = {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    type: type;
    sub_type: sub_type;
    config: Message_Type_Event_Object_Data_Geo_Object_Type_ConfigType<type, sub_type>;
    created_at: string;
    updated_at: string;
}


export type Message_Type_Event_Object_Data_Geo_Object_Type_TypeType = 0|1|2|3

export const Message_Type_Event_Object_Data_Geo_Object_Type_Type_TYPES = {
  marking: 0,
  traffic: 1,
  unit: 2,
  collision: 3
} as const

export type Message_Type_Event_Object_Data_Geo_Object_Type_SubTypeType<type extends Message_Type_Event_Object_Data_Geo_Object_Type_TypeType> =
    type extends 0 ? (0|1|2|3) :
    type extends 1 ? (0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15) :
    type extends 2 ? (0|1|2|3|4|5|6) :
    type extends 3 ? (0|1|2|3|4|5|6) : unknown


export const Message_Type_Event_Object_Data_Geo_Object_Type_SubType_TYPES = {
  marking: {
    point: 0,
    line: 1,
    polygon: 2,
    circle: 3
  },
  traffic: {
    airplane: 0,
    helicopter: 1,
    uav: 2,
    gliding: 3,
    other: 4
  },
  unit: {
    airplane: 0,
    helicopter: 1,
    uav: 2,
    pilot: 3,
    ground_vehicle: 4,
    ground_staff: 5,
    other: 6
  },
  collision: {
    power_tower: 0,
    power_pole: 1,
    power_line_large: 2,
    power_line_small_or_catenary: 3,
    aerialway_pylon: 4,
    aerialway: 5,
    building: 6
  }
} as const

export type Message_Type_Event_Object_Data_Geo_Object_Type_ConfigType<type extends Message_Type_Event_Object_Data_Geo_Object_Type_TypeType, sub_type extends Message_Type_Event_Object_Data_Geo_Object_Type_SubTypeType<type>> = type extends 0 ? (
    sub_type extends 0 ? {point: [number, number, number], color: string} :
    sub_type extends 1 ? {line: [number, number, number][], color: string} :
    sub_type extends 2 ? {polygon: [number, number, number][], color: string} :
    sub_type extends 3 ? {center: [number, number, number], radius: number, color: string} : unknown
) : type extends 1 ? (
    {longitude: number, latitude: number, height: number, heading?: number, speed?: number}
) : type extends 2 ? (
    {longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number}
) : type extends 3 ? (
    sub_type extends 0 ? {id: number, point: [number, number, number]} :
    sub_type extends 1 ? {id: number, point: [number, number, number]} :
    sub_type extends 2 ? {id: number, line: [number, number, number][]} :
    sub_type extends 3 ? {id: number, line: [number, number, number][]} :
    sub_type extends 4 ? {id: number, point: [number, number, number]} :
    sub_type extends 5 ? {id: number, line: [number, number, number][]} :
    sub_type extends 6 ? {id: number, polygon: [number, number, number][]} : unknown
) : unknown



export type Message_Type_Event_Object_Data_Mission_Type_StateType = 0|1|2|3|4|5|6

export const Message_Type_Event_Object_Data_Mission_Type_State_TYPES = {
    pending: 0,
    accepted: 1,
    in_progress: 2,
    done: 3,
    rejected: 4,
    failed: 5,
    canceled: 6
} as const

export type Message_Type_Event_Object_Data_Mission_Type = {
    id: number
    workspace_id: number
    name: string
    description?: string
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
    state: Message_Type_Event_Object_Data_Mission_Type_StateType
}


export type Message_Type_Event_Object_Data_Task_Type_StateType = 0|1|2|3|4|5|6

export const Message_Type_Event_Object_Data_Task_Type_State_TYPES = {
    pending: 0,
    accepted: 1,
    in_progress: 2,
    done: 3,
    rejected: 4,
    failed: 5,
    canceled: 6
} as const

export type Message_Type_Event_Object_Data_Task_Type = {
    id: number
    mission_id: number
    name: string
    description?: string
    created_by: number
    updated_by: number
    created_at: string
    updated_at: string
    state: Message_Type_Event_Object_Data_Task_Type_StateType
}