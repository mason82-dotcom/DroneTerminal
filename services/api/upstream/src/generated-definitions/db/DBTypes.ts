import { ST_Geometry, ST_Point, ST_Line } from '../../util/postgis';


export type DBType_User_StateType = 0|1|2|3
export const DBType_User_STATES = {
  invited: 0,
  live: 1,
  locked: 2,
  deleted: 3
} as const

export type DBType_User = {
    id: number;
    team_id?: number;
    name: string;
    /**
     * encrypted
     */
    email: string;
    /**
     * bcrypt hash
     */
    email_hash: string;
    /**
     * scrypt hash base64 encoded
     */
    password?: string;
    /**
     * some unique token
     */
    login_token?: string;
    /**
     * some unique token
     */
    session_token?: string;
    /**
     * some unique token
     */
    stream_token?: string;
    /**
     * some unique token
     */
    reset_code?: string;
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: DBType_User_StateType;
    locale: string;
    created_by_user_id: number;
}



export type DBType_Team_StateType = 0|1|2|3
export const DBType_Team_STATES = {
  invited: 0,
  live: 1,
  locked: 2,
  deleted: 3
} as const

export type DBType_Team = {
    id: number;
    name: string;
    owner_user_id: number;
    organisation_id?: number;
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: DBType_Team_StateType;
    logo_file_id?: number;
}



export type DBType_Organisation_StateType = 0|1|2|3
export const DBType_Organisation_STATES = {
  invited: 0,
  live: 1,
  locked: 2,
  deleted: 3
} as const

export type DBType_Organisation = {
    id: number;
    name: string;
    owner_user_id: number;
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: DBType_Organisation_StateType;
    logo_file_id?: number;
}



export type DBType_File = {
    id: number;
    workspace_id?: number;
    ext: string;
    /**
     * full original name including extension
     */
    name: string;
    created_at: string;
    created_by: number;
    /**
     * if not null, thumbnail exists
     */
    thumbnail_format?: string;
    thumbnail_generation_has_failed: boolean;
    /**
     * json encoded exif data
     */
    exif_data?: string;
    exif_data_generation_has_failed: boolean;
}




export type DBType_Workspace = DBType_Workspace_ForOrganisation | DBType_Workspace_ForTeam

export type DBType_Workspace_ForOrganisation = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_organisation_id: number;
    created_by: number;
}

export type DBType_Workspace_ForTeam = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_team_id: number;
    created_by: number;
}
export type DBType_Workspace_Permission = {
    team_id: number;
    workspace_id: number;
}



export type DBType_Connection = {
    id: number;
    name: string;
    /**
     * used as credential together with id
     */
    secret: string;
    session_token?: string;
    workspace_id: number;
    /**
     * used for dji pilot 2 communication, format: xxxxxxxx-0000-42ae-84e6-123456789abc where xxx is the workspace_id like "00000001", the rest is random
     */
    workspace_uuid: string;
    remote_controller_id?: number;
    /**
     * the "currently" connected drone (does not mean that the drone is currently online)
     */
    last_drone_id?: number;
    stream_is_alive: boolean;
}



export type DBType_Remote_Controller_TypeType = 0|1|2|3|4
export const DBType_Remote_Controller_TYPES = {
  unknown: 0,
  dji_rc_plus: 1,
  dji_rc_pro_enterprise: 2,
  dji_rc_plus_2: 3,
  dji_smart_controller: 4
} as const

export type DBType_Remote_Controller = {
    id: number;
    serial_number: string;
    /**
     * 0 = unknown, 1 = dji rc plus, 2 = dji rc pro enterprise, 3 = dji rc plus 2, 4 = dji smart controller
     */
    type: DBType_Remote_Controller_TypeType;
}



export type DBType_Drone_TypeType = 0|1|2|3|4
export const DBType_Drone_TYPES = {
  unknown: 0,
  dji_matrice_300: 1,
  dji_matrice_30: 2,
  dji_matrice_350: 3,
  dji_mavic_3: 4
} as const

