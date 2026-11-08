export type ApiType_Id = number;


export type ApiType_Id_Nullable = number;


export type ApiType_Uuid = string;


/**
 * Time in milliseconds since Unix Epoch time (January 1st, 1970 )
 */
export type ApiType_Unixms = number;


/**
 * ISO 8601 format with a timezone
 */
export type ApiType_Timestamptz = string;


/**
 * ISO 8601 format without a timezone
 */
export type ApiType_Timestamp = string;


export type ApiType_Email = string;


/**
 * Maximum length is 72 Bytes (utf-8).
 */
export type ApiType_Password = string;


/**
 * in bytes
 */
export type ApiType_Size_In_Bytes = number;



export type ApiType_Reference = {
    id: number;
}



export type ApiType_Auth_Login_Post = {
    username: string;
    password: string;
}



export type ApiType_Auth_Login_With_Token_Post = {
    token: string;
}


/**
 * @deprecated
 */
export interface ApiType_Auth_Register_Post {
    email: string;
    /**
     * Maximum length is 72 Bytes (utf-8).
     */
    password?: string;
}



export type ApiType_Auth_Password_Change_Post = {
    /**
     * Maximum length is 72 Bytes (utf-8).
     */
    current_password: string;
    /**
     * Maximum length is 72 Bytes (utf-8).
     */
    new_password: string;
}



export type ApiType_Auth_Password_Reset_Post = {
    username: string;
}



export type ApiType_Auth_Password_Set_Initial_Post = {
    /**
     * Maximum length is 72 Bytes (utf-8).
     */
    new_password: string;
}



export type ApiType_Auth_Password_Set_New_Post = {
    /**
     * Maximum length is 72 Bytes (utf-8).
     */
    new_password: string;
    code: string;
}



export type ApiType_Auth_Stream_Token = {
    token: string;
}



export type ApiType_User = {
    id: number;
    name: string;
    team_id?: number;
}



export type ApiType_User_Self = {
    id: number;
    name: string;
    email: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    locale: string;
    registration_incomplete: boolean;
    team_id?: number;
}



export type ApiType_User_Patch = {
    name?: string;
    email?: string;
    locale?: string;
}


export type ApiType_User_My_Organisations = {
    id: number;
    /**
     * 0 = owner, 1 = member
     */
    access_type: number;
}[];


export type ApiType_User_My_Teams = {
    id: number;
    /**
     * 0 = owner, 1 = member
     */
    access_type: number;
}[];



export type ApiType_Team = {
    id: number;
    name: string;
    owner_user_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: number;
    organisation_id?: number;
    logo_file_id?: number;
}


export type ApiType_Team_All_Teams = {
    id: number;
    name: string;
    organisation_id?: number;
    logo_file_id?: number;
}[];



export type ApiType_Team_Post = {
    name: string;
    organisation_id: number;
    owner_user_id: number;
    logo_file_id?: number;
}



export type ApiType_Team_Patch = {
    name?: string;
    logo_file_id?: number;
}



export type ApiType_Team_Invite_Member = {
    email: string;
}



export type ApiType_Team_Invite_Member_Post_Response = {
    id: number;
}


export type ApiType_Team_Members = {
    id: number;
    name: string;
}[];


export type ApiType_Team_Workspaces = (
    | {
          id: number;
          name: string;
          longitude: number;
          latitude: number;
          owner_team_id: number;
          [k: string]: unknown;
      }
    | {
          id: number;
          name: string;
          longitude: number;
          latitude: number;
          owner_organisation_id: number;
          [k: string]: unknown;
      }
)[];



export type ApiType_Organisation = {
    id: number;
    name: string;
    owner_user_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: number;
    logo_file_id?: number;
}



export type ApiType_Organisation_Patch = {
    name?: string;
    logo_file_id?: number;
}


export type ApiType_Organisation_Users = {
    id: number;
    name: string;
    team_id?: number;
}[];


export type ApiType_Organisation_Teams = {
    id: number;
    name: string;
}[];


export type ApiType_Admin_Users = {
    id: number;
    name: string;
    email: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    locale: string;
    registration_incomplete: boolean;
    team_id?: number;
}[];



export type ApiType_Admin_Users_Post = {
    name?: string;
    email: string;
}


export type ApiType_Admin_Organisations = {
    id: number;
    name: string;
    owner_user_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * 0 = invited, 1 = live, 2 = locked, 3 = deleted
     */
    state: number;
    logo_file_id?: number;
}[];



export type ApiType_Admin_Organisation_Post = {
    name: string;
    owner_user_id: number;
    logo_file_id?: number;
}



export type ApiType_Admin_System_Performance_Os = {
    os: string;
    cpu: string;
    /**
     * in milliseconds
     */
    uptime: number;
    /**
     * in bytes
     */
    ram_total: number;
    /**
     * in bytes
     */
    ram_free: number;
    load_avg: {
        /**
         * last 1 minute (0-1)
         */
        avg_1: number;
        /**
         * last 5 minutes (0-1)
         */
        avg_5: number;
        /**
         * last 15 minutes (0-1)
         */
        avg_15: number;
    };
}


