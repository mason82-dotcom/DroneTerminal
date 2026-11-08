import { makeRequestFunctionType } from "../rest_api"
import { integer, ApiResponse_AuthLoginPost, ApiResponse_AuthLoginWithTokenPost, ApiResponse_AuthCheckGet, ApiResponse_AuthRegisterPost, ApiResponse_AuthStreamTokenGet, ApiResponse_UserGet, ApiResponse_UserPatch, ApiResponse_UserSelfGet, ApiResponse_UserMyOrganisationsGet, ApiResponse_UserMyTeamsGet, ApiResponse_TeamPost, ApiResponse_TeamAllTeamsGet, ApiResponse_TeamGet, ApiResponse_TeamPatch, ApiResponse_TeamInviteMemberPost, ApiResponse_TeamMembersGet, ApiResponse_TeamWorkspacesGet, ApiResponse_OrganisationGet, ApiResponse_OrganisationPatch, ApiResponse_OrganisationUsersGet, ApiResponse_OrganisationTeamsGet, ApiResponse_AdminUsersGet, ApiResponse_AdminUsersPost, ApiResponse_AdminOrganisationsGet, ApiResponse_AdminOrganisationsPost, ApiResponse_AdminSystemPerformanceOsGet, ApiResponse_AdminSystemPerformanceApiEndpointsGet, ApiResponse_AdminSystemPerformanceApiEndpointDetailsGet, ApiResponse_AdminSystemDatabaseInfoGet, ApiResponse_FileGet, ApiResponse_FileGetMultiplePost, ApiResponse_WorkspaceMyWorkspacesGet, ApiResponse_WorkspacePost, ApiResponse_WorkspaceGet, ApiResponse_WorkspacePatch, ApiResponse_WorkspaceFilePost, ApiResponse_WorkspacePermissionsGet, ApiResponse_WorkspaceFilesGet, ApiResponse_WorkspaceMissionsGet, ApiResponse_WorkspaceConnectionsGet, ApiResponse_ConnectionPost, ApiResponse_ConnectionGet, ApiResponse_ConnectionLiveShareKeysGet, ApiResponse_ConnectionLiveShareKeysPost, ApiResponse_WorkspaceGeoObjectsGet, ApiResponse_WorkspaceGeoObjectsPost, ApiResponse_WorkspaceGeoObjectPatch, ApiResponse_RemoteControllerGet, ApiResponse_RemoteControllerLastPositionGet, ApiResponse_DroneGet, ApiResponse_DroneLastPositionGet, ApiResponse_DroneLastBatteryGet, ApiResponse_DroneMediaGet, ApiResponse_DroneFlightsGet, ApiResponse_DroneCurrentFlightGet, ApiResponse_FlightPost, ApiResponse_FlightGet, ApiResponse_FlightPatch, ApiResponse_FlightMediaGet, ApiResponse_FlightUsersGet, ApiResponse_MediaGet, ApiResponse_MediaGroundCoverageGet, ApiResponse_MissionPost, ApiResponse_MissionGet, ApiResponse_MissionPatch, ApiResponse_MissionTasksGet, ApiResponse_TaskPost, ApiResponse_TaskGet, ApiResponse_TaskPatch, ApiResponse_ConnectionLinkConfigGet, ApiResponse_ConnectionLinkDjiPilot2SdkConfigGet, ApiResponse_InfoCollisionObjectsGet } from './rest_api_types'

