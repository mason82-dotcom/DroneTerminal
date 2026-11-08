// required mapping for non vanilla javascript types
export type method = 'get' | 'post' | 'patch' | 'delete'

export type integer = number

export type ApiResponse_AuthLoginPost = { id: number }

export type ApiResponse_AuthLoginWithTokenPost = { id: number }

export type ApiResponse_AuthCheckGet = { id: number }

export type ApiResponse_AuthRegisterPost = { id: number }

export type ApiResponse_AuthStreamTokenGet = { token: string }

export type ApiResponse_UserGet = { id: number, name: string, team_id?: number }

export type ApiResponse_UserPatch = { id: number, name: string, email: string, created_at: string, locale: string, registration_incomplete: boolean, team_id?: number }

export type ApiResponse_UserSelfGet = { id: number, name: string, email: string, created_at: string, locale: string, registration_incomplete: boolean, team_id?: number }

export type ApiResponse_UserMyOrganisationsGet = { id: number, access_type: integer }[]

export type ApiResponse_UserMyTeamsGet = { id: number, access_type: integer }[]

export type ApiResponse_TeamPost = { id: number }

export type ApiResponse_TeamAllTeamsGet = { id: number, name: string, organisation_id?: number, logo_file_id?: number }[]

export type ApiResponse_TeamGet = { id: number, name: string, owner_user_id: number, created_at: string, state: integer, organisation_id?: number, logo_file_id?: number }

export type ApiResponse_TeamPatch = { id: number, name: string, owner_user_id: number, created_at: string, state: integer, organisation_id?: number, logo_file_id?: number }

export type ApiResponse_TeamInviteMemberPost = { id: number }

export type ApiResponse_TeamMembersGet = { id: number, name: string }[]

export type ApiResponse_TeamWorkspacesGet = ({ id: number, name: string, longitude: number, latitude: number, owner_team_id: number } | { id: number, name: string, longitude: number, latitude: number, owner_organisation_id: number })[]

export type ApiResponse_OrganisationGet = { id: number, name: string, owner_user_id: number, created_at: string, state: integer, logo_file_id?: number }

export type ApiResponse_OrganisationPatch = { id: number, name: string, owner_user_id: number, created_at: string, state: integer, logo_file_id?: number }

export type ApiResponse_OrganisationUsersGet = { id: number, name: string, team_id?: number }[]

export type ApiResponse_OrganisationTeamsGet = { id: number, name: string }[]

export type ApiResponse_AdminUsersGet = { id: number, name: string, email: string, created_at: string, locale: string, registration_incomplete: boolean, team_id?: number }[]

export type ApiResponse_AdminUsersPost = { id: number }

export type ApiResponse_AdminOrganisationsGet = { id: number, name: string, owner_user_id: number, created_at: string, state: integer, logo_file_id?: number }[]

export type ApiResponse_AdminOrganisationsPost = { id: number }

export type ApiResponse_AdminSystemPerformanceOsGet = { os: string, cpu: string, uptime: number, ram_total: number, ram_free: number, load_avg: { avg_1: number, avg_5: number, avg_15: number } }

export type ApiResponse_AdminSystemPerformanceApiEndpointsGet = { endpoint: string, http_method: string, total_calls: number, max_run_time: number, max_work_time: number, avg_run_time: number, avg_work_time: number, pop_standard_dev_run_time: number, pop_standard_dev_work_time: number, pop_standard_dev_run_time_fractional: number, pop_standard_dev_work_time_fractional: number }[]

export type ApiResponse_AdminSystemPerformanceApiEndpointDetailsGet = { url: string, http_method: string, total_calls: number, max_run_time: number, max_work_time: number, avg_run_time: number, avg_work_time: number, pop_standard_dev_run_time: number, pop_standard_dev_work_time: number, pop_standard_dev_run_time_fractional: number, pop_standard_dev_work_time_fractional: number }[]

export type ApiResponse_AdminSystemDatabaseInfoGet = { tables: { name: string, size: integer, row_count: integer }[], database: { size: integer, version: string } }

export type ApiResponse_FileGet = { id: number, name: string, created_at: string, thumbnail_format?: string }

export type ApiResponse_FileGetMultiplePost = { id: number, name: string, created_at: string, thumbnail_format?: string }[]

export type ApiResponse_WorkspaceMyWorkspacesGet = ({ id: number, name: string, longitude: number, latitude: number, owner_team_id: number } | { id: number, name: string, longitude: number, latitude: number, owner_organisation_id: number })[]

export type ApiResponse_WorkspacePost = { id: number }

export type ApiResponse_WorkspaceGet = ({ id: number, name: string, longitude: number, latitude: number, owner_team_id: number } | { id: number, name: string, longitude: number, latitude: number, owner_organisation_id: number })