export type ApiType_Admin_System_Performance_Api_Endpoints = {
    endpoint: string;
    http_method: string;
    total_calls: number;
    /**
     * time until the response for this request has been sent (milliseconds)
     */
    max_run_time: number;
    /**
     * approximate time the cpu has worked on this (not accurate) (milliseconds)
     */
    max_work_time: number;
    /**
     * arithmetic mean (milliseconds)
     */
    avg_run_time: number;
    /**
     * arithmetic mean (milliseconds)
     */
    avg_work_time: number;
    /**
     * population standard deviation (milliseconds)
     */
    pop_standard_dev_run_time: number;
    /**
     * population standard deviation (milliseconds)
     */
    pop_standard_dev_work_time: number;
    /**
     * population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)
     */
    pop_standard_dev_run_time_fractional: number;
    /**
     * population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)
     */
    pop_standard_dev_work_time_fractional: number;
}[];


export type ApiType_Admin_System_Performance_Api_Endpoint_Detail = {
    url: string;
    http_method: string;
    total_calls: number;
    /**
     * time until the response for this request has been sent (milliseconds)
     */
    max_run_time: number;
    /**
     * approximate time the cpu has worked on this (not accurate) (milliseconds)
     */
    max_work_time: number;
    /**
     * arithmetic mean (milliseconds)
     */
    avg_run_time: number;
    /**
     * arithmetic mean (milliseconds)
     */
    avg_work_time: number;
    /**
     * population standard deviation (milliseconds)
     */
    pop_standard_dev_run_time: number;
    /**
     * population standard deviation (milliseconds)
     */
    pop_standard_dev_work_time: number;
    /**
     * population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)
     */
    pop_standard_dev_run_time_fractional: number;
    /**
     * population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)
     */
    pop_standard_dev_work_time_fractional: number;
}[];



export type ApiType_Admin_System_Database_Info = {
    tables: {
        name: string;
        /**
         * in bytes
         */
        size: number;
        /**
         * estimated
         */
        row_count: number;
    }[];
    database: {
        /**
         * in bytes
         */
        size: number;
        version: string;
    };
}



export type ApiType_File = {
    id: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)
     */
    thumbnail_format?: string;
}


export type ApiType_File_Get_Multiple = {
    id: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)
     */
    thumbnail_format?: string;
}[];



export type ApiType_File_Get_Multiple_Post = {
    ids: number[];
}


export type ApiType_Workspace =
    | {
          id: number;
          name: string;
          longitude: number;
          latitude: number;
          owner_team_id: number;
          [k: string]: unknown;
      }
    | {
          id: number;
          name: string;
          longitude: number;
          latitude: number;
          owner_organisation_id: number;
          [k: string]: unknown;
      };



export type ApiType_Workspace_For_Organisation = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_organisation_id: number;
}



export type ApiType_Workspace_For_Team = {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    owner_team_id: number;
}



export type ApiType_Workspace_Patch = {
    name?: string;
    longitude?: number;
    latitude?: number;
}


export type ApiType_Workspaces_Post =
    | {
          name: string;
          longitude: number;
          latitude: number;
          team_id: number;
          [k: string]: unknown;
      }
    | {
          name: string;
          longitude: number;
          latitude: number;
          organisation_id: number;
          [k: string]: unknown;
      };



export type ApiType_Workspaces_Post_For_Team = {
    name: string;
    longitude: number;
    latitude: number;
    team_id: number;
}



export type ApiType_Workspaces_Post_For_Organisation = {
    name: string;
    longitude: number;
    latitude: number;
    organisation_id: number;
}


export type ApiType_Workspace_Files = {
    id: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)
     */
    thumbnail_format?: string;
}[];



export type ApiType_Workspace_File_Post = {
    file: string;
    filename: string;
}



export type ApiType_Workspace_File_Patch = {
    filename?: string;
}



export type ApiType_Workspace_Invite_Team_Post = {
    team_id: number;
}



export type ApiType_Workspace_Kick_Team_Post = {
    team_id: number;
}


export type ApiType_Workspace_Permissions = {
    team_id: number;
}[];


export type ApiType_Workspace_Missions = {
    id: number;
    workspace_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    assigned_to_team_id?: number;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: number;
}[];


export type ApiType_Workspace_Connections = {
    id: number;
    name: string;
    remote_controller_id?: number;
    drone_id?: number;
    workspace_id: number;
    stream_is_alive: boolean;
}[];



export type ApiType_Connection_Post = {
    name: string;
    workspace_id: number;
}



export type ApiType_Connection_Post_Response = {
    connection_id: string;
    secret: string;
}


/**
 * property `drone_id`: the currently connected drone (does not mean that the drone is currently online)
 */
export interface ApiType_Connection {
    id: number;
    name: string;
    remote_controller_id?: number;
    drone_id?: number;
    workspace_id: number;
    stream_is_alive: boolean;
}



export type ApiType_Connection_Live_Share_Keys_Post = {
    /**
     * ISO 8601 format with a timezone
     */
    valid_until?: string;
    name?: string;
}



export type ApiType_Connection_Live_Share_Keys_Post_Response = {
    id: number;
    key: string;
    name?: string;
    connection_id: number;
    created_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    valid_until: string;
}


export type ApiType_Connection_Live_Share_Keys_Get = {
    id: number;
    key: string;
    name?: string;
    connection_id: number;
    created_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    valid_until: string;
}[];