export function makeStructure(makeRequest: makeRequestFunctionType) {
    return {
        API_VERSION: '0.22.0'
        ,
        auth: {
            login: {
                post:
                    function(config: {
                        data: ({ username: string, password: string })
                    }) {
                        return makeRequest<ApiResponse_AuthLoginPost>({
                            url: '/auth/login',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            loginWithToken: {
                post:
                    function(config: {
                        data: ({ token: string })
                    }) {
                        return makeRequest<ApiResponse_AuthLoginWithTokenPost>({
                            url: '/auth/login-with-token',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            check: {
                get:
                    function() {
                        return makeRequest<ApiResponse_AuthCheckGet>({
                            url: '/auth/check',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            passwordChange: {
                post:
                    function(config: {
                        data: ({ current_password: string, new_password: string })
                    }) {
                        return makeRequest<void>({
                            url: '/auth/password-change',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            passwordReset: {
                post:
                    function(config: {
                        data: ({ username: string })
                    }) {
                        return makeRequest<void>({
                            url: '/auth/password-reset',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            passwordSetInitial: {
                post:
                    function(config: {
                        data: ({ new_password: string })
                    }) {
                        return makeRequest<void>({
                            url: '/auth/password-set-initial',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            passwordSetNew: {
                post:
                    function(config: {
                        data: ({ new_password: string, code: string })
                    }) {
                        return makeRequest<void>({
                            url: '/auth/password-set-new',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            register: {
                post:
                    /**
                    * @deprecated
                    */
                    function(config: {
                        data: ({ email: string, password?: string })
                    }) {
                        return makeRequest<ApiResponse_AuthRegisterPost>({
                            url: '/auth/register',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            logout: {
                post:
                    function() {
                        return makeRequest<void>({
                            url: '/auth/logout',
                            method: 'post',
                            isFormData: false,

                        })
                    },
            },
            streamToken: {
                get:
                    function() {
                        return makeRequest<ApiResponse_AuthStreamTokenGet>({
                            url: '/auth/stream-token',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
        },
        user: {
            get:
                function(config: {
                    params: { userId: number }
                }) {
                    return makeRequest<ApiResponse_UserGet>({
                        url: '/user/{userId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { userId: number },
                    data: ({ name?: string, email?: string, locale?: string })
                }) {
                    return makeRequest<ApiResponse_UserPatch>({
                        url: '/user/{userId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            self: {
                get:
                    function() {
                        return makeRequest<ApiResponse_UserSelfGet>({
                            url: '/user/self',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            myOrganisations: {
                get:
                    function() {
                        return makeRequest<ApiResponse_UserMyOrganisationsGet>({
                            url: '/user/my-organisations',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            myTeams: {
                get:
                    function() {
                        return makeRequest<ApiResponse_UserMyTeamsGet>({
                            url: '/user/my-teams',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
        },
        team: {
            post:
                function(config: {
                    data: ({ name: string, organisation_id: number, owner_user_id: number, logo_file_id?: number })
                }) {
                    return makeRequest<ApiResponse_TeamPost>({
                        url: '/team',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            allTeams: {
                get:
                    function() {
                        return makeRequest<ApiResponse_TeamAllTeamsGet>({
                            url: '/team/all-teams',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            get:
                function(config: {
                    params: { teamId: number }
                }) {
                    return makeRequest<ApiResponse_TeamGet>({
                        url: '/team/{teamId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { teamId: number },
                    data: ({ name?: string, logo_file_id?: number })
                }) {
                    return makeRequest<ApiResponse_TeamPatch>({
                        url: '/team/{teamId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            inviteMember: {
                post:
                    function(config: {
                        params: { teamId: number },
                        data: ({ email: string })
                    }) {
                        return makeRequest<ApiResponse_TeamInviteMemberPost>({
                            url: '/team/{teamId}/invite-member',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            members: {
                get:
                    function(config: {
                        params: { teamId: number }
                    }) {
                        return makeRequest<ApiResponse_TeamMembersGet>({
                            url: '/team/{teamId}/members',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            member: {
                delete:
                    function(config: {
                        params: { teamId: number, userId: number }
                    }) {
                        return makeRequest<void>({
                            url: '/team/{teamId}/member/{userId}',
                            method: 'delete',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            workspaces: {
                get:
                    function(config: {
                        params: { teamId: number }
                    }) {
                        return makeRequest<ApiResponse_TeamWorkspacesGet>({
                            url: '/team/{teamId}/workspaces',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        organisation: {
            get:
                function(config: {
                    params: { organisationId: number }
                }) {
                    return makeRequest<ApiResponse_OrganisationGet>({
                        url: '/organisation/{organisationId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { organisationId: number },
                    data: ({ name?: string, logo_file_id?: number })
                }) {
                    return makeRequest<ApiResponse_OrganisationPatch>({
                        url: '/organisation/{organisationId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            users: {
                get:
                    function(config: {
                        params: { organisationId: number }
                    }) {
                        return makeRequest<ApiResponse_OrganisationUsersGet>({
                            url: '/organisation/{organisationId}/users',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            teams: {
                get:
                    function(config: {
                        params: { organisationId: number }
                    }) {
                        return makeRequest<ApiResponse_OrganisationTeamsGet>({
                            url: '/organisation/{organisationId}/teams',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        admin: {
            users: {
                get:
                    function() {
                        return makeRequest<ApiResponse_AdminUsersGet>({
                            url: '/admin/users',
                            method: 'get',
                            isFormData: false,

                        })
                    },
                post:
                    function(config: {
                        data: ({ name?: string, email: string })
                    }) {
                        return makeRequest<ApiResponse_AdminUsersPost>({
                            url: '/admin/users',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            organisations: {
                get:
                    function() {
                        return makeRequest<ApiResponse_AdminOrganisationsGet>({
                            url: '/admin/organisations',
                            method: 'get',
                            isFormData: false,

                        })
                    },
                post:
                    function(config: {
                        data: ({ name: string, owner_user_id: number, logo_file_id?: number })
                    }) {
                        return makeRequest<ApiResponse_AdminOrganisationsPost>({
                            url: '/admin/organisations',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
            system: {
                performance: {
                    os: {
                        get:
                            function() {
                                return makeRequest<ApiResponse_AdminSystemPerformanceOsGet>({
                                    url: '/admin/system/performance/os',
                                    method: 'get',
                                    isFormData: false,

                                })
                            },
                    },
                    apiEndpoints: {
                        get:
                            function() {
                                return makeRequest<ApiResponse_AdminSystemPerformanceApiEndpointsGet>({
                                    url: '/admin/system/performance/api-endpoints',
                                    method: 'get',
                                    isFormData: false,

                                })
                            },
                    },
                    apiEndpoint: {
                        details: {
                            get:
                                function(config: {
                                    queryParams: { endpoint: string }
                                }) {
                                    return makeRequest<ApiResponse_AdminSystemPerformanceApiEndpointDetailsGet>({
                                        url: '/admin/system/performance/api-endpoint/details',
                                        method: 'get',
                                        isFormData: false,
                                        queryParams: config.queryParams
                                    })
                                },
                        },
                    },
                },
                database: {
                    info: {
                        get:
                            function() {
                                return makeRequest<ApiResponse_AdminSystemDatabaseInfoGet>({
                                    url: '/admin/system/database/info',
                                    method: 'get',
                                    isFormData: false,

                                })
                            },
                    },
                },
            },
        },
        file: {
            get:
                function(config: {
                    params: { fileId: number }
                }) {
                    return makeRequest<ApiResponse_FileGet>({
                        url: '/file/{fileId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            getMultiple: {
                post:
                    function(config: {
                        data: ({ ids: number[] })
                    }) {
                        return makeRequest<ApiResponse_FileGetMultiplePost>({
                            url: '/file/get-multiple',
                            method: 'post',
                            isFormData: false,
                            data: config.data
                        })
                    },
            },
        },
        workspace: {
            myWorkspaces: {
                get:
                    function() {
                        return makeRequest<ApiResponse_WorkspaceMyWorkspacesGet>({
                            url: '/workspace/my-workspaces',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            post:
                function(config: {
                    data: (({ name: string, longitude: number, latitude: number, team_id: number } | { name: string, longitude: number, latitude: number, organisation_id: number }))
                }) {
                    return makeRequest<ApiResponse_WorkspacePost>({
                        url: '/workspace',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            get:
                function(config: {
                    params: { workspaceId: number }
                }) {
                    return makeRequest<ApiResponse_WorkspaceGet>({
                        url: '/workspace/{workspaceId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { workspaceId: number },
                    data: ({ name?: string, longitude?: number, latitude?: number })
                }) {
                    return makeRequest<ApiResponse_WorkspacePatch>({
                        url: '/workspace/{workspaceId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            delete:
                function(config: {
                    params: { workspaceId: number }
                }) {
                    return makeRequest<void>({
                        url: '/workspace/{workspaceId}',
                        method: 'delete',
                        isFormData: false,
                        params: config.params
                    })
                },
            file: {
                post:
                    function(config: {
                        params: { workspaceId: number },
                        data: ({ file: File, filename: string })
                    }) {
                        return makeRequest<ApiResponse_WorkspaceFilePost>({
                            url: '/workspace/{workspaceId}/file',
                            method: 'post',
                            isFormData: true,
                            params: config.params,
                            data: config.data
                        })
                    },
                patch:
                    function(config: {
                        params: { workspaceId: number, fileId: number },
                        data: ({ filename?: string })
                    }) {
                        return makeRequest<void>({
                            url: '/workspace/{workspaceId}/file/{fileId}',
                            method: 'patch',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
                delete:
                    function(config: {
                        params: { workspaceId: number, fileId: number }
                    }) {
                        return makeRequest<void>({
                            url: '/workspace/{workspaceId}/file/{fileId}',
                            method: 'delete',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            permissions: {
                get:
                    function(config: {
                        params: { workspaceId: number }
                    }) {
                        return makeRequest<ApiResponse_WorkspacePermissionsGet>({
                            url: '/workspace/{workspaceId}/permissions',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            inviteTeam: {
                post:
                    function(config: {
                        params: { workspaceId: number },
                        data: ({ team_id: number })
                    }) {
                        return makeRequest<void>({
                            url: '/workspace/{workspaceId}/invite-team',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            kickTeam: {
                post:
                    function(config: {
                        params: { workspaceId: number },
                        data: ({ team_id: number })
                    }) {
                        return makeRequest<void>({
                            url: '/workspace/{workspaceId}/kick-team',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            files: {
                get:
                    function(config: {
                        params: { workspaceId: number }
                    }) {
                        return makeRequest<ApiResponse_WorkspaceFilesGet>({
                            url: '/workspace/{workspaceId}/files',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            missions: {
                get:
                    function(config: {
                        params: { workspaceId: number }
                    }) {
                        return makeRequest<ApiResponse_WorkspaceMissionsGet>({
                            url: '/workspace/{workspaceId}/missions',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            connections: {
                get:
                    function(config: {
                        params: { workspaceId: number }
                    }) {
                        return makeRequest<ApiResponse_WorkspaceConnectionsGet>({
                            url: '/workspace/{workspaceId}/connections',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            geoObjects: {
                get:
                    function(config: {
                        params: { workspaceId: number }
                    }) {
                        return makeRequest<ApiResponse_WorkspaceGeoObjectsGet>({
                            url: '/workspace/{workspaceId}/geo-objects',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
                post:
                    function(config: {
                        params: { workspaceId: number },
                        data: ((({ uuid?: string, name: string, type: 0, sub_type: 0, config: { point: [number, number, number], color: string } } | { uuid?: string, name: string, type: 0, sub_type: 1, config: { line: [number, number, number][], color: string } } | { uuid?: string, name: string, type: 0, sub_type: 2, config: { polygon: [number, number, number][], color: string } } | { uuid?: string, name: string, type: 0, sub_type: 3, config: { center: [number, number, number], radius: number, color: string } }) | { uuid?: string, name: string, type: 1, sub_type: integer, config: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { uuid?: string, name: string, type: 2, sub_type: integer, config: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } }))
                    }) {
                        return makeRequest<ApiResponse_WorkspaceGeoObjectsPost>({
                            url: '/workspace/{workspaceId}/geo-objects',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            geoObject: {
                patch:
                    function(config: {
                        params: { workspaceId: number, geoObjectId: number },
                        data: ((({ name?: string, config?: { point: [number, number, number], color: string } } | { name?: string, config?: { line: [number, number, number][], color: string } } | { name?: string, config?: { polygon: [number, number, number][], color: string } } | { name?: string, config?: { center: [number, number, number], radius: number, color: string } }) | { name?: string, config?: { longitude: number, latitude: number, height?: number, heading?: number, speed?: number } } | { name?: string, config?: { longitude: number, latitude: number, symbol: string, height?: number, heading?: number, speed?: number } }))
                    }) {
                        return makeRequest<ApiResponse_WorkspaceGeoObjectPatch>({
                            url: '/workspace/{workspaceId}/geo-object/{geoObjectId}',
                            method: 'patch',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
                delete:
                    function(config: {
                        params: { workspaceId: number, geoObjectId: number }
                    }) {
                        return makeRequest<void>({
                            url: '/workspace/{workspaceId}/geo-object/{geoObjectId}',
                            method: 'delete',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        connection: {
            post:
                function(config: {
                    data: ({ name: string, workspace_id: number })
                }) {
                    return makeRequest<ApiResponse_ConnectionPost>({
                        url: '/connection',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            get:
                function(config: {
                    params: { connectionId: number }
                }) {
                    return makeRequest<ApiResponse_ConnectionGet>({
                        url: '/connection/{connectionId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            delete:
                function(config: {
                    params: { connectionId: number }
                }) {
                    return makeRequest<void>({
                        url: '/connection/{connectionId}',
                        method: 'delete',
                        isFormData: false,
                        params: config.params
                    })
                },
            liveShareKeys: {
                get:
                    function(config: {
                        params: { connectionId: number }
                    }) {
                        return makeRequest<ApiResponse_ConnectionLiveShareKeysGet>({
                            url: '/connection/{connectionId}/live-share-keys',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
                post:
                    function(config: {
                        params: { connectionId: number },
                        data: ({ valid_until?: string, name?: string })
                    }) {
                        return makeRequest<ApiResponse_ConnectionLiveShareKeysPost>({
                            url: '/connection/{connectionId}/live-share-keys',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            liveShareKey: {
                delete:
                    function(config: {
                        params: { connectionId: number, liveShareKeyId: number }
                    }) {
                        return makeRequest<void>({
                            url: '/connection/{connectionId}/live-share-key/{liveShareKeyId}',
                            method: 'delete',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        remoteController: {
            get:
                function(config: {
                    params: { remoteControllerId: number }
                }) {
                    return makeRequest<ApiResponse_RemoteControllerGet>({
                        url: '/remote-controller/{remoteControllerId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            lastPosition: {
                get:
                    function(config: {
                        params: { remoteControllerId: number }
                    }) {
                        return makeRequest<ApiResponse_RemoteControllerLastPositionGet>({
                            url: '/remote-controller/{remoteControllerId}/last-position',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        drone: {
            get:
                function(config: {
                    params: { droneId: number }
                }) {
                    return makeRequest<ApiResponse_DroneGet>({
                        url: '/drone/{droneId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            lastPosition: {
                get:
                    function(config: {
                        params: { droneId: number }
                    }) {
                        return makeRequest<ApiResponse_DroneLastPositionGet>({
                            url: '/drone/{droneId}/last-position',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            lastBattery: {
                get:
                    function(config: {
                        params: { droneId: number }
                    }) {
                        return makeRequest<ApiResponse_DroneLastBatteryGet>({
                            url: '/drone/{droneId}/last-battery',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            media: {
                get:
                    function(config: {
                        params: { droneId: number }
                    }) {
                        return makeRequest<ApiResponse_DroneMediaGet>({
                            url: '/drone/{droneId}/media',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            flights: {
                get:
                    function(config: {
                        params: { droneId: number }
                    }) {
                        return makeRequest<ApiResponse_DroneFlightsGet>({
                            url: '/drone/{droneId}/flights',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            currentFlight: {
                get:
                    function(config: {
                        params: { droneId: number }
                    }) {
                        return makeRequest<ApiResponse_DroneCurrentFlightGet>({
                            url: '/drone/{droneId}/current-flight',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        flight: {
            post:
                function(config: {
                    data: ({ drone_id: number, started_at: string, landed_at?: string, ended_at?: string, track?: { height: number, longitude: number, latitude: number, time: string }[] })
                }) {
                    return makeRequest<ApiResponse_FlightPost>({
                        url: '/flight',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            get:
                function(config: {
                    params: { flightId: number }
                }) {
                    return makeRequest<ApiResponse_FlightGet>({
                        url: '/flight/{flightId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { flightId: number },
                    data: ({ started_at?: string, landed_at?: string, ended_at?: string, track?: { height: number, longitude: number, latitude: number, time: string }[] })
                }) {
                    return makeRequest<ApiResponse_FlightPatch>({
                        url: '/flight/{flightId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            media: {
                get:
                    function(config: {
                        params: { flightId: number }
                    }) {
                        return makeRequest<ApiResponse_FlightMediaGet>({
                            url: '/flight/{flightId}/media',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
            users: {
                get:
                    function(config: {
                        params: { flightId: number }
                    }) {
                        return makeRequest<ApiResponse_FlightUsersGet>({
                            url: '/flight/{flightId}/users',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
                post:
                    function(config: {
                        params: { flightId: number },
                        data: ({ user_id: number, type: integer })
                    }) {
                        return makeRequest<void>({
                            url: '/flight/{flightId}/users',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            user: {
                delete:
                    function(config: {
                        params: { flightId: number, userId: number }
                    }) {
                        return makeRequest<void>({
                            url: '/flight/{flightId}/user/{userId}',
                            method: 'delete',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        media: {
            get:
                function(config: {
                    params: { mediaId: number }
                }) {
                    return makeRequest<ApiResponse_MediaGet>({
                        url: '/media/{mediaId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            groundCoverage: {
                get:
                    function(config: {
                        params: { mediaId: number }
                    }) {
                        return makeRequest<ApiResponse_MediaGroundCoverageGet>({
                            url: '/media/ground-coverage/{mediaId}',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        mission: {
            post:
                function(config: {
                    data: ({ workspace_id: number, name: string, description?: string, notes?: string, assigned_to_team_id?: number, state?: integer })
                }) {
                    return makeRequest<ApiResponse_MissionPost>({
                        url: '/mission',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            get:
                function(config: {
                    params: { missionId: number }
                }) {
                    return makeRequest<ApiResponse_MissionGet>({
                        url: '/mission/{missionId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { missionId: number },
                    data: ({ name?: string, description?: string, notes?: string, assigned_to_team_id?: number, state?: integer })
                }) {
                    return makeRequest<ApiResponse_MissionPatch>({
                        url: '/mission/{missionId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            tasks: {
                get:
                    function(config: {
                        params: { missionId: number }
                    }) {
                        return makeRequest<ApiResponse_MissionTasksGet>({
                            url: '/mission/{missionId}/tasks',
                            method: 'get',
                            isFormData: false,
                            params: config.params
                        })
                    },
            },
        },
        task: {
            post:
                function(config: {
                    data: ({ mission_id: number, name: string, description?: string, notes?: string, state?: integer })
                }) {
                    return makeRequest<ApiResponse_TaskPost>({
                        url: '/task',
                        method: 'post',
                        isFormData: false,
                        data: config.data
                    })
                },
            get:
                function(config: {
                    params: { taskId: number }
                }) {
                    return makeRequest<ApiResponse_TaskGet>({
                        url: '/task/{taskId}',
                        method: 'get',
                        isFormData: false,
                        params: config.params
                    })
                },
            patch:
                function(config: {
                    params: { taskId: number },
                    data: ({ name?: string, description?: string, notes?: string, state?: integer })
                }) {
                    return makeRequest<ApiResponse_TaskPatch>({
                        url: '/task/{taskId}',
                        method: 'patch',
                        isFormData: false,
                        params: config.params,
                        data: config.data
                    })
                },
            delete:
                function(config: {
                    params: { taskId: number }
                }) {
                    return makeRequest<void>({
                        url: '/task/{taskId}',
                        method: 'delete',
                        isFormData: false,
                        params: config.params
                    })
                },
            linkGeoObject: {
                post:
                    function(config: {
                        params: { taskId: number },
                        data: ({ geo_object_id: number })
                    }) {
                        return makeRequest<void>({
                            url: '/task/{taskId}/link-geo-object',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
            unlinkGeoObject: {
                post:
                    function(config: {
                        params: { taskId: number },
                        data: ({ geo_object_id: number })
                    }) {
                        return makeRequest<void>({
                            url: '/task/{taskId}/unlink-geo-object',
                            method: 'post',
                            isFormData: false,
                            params: config.params,
                            data: config.data
                        })
                    },
            },
        },
        connectionLink: {
            auth: {
                check: {
                    get:
                        function() {
                            return makeRequest<void>({
                                url: '/connection-link/auth/check',
                                method: 'get',
                                isFormData: false,

                            })
                        },
                },
                login: {
                    post:
                        function(config: {
                            data: ({ connection_id: string, secret: string })
                        }) {
                            return makeRequest<void>({
                                url: '/connection-link/auth/login',
                                method: 'post',
                                isFormData: false,
                                data: config.data
                            })
                        },
                },
            },
            config: {
                get:
                    function() {
                        return makeRequest<ApiResponse_ConnectionLinkConfigGet>({
                            url: '/connection-link/config',
                            method: 'get',
                            isFormData: false,

                        })
                    },
            },
            resetWorkspaceUuid: {
                post:
                    function() {
                        return makeRequest<void>({
                            url: '/connection-link/reset-workspace-uuid',
                            method: 'post',
                            isFormData: false,

                        })
                    },
            },
            djiPilot2: {
                sdkConfig: {
                    get:
                        function() {
                            return makeRequest<ApiResponse_ConnectionLinkDjiPilot2SdkConfigGet>({
                                url: '/connection-link/dji-pilot-2/sdk-config',
                                method: 'get',
                                isFormData: false,

                            })
                        },
                },
            },
        },
        info: {
            collisionObjects: {
                get:
                    function(config: {
                        queryParams: { longitude: number, latitude: number, radius: number }
                    }) {
                        return makeRequest<ApiResponse_InfoCollisionObjectsGet>({
                            url: '/info/collision-objects',
                            method: 'get',
                            isFormData: false,
                            queryParams: config.queryParams
                        })
                    },
            },
        },
    }
}
