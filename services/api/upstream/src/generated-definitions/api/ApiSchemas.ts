import {JSONSchema4} from '../../util/types/JSONSchema'

export const ApiSchema_Id : JSONSchema4  = {
    "type": "number",
    "example": 42
}

export const ApiSchema_Id_Nullable : JSONSchema4  = {
    "type": "number",
    "nullable": true,
    "example": 42
}

export const ApiSchema_Uuid : JSONSchema4  = {
    "type": "string",
    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
}

export const ApiSchema_Unixms : JSONSchema4  = {
    "type": "number",
    "example": "1239213862",
    "description": "Time in milliseconds since Unix Epoch time (January 1st, 1970 )"
}

export const ApiSchema_Timestamptz : JSONSchema4  = {
    "type": "string",
    "format": "timestamptz",
    "description": "ISO 8601 format with a timezone",
    "example": "2023-12-11 23:06:52.7879+00"
}

export const ApiSchema_Timestamp : JSONSchema4  = {
    "type": "string",
    "format": "timestamptz",
    "description": "ISO 8601 format without a timezone",
    "example": "2023-12-11 23:06:52.7879"
}

export const ApiSchema_Email : JSONSchema4  = {
    "type": "string",
    "example": "john.doe@example.com"
}

export const ApiSchema_Password : JSONSchema4  = {
    "type": "string",
    "description": "Maximum length is 72 Bytes (utf-8).",
    "example": "j9876sa1kjhqsa6dtasd12="
}

export const ApiSchema_Size_In_Bytes : JSONSchema4  = {
    "type": "integer",
    "description": "in bytes"
}

export const ApiSchema_Reference : JSONSchema4  = {
    "type": "object",
    "required": [
        "id"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Auth_Login_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "username",
        "password"
    ],
    "properties": {
        "username": {
            "type": "string",
            "example": "john.doe@example.com"
        },
        "password": {
            "type": "string"
        }
    }
}

export const ApiSchema_Auth_Login_With_Token_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "token"
    ],
    "properties": {
        "token": {
            "type": "string"
        }
    }
}

export const ApiSchema_Auth_Register_Post : JSONSchema4  = {
    "deprecated": true,
    "type": "object",
    "required": [
        "name",
        "email"
    ],
    "properties": {
        "email": {
            "type": "string",
            "example": "john.doe@example.com"
        },
        "password": {
            "type": "string",
            "description": "Maximum length is 72 Bytes (utf-8).",
            "example": "j9876sa1kjhqsa6dtasd12="
        }
    }
}

export const ApiSchema_Auth_Password_Change_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "current_password",
        "new_password"
    ],
    "properties": {
        "current_password": {
            "type": "string",
            "description": "Maximum length is 72 Bytes (utf-8).",
            "example": "j9876sa1kjhqsa6dtasd12="
        },
        "new_password": {
            "type": "string",
            "description": "Maximum length is 72 Bytes (utf-8).",
            "example": "j9876sa1kjhqsa6dtasd12="
        }
    }
}

export const ApiSchema_Auth_Password_Reset_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "username"
    ],
    "properties": {
        "username": {
            "type": "string",
            "example": "john.doe@example.com"
        }
    }
}

export const ApiSchema_Auth_Password_Set_Initial_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "new_password"
    ],
    "properties": {
        "new_password": {
            "type": "string",
            "description": "Maximum length is 72 Bytes (utf-8).",
            "example": "j9876sa1kjhqsa6dtasd12="
        }
    }
}

export const ApiSchema_Auth_Password_Set_New_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "new_password",
        "code"
    ],
    "properties": {
        "new_password": {
            "type": "string",
            "description": "Maximum length is 72 Bytes (utf-8).",
            "example": "j9876sa1kjhqsa6dtasd12="
        },
        "code": {
            "type": "string"
        }
    }
}

export const ApiSchema_Auth_Stream_Token : JSONSchema4  = {
    "type": "object",
    "required": [
        "token"
    ],
    "properties": {
        "token": {
            "type": "string"
        }
    }
}

export const ApiSchema_User : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_User_Self : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "email",
        "created_at",
        "locale",
        "registration_incomplete"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "email": {
            "type": "string",
            "example": "john.doe@example.com"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "locale": {
            "type": "string",
            "example": "en-US"
        },
        "registration_incomplete": {
            "type": "boolean"
        },
        "team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_User_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "email": {
            "type": "string",
            "example": "john.doe@example.com"
        },
        "locale": {
            "type": "string",
            "example": "en-US"
        }
    }
}

export const ApiSchema_User_My_Organisations : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "access_type"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "access_type": {
                "type": "integer",
                "description": "0 = owner, 1 = member"
            }
        }
    }
}

export const ApiSchema_User_My_Teams : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "access_type"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "access_type": {
                "type": "integer",
                "description": "0 = owner, 1 = member"
            }
        }
    }
}

export const ApiSchema_Team : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "owner_user_id",
        "created_at",
        "state"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "owner_user_id": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "state": {
            "type": "integer",
            "description": "0 = invited, 1 = live, 2 = locked, 3 = deleted"
        },
        "organisation_id": {
            "type": "number",
            "example": 42
        },
        "logo_file_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Team_All_Teams : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "organisation_id": {
                "type": "number",
                "example": 42
            },
            "logo_file_id": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Team_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "organisation_id",
        "owner_user_id"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "organisation_id": {
            "type": "number",
            "example": 42
        },
        "owner_user_id": {
            "type": "number",
            "example": 42
        },
        "logo_file_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Team_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "logo_file_id": {
            "type": "number",
            "nullable": true,
            "example": 42
        }
    }
}

export const ApiSchema_Team_Invite_Member : JSONSchema4  = {
    "type": "object",
    "required": [
        "email"
    ],
    "properties": {
        "email": {
            "type": "string",
            "example": "john.doe@example.com"
        }
    }
}

export const ApiSchema_Team_Invite_Member_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "id"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Team_Members : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string",
                "example": "Harry Potter"
            }
        }
    }
}

export const ApiSchema_Team_Workspaces : JSONSchema4  = {
    "type": "array",
    "items": {
        "oneOf": [
            {
                "type": "object",
                "required": [
                    "id",
                    "name",
                    "longitude",
                    "latitude",
                    "owner_team_id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    },
                    "name": {
                        "type": "string"
                    },
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "owner_team_id": {
                        "type": "number",
                        "example": 42
                    }
                }
            },
            {
                "type": "object",
                "required": [
                    "id",
                    "name",
                    "longitude",
                    "latitude",
                    "owner_organisation_id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    },
                    "name": {
                        "type": "string"
                    },
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "owner_organisation_id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        ]
    }
}

export const ApiSchema_Organisation : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "owner_user_id",
        "created_at",
        "state"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "owner_user_id": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "state": {
            "type": "integer",
            "description": "0 = invited, 1 = live, 2 = locked, 3 = deleted"
        },
        "logo_file_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Organisation_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "logo_file_id": {
            "type": "number",
            "nullable": true,
            "example": 42
        }
    }
}

export const ApiSchema_Organisation_Users : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string",
                "example": "Harry Potter"
            },
            "team_id": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Organisation_Teams : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string",
                "example": "Harry Potter"
            }
        }
    }
}

export const ApiSchema_Admin_Users : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name",
            "email",
            "created_at",
            "locale",
            "registration_incomplete"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string",
                "example": "Harry Potter"
            },
            "email": {
                "type": "string",
                "example": "john.doe@example.com"
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "locale": {
                "type": "string",
                "example": "en-US"
            },
            "registration_incomplete": {
                "type": "boolean"
            },
            "team_id": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Admin_Users_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "email"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "email": {
            "type": "string",
            "example": "john.doe@example.com"
        }
    }
}

export const ApiSchema_Admin_Organisations : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name",
            "owner_user_id",
            "created_at",
            "state"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string",
                "example": "Harry Potter"
            },
            "owner_user_id": {
                "type": "number",
                "example": 42
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "state": {
                "type": "integer",
                "description": "0 = invited, 1 = live, 2 = locked, 3 = deleted"
            },
            "logo_file_id": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Admin_Organisation_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "owner_user_id"
    ],
    "properties": {
        "name": {
            "type": "string",
            "example": "Harry Potter"
        },
        "owner_user_id": {
            "type": "number",
            "example": 42
        },
        "logo_file_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Admin_System_Performance_Os : JSONSchema4  = {
    "type": "object",
    "required": [
        "os",
        "cpu",
        "uptime",
        "ram_total",
        "ram_free",
        "load_avg"
    ],
    "properties": {
        "os": {
            "type": "string"
        },
        "cpu": {
            "type": "string"
        },
        "uptime": {
            "type": "number",
            "description": "in milliseconds"
        },
        "ram_total": {
            "type": "number",
            "description": "in bytes"
        },
        "ram_free": {
            "type": "number",
            "description": "in bytes"
        },
        "load_avg": {
            "type": "object",
            "required": [
                "avg_1",
                "avg_5",
                "avg_15"
            ],
            "properties": {
                "avg_1": {
                    "type": "number",
                    "description": "last 1 minute (0-1)"
                },
                "avg_5": {
                    "type": "number",
                    "description": "last 5 minutes (0-1)"
                },
                "avg_15": {
                    "type": "number",
                    "description": "last 15 minutes (0-1)"
                }
            }
        }
    }
}

export const ApiSchema_Admin_System_Performance_Api_Endpoints : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "endpoint",
            "http_method",
            "total_calls",
            "max_run_time",
            "max_work_time",
            "avg_run_time",
            "avg_work_time",
            "pop_standard_dev_run_time",
            "pop_standard_dev_work_time",
            "pop_standard_dev_run_time_fractional",
            "pop_standard_dev_work_time_fractional"
        ],
        "properties": {
            "endpoint": {
                "type": "string"
            },
            "http_method": {
                "type": "string"
            },
            "total_calls": {
                "type": "number"
            },
            "max_run_time": {
                "type": "number",
                "description": "time until the response for this request has been sent (milliseconds)"
            },
            "max_work_time": {
                "type": "number",
                "description": "approximate time the cpu has worked on this (not accurate) (milliseconds)"
            },
            "avg_run_time": {
                "type": "number",
                "description": "arithmetic mean (milliseconds)"
            },
            "avg_work_time": {
                "type": "number",
                "description": "arithmetic mean (milliseconds)"
            },
            "pop_standard_dev_run_time": {
                "type": "number",
                "description": "population standard deviation (milliseconds)"
            },
            "pop_standard_dev_work_time": {
                "type": "number",
                "description": "population standard deviation (milliseconds)"
            },
            "pop_standard_dev_run_time_fractional": {
                "type": "number",
                "description": "population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)"
            },
            "pop_standard_dev_work_time_fractional": {
                "type": "number",
                "description": "population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)"
            }
        }
    }
}