export type ApiResponse_WorkspacePatch = ({ id: number, name: string, longitude: number, latitude: number, owner_team_id: number } | { id: number, name: string, longitude: number, latitude: number, owner_organisation_id: number })

export type ApiResponse_WorkspaceFilePost = { id: number }

export type ApiResponse_WorkspacePermissionsGet = { team_id: number }[]

export type ApiResponse_WorkspaceFilesGet = { id: number, name: string, created_at: string, thumbnail_format?: string }[]

export type ApiResponse_WorkspaceMissionsGet = { id: number, workspace_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, assigned_to_team_id?: number, state: integer }[]

export type ApiResponse_WorkspaceConnectionsGet = { id: number, name: string, remote_controller_id?: number, drone_id?: number, workspace_id: number, stream_is_alive: boolean }[]

export type ApiResponse_ConnectionPost = { connection_id: string, secret: string }

export type ApiResponse_ConnectionGet = { id: number, name: string, remote_controller_id?: number, drone_id?: number, workspace_id: number, stream_is_alive: boolean }

export type ApiResponse_ConnectionLiveShareKeysGet = { id: number, key: string, name?: string, connection_id: number, created_by: number, created_at: string, valid_until: string }[]

export type ApiResponse_ConnectionLiveShareKeysPost = { id: number, key: string, name?: string, connection_id: number, created_by: number, created_at: string, valid_until: string }