export type ApiType_Connection_Live_Share_Key = {
    id: number;
    key: string;
    name?: string;
    connection_id: number;
    created_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    valid_until: string;
}


export type ApiType_Workspace_Geo_Objects_Get = (
    | (
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      )
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | (
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      )
)[];


export type ApiType_Workspace_Geo_Objects_Post =
    | (
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      )
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      };


export type ApiType_Workspace_Geo_Object_Patch =
    | (
          | {
                name?: string;
                config?: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      )
    | {
          name?: string;
          config?: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          name?: string;
          config?: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      };


export type ApiType_Geo_Object =
    | (
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      )
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | (
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
          | {
                id: number;
                uuid: string;
                workspace_id?: number;
                name: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                created_at: string;
                /**
                 * ISO 8601 format with a timezone
                 */
                updated_at: string;
                type: number;
                /**
                 * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                 */
                sub_type: number;
                tasks: {
                    id: number;
                }[];
                config: {
                    id: number;
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    [k: string]: unknown;
                };
                [k: string]: unknown;
            }
      );


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Base {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
}


export type ApiType_Geo_Object_Type0 =
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              point: [number, number, number];
              /**
               * hex
               */
              color: string;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              line: [number, number, number][];
              /**
               * hex
               */
              color: string;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              polygon: [number, number, number][];
              /**
               * hex
               */
              color: string;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              center: [number, number, number];
              radius: number;
              /**
               * hex
               */
              color: string;
              [k: string]: unknown;
          };
          [k: string]: unknown;
      };


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type0_Subtype0 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype0_Config = {
    /**
     * [lng, lat, elevation]
     *
     * @minItems 3
     * @maxItems 3
     */
    point: [number, number, number];
    /**
     * hex
     */
    color: string;
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type0_Subtype1 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype1_Config = {
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    line: [number, number, number][];
    /**
     * hex
     */
    color: string;
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type0_Subtype2 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        polygon: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype2_Config = {
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    polygon: [number, number, number][];
    /**
     * hex
     */
    color: string;
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type0_Subtype3 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        center: [number, number, number];
        radius: number;
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype3_Config = {
    /**
     * [lng, lat, elevation]
     *
     * @minItems 3
     * @maxItems 3
     */
    center: [number, number, number];
    radius: number;
    /**
     * hex
     */
    color: string;
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type1 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        longitude: number;
        latitude: number;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}



export type ApiType_Geo_Object_Type1_Config = {
    longitude: number;
    latitude: number;
    height?: number;
    heading?: number;
    /**
     * TODO unit
     */
    speed?: number;
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type2 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        longitude: number;
        latitude: number;
        symbol: string;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}



export type ApiType_Geo_Object_Type2_Config = {
    longitude: number;
    latitude: number;
    symbol: string;
    height?: number;
    heading?: number;
    /**
     * TODO unit
     */
    speed?: number;
}


export type ApiType_Geo_Object_Type3 =
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              id: number;
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              point: [number, number, number];
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              id: number;
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              line: [number, number, number][];
              [k: string]: unknown;
          };
          [k: string]: unknown;
      }
    | {
          id: number;
          uuid: string;
          workspace_id?: number;
          name: string;
          /**
           * ISO 8601 format with a timezone
           */
          created_at: string;
          /**
           * ISO 8601 format with a timezone
           */
          updated_at: string;
          type: number;
          /**
           * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
           */
          sub_type: number;
          tasks: {
              id: number;
          }[];
          config: {
              id: number;
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              polygon: [number, number, number][];
              [k: string]: unknown;
          };
          [k: string]: unknown;
      };


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype0 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
    };
}



export type ApiType_Geo_Object_Type3_Subtype0_Config = {
    id: number;
    /**
     * [lng, lat, elevation]
     *
     * @minItems 3
     * @maxItems 3
     */
    point: [number, number, number];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype1 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
    };
}



export type ApiType_Geo_Object_Type3_Subtype1_Config = {
    id: number;
    /**
     * [lng, lat, elevation]
     *
     * @minItems 3
     * @maxItems 3
     */
    point: [number, number, number];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype2 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
    };
}



export type ApiType_Geo_Object_Type3_Subtype2_Config = {
    id: number;
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    line: [number, number, number][];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype3 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
    };
}



export type ApiType_Geo_Object_Type3_Subtype3_Config = {
    id: number;
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    line: [number, number, number][];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype4 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
    };
}



export type ApiType_Geo_Object_Type3_Subtype4_Config = {
    id: number;
    /**
     * [lng, lat, elevation]
     *
     * @minItems 3
     * @maxItems 3
     */
    point: [number, number, number];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype5 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
    };
}



export type ApiType_Geo_Object_Type3_Subtype5_Config = {
    id: number;
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    line: [number, number, number][];
}


/**
 * if workspace_id is not present, it is a global geoobject
 */
export interface ApiType_Geo_Object_Type3_Subtype6 {
    id: number;
    uuid: string;
    workspace_id?: number;
    name: string;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    type: number;
    /**
     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
     */
    sub_type: number;
    tasks: {
        id: number;
    }[];
    config: {
        id: number;
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        polygon: [number, number, number][];
    };
}