export const ApiSchema_Admin_System_Performance_Api_Endpoint_Detail : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "url",
            "http_method",
            "total_calls",
            "max_run_time",
            "max_work_time",
            "avg_run_time",
            "avg_work_time",
            "pop_standard_dev_run_time",
            "pop_standard_dev_work_time",
            "pop_standard_dev_run_time_fractional",
            "pop_standard_dev_work_time_fractional"
        ],
        "properties": {
            "url": {
                "type": "string"
            },
            "http_method": {
                "type": "string"
            },
            "total_calls": {
                "type": "number"
            },
            "max_run_time": {
                "type": "number",
                "description": "time until the response for this request has been sent (milliseconds)"
            },
            "max_work_time": {
                "type": "number",
                "description": "approximate time the cpu has worked on this (not accurate) (milliseconds)"
            },
            "avg_run_time": {
                "type": "number",
                "description": "arithmetic mean (milliseconds)"
            },
            "avg_work_time": {
                "type": "number",
                "description": "arithmetic mean (milliseconds)"
            },
            "pop_standard_dev_run_time": {
                "type": "number",
                "description": "population standard deviation (milliseconds)"
            },
            "pop_standard_dev_work_time": {
                "type": "number",
                "description": "population standard deviation (milliseconds)"
            },
            "pop_standard_dev_run_time_fractional": {
                "type": "number",
                "description": "population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)"
            },
            "pop_standard_dev_work_time_fractional": {
                "type": "number",
                "description": "population standard deviation relative to arithmetic mean (pop standard deviation / arithmetic mean)"
            }
        }
    }
}

export const ApiSchema_Admin_System_Database_Info : JSONSchema4  = {
    "type": "object",
    "required": [
        "tables",
        "database"
    ],
    "properties": {
        "tables": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "name",
                    "size",
                    "row_count"
                ],
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "size": {
                        "type": "integer",
                        "description": "in bytes"
                    },
                    "row_count": {
                        "type": "integer",
                        "description": "estimated"
                    }
                }
            }
        },
        "database": {
            "type": "object",
            "required": [
                "size",
                "version"
            ],
            "properties": {
                "size": {
                    "type": "integer",
                    "description": "in bytes"
                },
                "version": {
                    "type": "string"
                }
            }
        }
    }
}

export const ApiSchema_File : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "created_at"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "thumbnail_format": {
            "type": "string",
            "description": "e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)"
        }
    }
}

export const ApiSchema_File_Get_Multiple : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name",
            "created_at"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "thumbnail_format": {
                "type": "string",
                "description": "e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)"
            }
        }
    }
}

export const ApiSchema_File_Get_Multiple_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "ids"
    ],
    "properties": {
        "ids": {
            "type": "array",
            "items": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Workspace : JSONSchema4  = {
    "oneOf": [
        {
            "type": "object",
            "required": [
                "id",
                "name",
                "longitude",
                "latitude",
                "owner_team_id"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "owner_team_id": {
                    "type": "number",
                    "example": 42
                }
            }
        },
        {
            "type": "object",
            "required": [
                "id",
                "name",
                "longitude",
                "latitude",
                "owner_organisation_id"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "owner_organisation_id": {
                    "type": "number",
                    "example": 42
                }
            }
        }
    ]
}

export const ApiSchema_Workspace_For_Organisation : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "longitude",
        "latitude",
        "owner_organisation_id"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "owner_organisation_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspace_For_Team : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "longitude",
        "latitude",
        "owner_team_id"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "owner_team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspace_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        }
    }
}

export const ApiSchema_Workspaces_Post : JSONSchema4  = {
    "oneOf": [
        {
            "type": "object",
            "required": [
                "name",
                "longitude",
                "latitude",
                "team_id"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "team_id": {
                    "type": "number",
                    "example": 42
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "longitude",
                "latitude",
                "organisation_id"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "organisation_id": {
                    "type": "number",
                    "example": 42
                }
            }
        }
    ]
}

export const ApiSchema_Workspaces_Post_For_Team : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "longitude",
        "latitude",
        "team_id"
    ],
    "properties": {
        "name": {
            "type": "string"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspaces_Post_For_Organisation : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "longitude",
        "latitude",
        "organisation_id"
    ],
    "properties": {
        "name": {
            "type": "string"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "organisation_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspace_Files : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "name",
            "created_at"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "thumbnail_format": {
                "type": "string",
                "description": "e.g. jpg (not null if a thumbnail is available at /file/thumbnail/)"
            }
        }
    }
}

export const ApiSchema_Workspace_File_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "file",
        "filename"
    ],
    "properties": {
        "file": {
            "type": "string",
            "format": "binary"
        },
        "filename": {
            "type": "string"
        }
    }
}

export const ApiSchema_Workspace_File_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "filename": {
            "type": "string"
        }
    }
}

export const ApiSchema_Workspace_Invite_Team_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "team_id"
    ],
    "properties": {
        "team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspace_Kick_Team_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "team_id"
    ],
    "properties": {
        "team_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Workspace_Permissions : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "team_id"
        ],
        "properties": {
            "team_id": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Workspace_Missions : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "workspace_id",
            "name",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
            "state"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "workspace_id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "notes": {
                "type": "string"
            },
            "created_by": {
                "type": "number",
                "example": 42
            },
            "updated_by": {
                "type": "number",
                "example": 42
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "updated_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "assigned_to_team_id": {
                "type": "number",
                "nullable": true,
                "example": 42
            },
            "state": {
                "type": "integer",
                "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
            }
        }
    }
}

export const ApiSchema_Workspace_Connections : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "description": "property `drone_id`: the currently connected drone (does not mean that the drone is currently online)",
        "required": [
            "id",
            "name",
            "workspace_id",
            "stream_is_alive"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "remote_controller_id": {
                "type": "number",
                "example": 42
            },
            "drone_id": {
                "type": "number",
                "example": 42
            },
            "workspace_id": {
                "type": "number",
                "example": 42
            },
            "stream_is_alive": {
                "type": "boolean"
            }
        }
    }
}

export const ApiSchema_Connection_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "workspace_id"
    ],
    "properties": {
        "name": {
            "type": "string"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Connection_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "connection_id",
        "secret"
    ],
    "properties": {
        "connection_id": {
            "type": "string"
        },
        "secret": {
            "type": "string"
        }
    }
}

export const ApiSchema_Connection : JSONSchema4  = {
    "type": "object",
    "description": "property `drone_id`: the currently connected drone (does not mean that the drone is currently online)",
    "required": [
        "id",
        "name",
        "workspace_id",
        "stream_is_alive"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "remote_controller_id": {
            "type": "number",
            "example": 42
        },
        "drone_id": {
            "type": "number",
            "example": 42
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "stream_is_alive": {
            "type": "boolean"
        }
    }
}

export const ApiSchema_Connection_Live_Share_Keys_Post : JSONSchema4  = {
    "type": "object",
    "properties": {
        "valid_until": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "name": {
            "type": "string"
        }
    }
}

export const ApiSchema_Connection_Live_Share_Keys_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "key",
        "connection_id",
        "created_by",
        "created_at",
        "valid_until"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "key": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "connection_id": {
            "type": "number",
            "example": 42
        },
        "created_by": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "valid_until": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        }
    }
}

export const ApiSchema_Connection_Live_Share_Keys_Get : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "key",
            "connection_id",
            "created_by",
            "created_at",
            "valid_until"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "key": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "connection_id": {
                "type": "number",
                "example": 42
            },
            "created_by": {
                "type": "number",
                "example": 42
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "valid_until": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            }
        }
    }
}

export const ApiSchema_Connection_Live_Share_Key : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "key",
        "connection_id",
        "created_by",
        "created_at",
        "valid_until"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "key": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "connection_id": {
            "type": "number",
            "example": 42
        },
        "created_by": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "valid_until": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        }
    }
}

export const ApiSchema_Workspace_Geo_Objects_Get : JSONSchema4  = {
    "type": "array",
    "items": {
        "anyOf": [
            {
                "anyOf": [
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "point",
                                    "color"
                                ],
                                "properties": {
                                    "point": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3,
                                        "description": "[lng, lat, elevation]"
                                    },
                                    "color": {
                                        "type": "string",
                                        "description": "hex"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "line",
                                    "color"
                                ],
                                "properties": {
                                    "line": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    },
                                    "color": {
                                        "type": "string",
                                        "description": "hex"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "polygon",
                                    "color"
                                ],
                                "properties": {
                                    "polygon": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    },
                                    "color": {
                                        "type": "string",
                                        "description": "hex"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "center",
                                    "radius",
                                    "color"
                                ],
                                "properties": {
                                    "center": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3,
                                        "description": "[lng, lat, elevation]"
                                    },
                                    "radius": {
                                        "type": "number"
                                    },
                                    "color": {
                                        "type": "string",
                                        "description": "hex"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    }
                ]
            },
            {
                "type": "object",
                "required": [
                    "id",
                    "uuid",
                    "name",
                    "created_at",
                    "updated_at",
                    "type",
                    "sub_type",
                    "tasks",
                    "config"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    },
                    "uuid": {
                        "type": "string",
                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                    },
                    "workspace_id": {
                        "type": "number",
                        "example": 42
                    },
                    "name": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    },
                    "updated_at": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    },
                    "type": {
                        "type": "integer"
                    },
                    "sub_type": {
                        "type": "integer",
                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                    },
                    "tasks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "id"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number",
                                    "example": 42
                                }
                            }
                        }
                    },
                    "config": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            },
                            "height": {
                                "type": "number"
                            },
                            "heading": {
                                "type": "number"
                            },
                            "speed": {
                                "type": "number",
                                "description": "TODO unit"
                            }
                        }
                    }
                },
                "description": "if workspace_id is not present, it is a global geoobject"
            },
            {
                "type": "object",
                "required": [
                    "id",
                    "uuid",
                    "name",
                    "created_at",
                    "updated_at",
                    "type",
                    "sub_type",
                    "tasks",
                    "config"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    },
                    "uuid": {
                        "type": "string",
                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                    },
                    "workspace_id": {
                        "type": "number",
                        "example": 42
                    },
                    "name": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    },
                    "updated_at": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    },
                    "type": {
                        "type": "integer"
                    },
                    "sub_type": {
                        "type": "integer",
                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                    },
                    "tasks": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "id"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number",
                                    "example": 42
                                }
                            }
                        }
                    },
                    "config": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude",
                            "symbol"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            },
                            "symbol": {
                                "type": "string"
                            },
                            "height": {
                                "type": "number"
                            },
                            "heading": {
                                "type": "number"
                            },
                            "speed": {
                                "type": "number",
                                "description": "TODO unit"
                            }
                        }
                    }
                },
                "description": "if workspace_id is not present, it is a global geoobject"
            },
            {
                "anyOf": [
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "point"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "point": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3,
                                        "description": "[lng, lat, elevation]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "point"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "point": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3,
                                        "description": "[lng, lat, elevation]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "line"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "line": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "line"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "line": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "point"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "point": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3,
                                        "description": "[lng, lat, elevation]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "line"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "line": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "id",
                                    "polygon"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number"
                                    },
                                    "polygon": {
                                        "type": "array",
                                        "items": {
                                            "type": "array",
                                            "items": {
                                                "type": "number"
                                            },
                                            "minItems": 3,
                                            "maxItems": 3
                                        },
                                        "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    }
                ]
            }
        ]
    }
}