export type ApiResponse_WorkspaceGeoObjectsGet = (({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 0, tasks: { id: number }[], config: { point: [number, number, number], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 1, tasks: { id: number }[], config: { line: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 2, tasks: { id: number }[], config: { polygon: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 3, tasks: { id: number }[], config: { center: [number, number, number], radius: number, color: string } }) | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 1, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 2, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } } | ({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 0, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 1, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 2, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 3, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 4, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 5, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 6, tasks: { id: number }[], config: { id: number, polygon: [number, number, number][] } }))[]

export type ApiResponse_WorkspaceGeoObjectsPost = { id: number }

export type ApiResponse_WorkspaceGeoObjectPatch = (({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 0, tasks: { id: number }[], config: { point: [number, number, number], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 1, tasks: { id: number }[], config: { line: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 2, tasks: { id: number }[], config: { polygon: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 3, tasks: { id: number }[], config: { center: [number, number, number], radius: number, color: string } }) | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 1, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 2, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } } | ({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 0, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 1, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 2, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 3, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 4, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 5, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 6, tasks: { id: number }[], config: { id: number, polygon: [number, number, number][] } }))

export type ApiResponse_RemoteControllerGet = { id: number, serial_number: string, type: integer }

export type ApiResponse_RemoteControllerLastPositionGet = { longitude: number, latitude: number, height: number, reported_at: string }

export type ApiResponse_DroneGet = { id: number, serial_number: string, type: integer, name: string, last_connection_id?: number }

export type ApiResponse_DroneLastPositionGet = { longitude: number, latitude: number, height: number, reported_at: string }

export type ApiResponse_DroneLastBatteryGet = { capacity_percent_left: number, reported_at: string }

export type ApiResponse_DroneMediaGet = { id: number, drone_id: number, flight_id: number, type: number, file_id: number, file_name: string, received_at: string, meta?: string, captured_at?: string, camera_location?: { position?: { longitude: number, latitude: number }, height?: number }, camera_angles?: { heading?: number, pitch?: number, roll?: number } }[]

export type ApiResponse_DroneFlightsGet = { id: number, drone_id: number, started_at: string, landed_at?: string, ended_at?: string, track: { height: number, longitude: number, latitude: number, time: string }[], is_created_manually: boolean, is_changed_manually: boolean, updated_by?: number }[]

export type ApiResponse_DroneCurrentFlightGet = { id: number, drone_id: number, started_at: string, landed_at?: string, ended_at?: string, track: { height: number, longitude: number, latitude: number, time: string }[], is_created_manually: boolean, is_changed_manually: boolean, updated_by?: number }

export type ApiResponse_FlightPost = { id: number }

export type ApiResponse_FlightGet = { id: number, drone_id: number, started_at: string, landed_at?: string, ended_at?: string, track: { height: number, longitude: number, latitude: number, time: string }[], is_created_manually: boolean, is_changed_manually: boolean, updated_by?: number }

export type ApiResponse_FlightPatch = { id: number, drone_id: number, started_at: string, landed_at?: string, ended_at?: string, track: { height: number, longitude: number, latitude: number, time: string }[], is_created_manually: boolean, is_changed_manually: boolean, updated_by?: number }

export type ApiResponse_FlightMediaGet = { id: number, drone_id: number, flight_id: number, type: number, file_id: number, file_name: string, received_at: string, meta?: string, captured_at?: string, camera_location?: { position?: { longitude: number, latitude: number }, height?: number }, camera_angles?: { heading?: number, pitch?: number, roll?: number } }[]

export type ApiResponse_FlightUsersGet = { flight_id: number, user_id: number, created_by: number, type: integer }[]

export type ApiResponse_MediaGet = { id: number, drone_id: number, flight_id: number, type: number, file_id: number, file_name: string, received_at: string, meta?: string, captured_at?: string, camera_location?: { position?: { longitude: number, latitude: number }, height?: number }, camera_angles?: { heading?: number, pitch?: number, roll?: number } }

export type ApiResponse_MediaGroundCoverageGet = { coverage: { all: { position: { longitude: number, latitude: number }, elevation: number, debug?: string, ray?: { bearing: number, pitch: number, imagePosition: { x: number, y: number } }, directDistance?: number, meterSize?: { vertical: number, horizontal: number } }[], outer: { position: { longitude: number, latitude: number }, elevation: number, debug?: string, ray?: { bearing: number, pitch: number, imagePosition: { x: number, y: number } }, directDistance?: number, meterSize?: { vertical: number, horizontal: number } }[], holes: { position: { longitude: number, latitude: number }, elevation: number, debug?: string, ray?: { bearing: number, pitch: number, imagePosition: { x: number, y: number } }, directDistance?: number, meterSize?: { vertical: number, horizontal: number } }[][] } }

export type ApiResponse_MissionPost = { id: number }

export type ApiResponse_MissionGet = { id: number, workspace_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, assigned_to_team_id?: number, state: integer }

export type ApiResponse_MissionPatch = { id: number, workspace_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, assigned_to_team_id?: number, state: integer }

export type ApiResponse_MissionTasksGet = { id: number, mission_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, state: integer, geo_objects: (({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 0, tasks: { id: number }[], config: { point: [number, number, number], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 1, tasks: { id: number }[], config: { line: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 2, tasks: { id: number }[], config: { polygon: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 3, tasks: { id: number }[], config: { center: [number, number, number], radius: number, color: string } }) | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 1, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 2, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } } | ({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 0, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 1, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 2, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 3, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 4, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 5, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 6, tasks: { id: number }[], config: { id: number, polygon: [number, number, number][] } }))[] }[]

export type ApiResponse_TaskPost = { id: number }

export type ApiResponse_TaskGet = { id: number, mission_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, state: integer, geo_objects: (({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 0, tasks: { id: number }[], config: { point: [number, number, number], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 1, tasks: { id: number }[], config: { line: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 2, tasks: { id: number }[], config: { polygon: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 3, tasks: { id: number }[], config: { center: [number, number, number], radius: number, color: string } }) | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 1, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 2, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } } | ({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 0, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 1, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 2, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 3, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 4, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 5, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 6, tasks: { id: number }[], config: { id: number, polygon: [number, number, number][] } }))[] }

export type ApiResponse_TaskPatch = { id: number, mission_id: number, name: string, description?: string, notes?: string, created_by: number, updated_by: number, created_at: string, updated_at: string, state: integer, geo_objects: (({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 0, tasks: { id: number }[], config: { point: [number, number, number], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 1, tasks: { id: number }[], config: { line: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 2, tasks: { id: number }[], config: { polygon: [number, number, number][], color: string } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 0, sub_type: 3, tasks: { id: number }[], config: { center: [number, number, number], radius: number, color: string } }) | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 1, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 2, sub_type: integer, tasks: { id: number }[], config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } } | ({ id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 0, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 1, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 2, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 3, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 4, tasks: { id: number }[], config: { id: number, point: [number, number, number] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 5, tasks: { id: number }[], config: { id: number, line: [number, number, number][] } } | { id: number, uuid: string, workspace_id?: number, name: string, created_at: string, updated_at: string, type: 3, sub_type: 6, tasks: { id: number }[], config: { id: number, polygon: [number, number, number][] } }))[] }

export type ApiResponse_ConnectionLinkConfigGet = { connection_id: string, platform_name: string, platform_url: string, workspace_id: string, workspace_uuid: string, workspace_name: string, secret: string }

export type ApiResponse_ConnectionLinkDjiPilot2SdkConfigGet = { app_id: string, app_key: string, app_license: string, mqtt_url: string, rtmp_url: string, api_url: string, ws_url: string }

export type ApiResponse_InfoCollisionObjectsGet = { type: integer, id: number, name: string, marking: ({ type: 0, longitude: number, latitude: number, height_above_ground: number } | { type: 1, points: { longitude: number, latitude: number, height_above_ground: number }[] } | { type: 2, points: { longitude: number, latitude: number, height_above_ground: number }[] }) }[]