export type DBType_Drone = {
    id: number;
    serial_number: string;
    name: string;
    /**
     * 0 = unknown, 1 = dji matrice 300, 2 = dji matrice 30, 3 = dji matrice 350, 4 = dji mavic 3
     */
    type: DBType_Drone_TypeType;
    last_connection_id?: number;
    /**
     * should never ever be null
     */
    current_flight_id?: number;
    in_flight: boolean;
}



export type DBType_Flight = {
    id: number;
    drone_id: number;
    /**
     * drones can change workspace, but this will always be the workspace_id at the time the flight was recorded
     */
    workspace_id: number;
    started_at: string;
    /**
     * when drone lands
     */
    landed_at?: string;
    ended_at?: string;
    /**
     * false = is created by telemetry input
     */
    is_created_manually: boolean;
    /**
     * true if any data has been changed by a user (always true if is_created_manually = true)
     */
    is_changed_manually: boolean;
    updated_by?: number;
}



export type DBType_Flight_User_TypeType = 0|1|2|3
export const DBType_Flight_User_TYPES = {
  pilot: 0,
  sensor_operator: 1,
  leader: 2,
  air_space_monitoring: 3
} as const

export type DBType_Flight_User = {
    flight_id: number;
    user_id: number;
    /**
     * 0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring
     */
    type: DBType_Flight_User_TypeType;
    created_by: number;
}



export type DBType_Flight_Data_TypeType = 0
export const DBType_Flight_Data_TYPES = {
  position: 0
} as const

export type DBType_Flight_Data = {
    id: number;
    flight_id: number;
    /**
     * when stored in db
     */
    received_at: string;
    /**
     * when drone created the data
     */
    created_at: string;
    /**
     * 0 = position
     */
    type: DBType_Flight_Data_TypeType;
    data: {};
}



export type DBType_Remote_Controller_Data_TypeType = 0
export const DBType_Remote_Controller_Data_TYPES = {
  position: 0
} as const

export type DBType_Remote_Controller_Data = {
    id: number;
    remote_controller_id: number;
    /**
     * 0 = position
     */
    type: DBType_Remote_Controller_Data_TypeType;
    data: {};
    created_at: string;
}



export type DBType_Drone_Data_TypeType = 0|1
export const DBType_Drone_Data_TYPES = {
  position: 0,
  telemetry: 1
} as const

export type DBType_Drone_Data = {
    id: number;
    drone_id: number;
    flight_id: number;
    /**
     * 0 = position, 1 = telemetry
     */
    type: DBType_Drone_Data_TypeType;
    data: {};
    created_at: string;
}



export type DBType_Drone_Media_TypeType = 0|1|2
export const DBType_Drone_Media_TYPES = {
  video: 0,
  picture: 1,
  panorama: 2
} as const

export type DBType_Drone_Media = {
    id: number;
    drone_id: number;
    flight_id: number;
    /**
     * 0 = video, 1 = picture, 2 = panorama
     */
    type: DBType_Drone_Media_TypeType;
    file_id: number;
    fingerprint: string;
    tiny_fingerprint: string;
    /**
     * json encoded meta data
     */
    meta?: string;
    captured_at?: string;
    /**
     * when stored in db
     */
    received_at: string;
    /**
     * json encoded coverage data
     */
    coverage?: string;
    coverage_generated_at: string;
    /**
     * json encoded {position: {longitude: number, latitude: number}, height: number}
     */
    camera_location?: string;
    /**
     * json encoded {heading: number, pitch: number, roll: number}
     */
    camera_angles?: string;
}




export type DBType_Geo_Object = DBType_Geo_Object_Base<0, 0> | DBType_Geo_Object_Base<0, 1> | DBType_Geo_Object_Base<0, 2> | DBType_Geo_Object_Base<0, 3> |
DBType_Geo_Object_Base<1, 0> | DBType_Geo_Object_Base<1, 1> | DBType_Geo_Object_Base<1, 2> | DBType_Geo_Object_Base<1, 3> | DBType_Geo_Object_Base<1, 4> |
DBType_Geo_Object_Base<2, 0> | DBType_Geo_Object_Base<2, 1> | DBType_Geo_Object_Base<2, 2> | DBType_Geo_Object_Base<2, 3> | DBType_Geo_Object_Base<2, 4> | DBType_Geo_Object_Base<2, 5> | DBType_Geo_Object_Base<2, 6> |
DBType_Geo_Object_Base<3, 0> | DBType_Geo_Object_Base<3, 1> | DBType_Geo_Object_Base<3, 2> | DBType_Geo_Object_Base<3, 3> | DBType_Geo_Object_Base<3, 4> | DBType_Geo_Object_Base<3, 5> | DBType_Geo_Object_Base<3, 6>