export const ApiSchema_Workspace_Geo_Objects_Post : JSONSchema4  = {
    "anyOf": [
        {
            "anyOf": [
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "point",
                                "color"
                            ],
                            "properties": {
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "line",
                                "color"
                            ],
                            "properties": {
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "polygon",
                                "color"
                            ],
                            "properties": {
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "center",
                                "radius",
                                "color"
                            ],
                            "properties": {
                                "center": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "radius": {
                                    "type": "number"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude",
                        "symbol"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "symbol": {
                            "type": "string"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Workspace_Geo_Object_Patch : JSONSchema4  = {
    "anyOf": [
        {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "point",
                                "color"
                            ],
                            "properties": {
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "line",
                                "color"
                            ],
                            "properties": {
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "polygon",
                                "color"
                            ],
                            "properties": {
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "center",
                                "radius",
                                "color"
                            ],
                            "properties": {
                                "center": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "radius": {
                                    "type": "number"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude",
                        "symbol"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "symbol": {
                            "type": "string"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Geo_Object : JSONSchema4  = {
    "anyOf": [
        {
            "anyOf": [
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "point",
                                "color"
                            ],
                            "properties": {
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "line",
                                "color"
                            ],
                            "properties": {
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "polygon",
                                "color"
                            ],
                            "properties": {
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "center",
                                "radius",
                                "color"
                            ],
                            "properties": {
                                "center": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "radius": {
                                    "type": "number"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                }
            ]
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude",
                        "symbol"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "symbol": {
                            "type": "string"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "anyOf": [
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "point"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "point"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "line"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "line"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "point"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "line"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                },
                {
                    "type": "object",
                    "required": [
                        "id",
                        "uuid",
                        "name",
                        "created_at",
                        "updated_at",
                        "type",
                        "sub_type",
                        "tasks",
                        "config"
                    ],
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 42
                        },
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "workspace_id": {
                            "type": "number",
                            "example": 42
                        },
                        "name": {
                            "type": "string"
                        },
                        "created_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        },
                        "type": {
                            "type": "integer"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                        },
                        "tasks": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "required": [
                                    "id"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    }
                                }
                            }
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "id",
                                "polygon"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number"
                                },
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                }
                            }
                        }
                    },
                    "description": "if workspace_id is not present, it is a global geoobject"
                }
            ]
        }
    ]
}

export const ApiSchema_Geo_Object_Base : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type0 : JSONSchema4  = {
    "anyOf": [
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "point",
                        "color"
                    ],
                    "properties": {
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "line",
                        "color"
                    ],
                    "properties": {
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "polygon",
                        "color"
                    ],
                    "properties": {
                        "polygon": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "center",
                        "radius",
                        "color"
                    ],
                    "properties": {
                        "center": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "radius": {
                            "type": "number"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        }
    ]
}

export const ApiSchema_Geo_Object_Type0_Subtype0 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "point",
                "color"
            ],
            "properties": {
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type0_Subtype0_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "point",
        "color"
    ],
    "properties": {
        "point": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "minItems": 3,
            "maxItems": 3,
            "description": "[lng, lat, elevation]"
        },
        "color": {
            "type": "string",
            "description": "hex"
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype1 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "line",
                "color"
            ],
            "properties": {
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type0_Subtype1_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "line",
        "color"
    ],
    "properties": {
        "line": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        },
        "color": {
            "type": "string",
            "description": "hex"
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype2 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "polygon",
                "color"
            ],
            "properties": {
                "polygon": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type0_Subtype2_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "polygon",
        "color"
    ],
    "properties": {
        "polygon": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        },
        "color": {
            "type": "string",
            "description": "hex"
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype3 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "center",
                "radius",
                "color"
            ],
            "properties": {
                "center": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "radius": {
                    "type": "number"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type0_Subtype3_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "center",
        "radius",
        "color"
    ],
    "properties": {
        "center": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "minItems": 3,
            "maxItems": 3,
            "description": "[lng, lat, elevation]"
        },
        "radius": {
            "type": "number"
        },
        "color": {
            "type": "string",
            "description": "hex"
        }
    }
}

export const ApiSchema_Geo_Object_Type1 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type1_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "longitude",
        "latitude"
    ],
    "properties": {
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "height": {
            "type": "number"
        },
        "heading": {
            "type": "number"
        },
        "speed": {
            "type": "number",
            "description": "TODO unit"
        }
    }
}

export const ApiSchema_Geo_Object_Type2 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude",
                "symbol"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "symbol": {
                    "type": "string"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type2_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "longitude",
        "latitude",
        "symbol"
    ],
    "properties": {
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "symbol": {
            "type": "string"
        },
        "height": {
            "type": "number"
        },
        "heading": {
            "type": "number"
        },
        "speed": {
            "type": "number",
            "description": "TODO unit"
        }
    }
}

export const ApiSchema_Geo_Object_Type3 : JSONSchema4  = {
    "anyOf": [
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "point"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "point"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "line"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "line"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "point"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "line"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        },
        {
            "type": "object",
            "required": [
                "id",
                "uuid",
                "name",
                "created_at",
                "updated_at",
                "type",
                "sub_type",
                "tasks",
                "config"
            ],
            "properties": {
                "id": {
                    "type": "number",
                    "example": 42
                },
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "workspace_id": {
                    "type": "number",
                    "example": 42
                },
                "name": {
                    "type": "string"
                },
                "created_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "updated_at": {
                    "type": "string",
                    "format": "timestamptz",
                    "description": "ISO 8601 format with a timezone",
                    "example": "2023-12-11 23:06:52.7879+00"
                },
                "type": {
                    "type": "integer"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                },
                "tasks": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "id"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            }
                        }
                    }
                },
                "config": {
                    "type": "object",
                    "required": [
                        "id",
                        "polygon"
                    ],
                    "properties": {
                        "id": {
                            "type": "number"
                        },
                        "polygon": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        }
                    }
                }
            },
            "description": "if workspace_id is not present, it is a global geoobject"
        }
    ]
}

export const ApiSchema_Geo_Object_Type3_Subtype0 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "point"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype0_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "point"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "point": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "minItems": 3,
            "maxItems": 3,
            "description": "[lng, lat, elevation]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype1 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "point"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype1_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "point"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "point": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "minItems": 3,
            "maxItems": 3,
            "description": "[lng, lat, elevation]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype2 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "line"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype2_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "line"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "line": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype3 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "line"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype3_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "line"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "line": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype4 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "point"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype4_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "point"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "point": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "minItems": 3,
            "maxItems": 3,
            "description": "[lng, lat, elevation]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype5 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "line"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype5_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "line"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "line": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        }
    }
}

export const ApiSchema_Geo_Object_Type3_Subtype6 : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "uuid",
        "name",
        "created_at",
        "updated_at",
        "type",
        "sub_type",
        "tasks",
        "config"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "type": {
            "type": "integer"
        },
        "sub_type": {
            "type": "integer",
            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
        },
        "tasks": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id"
                ],
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 42
                    }
                }
            }
        },
        "config": {
            "type": "object",
            "required": [
                "id",
                "polygon"
            ],
            "properties": {
                "id": {
                    "type": "number"
                },
                "polygon": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                }
            }
        }
    },
    "description": "if workspace_id is not present, it is a global geoobject"
}

export const ApiSchema_Geo_Object_Type3_Subtype6_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "polygon"
    ],
    "properties": {
        "id": {
            "type": "number"
        },
        "polygon": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "number"
                },
                "minItems": 3,
                "maxItems": 3
            },
            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
        }
    }
}