export type ApiType_Geo_Object_Type3_Subtype6_Config = {
    id: number;
    /**
     * [[lng, lat, elevation], [lng, lat, elevation]]
     */
    polygon: [number, number, number][];
}


export type ApiType_Geo_Object_Create =
    | (
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                uuid?: string;
                name: string;
                /**
                 * 2
                 */
                type: number;
                /**
                 * 3
                 */
                sub_type: number;
                config: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
      )
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
          };
          [k: string]: unknown;
      }
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
          };
          [k: string]: unknown;
      };



export type ApiType_Geo_Object_Create_Base = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
}


export type ApiType_Geo_Object_Type0_Create =
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              point: [number, number, number];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              line: [number, number, number][];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              polygon: [number, number, number][];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          uuid?: string;
          name: string;
          /**
           * 2
           */
          type: number;
          /**
           * 3
           */
          sub_type: number;
          config: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              center: [number, number, number];
              radius: number;
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      };



export type ApiType_Geo_Object_Type0_Subtype0_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype1_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype2_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        polygon: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype3_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        center: [number, number, number];
        radius: number;
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type1_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        longitude: number;
        latitude: number;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}



export type ApiType_Geo_Object_Type2_Create = {
    uuid?: string;
    name: string;
    /**
     * 2
     */
    type: number;
    /**
     * 3
     */
    sub_type: number;
    config: {
        longitude: number;
        latitude: number;
        symbol: string;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}


export type ApiType_Geo_Object_Patch =
    | (
          | {
                name?: string;
                config?: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    point: [number, number, number];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    line: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [[lng, lat, elevation], [lng, lat, elevation]]
                     */
                    polygon: [number, number, number][];
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
          | {
                name?: string;
                config?: {
                    /**
                     * [lng, lat, elevation]
                     *
                     * @minItems 3
                     * @maxItems 3
                     */
                    center: [number, number, number];
                    radius: number;
                    /**
                     * hex
                     */
                    color: string;
                };
                [k: string]: unknown;
            }
      )
    | {
          name?: string;
          config?: {
              longitude: number;
              latitude: number;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
          };
          [k: string]: unknown;
      }
    | {
          name?: string;
          config?: {
              longitude: number;
              latitude: number;
              symbol: string;
              height?: number;
              heading?: number;
              /**
               * TODO unit
               */
              speed?: number;
          };
          [k: string]: unknown;
      };



export type ApiType_Geo_Object_Patch_Base = {
    name?: string;
}


export type ApiType_Geo_Object_Type0_Patch =
    | {
          name?: string;
          config?: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              point: [number, number, number];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          name?: string;
          config?: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              line: [number, number, number][];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          name?: string;
          config?: {
              /**
               * [[lng, lat, elevation], [lng, lat, elevation]]
               */
              polygon: [number, number, number][];
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      }
    | {
          name?: string;
          config?: {
              /**
               * [lng, lat, elevation]
               *
               * @minItems 3
               * @maxItems 3
               */
              center: [number, number, number];
              radius: number;
              /**
               * hex
               */
              color: string;
          };
          [k: string]: unknown;
      };



export type ApiType_Geo_Object_Type0_Subtype0_Patch = {
    name?: string;
    config?: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        point: [number, number, number];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype1_Patch = {
    name?: string;
    config?: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        line: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype2_Patch = {
    name?: string;
    config?: {
        /**
         * [[lng, lat, elevation], [lng, lat, elevation]]
         */
        polygon: [number, number, number][];
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type0_Subtype3_Patch = {
    name?: string;
    config?: {
        /**
         * [lng, lat, elevation]
         *
         * @minItems 3
         * @maxItems 3
         */
        center: [number, number, number];
        radius: number;
        /**
         * hex
         */
        color: string;
    };
}



export type ApiType_Geo_Object_Type1_Patch = {
    name?: string;
    config?: {
        longitude: number;
        latitude: number;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}



export type ApiType_Geo_Object_Type2_Patch = {
    name?: string;
    config?: {
        longitude: number;
        latitude: number;
        symbol: string;
        height?: number;
        heading?: number;
        /**
         * TODO unit
         */
        speed?: number;
    };
}



export type ApiType_Remote_Controller = {
    id: number;
    serial_number: string;
    /**
     * 0 = dji rc pro enterprise, 1 = dji rc plus
     */
    type: number;
}


/**
 * 0 = dji rc pro enterprise, 1 = dji rc plus
 */
export type ApiType_Remote_Controller_Type = number;



export type ApiType_Remote_Controller_Position = {
    longitude: number;
    latitude: number;
    height: number;
    /**
     * ISO 8601 format with a timezone
     */
    reported_at: string;
}



export type ApiType_Drone = {
    id: number;
    serial_number: string;
    /**
     * 0 = dji mavic 3
     */
    type: number;
    name: string;
    last_connection_id?: number;
}


/**
 * 0 = dji mavic 3
 */
export type ApiType_Drone_Type = number;



export type ApiType_Drone_Position = {
    longitude: number;
    latitude: number;
    height: number;
    /**
     * ISO 8601 format with a timezone
     */
    reported_at: string;
}



export type ApiType_Drone_Battery = {
    capacity_percent_left: number;
    /**
     * ISO 8601 format with a timezone
     */
    reported_at: string;
}


export type ApiType_Drone_Media = {
    id: number;
    drone_id: number;
    flight_id: number;
    /**
     * 0 = image, 1 = video
     */
    type: number;
    /**
     * see `/file` endpoint
     */
    file_id: number;
    file_name: string;
    /**
     * ISO 8601 format with a timezone
     */
    received_at: string;
    meta?: string;
    /**
     * ISO 8601 format with a timezone
     */
    captured_at?: string;
    camera_location?: {
        position?: {
            longitude: number;
            latitude: number;
        };
        height?: number;
    };
    camera_angles?: {
        heading?: number;
        pitch?: number;
        roll?: number;
    };
}[];


export type ApiType_Drone_Flights = {
    id: number;
    drone_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    started_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    landed_at?: string;
    /**
     * ISO 8601 format with a timezone
     */
    ended_at?: string;
    track: {
        height: number;
        longitude: number;
        latitude: number;
        /**
         * ISO 8601 format with a timezone
         */
        time: string;
    }[];
    is_created_manually: boolean;
    /**
     * if this is true, updated_by will be have the id of the user that performed the last edit
     */
    is_changed_manually: boolean;
    updated_by?: number;
}[];



export type ApiType_Flight = {
    id: number;
    drone_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    started_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    landed_at?: string;
    /**
     * ISO 8601 format with a timezone
     */
    ended_at?: string;
    track: {
        height: number;
        longitude: number;
        latitude: number;
        /**
         * ISO 8601 format with a timezone
         */
        time: string;
    }[];
    is_created_manually: boolean;
    /**
     * if this is true, updated_by will be have the id of the user that performed the last edit
     */
    is_changed_manually: boolean;
    updated_by?: number;
}



export type ApiType_Flight_Post = {
    drone_id: number;
    /**
     * ISO 8601 format with a timezone
     */
    started_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    landed_at?: string;
    /**
     * ISO 8601 format with a timezone
     */
    ended_at?: string;
    track?: {
        height: number;
        longitude: number;
        latitude: number;
        /**
         * ISO 8601 format with a timezone
         */
        time: string;
    }[];
}



export type ApiType_Flight_Patch = {
    /**
     * ISO 8601 format with a timezone
     */
    started_at?: string;
    /**
     * ISO 8601 format with a timezone
     */
    landed_at?: string;
    /**
     * ISO 8601 format with a timezone
     */
    ended_at?: string;
    track?: {
        height: number;
        longitude: number;
        latitude: number;
        /**
         * ISO 8601 format with a timezone
         */
        time: string;
    }[];
}


export type ApiType_Flight_Media = {
    id: number;
    drone_id: number;
    flight_id: number;
    /**
     * 0 = image, 1 = video
     */
    type: number;
    /**
     * see `/file` endpoint
     */
    file_id: number;
    file_name: string;
    /**
     * ISO 8601 format with a timezone
     */
    received_at: string;
    meta?: string;
    /**
     * ISO 8601 format with a timezone
     */
    captured_at?: string;
    camera_location?: {
        position?: {
            longitude: number;
            latitude: number;
        };
        height?: number;
    };
    camera_angles?: {
        heading?: number;
        pitch?: number;
        roll?: number;
    };
}[];


export type ApiType_Flight_Users = {
    flight_id: number;
    user_id: number;
    created_by: number;
    /**
     * 0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring
     */
    type: number;
}[];



export type ApiType_Flight_Users_Post = {
    user_id: number;
    /**
     * 0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring
     */
    type: number;
}



export type ApiType_Flight_User = {
    flight_id: number;
    user_id: number;
    created_by: number;
    /**
     * 0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring
     */
    type: number;
}


/**
 * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
 */
export type ApiType_Mission_State = number;


/**
 * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
 */
export type ApiType_Task_State = number;



export type ApiType_Mission = {
    id: number;
    workspace_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    assigned_to_team_id?: number;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: number;
}



export type ApiType_Mission_Post = {
    workspace_id: number;
    name: string;
    description?: string;
    notes?: string;
    assigned_to_team_id?: number;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state?: number;
}



export type ApiType_Mission_Patch = {
    name?: string;
    description?: string;
    notes?: string;
    assigned_to_team_id?: number;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state?: number;
}


export type ApiType_Mission_Tasks = {
    id: number;
    mission_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: number;
    geo_objects: (
        | (
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        point: [number, number, number];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        line: [number, number, number][];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        polygon: [number, number, number][];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        center: [number, number, number];
                        radius: number;
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
          )
        | {
              id: number;
              uuid: string;
              workspace_id?: number;
              name: string;
              /**
               * ISO 8601 format with a timezone
               */
              created_at: string;
              /**
               * ISO 8601 format with a timezone
               */
              updated_at: string;
              type: number;
              /**
               * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
               */
              sub_type: number;
              tasks: {
                  id: number;
              }[];
              config: {
                  longitude: number;
                  latitude: number;
                  height?: number;
                  heading?: number;
                  /**
                   * TODO unit
                   */
                  speed?: number;
              };
          }
        | {
              id: number;
              uuid: string;
              workspace_id?: number;
              name: string;
              /**
               * ISO 8601 format with a timezone
               */
              created_at: string;
              /**
               * ISO 8601 format with a timezone
               */
              updated_at: string;
              type: number;
              /**
               * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
               */
              sub_type: number;
              tasks: {
                  id: number;
              }[];
              config: {
                  longitude: number;
                  latitude: number;
                  symbol: string;
                  height?: number;
                  heading?: number;
                  /**
                   * TODO unit
                   */
                  speed?: number;
              };
          }
        | (
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        point: [number, number, number];
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        line: [number, number, number][];
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        polygon: [number, number, number][];
                    };
                }
          )
    )[];
}[];



export type ApiType_Task = {
    id: number;
    mission_id: number;
    name: string;
    description?: string;
    notes?: string;
    created_by: number;
    updated_by: number;
    /**
     * ISO 8601 format with a timezone
     */
    created_at: string;
    /**
     * ISO 8601 format with a timezone
     */
    updated_at: string;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state: number;
    geo_objects: (
        | (
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        point: [number, number, number];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        line: [number, number, number][];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        polygon: [number, number, number][];
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        center: [number, number, number];
                        radius: number;
                        /**
                         * hex
                         */
                        color: string;
                    };
                }
          )
        | {
              id: number;
              uuid: string;
              workspace_id?: number;
              name: string;
              /**
               * ISO 8601 format with a timezone
               */
              created_at: string;
              /**
               * ISO 8601 format with a timezone
               */
              updated_at: string;
              type: number;
              /**
               * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
               */
              sub_type: number;
              tasks: {
                  id: number;
              }[];
              config: {
                  longitude: number;
                  latitude: number;
                  height?: number;
                  heading?: number;
                  /**
                   * TODO unit
                   */
                  speed?: number;
              };
          }
        | {
              id: number;
              uuid: string;
              workspace_id?: number;
              name: string;
              /**
               * ISO 8601 format with a timezone
               */
              created_at: string;
              /**
               * ISO 8601 format with a timezone
               */
              updated_at: string;
              type: number;
              /**
               * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
               */
              sub_type: number;
              tasks: {
                  id: number;
              }[];
              config: {
                  longitude: number;
                  latitude: number;
                  symbol: string;
                  height?: number;
                  heading?: number;
                  /**
                   * TODO unit
                   */
                  speed?: number;
              };
          }
        | (
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [lng, lat, elevation]
                         *
                         * @minItems 3
                         * @maxItems 3
                         */
                        point: [number, number, number];
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        line: [number, number, number][];
                    };
                }
              | {
                    id: number;
                    uuid: string;
                    workspace_id?: number;
                    name: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    created_at: string;
                    /**
                     * ISO 8601 format with a timezone
                     */
                    updated_at: string;
                    type: number;
                    /**
                     * other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15
                     */
                    sub_type: number;
                    tasks: {
                        id: number;
                    }[];
                    config: {
                        id: number;
                        /**
                         * [[lng, lat, elevation], [lng, lat, elevation]]
                         */
                        polygon: [number, number, number][];
                    };
                }
          )
    )[];
}



export type ApiType_Task_Post = {
    mission_id: number;
    name: string;
    description?: string;
    notes?: string;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state?: number;
}



export type ApiType_Task_Patch = {
    name?: string;
    description?: string;
    notes?: string;
    /**
     * 0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled
     */
    state?: number;
}



export type ApiType_Task_Link_Geo_Object = {
    geo_object_id: number;
}



export type ApiType_Task_Unlink_Geo_Object = {
    geo_object_id: number;
}



export type ApiType_Media = {
    id: number;
    drone_id: number;
    flight_id: number;
    /**
     * 0 = image, 1 = video
     */
    type: number;
    /**
     * see `/file` endpoint
     */
    file_id: number;
    file_name: string;
    /**
     * ISO 8601 format with a timezone
     */
    received_at: string;
    meta?: string;
    /**
     * ISO 8601 format with a timezone
     */
    captured_at?: string;
    camera_location?: {
        position?: {
            longitude: number;
            latitude: number;
        };
        height?: number;
    };
    camera_angles?: {
        heading?: number;
        pitch?: number;
        roll?: number;
    };
}



export type ApiType_Media_Ground_Coverage = {
    coverage: {
        all: {
            position: {
                /**
                 * in degree
                 */
                longitude: number;
                /**
                 * in degree
                 */
                latitude: number;
            };
            /**
             * in meters
             */
            elevation: number;
            /**
             * for debugging only
             */
            debug?: string;
            ray?: {
                bearing: number;
                pitch: number;
                imagePosition: {
                    x: number;
                    y: number;
                };
            };
            directDistance?: number;
            meterSize?: {
                vertical: number;
                horizontal: number;
            };
        }[];
        outer: {
            position: {
                /**
                 * in degree
                 */
                longitude: number;
                /**
                 * in degree
                 */
                latitude: number;
            };
            /**
             * in meters
             */
            elevation: number;
            /**
             * for debugging only
             */
            debug?: string;
            ray?: {
                bearing: number;
                pitch: number;
                imagePosition: {
                    x: number;
                    y: number;
                };
            };
            directDistance?: number;
            meterSize?: {
                vertical: number;
                horizontal: number;
            };
        }[];
        holes: {
            position: {
                /**
                 * in degree
                 */
                longitude: number;
                /**
                 * in degree
                 */
                latitude: number;
            };
            /**
             * in meters
             */
            elevation: number;
            /**
             * for debugging only
             */
            debug?: string;
            ray?: {
                bearing: number;
                pitch: number;
                imagePosition: {
                    x: number;
                    y: number;
                };
            };
            directDistance?: number;
            meterSize?: {
                vertical: number;
                horizontal: number;
            };
        }[][];
    };
}



export type ApiType_Ground_Coverage_Location = {
    position: {
        /**
         * in degree
         */
        longitude: number;
        /**
         * in degree
         */
        latitude: number;
    };
    /**
     * in meters
     */
    elevation: number;
    /**
     * for debugging only
     */
    debug?: string;
    ray?: {
        bearing: number;
        pitch: number;
        imagePosition: {
            x: number;
            y: number;
        };
    };
    directDistance?: number;
    meterSize?: {
        vertical: number;
        horizontal: number;
    };
}



export type ApiType_Connection_Link_Auth_Login_Post = {
    connection_id: string;
    secret: string;
}



export type ApiType_Connection_Link_Config = {
    connection_id: string;
    platform_name: string;
    platform_url: string;
    workspace_id: string;
    workspace_uuid: string;
    workspace_name: string;
    secret: string;
}



export type ApiType_Connection_Link_Dji_Pilot_2_Sdk_Config = {
    app_id: string;
    app_key: string;
    app_license: string;
    mqtt_url: string;
    rtmp_url: string;
    api_url: string;
    ws_url: string;
}



export type ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post = {
    ext?: {
        drone_model_key: string;
        is_original: boolean;
        payload_model_key: string;
        tinny_fingerprint: string;
        sn: string;
    };
    fingerprint: string;
    name?: string;
    path?: string;
}



export type ApiType_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response = {
    /**
     * 0 = success
     */
    code: number;
    message: string;
    data: {};
}


/**
 * TODO what is the format? documentation does not say
 */
export interface ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post {}



export type ApiType_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response = {
    /**
     * 0 = success
     */
    code: number;
    message: string;
    data: {
        tiny_fingerprints: string[];
    };
}



export type ApiType_Dji_Pilot_2_Api_Media_Sts_Post_Response = {
    /**
     * 0 = success
     */
    code: number;
    message: string;
    data: {
        bucket: string;
        credentials: {
            access_key_id: string;
            access_key_secret: string;
            expire?: number;
            security_token?: string;
        };
        endpoint: string;
        object_key_prefix: string;
        /**
         * can be `ali`, `aws` or `minio`
         */
        provider: string;
        region: string;
    };
}



export type ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post = {
    /**
     * non-zero means failure
     */
    result?: number;
    name: string;
    object_key: string;
    path?: string;
    sub_file_type?: number;
    ext?: {
        file_group_id?: string;
        /**
         * device product enum
         */
        drone_model_key?: string;
        is_original?: boolean;
        /**
         * payload product enum
         */
        payload_model_key?: string;
        /**
         * TODO check if tinny is spelled correctly
         */
        tinny_fingerprint?: string;
        sn?: string;
    };
    fingerprint?: string;
    metadata?: {
        absolute_altitude?: number;
        created_time?: string;
        gimbal_yaw_degree?: number;
        relative_altitude?: number;
        shoot_position?: {
            lat?: number;
            lng?: number;
        };
    };
}



export type ApiType_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response = {
    /**
     * 0 = success
     */
    code: number;
    message: string;
    data: {
        object_key: string;
    };
}



export type ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post = {
    file_group_id?: string;
    file_count: number;
    file_uploaded_count: number;
}



export type ApiType_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response = {
    /**
     * 0 = success
     */
    code: number;
    message: string;
    /**
     * TODO missing documentation
     */
    data: {};
}



export type ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post = {
    id: string;
    name: string;
    /**
     * TODO missing documentation
     */
    resource: {
        /**
         * 0 = point, 1 = line, 2 = polygon, 7 = circle
         */
        type: number;
        content: {
            type: string;
            geometry: {};
            properties?: {};
        };
    };
}



export type ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response = {
    code: number;
    message: string;
    data: {
        id: string;
    };
}



export type ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response = {
    code: number;
    message: string;
    data: {
        id: string;
        name: string;
        /**
         * Time in milliseconds since Unix Epoch time (January 1st, 1970 )
         */
        create_time: number;
        /**
         * if locked, elements of this group can not be deleted/modified
         */
        is_lock: boolean;
        /**
         * 0 = custom element group, 1 = default element group, 2 = app shared element group (the only visible group on dji pilot 2 app)
         */
        type: number;
        elements: {
            id: string;
            name: string;
            /**
             * Time in milliseconds since Unix Epoch time (January 1st, 1970 )
             */
            create_time: number;
            /**
             * Time in milliseconds since Unix Epoch time (January 1st, 1970 )
             */
            update_time: number;
            resource: {
                /**
                 * 0 = point, 1 = line, 2 = polygon, 7 = circle
                 */
                type: number;
                content: {
                    /**
                     * geojson format
                     */
                    type: string;
                    properties: {
                        clampToGround: boolean;
                        is3d?: boolean;
                        /**
                         * only valid colors. BLUE: #2D8CF0, GREEN: #19BE6B, YELLOW: #FFBB00, RED: #E23C39, PURPLE: #B620E0
                         */
                        color: string;
                    };
                    geometry: {
                        /**
                         * geojson format
                         */
                        type: string;
                        /**
                         * geojson format
                         */
                        coordinates: (number | number[])[];
                        radius?: number;
                    };
                };
            };
        }[];
    }[];
}



export type ApiType_Dji_Pilot_2_Api_Map_Elements_Put = {
    name: string;
    content: {
        type: string;
        geometry: {};
        properties: {};
    };
}



export type ApiType_Dji_Pilot_2_Api_Map_Elements_Put_Response = {
    code: number;
    message: string;
    data: {
        id: string;
    };
}



export type ApiType_Dji_Pilot_2_Api_Map_Elements_Delete_Response = {
    code: number;
    message: string;
    data: {
        id: string;
    };
}



export type ApiType_Dji_Pilot_2_Api_Manage_Devices_Topology_Response = {
    code: number;
    message: string;
    data: {
        list: {
            hosts: {
                device_callsign: string;
                device_model?: {
                    key: string;
                    domain: string;
                    type: string;
                    sub_type: string;
                };
                /**
                 * custom icon
                 */
                icon_urls?: {
                    normal_icon_url: string;
                    selected_icon_url: string;
                };
                online_status: boolean;
                sn: string;
                user_callsign: string;
                user_id: string;
            }[];
            parents: {
                device_callsign: string;
                device_model?: {
                    key: string;
                    domain: string;
                    type: string;
                    sub_type: string;
                };
                /**
                 * custom icon
                 */
                icon_urls?: {
                    normal_icon_url: string;
                    selected_icon_url: string;
                };
                online_status: boolean;
                sn: string;
                user_callsign: string;
                user_id: string;
            }[];
        }[];
    };
}



export type ApiType_Dji_Pilot_2_Api_Manage_Devices_Topology_Device = {
    device_callsign: string;
    device_model?: {
        key: string;
        domain: string;
        type: string;
        sub_type: string;
    };
    /**
     * custom icon
     */
    icon_urls?: {
        normal_icon_url: string;
        selected_icon_url: string;
    };
    online_status: boolean;
    sn: string;
    user_callsign: string;
    user_id: string;
}


export type ApiType_Info_Collision_Objects = {
    /**
     * 0 = power tower, 1 = power pole, 2 = power line large, 3 = power line small or catenary, 4 = aerialway pylon, 5 = aerialway (like chair lift or gondola), 6 = building (e.g. tower)
     */
    type: number;
    /**
     * unique identifier for collision objects
     */
    id: number;
    name: string;
    marking:
        | {
              /**
               * 0 = point, 1 = line, 2 = area
               */
              type: number;
              longitude: number;
              latitude: number;
              /**
               * this is often an estimated value based on the type (e.g. power line large is about 80m)
               */
              height_above_ground: number;
              [k: string]: unknown;
          }
        | {
              /**
               * 0 = point, 1 = line, 2 = area
               */
              type: number;
              points: {
                  longitude: number;
                  latitude: number;
                  /**
                   * this is often an estimated value based on the type (e.g. power line large is about 80m)
                   */
                  height_above_ground: number;
                  [k: string]: unknown;
              }[];
              [k: string]: unknown;
          };
}[];


export type ApiType_Info_Collision_Objects_Marking =
    | {
          /**
           * 0 = point, 1 = line, 2 = area
           */
          type: number;
          longitude: number;
          latitude: number;
          /**
           * this is often an estimated value based on the type (e.g. power line large is about 80m)
           */
          height_above_ground: number;
          [k: string]: unknown;
      }
    | {
          /**
           * 0 = point, 1 = line, 2 = area
           */
          type: number;
          points: {
              longitude: number;
              latitude: number;
              /**
               * this is often an estimated value based on the type (e.g. power line large is about 80m)
               */
              height_above_ground: number;
              [k: string]: unknown;
          }[];
          [k: string]: unknown;
      };



export type ApiType_Info_Collision_Objects_Marking_Base = {
    /**
     * 0 = point, 1 = line, 2 = area
     */
    type: number;
}



export type ApiType_Info_Collision_Objects_Marking_0 = {
    /**
     * 0 = point, 1 = line, 2 = area
     */
    type: number;
    longitude: number;
    latitude: number;
    /**
     * this is often an estimated value based on the type (e.g. power line large is about 80m)
     */
    height_above_ground: number;
}



export type ApiType_Info_Collision_Objects_Marking_1 = {
    /**
     * 0 = point, 1 = line, 2 = area
     */
    type: number;
    points: {
        longitude: number;
        latitude: number;
        /**
         * this is often an estimated value based on the type (e.g. power line large is about 80m)
         */
        height_above_ground: number;
    }[];
}



export type ApiType_Info_Collision_Objects_Marking_2 = {
    /**
     * 0 = point, 1 = line, 2 = area
     */
    type: number;
    points: {
        longitude: number;
        latitude: number;
        /**
         * this is often an estimated value based on the type (e.g. power line large is about 80m)
         */
        height_above_ground: number;
    }[];
}