export type DBType_Geo_Object_Base<type extends DBType_Geo_Object_TypeType, sub_type extends DBType_Geo_Object_SubTypeType<type>> = {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    type: type;
    sub_type: sub_type;
    config: DBType_Geo_Object_ConfigType<type, sub_type>;
    created_at: string;
    updated_at: string;
    is_synced_with_dji: boolean;
    geom: ST_Geometry
}


export type DBType_Geo_Object_TypeType = 0|1|2|3

export const DBType_Geo_Object_Type_TYPES = {
  marking: 0,
  traffic: 1,
  unit: 2,
  collision: 3
} as const

export type DBType_Geo_Object_SubTypeType<type extends DBType_Geo_Object_TypeType> =
    type extends 0 ? (0|1|2|3) :
    type extends 1 ? (0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15) :
    type extends 2 ? (0|1|2|3|4|5|6) :
    type extends 3 ? (0|1|2|3|4|5|6) : unknown


export const DBType_Geo_Object_SubType_TYPES = {
  marking: {
    point: 0,
    line: 1,
    polygon: 2,
    circle: 3
  },
  traffic: {
    other: 0,
    moto_glider: 1,
    tow_plane: 2,
    helicopter: 3,
    parachute: 4,
    drop_plane: 5,
    hang_glider: 6,
    para_glider: 7,
    powered_aircraft: 8,
    jet_aicraft: 9,
    ufo: 10,
    balloon: 11,
    airship: 12,
    uav: 13,
    ground_support: 14,
    static_object: 15
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

export type DBType_Geo_Object_ConfigType<type extends DBType_Geo_Object_TypeType, sub_type extends DBType_Geo_Object_SubTypeType<type>> = type extends 0 ? (
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
export type DBType_Mission_StateType = 0|1|2|3|4|5|6
export const DBType_Mission_STATES = {
  planned: 0,
  accepted: 1,
  in_progress: 2,
  done: 3,
  rejected: 4,
  failed: 5,
  canceled: 6
} as const

export type DBType_Mission = {
    id: number;
    workspace_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    assigned_to_team_id?: number;
    /**
     * 0 = planned, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: DBType_Mission_StateType;
}



export type DBType_Task_StateType = 0|1|2|3|4|5|6
export const DBType_Task_STATES = {
  planned: 0,
  accepted: 1,
  in_progress: 2,
  done: 3,
  rejected: 4,
  failed: 5,
  canceled: 6
} as const

export type DBType_Task = {
    id: number;
    mission_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    /**
     * 0 = planned, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: DBType_Task_StateType;
}



export type DBType_Task_Geo_Object = {
    geo_object_id: number;
    task_id: number;
}




export type DBType_Collision_Object_Coverage_Area = {
    id: number;
    geom: ST_Point;
    radius: number;
    created_at: string;
    updated_at: string;
}
export type DBType_Collision_Object_Geo_Object = {
    geo_object_id: number;
    coverage_area_id: number;
}



export type DBType_Live_Share_Key = {
    id: number;
    key: string;
    name?: string;
    connection_id: number;
    created_at: string;
    created_by: number;
    valid_until: string;
}



export type DBType_Api_Endpoint_Performance = {
    id: number;
    url_with_id_params: string;
    endpoint: string;
    http_method: string;
    query?: string;
    /**
     * ms
     */
    run_time: number;
    /**
     * ms
     */
    work_time: number;
    started_at: string;
    logged_at: string;
    status_code: number;
    content_length: number;
}