export const ApiSchema_Geo_Object_Create : JSONSchema4  = {
    "anyOf": [
        {
            "anyOf": [
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "point",
                                "color"
                            ],
                            "properties": {
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "line",
                                "color"
                            ],
                            "properties": {
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "polygon",
                                "color"
                            ],
                            "properties": {
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "required": [
                        "name",
                        "type",
                        "sub_type",
                        "config"
                    ],
                    "properties": {
                        "uuid": {
                            "type": "string",
                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                        },
                        "name": {
                            "type": "string"
                        },
                        "type": {
                            "type": "integer",
                            "description": "2"
                        },
                        "sub_type": {
                            "type": "integer",
                            "description": "3",
                            "minimum": 0,
                            "maximum": 6
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "center",
                                "radius",
                                "color"
                            ],
                            "properties": {
                                "center": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "radius": {
                                    "type": "number"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude",
                        "symbol"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "symbol": {
                            "type": "string"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Geo_Object_Create_Base : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Create : JSONSchema4  = {
    "anyOf": [
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "point",
                        "color"
                    ],
                    "properties": {
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "line",
                        "color"
                    ],
                    "properties": {
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "polygon",
                        "color"
                    ],
                    "properties": {
                        "polygon": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "name",
                "type",
                "sub_type",
                "config"
            ],
            "properties": {
                "uuid": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "integer",
                    "description": "2"
                },
                "sub_type": {
                    "type": "integer",
                    "description": "3",
                    "minimum": 0,
                    "maximum": 6
                },
                "config": {
                    "type": "object",
                    "required": [
                        "center",
                        "radius",
                        "color"
                    ],
                    "properties": {
                        "center": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "radius": {
                            "type": "number"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Geo_Object_Type0_Subtype0_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "point",
                "color"
            ],
            "properties": {
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype1_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "line",
                "color"
            ],
            "properties": {
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype2_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "polygon",
                "color"
            ],
            "properties": {
                "polygon": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype3_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "center",
                "radius",
                "color"
            ],
            "properties": {
                "center": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "radius": {
                    "type": "number"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type1_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type2_Create : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "type",
        "sub_type",
        "config"
    ],
    "properties": {
        "uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "2"
        },
        "sub_type": {
            "type": "integer",
            "description": "3",
            "minimum": 0,
            "maximum": 6
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude",
                "symbol"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "symbol": {
                    "type": "string"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Patch : JSONSchema4  = {
    "anyOf": [
        {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "point",
                                "color"
                            ],
                            "properties": {
                                "point": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "line",
                                "color"
                            ],
                            "properties": {
                                "line": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "polygon",
                                "color"
                            ],
                            "properties": {
                                "polygon": {
                                    "type": "array",
                                    "items": {
                                        "type": "array",
                                        "items": {
                                            "type": "number"
                                        },
                                        "minItems": 3,
                                        "maxItems": 3
                                    },
                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "config": {
                            "type": "object",
                            "required": [
                                "center",
                                "radius",
                                "color"
                            ],
                            "properties": {
                                "center": {
                                    "type": "array",
                                    "items": {
                                        "type": "number"
                                    },
                                    "minItems": 3,
                                    "maxItems": 3,
                                    "description": "[lng, lat, elevation]"
                                },
                                "radius": {
                                    "type": "number"
                                },
                                "color": {
                                    "type": "string",
                                    "description": "hex"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude",
                        "symbol"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "symbol": {
                            "type": "string"
                        },
                        "height": {
                            "type": "number"
                        },
                        "heading": {
                            "type": "number"
                        },
                        "speed": {
                            "type": "number",
                            "description": "TODO unit"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Geo_Object_Patch_Base : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Patch : JSONSchema4  = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "point",
                        "color"
                    ],
                    "properties": {
                        "point": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "line",
                        "color"
                    ],
                    "properties": {
                        "line": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "polygon",
                        "color"
                    ],
                    "properties": {
                        "polygon": {
                            "type": "array",
                            "items": {
                                "type": "array",
                                "items": {
                                    "type": "number"
                                },
                                "minItems": 3,
                                "maxItems": 3
                            },
                            "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "config": {
                    "type": "object",
                    "required": [
                        "center",
                        "radius",
                        "color"
                    ],
                    "properties": {
                        "center": {
                            "type": "array",
                            "items": {
                                "type": "number"
                            },
                            "minItems": 3,
                            "maxItems": 3,
                            "description": "[lng, lat, elevation]"
                        },
                        "radius": {
                            "type": "number"
                        },
                        "color": {
                            "type": "string",
                            "description": "hex"
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Geo_Object_Type0_Subtype0_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "point",
                "color"
            ],
            "properties": {
                "point": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype1_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "line",
                "color"
            ],
            "properties": {
                "line": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype2_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "polygon",
                "color"
            ],
            "properties": {
                "polygon": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        },
                        "minItems": 3,
                        "maxItems": 3
                    },
                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type0_Subtype3_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "center",
                "radius",
                "color"
            ],
            "properties": {
                "center": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    },
                    "minItems": 3,
                    "maxItems": 3,
                    "description": "[lng, lat, elevation]"
                },
                "radius": {
                    "type": "number"
                },
                "color": {
                    "type": "string",
                    "description": "hex"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type1_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    }
}

export const ApiSchema_Geo_Object_Type2_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "config": {
            "type": "object",
            "required": [
                "longitude",
                "latitude",
                "symbol"
            ],
            "properties": {
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "symbol": {
                    "type": "string"
                },
                "height": {
                    "type": "number"
                },
                "heading": {
                    "type": "number"
                },
                "speed": {
                    "type": "number",
                    "description": "TODO unit"
                }
            }
        }
    }
}

export const ApiSchema_Remote_Controller : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "serial_number",
        "type"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "serial_number": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "0 = dji rc pro enterprise, 1 = dji rc plus"
        }
    }
}

export const ApiSchema_Remote_Controller_Type : JSONSchema4  = {
    "type": "integer",
    "description": "0 = dji rc pro enterprise, 1 = dji rc plus"
}

export const ApiSchema_Remote_Controller_Position : JSONSchema4  = {
    "type": "object",
    "required": [
        "longitude",
        "latitude",
        "height",
        "reported_at"
    ],
    "properties": {
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "height": {
            "type": "number"
        },
        "reported_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        }
    }
}

export const ApiSchema_Drone : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "serial_number",
        "type",
        "name"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "serial_number": {
            "type": "string"
        },
        "type": {
            "type": "integer",
            "description": "0 = dji mavic 3"
        },
        "name": {
            "type": "string"
        },
        "last_connection_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Drone_Type : JSONSchema4  = {
    "type": "integer",
    "description": "0 = dji mavic 3"
}

export const ApiSchema_Drone_Position : JSONSchema4  = {
    "type": "object",
    "required": [
        "longitude",
        "latitude",
        "height",
        "reported_at"
    ],
    "properties": {
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "height": {
            "type": "number"
        },
        "reported_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        }
    }
}

export const ApiSchema_Drone_Battery : JSONSchema4  = {
    "type": "object",
    "required": [
        "capacity_percent_left",
        "reported_at"
    ],
    "properties": {
        "capacity_percent_left": {
            "type": "number"
        },
        "reported_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        }
    }
}

export const ApiSchema_Drone_Media : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "type",
            "file_id",
            "received_at",
            "drone_id",
            "flight_id",
            "file_name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "drone_id": {
                "type": "number",
                "example": 42
            },
            "flight_id": {
                "type": "number",
                "example": 42
            },
            "type": {
                "type": "number",
                "description": "0 = image, 1 = video"
            },
            "file_id": {
                "type": "number",
                "example": 42,
                "description": "see `/file` endpoint"
            },
            "file_name": {
                "type": "string"
            },
            "received_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "meta": {
                "type": "string"
            },
            "captured_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "camera_location": {
                "type": "object",
                "properties": {
                    "position": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            }
                        }
                    },
                    "height": {
                        "type": "number"
                    }
                }
            },
            "camera_angles": {
                "type": "object",
                "properties": {
                    "heading": {
                        "type": "number"
                    },
                    "pitch": {
                        "type": "number"
                    },
                    "roll": {
                        "type": "number"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Drone_Flights : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "drone_id",
            "started_at",
            "track",
            "is_created_manually",
            "is_changed_manually"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "drone_id": {
                "type": "number",
                "example": 42
            },
            "started_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "landed_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "ended_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "track": {
                "type": "array",
                "items": {
                    "type": "object",
                    "required": [
                        "height",
                        "longitude",
                        "latitude",
                        "time"
                    ],
                    "properties": {
                        "height": {
                            "type": "number"
                        },
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        },
                        "time": {
                            "type": "string",
                            "format": "timestamptz",
                            "description": "ISO 8601 format with a timezone",
                            "example": "2023-12-11 23:06:52.7879+00"
                        }
                    }
                }
            },
            "is_created_manually": {
                "type": "boolean"
            },
            "is_changed_manually": {
                "type": "boolean",
                "description": "if this is true, updated_by will be have the id of the user that performed the last edit"
            },
            "updated_by": {
                "type": "number",
                "example": 42
            }
        }
    }
}

export const ApiSchema_Flight : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "drone_id",
        "started_at",
        "track",
        "is_created_manually",
        "is_changed_manually"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "drone_id": {
            "type": "number",
            "example": 42
        },
        "started_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "landed_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "ended_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "track": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "height",
                    "longitude",
                    "latitude",
                    "time"
                ],
                "properties": {
                    "height": {
                        "type": "number"
                    },
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "time": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    }
                }
            }
        },
        "is_created_manually": {
            "type": "boolean"
        },
        "is_changed_manually": {
            "type": "boolean",
            "description": "if this is true, updated_by will be have the id of the user that performed the last edit"
        },
        "updated_by": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Flight_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "drone_id",
        "started_at"
    ],
    "properties": {
        "drone_id": {
            "type": "number",
            "example": 42
        },
        "started_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "landed_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "ended_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "track": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "height",
                    "longitude",
                    "latitude",
                    "time"
                ],
                "properties": {
                    "height": {
                        "type": "number"
                    },
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "time": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Flight_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "started_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "landed_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "ended_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "track": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "height",
                    "longitude",
                    "latitude",
                    "time"
                ],
                "properties": {
                    "height": {
                        "type": "number"
                    },
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "time": {
                        "type": "string",
                        "format": "timestamptz",
                        "description": "ISO 8601 format with a timezone",
                        "example": "2023-12-11 23:06:52.7879+00"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Flight_Media : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "type",
            "file_id",
            "received_at",
            "drone_id",
            "flight_id",
            "file_name"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "drone_id": {
                "type": "number",
                "example": 42
            },
            "flight_id": {
                "type": "number",
                "example": 42
            },
            "type": {
                "type": "number",
                "description": "0 = image, 1 = video"
            },
            "file_id": {
                "type": "number",
                "example": 42,
                "description": "see `/file` endpoint"
            },
            "file_name": {
                "type": "string"
            },
            "received_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "meta": {
                "type": "string"
            },
            "captured_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "camera_location": {
                "type": "object",
                "properties": {
                    "position": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            }
                        }
                    },
                    "height": {
                        "type": "number"
                    }
                }
            },
            "camera_angles": {
                "type": "object",
                "properties": {
                    "heading": {
                        "type": "number"
                    },
                    "pitch": {
                        "type": "number"
                    },
                    "roll": {
                        "type": "number"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Flight_Users : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "flight_id",
            "user_id",
            "created_by",
            "type"
        ],
        "properties": {
            "flight_id": {
                "type": "number",
                "example": 42
            },
            "user_id": {
                "type": "number",
                "example": 42
            },
            "created_by": {
                "type": "number",
                "example": 42
            },
            "type": {
                "type": "integer",
                "description": "0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring"
            }
        }
    }
}

export const ApiSchema_Flight_Users_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "user_id",
        "type"
    ],
    "properties": {
        "user_id": {
            "type": "number",
            "example": 42
        },
        "type": {
            "type": "integer",
            "description": "0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring"
        }
    }
}

export const ApiSchema_Flight_User : JSONSchema4  = {
    "type": "object",
    "required": [
        "flight_id",
        "user_id",
        "created_by",
        "type"
    ],
    "properties": {
        "flight_id": {
            "type": "number",
            "example": 42
        },
        "user_id": {
            "type": "number",
            "example": 42
        },
        "created_by": {
            "type": "number",
            "example": 42
        },
        "type": {
            "type": "integer",
            "description": "0 = pilot, 1 = sensor operator, 2 = leader, 3 = air space monitoring"
        }
    }
}

export const ApiSchema_Mission_State : JSONSchema4  = {
    "type": "integer",
    "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
}

export const ApiSchema_Task_State : JSONSchema4  = {
    "type": "integer",
    "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
}

export const ApiSchema_Mission : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "workspace_id",
        "name",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "state"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "notes": {
            "type": "string"
        },
        "created_by": {
            "type": "number",
            "example": 42
        },
        "updated_by": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "assigned_to_team_id": {
            "type": "number",
            "nullable": true,
            "example": 42
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        }
    }
}

export const ApiSchema_Mission_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "workspace_id",
        "name"
    ],
    "properties": {
        "workspace_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "notes": {
            "type": "string"
        },
        "assigned_to_team_id": {
            "type": "number",
            "example": 42
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        }
    }
}

export const ApiSchema_Mission_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string",
            "nullable": true
        },
        "notes": {
            "type": "string",
            "nullable": true
        },
        "assigned_to_team_id": {
            "type": "number",
            "nullable": true,
            "example": 42
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        }
    }
}

export const ApiSchema_Mission_Tasks : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "id",
            "mission_id",
            "name",
            "created_by",
            "updated_by",
            "created_at",
            "updated_at",
            "state",
            "geo_objects"
        ],
        "properties": {
            "id": {
                "type": "number",
                "example": 42
            },
            "mission_id": {
                "type": "number",
                "example": 42
            },
            "name": {
                "type": "string"
            },
            "description": {
                "type": "string"
            },
            "notes": {
                "type": "string"
            },
            "created_by": {
                "type": "number",
                "example": 42
            },
            "updated_by": {
                "type": "number",
                "example": 42
            },
            "created_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "updated_at": {
                "type": "string",
                "format": "timestamptz",
                "description": "ISO 8601 format with a timezone",
                "example": "2023-12-11 23:06:52.7879+00"
            },
            "state": {
                "type": "integer",
                "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
            },
            "geo_objects": {
                "type": "array",
                "items": {
                    "anyOf": [
                        {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "point",
                                                "color"
                                            ],
                                            "properties": {
                                                "point": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3,
                                                    "description": "[lng, lat, elevation]"
                                                },
                                                "color": {
                                                    "type": "string",
                                                    "description": "hex"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "line",
                                                "color"
                                            ],
                                            "properties": {
                                                "line": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                },
                                                "color": {
                                                    "type": "string",
                                                    "description": "hex"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "polygon",
                                                "color"
                                            ],
                                            "properties": {
                                                "polygon": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                },
                                                "color": {
                                                    "type": "string",
                                                    "description": "hex"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "center",
                                                "radius",
                                                "color"
                                            ],
                                            "properties": {
                                                "center": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3,
                                                    "description": "[lng, lat, elevation]"
                                                },
                                                "radius": {
                                                    "type": "number"
                                                },
                                                "color": {
                                                    "type": "string",
                                                    "description": "hex"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                }
                            ]
                        },
                        {
                            "type": "object",
                            "required": [
                                "id",
                                "uuid",
                                "name",
                                "created_at",
                                "updated_at",
                                "type",
                                "sub_type",
                                "tasks",
                                "config"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number",
                                    "example": 42
                                },
                                "uuid": {
                                    "type": "string",
                                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                },
                                "workspace_id": {
                                    "type": "number",
                                    "example": 42
                                },
                                "name": {
                                    "type": "string"
                                },
                                "created_at": {
                                    "type": "string",
                                    "format": "timestamptz",
                                    "description": "ISO 8601 format with a timezone",
                                    "example": "2023-12-11 23:06:52.7879+00"
                                },
                                "updated_at": {
                                    "type": "string",
                                    "format": "timestamptz",
                                    "description": "ISO 8601 format with a timezone",
                                    "example": "2023-12-11 23:06:52.7879+00"
                                },
                                "type": {
                                    "type": "integer"
                                },
                                "sub_type": {
                                    "type": "integer",
                                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                },
                                "tasks": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": [
                                            "id"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number",
                                                "example": 42
                                            }
                                        }
                                    }
                                },
                                "config": {
                                    "type": "object",
                                    "required": [
                                        "longitude",
                                        "latitude"
                                    ],
                                    "properties": {
                                        "longitude": {
                                            "type": "number"
                                        },
                                        "latitude": {
                                            "type": "number"
                                        },
                                        "height": {
                                            "type": "number"
                                        },
                                        "heading": {
                                            "type": "number"
                                        },
                                        "speed": {
                                            "type": "number",
                                            "description": "TODO unit"
                                        }
                                    }
                                }
                            },
                            "description": "if workspace_id is not present, it is a global geoobject"
                        },
                        {
                            "type": "object",
                            "required": [
                                "id",
                                "uuid",
                                "name",
                                "created_at",
                                "updated_at",
                                "type",
                                "sub_type",
                                "tasks",
                                "config"
                            ],
                            "properties": {
                                "id": {
                                    "type": "number",
                                    "example": 42
                                },
                                "uuid": {
                                    "type": "string",
                                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                },
                                "workspace_id": {
                                    "type": "number",
                                    "example": 42
                                },
                                "name": {
                                    "type": "string"
                                },
                                "created_at": {
                                    "type": "string",
                                    "format": "timestamptz",
                                    "description": "ISO 8601 format with a timezone",
                                    "example": "2023-12-11 23:06:52.7879+00"
                                },
                                "updated_at": {
                                    "type": "string",
                                    "format": "timestamptz",
                                    "description": "ISO 8601 format with a timezone",
                                    "example": "2023-12-11 23:06:52.7879+00"
                                },
                                "type": {
                                    "type": "integer"
                                },
                                "sub_type": {
                                    "type": "integer",
                                    "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                },
                                "tasks": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "required": [
                                            "id"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number",
                                                "example": 42
                                            }
                                        }
                                    }
                                },
                                "config": {
                                    "type": "object",
                                    "required": [
                                        "longitude",
                                        "latitude",
                                        "symbol"
                                    ],
                                    "properties": {
                                        "longitude": {
                                            "type": "number"
                                        },
                                        "latitude": {
                                            "type": "number"
                                        },
                                        "symbol": {
                                            "type": "string"
                                        },
                                        "height": {
                                            "type": "number"
                                        },
                                        "heading": {
                                            "type": "number"
                                        },
                                        "speed": {
                                            "type": "number",
                                            "description": "TODO unit"
                                        }
                                    }
                                }
                            },
                            "description": "if workspace_id is not present, it is a global geoobject"
                        },
                        {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "point"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "point": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3,
                                                    "description": "[lng, lat, elevation]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "point"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "point": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3,
                                                    "description": "[lng, lat, elevation]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "line"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "line": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "line"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "line": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "point"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "point": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3,
                                                    "description": "[lng, lat, elevation]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "line"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "line": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                },
                                {
                                    "type": "object",
                                    "required": [
                                        "id",
                                        "uuid",
                                        "name",
                                        "created_at",
                                        "updated_at",
                                        "type",
                                        "sub_type",
                                        "tasks",
                                        "config"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "uuid": {
                                            "type": "string",
                                            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                        },
                                        "workspace_id": {
                                            "type": "number",
                                            "example": 42
                                        },
                                        "name": {
                                            "type": "string"
                                        },
                                        "created_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "updated_at": {
                                            "type": "string",
                                            "format": "timestamptz",
                                            "description": "ISO 8601 format with a timezone",
                                            "example": "2023-12-11 23:06:52.7879+00"
                                        },
                                        "type": {
                                            "type": "integer"
                                        },
                                        "sub_type": {
                                            "type": "integer",
                                            "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                        },
                                        "tasks": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "required": [
                                                    "id"
                                                ],
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
                                                        "example": 42
                                                    }
                                                }
                                            }
                                        },
                                        "config": {
                                            "type": "object",
                                            "required": [
                                                "id",
                                                "polygon"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number"
                                                },
                                                "polygon": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "number"
                                                        },
                                                        "minItems": 3,
                                                        "maxItems": 3
                                                    },
                                                    "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                                }
                                            }
                                        }
                                    },
                                    "description": "if workspace_id is not present, it is a global geoobject"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
}

export const ApiSchema_Task : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "mission_id",
        "name",
        "created_by",
        "updated_by",
        "created_at",
        "updated_at",
        "state",
        "geo_objects"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "mission_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "notes": {
            "type": "string"
        },
        "created_by": {
            "type": "number",
            "example": 42
        },
        "updated_by": {
            "type": "number",
            "example": 42
        },
        "created_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "updated_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        },
        "geo_objects": {
            "type": "array",
            "items": {
                "anyOf": [
                    {
                        "anyOf": [
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "point",
                                            "color"
                                        ],
                                        "properties": {
                                            "point": {
                                                "type": "array",
                                                "items": {
                                                    "type": "number"
                                                },
                                                "minItems": 3,
                                                "maxItems": 3,
                                                "description": "[lng, lat, elevation]"
                                            },
                                            "color": {
                                                "type": "string",
                                                "description": "hex"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "line",
                                            "color"
                                        ],
                                        "properties": {
                                            "line": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            },
                                            "color": {
                                                "type": "string",
                                                "description": "hex"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "polygon",
                                            "color"
                                        ],
                                        "properties": {
                                            "polygon": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            },
                                            "color": {
                                                "type": "string",
                                                "description": "hex"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "center",
                                            "radius",
                                            "color"
                                        ],
                                        "properties": {
                                            "center": {
                                                "type": "array",
                                                "items": {
                                                    "type": "number"
                                                },
                                                "minItems": 3,
                                                "maxItems": 3,
                                                "description": "[lng, lat, elevation]"
                                            },
                                            "radius": {
                                                "type": "number"
                                            },
                                            "color": {
                                                "type": "string",
                                                "description": "hex"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            }
                        ]
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "longitude",
                                    "latitude"
                                ],
                                "properties": {
                                    "longitude": {
                                        "type": "number"
                                    },
                                    "latitude": {
                                        "type": "number"
                                    },
                                    "height": {
                                        "type": "number"
                                    },
                                    "heading": {
                                        "type": "number"
                                    },
                                    "speed": {
                                        "type": "number",
                                        "description": "TODO unit"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "type": "object",
                        "required": [
                            "id",
                            "uuid",
                            "name",
                            "created_at",
                            "updated_at",
                            "type",
                            "sub_type",
                            "tasks",
                            "config"
                        ],
                        "properties": {
                            "id": {
                                "type": "number",
                                "example": 42
                            },
                            "uuid": {
                                "type": "string",
                                "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                            },
                            "workspace_id": {
                                "type": "number",
                                "example": 42
                            },
                            "name": {
                                "type": "string"
                            },
                            "created_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "updated_at": {
                                "type": "string",
                                "format": "timestamptz",
                                "description": "ISO 8601 format with a timezone",
                                "example": "2023-12-11 23:06:52.7879+00"
                            },
                            "type": {
                                "type": "integer"
                            },
                            "sub_type": {
                                "type": "integer",
                                "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                            },
                            "tasks": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "id"
                                    ],
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "example": 42
                                        }
                                    }
                                }
                            },
                            "config": {
                                "type": "object",
                                "required": [
                                    "longitude",
                                    "latitude",
                                    "symbol"
                                ],
                                "properties": {
                                    "longitude": {
                                        "type": "number"
                                    },
                                    "latitude": {
                                        "type": "number"
                                    },
                                    "symbol": {
                                        "type": "string"
                                    },
                                    "height": {
                                        "type": "number"
                                    },
                                    "heading": {
                                        "type": "number"
                                    },
                                    "speed": {
                                        "type": "number",
                                        "description": "TODO unit"
                                    }
                                }
                            }
                        },
                        "description": "if workspace_id is not present, it is a global geoobject"
                    },
                    {
                        "anyOf": [
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "point"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "point": {
                                                "type": "array",
                                                "items": {
                                                    "type": "number"
                                                },
                                                "minItems": 3,
                                                "maxItems": 3,
                                                "description": "[lng, lat, elevation]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "point"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "point": {
                                                "type": "array",
                                                "items": {
                                                    "type": "number"
                                                },
                                                "minItems": 3,
                                                "maxItems": 3,
                                                "description": "[lng, lat, elevation]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "line"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "line": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "line"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "line": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "point"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "point": {
                                                "type": "array",
                                                "items": {
                                                    "type": "number"
                                                },
                                                "minItems": 3,
                                                "maxItems": 3,
                                                "description": "[lng, lat, elevation]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "line"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "line": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            },
                            {
                                "type": "object",
                                "required": [
                                    "id",
                                    "uuid",
                                    "name",
                                    "created_at",
                                    "updated_at",
                                    "type",
                                    "sub_type",
                                    "tasks",
                                    "config"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "uuid": {
                                        "type": "string",
                                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                    },
                                    "workspace_id": {
                                        "type": "number",
                                        "example": 42
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "created_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "updated_at": {
                                        "type": "string",
                                        "format": "timestamptz",
                                        "description": "ISO 8601 format with a timezone",
                                        "example": "2023-12-11 23:06:52.7879+00"
                                    },
                                    "type": {
                                        "type": "integer"
                                    },
                                    "sub_type": {
                                        "type": "integer",
                                        "description": "other: 0, moto_glider: 1, tow_plane: 2, helicopter: 3, parachute: 4, drop_plane: 5, hang_glider: 6, para_glider: 7, powered_aircraft: 8, jet_aicraft: 9, ufo: 10, balloon: 11, airship: 12, uav: 13, ground_support: 14, static_object: 15"
                                    },
                                    "tasks": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "required": [
                                                "id"
                                            ],
                                            "properties": {
                                                "id": {
                                                    "type": "number",
                                                    "example": 42
                                                }
                                            }
                                        }
                                    },
                                    "config": {
                                        "type": "object",
                                        "required": [
                                            "id",
                                            "polygon"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "number"
                                            },
                                            "polygon": {
                                                "type": "array",
                                                "items": {
                                                    "type": "array",
                                                    "items": {
                                                        "type": "number"
                                                    },
                                                    "minItems": 3,
                                                    "maxItems": 3
                                                },
                                                "description": "[[lng, lat, elevation], [lng, lat, elevation]]"
                                            }
                                        }
                                    }
                                },
                                "description": "if workspace_id is not present, it is a global geoobject"
                            }
                        ]
                    }
                ]
            }
        }
    }
}

export const ApiSchema_Task_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "mission_id",
        "name"
    ],
    "properties": {
        "mission_id": {
            "type": "number",
            "example": 42
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "notes": {
            "type": "string"
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        }
    }
}

export const ApiSchema_Task_Patch : JSONSchema4  = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string",
            "nullable": true
        },
        "notes": {
            "type": "string",
            "nullable": true
        },
        "state": {
            "type": "integer",
            "description": "0 = pending, 1 = accepted, 2 = in progress, 3 = done, 4 = rejected, 5 = failed, 6 = canceled"
        }
    }
}

export const ApiSchema_Task_Link_Geo_Object : JSONSchema4  = {
    "type": "object",
    "required": [
        "geo_object_id"
    ],
    "properties": {
        "geo_object_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Task_Unlink_Geo_Object : JSONSchema4  = {
    "type": "object",
    "required": [
        "geo_object_id"
    ],
    "properties": {
        "geo_object_id": {
            "type": "number",
            "example": 42
        }
    }
}

export const ApiSchema_Media : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "type",
        "file_id",
        "received_at",
        "drone_id",
        "flight_id",
        "file_name"
    ],
    "properties": {
        "id": {
            "type": "number",
            "example": 42
        },
        "drone_id": {
            "type": "number",
            "example": 42
        },
        "flight_id": {
            "type": "number",
            "example": 42
        },
        "type": {
            "type": "number",
            "description": "0 = image, 1 = video"
        },
        "file_id": {
            "type": "number",
            "example": 42,
            "description": "see `/file` endpoint"
        },
        "file_name": {
            "type": "string"
        },
        "received_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "meta": {
            "type": "string"
        },
        "captured_at": {
            "type": "string",
            "format": "timestamptz",
            "description": "ISO 8601 format with a timezone",
            "example": "2023-12-11 23:06:52.7879+00"
        },
        "camera_location": {
            "type": "object",
            "properties": {
                "position": {
                    "type": "object",
                    "required": [
                        "longitude",
                        "latitude"
                    ],
                    "properties": {
                        "longitude": {
                            "type": "number"
                        },
                        "latitude": {
                            "type": "number"
                        }
                    }
                },
                "height": {
                    "type": "number"
                }
            }
        },
        "camera_angles": {
            "type": "object",
            "properties": {
                "heading": {
                    "type": "number"
                },
                "pitch": {
                    "type": "number"
                },
                "roll": {
                    "type": "number"
                }
            }
        }
    }
}

export const ApiSchema_Media_Ground_Coverage : JSONSchema4  = {
    "type": "object",
    "required": [
        "coverage"
    ],
    "properties": {
        "coverage": {
            "type": "object",
            "required": [
                "all",
                "outer",
                "holes"
            ],
            "properties": {
                "all": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "position",
                            "elevation"
                        ],
                        "properties": {
                            "position": {
                                "type": "object",
                                "required": [
                                    "longitude",
                                    "latitude"
                                ],
                                "properties": {
                                    "longitude": {
                                        "type": "number",
                                        "description": "in degree"
                                    },
                                    "latitude": {
                                        "type": "number",
                                        "description": "in degree"
                                    }
                                }
                            },
                            "elevation": {
                                "type": "number",
                                "description": "in meters"
                            },
                            "debug": {
                                "type": "string",
                                "description": "for debugging only"
                            },
                            "ray": {
                                "type": "object",
                                "required": [
                                    "bearing",
                                    "pitch",
                                    "imagePosition"
                                ],
                                "properties": {
                                    "bearing": {
                                        "type": "number"
                                    },
                                    "pitch": {
                                        "type": "number"
                                    },
                                    "imagePosition": {
                                        "type": "object",
                                        "required": [
                                            "x",
                                            "y"
                                        ],
                                        "properties": {
                                            "x": {
                                                "type": "number"
                                            },
                                            "y": {
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "directDistance": {
                                "type": "number"
                            },
                            "meterSize": {
                                "type": "object",
                                "required": [
                                    "vertical",
                                    "horizontal"
                                ],
                                "properties": {
                                    "vertical": {
                                        "type": "number"
                                    },
                                    "horizontal": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "outer": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "position",
                            "elevation"
                        ],
                        "properties": {
                            "position": {
                                "type": "object",
                                "required": [
                                    "longitude",
                                    "latitude"
                                ],
                                "properties": {
                                    "longitude": {
                                        "type": "number",
                                        "description": "in degree"
                                    },
                                    "latitude": {
                                        "type": "number",
                                        "description": "in degree"
                                    }
                                }
                            },
                            "elevation": {
                                "type": "number",
                                "description": "in meters"
                            },
                            "debug": {
                                "type": "string",
                                "description": "for debugging only"
                            },
                            "ray": {
                                "type": "object",
                                "required": [
                                    "bearing",
                                    "pitch",
                                    "imagePosition"
                                ],
                                "properties": {
                                    "bearing": {
                                        "type": "number"
                                    },
                                    "pitch": {
                                        "type": "number"
                                    },
                                    "imagePosition": {
                                        "type": "object",
                                        "required": [
                                            "x",
                                            "y"
                                        ],
                                        "properties": {
                                            "x": {
                                                "type": "number"
                                            },
                                            "y": {
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "directDistance": {
                                "type": "number"
                            },
                            "meterSize": {
                                "type": "object",
                                "required": [
                                    "vertical",
                                    "horizontal"
                                ],
                                "properties": {
                                    "vertical": {
                                        "type": "number"
                                    },
                                    "horizontal": {
                                        "type": "number"
                                    }
                                }
                            }
                        }
                    }
                },
                "holes": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "position",
                                "elevation"
                            ],
                            "properties": {
                                "position": {
                                    "type": "object",
                                    "required": [
                                        "longitude",
                                        "latitude"
                                    ],
                                    "properties": {
                                        "longitude": {
                                            "type": "number",
                                            "description": "in degree"
                                        },
                                        "latitude": {
                                            "type": "number",
                                            "description": "in degree"
                                        }
                                    }
                                },
                                "elevation": {
                                    "type": "number",
                                    "description": "in meters"
                                },
                                "debug": {
                                    "type": "string",
                                    "description": "for debugging only"
                                },
                                "ray": {
                                    "type": "object",
                                    "required": [
                                        "bearing",
                                        "pitch",
                                        "imagePosition"
                                    ],
                                    "properties": {
                                        "bearing": {
                                            "type": "number"
                                        },
                                        "pitch": {
                                            "type": "number"
                                        },
                                        "imagePosition": {
                                            "type": "object",
                                            "required": [
                                                "x",
                                                "y"
                                            ],
                                            "properties": {
                                                "x": {
                                                    "type": "number"
                                                },
                                                "y": {
                                                    "type": "number"
                                                }
                                            }
                                        }
                                    }
                                },
                                "directDistance": {
                                    "type": "number"
                                },
                                "meterSize": {
                                    "type": "object",
                                    "required": [
                                        "vertical",
                                        "horizontal"
                                    ],
                                    "properties": {
                                        "vertical": {
                                            "type": "number"
                                        },
                                        "horizontal": {
                                            "type": "number"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const ApiSchema_Ground_Coverage_Location : JSONSchema4  = {
    "type": "object",
    "required": [
        "position",
        "elevation"
    ],
    "properties": {
        "position": {
            "type": "object",
            "required": [
                "longitude",
                "latitude"
            ],
            "properties": {
                "longitude": {
                    "type": "number",
                    "description": "in degree"
                },
                "latitude": {
                    "type": "number",
                    "description": "in degree"
                }
            }
        },
        "elevation": {
            "type": "number",
            "description": "in meters"
        },
        "debug": {
            "type": "string",
            "description": "for debugging only"
        },
        "ray": {
            "type": "object",
            "required": [
                "bearing",
                "pitch",
                "imagePosition"
            ],
            "properties": {
                "bearing": {
                    "type": "number"
                },
                "pitch": {
                    "type": "number"
                },
                "imagePosition": {
                    "type": "object",
                    "required": [
                        "x",
                        "y"
                    ],
                    "properties": {
                        "x": {
                            "type": "number"
                        },
                        "y": {
                            "type": "number"
                        }
                    }
                }
            }
        },
        "directDistance": {
            "type": "number"
        },
        "meterSize": {
            "type": "object",
            "required": [
                "vertical",
                "horizontal"
            ],
            "properties": {
                "vertical": {
                    "type": "number"
                },
                "horizontal": {
                    "type": "number"
                }
            }
        }
    }
}

export const ApiSchema_Connection_Link_Auth_Login_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "connection_id",
        "secret"
    ],
    "properties": {
        "connection_id": {
            "type": "string"
        },
        "secret": {
            "type": "string"
        }
    }
}

export const ApiSchema_Connection_Link_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "connection_id",
        "workspace_id",
        "workspace_uuid",
        "workspace_name",
        "platform_name",
        "platform_url",
        "secret"
    ],
    "properties": {
        "connection_id": {
            "type": "string"
        },
        "platform_name": {
            "type": "string"
        },
        "platform_url": {
            "type": "string"
        },
        "workspace_id": {
            "type": "string"
        },
        "workspace_uuid": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "workspace_name": {
            "type": "string"
        },
        "secret": {
            "type": "string"
        }
    }
}

export const ApiSchema_Connection_Link_Dji_Pilot_2_Sdk_Config : JSONSchema4  = {
    "type": "object",
    "required": [
        "app_id",
        "app_key",
        "app_license",
        "mqtt_url",
        "rtmp_url",
        "api_url",
        "ws_url"
    ],
    "properties": {
        "app_id": {
            "type": "string"
        },
        "app_key": {
            "type": "string"
        },
        "app_license": {
            "type": "string"
        },
        "mqtt_url": {
            "type": "string"
        },
        "rtmp_url": {
            "type": "string"
        },
        "api_url": {
            "type": "string"
        },
        "ws_url": {
            "type": "string"
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "fingerprint"
    ],
    "properties": {
        "ext": {
            "type": "object",
            "required": [
                "drone_model_key",
                "is_original",
                "payload_model_key",
                "tinny_fingerprint",
                "sn"
            ],
            "properties": {
                "drone_model_key": {
                    "type": "string"
                },
                "is_original": {
                    "type": "boolean"
                },
                "payload_model_key": {
                    "type": "string"
                },
                "tinny_fingerprint": {
                    "type": "string"
                },
                "sn": {
                    "type": "string"
                }
            }
        },
        "fingerprint": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "path": {
            "type": "string"
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Fast_Upload_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "message",
        "data"
    ],
    "properties": {
        "code": {
            "type": "number",
            "description": "0 = success"
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object"
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post : JSONSchema4  = {
    "type": "object",
    "description": "TODO what is the format? documentation does not say"
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Files_Tiny_Fingerprints_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "message",
        "data"
    ],
    "properties": {
        "code": {
            "type": "number",
            "description": "0 = success"
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "tiny_fingerprints"
            ],
            "properties": {
                "tiny_fingerprints": {
                    "type": "array",
                    "items": {
                        "type": "string",
                        "example": "5aec4c6e78052bf38fab901bcd1a2319_2021_12_8_22_13_10"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Sts_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "message",
        "data"
    ],
    "properties": {
        "code": {
            "type": "number",
            "description": "0 = success"
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "bucket",
                "credentials",
                "endpoint",
                "object_key_prefix",
                "provider",
                "region"
            ],
            "properties": {
                "bucket": {
                    "type": "string"
                },
                "credentials": {
                    "type": "object",
                    "required": [
                        "access_key_id",
                        "access_key_secret"
                    ],
                    "properties": {
                        "access_key_id": {
                            "type": "string"
                        },
                        "access_key_secret": {
                            "type": "string"
                        },
                        "expire": {
                            "type": "number"
                        },
                        "security_token": {
                            "type": "string"
                        }
                    }
                },
                "endpoint": {
                    "type": "string"
                },
                "object_key_prefix": {
                    "type": "string"
                },
                "provider": {
                    "type": "string",
                    "description": "can be `ali`, `aws` or `minio`"
                },
                "region": {
                    "type": "string"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "object_key"
    ],
    "properties": {
        "result": {
            "type": "integer",
            "description": "non-zero means failure"
        },
        "name": {
            "type": "string"
        },
        "object_key": {
            "type": "string"
        },
        "path": {
            "type": "string"
        },
        "sub_file_type": {
            "type": "number"
        },
        "ext": {
            "type": "object",
            "properties": {
                "file_group_id": {
                    "type": "string"
                },
                "drone_model_key": {
                    "type": "string",
                    "description": "device product enum"
                },
                "is_original": {
                    "type": "boolean"
                },
                "payload_model_key": {
                    "type": "string",
                    "description": "payload product enum"
                },
                "tinny_fingerprint": {
                    "type": "string",
                    "description": "TODO check if tinny is spelled correctly"
                },
                "sn": {
                    "type": "string"
                }
            }
        },
        "fingerprint": {
            "type": "string"
        },
        "metadata": {
            "type": "object",
            "properties": {
                "absolute_altitude": {
                    "type": "number"
                },
                "created_time": {
                    "type": "string"
                },
                "gimbal_yaw_degree": {
                    "type": "number"
                },
                "relative_altitude": {
                    "type": "number"
                },
                "shoot_position": {
                    "type": "object",
                    "properties": {
                        "lat": {
                            "type": "number"
                        },
                        "lng": {
                            "type": "number"
                        }
                    }
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Upload_Callback_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "message",
        "data"
    ],
    "properties": {
        "code": {
            "type": "number",
            "description": "0 = success"
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "object_key"
            ],
            "properties": {
                "object_key": {
                    "type": "string"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "file_count",
        "file_uploaded_count"
    ],
    "properties": {
        "file_group_id": {
            "type": "string"
        },
        "file_count": {
            "type": "integer"
        },
        "file_uploaded_count": {
            "type": "integer"
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Media_Group_Upload_Callback_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "message",
        "data"
    ],
    "properties": {
        "code": {
            "type": "number",
            "description": "0 = success"
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "description": "TODO missing documentation"
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post : JSONSchema4  = {
    "type": "object",
    "required": [
        "id",
        "name",
        "resource"
    ],
    "properties": {
        "id": {
            "type": "string",
            "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
        },
        "name": {
            "type": "string"
        },
        "resource": {
            "type": "object",
            "description": "TODO missing documentation",
            "required": [
                "type",
                "content"
            ],
            "properties": {
                "type": {
                    "type": "number",
                    "description": "0 = point, 1 = line, 2 = polygon, 7 = circle"
                },
                "content": {
                    "type": "object",
                    "required": [
                        "type",
                        "geometry"
                    ],
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "geometry": {
                            "type": "object"
                        },
                        "properties": {
                            "type": "object"
                        }
                    }
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "data",
        "message"
    ],
    "properties": {
        "code": {
            "type": "number",
            "example": 0
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "id"
            ],
            "properties": {
                "id": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Element_Groups_Get_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "data",
        "message"
    ],
    "properties": {
        "code": {
            "type": "number",
            "example": 0
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "id",
                    "create_time",
                    "elements",
                    "is_lock",
                    "name",
                    "type"
                ],
                "properties": {
                    "id": {
                        "type": "string",
                        "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                    },
                    "name": {
                        "type": "string"
                    },
                    "create_time": {
                        "type": "number",
                        "example": "1239213862",
                        "description": "Time in milliseconds since Unix Epoch time (January 1st, 1970 )"
                    },
                    "is_lock": {
                        "type": "boolean",
                        "description": "if locked, elements of this group can not be deleted/modified"
                    },
                    "type": {
                        "type": "number",
                        "description": "0 = custom element group, 1 = default element group, 2 = app shared element group (the only visible group on dji pilot 2 app)"
                    },
                    "elements": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "required": [
                                "id",
                                "name",
                                "create_time",
                                "update_time",
                                "resource"
                            ],
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "create_time": {
                                    "type": "number",
                                    "example": "1239213862",
                                    "description": "Time in milliseconds since Unix Epoch time (January 1st, 1970 )"
                                },
                                "update_time": {
                                    "type": "number",
                                    "example": "1239213862",
                                    "description": "Time in milliseconds since Unix Epoch time (January 1st, 1970 )"
                                },
                                "resource": {
                                    "type": "object",
                                    "required": [
                                        "type",
                                        "content"
                                    ],
                                    "properties": {
                                        "type": {
                                            "type": "number",
                                            "description": "0 = point, 1 = line, 2 = polygon, 7 = circle"
                                        },
                                        "content": {
                                            "type": "object",
                                            "required": [
                                                "type",
                                                "properties",
                                                "geometry"
                                            ],
                                            "properties": {
                                                "type": {
                                                    "type": "string",
                                                    "description": "geojson format"
                                                },
                                                "properties": {
                                                    "type": "object",
                                                    "required": [
                                                        "clampToGround",
                                                        "color"
                                                    ],
                                                    "properties": {
                                                        "clampToGround": {
                                                            "type": "boolean"
                                                        },
                                                        "is3d": {
                                                            "type": "boolean"
                                                        },
                                                        "color": {
                                                            "type": "string",
                                                            "description": "only valid colors. BLUE: #2D8CF0, GREEN: #19BE6B, YELLOW: #FFBB00, RED: #E23C39, PURPLE: #B620E0",
                                                            "example": "BLUE"
                                                        }
                                                    }
                                                },
                                                "geometry": {
                                                    "type": "object",
                                                    "required": [
                                                        "type",
                                                        "coordinates"
                                                    ],
                                                    "properties": {
                                                        "type": {
                                                            "type": "string",
                                                            "description": "geojson format"
                                                        },
                                                        "coordinates": {
                                                            "type": "array",
                                                            "items": {
                                                                "anyOf": [
                                                                    {
                                                                        "type": "number"
                                                                    },
                                                                    {
                                                                        "type": "array",
                                                                        "items": {
                                                                            "type": "number"
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            "description": "geojson format"
                                                        },
                                                        "radius": {
                                                            "type": "number"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put : JSONSchema4  = {
    "type": "object",
    "required": [
        "name",
        "content"
    ],
    "properties": {
        "name": {
            "type": "string"
        },
        "content": {
            "type": "object",
            "required": [
                "type",
                "geometry",
                "properties"
            ],
            "properties": {
                "type": {
                    "type": "string"
                },
                "geometry": {
                    "type": "object"
                },
                "properties": {
                    "type": "object"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Elements_Put_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "data",
        "message"
    ],
    "properties": {
        "code": {
            "type": "number",
            "example": 0
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "id"
            ],
            "properties": {
                "id": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Map_Elements_Delete_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "data",
        "message"
    ],
    "properties": {
        "code": {
            "type": "number",
            "example": 0
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "id"
            ],
            "properties": {
                "id": {
                    "type": "string",
                    "example": "87ffce7c-da28-49cf-9134-8db9fd87ccd1"
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Manage_Devices_Topology_Response : JSONSchema4  = {
    "type": "object",
    "required": [
        "code",
        "data",
        "message"
    ],
    "properties": {
        "code": {
            "type": "number",
            "example": 0
        },
        "message": {
            "type": "string",
            "example": "success"
        },
        "data": {
            "type": "object",
            "required": [
                "list"
            ],
            "properties": {
                "list": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "hosts",
                            "parents"
                        ],
                        "properties": {
                            "hosts": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "device_callsign",
                                        "online_status",
                                        "sn",
                                        "user_callsign",
                                        "user_id"
                                    ],
                                    "properties": {
                                        "device_callsign": {
                                            "type": "string"
                                        },
                                        "device_model": {
                                            "type": "object",
                                            "required": [
                                                "key",
                                                "domain",
                                                "type",
                                                "sub_type"
                                            ],
                                            "properties": {
                                                "key": {
                                                    "type": "string"
                                                },
                                                "domain": {
                                                    "type": "string"
                                                },
                                                "type": {
                                                    "type": "string"
                                                },
                                                "sub_type": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "icon_urls": {
                                            "type": "object",
                                            "description": "custom icon",
                                            "required": [
                                                "normal_icon_url",
                                                "selected_icon_url"
                                            ],
                                            "properties": {
                                                "normal_icon_url": {
                                                    "type": "string"
                                                },
                                                "selected_icon_url": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "online_status": {
                                            "type": "boolean"
                                        },
                                        "sn": {
                                            "type": "string"
                                        },
                                        "user_callsign": {
                                            "type": "string"
                                        },
                                        "user_id": {
                                            "type": "string"
                                        }
                                    }
                                }
                            },
                            "parents": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "device_callsign",
                                        "online_status",
                                        "sn",
                                        "user_callsign",
                                        "user_id"
                                    ],
                                    "properties": {
                                        "device_callsign": {
                                            "type": "string"
                                        },
                                        "device_model": {
                                            "type": "object",
                                            "required": [
                                                "key",
                                                "domain",
                                                "type",
                                                "sub_type"
                                            ],
                                            "properties": {
                                                "key": {
                                                    "type": "string"
                                                },
                                                "domain": {
                                                    "type": "string"
                                                },
                                                "type": {
                                                    "type": "string"
                                                },
                                                "sub_type": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "icon_urls": {
                                            "type": "object",
                                            "description": "custom icon",
                                            "required": [
                                                "normal_icon_url",
                                                "selected_icon_url"
                                            ],
                                            "properties": {
                                                "normal_icon_url": {
                                                    "type": "string"
                                                },
                                                "selected_icon_url": {
                                                    "type": "string"
                                                }
                                            }
                                        },
                                        "online_status": {
                                            "type": "boolean"
                                        },
                                        "sn": {
                                            "type": "string"
                                        },
                                        "user_callsign": {
                                            "type": "string"
                                        },
                                        "user_id": {
                                            "type": "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export const ApiSchema_Dji_Pilot_2_Api_Manage_Devices_Topology_Device : JSONSchema4  = {
    "type": "object",
    "required": [
        "device_callsign",
        "online_status",
        "sn",
        "user_callsign",
        "user_id"
    ],
    "properties": {
        "device_callsign": {
            "type": "string"
        },
        "device_model": {
            "type": "object",
            "required": [
                "key",
                "domain",
                "type",
                "sub_type"
            ],
            "properties": {
                "key": {
                    "type": "string"
                },
                "domain": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "sub_type": {
                    "type": "string"
                }
            }
        },
        "icon_urls": {
            "type": "object",
            "description": "custom icon",
            "required": [
                "normal_icon_url",
                "selected_icon_url"
            ],
            "properties": {
                "normal_icon_url": {
                    "type": "string"
                },
                "selected_icon_url": {
                    "type": "string"
                }
            }
        },
        "online_status": {
            "type": "boolean"
        },
        "sn": {
            "type": "string"
        },
        "user_callsign": {
            "type": "string"
        },
        "user_id": {
            "type": "string"
        }
    }
}

export const ApiSchema_Info_Collision_Objects : JSONSchema4  = {
    "type": "array",
    "items": {
        "type": "object",
        "required": [
            "type",
            "id",
            "name",
            "marking"
        ],
        "properties": {
            "type": {
                "type": "integer",
                "description": "0 = power tower, 1 = power pole, 2 = power line large, 3 = power line small or catenary, 4 = aerialway pylon, 5 = aerialway (like chair lift or gondola), 6 = building (e.g. tower)"
            },
            "id": {
                "type": "number",
                "description": "unique identifier for collision objects"
            },
            "name": {
                "type": "string"
            },
            "marking": {
                "anyOf": [
                    {
                        "type": "object",
                        "required": [
                            "type",
                            "longitude",
                            "latitude",
                            "height_above_ground"
                        ],
                        "properties": {
                            "type": {
                                "type": "integer",
                                "description": "0 = point, 1 = line, 2 = area"
                            },
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            },
                            "height_above_ground": {
                                "type": "number",
                                "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                            }
                        }
                    },
                    {
                        "type": "object",
                        "required": [
                            "type",
                            "points"
                        ],
                        "properties": {
                            "type": {
                                "type": "integer",
                                "description": "0 = point, 1 = line, 2 = area"
                            },
                            "points": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "longitude",
                                        "latitude",
                                        "height_above_ground"
                                    ],
                                    "properties": {
                                        "longitude": {
                                            "type": "number"
                                        },
                                        "latitude": {
                                            "type": "number"
                                        },
                                        "height_above_ground": {
                                            "type": "number",
                                            "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "type": "object",
                        "required": [
                            "type",
                            "points"
                        ],
                        "properties": {
                            "type": {
                                "type": "integer",
                                "description": "0 = point, 1 = line, 2 = area"
                            },
                            "points": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "longitude",
                                        "latitude",
                                        "height_above_ground"
                                    ],
                                    "properties": {
                                        "longitude": {
                                            "type": "number"
                                        },
                                        "latitude": {
                                            "type": "number"
                                        },
                                        "height_above_ground": {
                                            "type": "number",
                                            "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
}

export const ApiSchema_Info_Collision_Objects_Marking : JSONSchema4  = {
    "anyOf": [
        {
            "type": "object",
            "required": [
                "type",
                "longitude",
                "latitude",
                "height_above_ground"
            ],
            "properties": {
                "type": {
                    "type": "integer",
                    "description": "0 = point, 1 = line, 2 = area"
                },
                "longitude": {
                    "type": "number"
                },
                "latitude": {
                    "type": "number"
                },
                "height_above_ground": {
                    "type": "number",
                    "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                }
            }
        },
        {
            "type": "object",
            "required": [
                "type",
                "points"
            ],
            "properties": {
                "type": {
                    "type": "integer",
                    "description": "0 = point, 1 = line, 2 = area"
                },
                "points": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude",
                            "height_above_ground"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            },
                            "height_above_ground": {
                                "type": "number",
                                "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                            }
                        }
                    }
                }
            }
        },
        {
            "type": "object",
            "required": [
                "type",
                "points"
            ],
            "properties": {
                "type": {
                    "type": "integer",
                    "description": "0 = point, 1 = line, 2 = area"
                },
                "points": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "longitude",
                            "latitude",
                            "height_above_ground"
                        ],
                        "properties": {
                            "longitude": {
                                "type": "number"
                            },
                            "latitude": {
                                "type": "number"
                            },
                            "height_above_ground": {
                                "type": "number",
                                "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                            }
                        }
                    }
                }
            }
        }
    ]
}

export const ApiSchema_Info_Collision_Objects_Marking_Base : JSONSchema4  = {
    "type": "object",
    "required": [
        "type"
    ],
    "properties": {
        "type": {
            "type": "integer",
            "description": "0 = point, 1 = line, 2 = area"
        }
    }
}

export const ApiSchema_Info_Collision_Objects_Marking_0 : JSONSchema4  = {
    "type": "object",
    "required": [
        "type",
        "longitude",
        "latitude",
        "height_above_ground"
    ],
    "properties": {
        "type": {
            "type": "integer",
            "description": "0 = point, 1 = line, 2 = area"
        },
        "longitude": {
            "type": "number"
        },
        "latitude": {
            "type": "number"
        },
        "height_above_ground": {
            "type": "number",
            "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
        }
    }
}

export const ApiSchema_Info_Collision_Objects_Marking_1 : JSONSchema4  = {
    "type": "object",
    "required": [
        "type",
        "points"
    ],
    "properties": {
        "type": {
            "type": "integer",
            "description": "0 = point, 1 = line, 2 = area"
        },
        "points": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "longitude",
                    "latitude",
                    "height_above_ground"
                ],
                "properties": {
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "height_above_ground": {
                        "type": "number",
                        "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                    }
                }
            }
        }
    }
}

export const ApiSchema_Info_Collision_Objects_Marking_2 : JSONSchema4  = {
    "type": "object",
    "required": [
        "type",
        "points"
    ],
    "properties": {
        "type": {
            "type": "integer",
            "description": "0 = point, 1 = line, 2 = area"
        },
        "points": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "longitude",
                    "latitude",
                    "height_above_ground"
                ],
                "properties": {
                    "longitude": {
                        "type": "number"
                    },
                    "latitude": {
                        "type": "number"
                    },
                    "height_above_ground": {
                        "type": "number",
                        "description": "this is often an estimated value based on the type (e.g. power line large is about 80m)"
                    }
                }
            }
        }
    }
}

