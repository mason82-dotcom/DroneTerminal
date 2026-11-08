/* AUTOMATICALLY GENERATED WITH dji-docs-converter */


export const MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_SCHEMA = {
    type: "object",
    properties: {
        country: {
            type: "string",
            description: "Country area code\n\n READONLY"
        },
        mode_code: {
            type: "integer",
            description: "Aircraft state\n\n READONLY\n\n{\"0\":\"Standby\",\"1\":\"Takeoff preparation\",\"2\":\"Takeoff preparation completed\",\"3\":\"Manual flight\",\"4\":\"Automatic takeoff\",\"5\":\"Wayline flight\",\"6\":\"Panoramic photography\",\"7\":\"Intelligent tracking\",\"8\":\"ADS-B avoidance\",\"9\":\"Auto returning to home\",\"10\":\"Automatic landing\",\"11\":\"Forced landing\",\"12\":\"Three-blade landing\",\"13\":\"Upgrading\",\"14\":\"Not connected\",\"15\":\"APAS\",\"16\":\"Virtual stick state\",\"17\":\"Live flight Controls\",\"18\":\"Airborne RTK fixing mode\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18
            ]
        },
        mode_code_reason: {
            type: "integer",
            description: "The reason the aircraft entered the current state\n\n READONLY\n\n{\"0\":\"No meaning\",\"1\":\"Insufficient battery power (return, landing)\",\"2\":\"Insufficient battery voltage (return, landing)\",\"3\":\"Severely low voltage (return, landing)\",\"4\":\"Requested by remote controller buttons (takeoff, return, landing)\",\"5\":\"Requested by App (takeoff, return, landing)\",\"6\":\"Loss of remote controller signal (return, landing, hover)\",\"7\":\"Triggered by external devices such as navigation, SDK, etc. (takeoff, return, landing)\",\"8\":\"Entered the dock GEO Zone (landing)\",\"9\":\"Although a return was triggered, it was too close to the Home point (landing)\",\"10\":\"Although a return was triggered, it was too far from the Home point (landing)\",\"11\":\"Requested when executing waypoint missions (takeoff)\",\"12\":\"Requested after reaching above the Home point in the return phase (landing)\",\"13\":\"Continued descent after the aircraft's height dropped to 0.7m from the ground (second-stage descent limit) leading to (landing)\",\"14\":\"Forced breakthrough of low altitude protection by devices like App, SDK (landing)\",\"15\":\"Requested due to passing flights in the vicinity (returning, landing)\",\"16\":\"Requested due to height control failure (return, landing)\",\"17\":\"Entered after intelligent low battery return (landing)\",\"18\":\"AP controls the flight mode (manual flight)\",\"19\":\"Hardware abnormally (return, landing)\",\"20\":\"End of anti-collision protection (landing)\",\"21\":\"Return canceled (hover)\",\"22\":\"Encountered obstacles during the return (landing)\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22
            ]
        },
        cameras: {
            type: "array",
            description: "Aircraft camera information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    remain_photo_num: {
                        type: "integer",
                        description: "Remaining number of photos to take\n\nRemaining number of photos to take"
                    },
                    remain_record_duration: {
                        type: "integer",
                        description: "Remaining recording time\n\nRemaining recording time\n\nSeconds / s"
                    },
                    record_time: {
                        type: "integer",
                        description: "Video recording duration\n\nVideo recording duration\n\nSeconds / s"
                    },
                    payload_index: {
                        type: "string",
                        description: "Payload index\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
                    },
                    camera_mode: {
                        type: "integer",
                        description: "Camera mode\n\nCamera mode\n\n{\"0\":\"Capturing\",\"1\":\"Recording\",\"2\":\"Smart Low-Light\",\"3\":\"Panoramic photography\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    photo_state: {
                        type: "integer",
                        description: "Photo capturing status\n\n\n\n{\"0\":\"Idle\",\"1\":\"Capturing photo\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    screen_split_enable: {
                        type: "boolean",
                        description: "Is split screen enabled\n\n"
                    },
                    recording_state: {
                        type: "integer",
                        description: "Recording state\n\nRecording state\n\n{\"0\":\"Idle\",\"1\":\"Recording\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    zoom_factor: {
                        type: "number",
                        description: "Zoom factor\n\n\n\nnull"
                    },
                    ir_zoom_factor: {
                        type: "number",
                        description: "Infrared zoom factor\n\nInfrared zoom factor\n\nnull"
                    },
                    liveview_world_region: {
                        type: "object",
                        description: "Field of view (FOV) region in liveview\n\nThe field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.",
                        properties: {
                            left: {
                                type: "number",
                                description: "X-axis starting point in the top-left corner\n\nX-axis starting point in the top-left corner READONLY"
                            },
                            top: {
                                type: "number",
                                description: "Top-left corner's starting point on the y-axis\n\nTop-left corner's starting point on the y-axis READONLY"
                            },
                            right: {
                                type: "number",
                                description: "Starting point of the x-axis in the bottom right corner\n\nStarting point of the x-axis in the bottom right corner READONLY"
                            },
                            bottom: {
                                type: "number",
                                description: "Y-axis starting point in the lower right corner\n\nY-axis starting point in the lower right corner READONLY"
                            }
                        }
                    },
                    photo_storage_settings: {
                        type: "array",
                        description: "Photo storage settings collection\n\nValue range {current, wide, zoom, ir}"
                    },
                    video_storage_settings: {
                        type: "array",
                        description: "Collection of video storage settings\n\nValue range {current, wide, zoom, ir}"
                    },
                    wide_exposure_mode: {
                        type: "integer",
                        description: "Wide-angle lens exposure mode\n\nCurrent configuration of wide-angle lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    wide_iso: {
                        type: "integer",
                        description: "Wide-angle lens ISO\n\nCurrent configuration of wide-angle lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto(High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            255
                        ]
                    },
                    wide_shutter_speed: {
                        type: "integer",
                        description: "Wide-angle lens shutter speed\n\nCurrent configuration of wide-angle lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            32,
                            33,
                            34,
                            35,
                            36,
                            37,
                            38,
                            39,
                            40,
                            41,
                            42,
                            43,
                            44,
                            45,
                            46,
                            47,
                            48,
                            49,
                            50,
                            51,
                            52,
                            53,
                            54,
                            55,
                            56,
                            57,
                            58,
                            59,
                            65534
                        ]
                    },
                    wide_exposure_value: {
                        type: "integer",
                        description: "Wide-angle lens exposure value\n\nCurrent configuration of wide-angle lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            255
                        ]
                    },
                    zoom_exposure_mode: {
                        type: "integer",
                        description: "Zoom lens exposure mode\n\nCurrent configuration of zoom lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    zoom_iso: {
                        type: "integer",
                        description: "Zoom lens ISO\n\nCurrent configuration of zoom lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto(High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            255
                        ]
                    },
                    zoom_shutter_speed: {
                        type: "integer",
                        description: "Zoom lens shutter speed\n\nCurrent configuration of zoom lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            32,
                            33,
                            34,
                            35,
                            36,
                            37,
                            38,
                            39,
                            40,
                            41,
                            42,
                            43,
                            44,
                            45,
                            46,
                            47,
                            48,
                            49,
                            50,
                            51,
                            52,
                            53,
                            54,
                            55,
                            56,
                            57,
                            58,
                            59,
                            65534
                        ]
                    },
                    zoom_exposure_value: {
                        type: "integer",
                        description: "Zoom lens exposure value\n\nCurrent configuration of zoom lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            255
                        ]
                    },
                    zoom_focus_mode: {
                        type: "integer",
                        description: "Zoom lens focus mode\n\n\n\n{\"0\":\"MF\",\"1\":\"AFS\",\"2\":\"AFC\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    zoom_focus_value: {
                        type: "integer",
                        description: "Zoom lens focus value\n\n"
                    },
                    zoom_max_focus_value: {
                        type: "integer",
                        description: "Zoom lens maximum focus value\n\n"
                    },
                    zoom_min_focus_value: {
                        type: "integer",
                        description: "Zoom lens minimum focus value\n\n"
                    },
                    zoom_calibrate_farthest_focus_value: {
                        type: "integer",
                        description: "Zoom lens calibrated farthest focus value\n\nFarthest position with the clearest focus"
                    },
                    zoom_calibrate_nearest_focus_value: {
                        type: "integer",
                        description: "Zoom lens calibrated nearest focus value\n\nNearest position with the clearest focus"
                    },
                    zoom_focus_state: {
                        type: "integer",
                        description: "Zoom lens focus state\n\n\n\n{\"0\":\"Idle\",\"1\":\"Focusing\",\"2\":\"Focus successful\",\"3\":\"Focus failed\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    ir_metering_mode: {
                        type: "integer",
                        description: "Infrared metering mode\n\n\n\n{\"0\":\"Temperature measurement off\",\"1\":\"Spot temperature measurement\",\"2\":\"Area temperature measurement\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    ir_metering_point: {
                        type: "object",
                        description: "Infrared metering point\n\nInformation related to the infrared metering point",
                        properties: {
                            x: {
                                type: "number",
                                description: "Metering point coordinate x\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                            },
                            y: {
                                type: "number",
                                description: "Metering point coordinate y\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                            },
                            temperature: {
                                type: "number",
                                description: "Temperature of the metering point\n\n READONLY"
                            }
                        }
                    },
                    ir_metering_area: {
                        type: "object",
                        description: "Infrared metering area\n\nInformation related to the infrared metering area",
                        properties: {
                            x: {
                                type: "number",
                                description: "Top-left corner coordinate x of the metering area\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                            },
                            y: {
                                type: "number",
                                description: "Top-left corner coordinate y of the metering area\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                            },
                            width: {
                                type: "number",
                                description: "Width of the metering area\n\nWidth of the metering area READONLY"
                            },
                            height: {
                                type: "number",
                                description: "Height of the metering area\n\nHeight of the metering area READONLY"
                            },
                            aver_temperature: {
                                type: "number",
                                description: "Average temperature of the metering area\n\nAverage temperature of the metering area READONLY"
                            },
                            min_temperature_point: {
                                type: "object",
                                description: "Lowest temperature point in the metering area\n\nInformation related to the lowest temperature point in the metering area READONLY",
                                properties: {
                                    x: {
                                        type: "number",
                                        description: "Coordinate x of the lowest temperature point\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                                    },
                                    y: {
                                        type: "number",
                                        description: "Coordinate y of the lowest temperature point\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                                    },
                                    temperature: {
                                        type: "number",
                                        description: "Temperature of the lowest temperature point\n\nTemperature of the lowest temperature point READONLY"
                                    }
                                }
                            },
                            max_temperature_point: {
                                type: "object",
                                description: "Highest temperature point in the metering area\n\nInformation related to the highest temperature point in the metering area READONLY",
                                properties: {
                                    x: {
                                        type: "number",
                                        description: "Coordinate x of the highest temperature point\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                                    },
                                    y: {
                                        type: "number",
                                        description: "Coordinate y of the highest temperature point\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                                    },
                                    temperature: {
                                        type: "number",
                                        description: "Temperature of the highest temperature point\n\nTemperature of the highest temperature point READONLY"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        dongle_infos: {
            type: "array",
            description: "4G Dongle information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    imei: {
                        type: "string",
                        description: "dongle imei\n\nUnique identifier for the Dongle READONLY"
                    },
                    dongle_type: {
                        type: "integer",
                        description: "Dongle type\n\nDongle type READONLY\n\n{\"6\":\"Old Dongle\",\"10\":\"New Dongle with eSIM support\"}",
                        enum: [
                            6,
                            10
                        ]
                    },
                    eid: {
                        type: "string",
                        description: "dongle eid\n\nUnique identifier for eSIM, used for public account query of plans and service purchase READONLY"
                    },
                    esim_activate_state: {
                        type: "integer",
                        description: "eSIM activation state\n\nRequires activation to use READONLY\n\n{\"0\":\"Not activated\",\"1\":\"Activated\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_card_state: {
                        type: "integer",
                        description: "SIM card state\n\nInsertion state of the physical SIM card in the dongle READONLY\n\n{\"0\":\"Not inserted\",\"1\":\"Inserted\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_slot: {
                        type: "integer",
                        description: "SIM card slot enable state\n\nIdentifies the SIM card slot currently in use by the dongle READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Physical SIM card\",\"2\":\"eSIM\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    esim_infos: {
                        type: "array",
                        description: "eSIM information\n\n READONLY",
                        items: {
                            type: "object",
                            properties: {
                                telecom_operator: {
                                    type: "integer",
                                    description: "Supported operators\n\nTelecom operators supported by eSIM READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                    enum: [
                                        0,
                                        1,
                                        2,
                                        3
                                    ]
                                },
                                enabled: {
                                    type: "boolean",
                                    description: "eSIM enable state\n\nOnly one eSIM can be enabled at a time READONLY"
                                },
                                iccid: {
                                    type: "string",
                                    description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                                }
                            }
                        }
                    },
                    sim_info: {
                        type: "object",
                        description: "SIM card information\n\nInformation about the physical SIM card that can be inserted into the dongle READONLY",
                        properties: {
                            telecom_operator: {
                                type: "integer",
                                description: "Supported operators\n\nTelecom operator supported by the SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                enum: [
                                    0,
                                    1,
                                    2,
                                    3
                                ]
                            },
                            sim_type: {
                                type: "integer",
                                description: "SIM card type\n\nType of physical SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Other regular SIM card\",\"2\":\"Three-network card\"}",
                                enum: [
                                    0,
                                    1,
                                    2
                                ]
                            },
                            iccid: {
                                type: "string",
                                description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                            }
                        }
                    }
                }
            }
        },
        obstacle_avoidance: {
            type: "object",
            description: "Aircraft obstacle sensing state\n\n READ AND WRITEABLE",
            properties: {
                horizon: {
                    type: "integer",
                    description: "Horizontal obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                upside: {
                    type: "integer",
                    description: "Upward obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                downside: {
                    type: "integer",
                    description: "Downward obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                }
            }
        },
        is_near_area_limit: {
            type: "integer",
            description: "Whether approaching the GEO Zone\n\n READONLY\n\n{\"0\":\"Not reaching the GEO Zone\",\"1\":\"Approaching the GEO Zone\"}",
            enum: [
                0,
                1
            ]
        },
        is_near_height_limit: {
            type: "integer",
            description: "Whether approaching the set height limit\n\n READONLY\n\n{\"0\":\"Not reaching the set height limit\",\"1\":\"Approaching the set height limit\"}",
            enum: [
                0,
                1
            ]
        },
        height_limit: {
            type: "integer",
            description: "Aircraft height limit\n\n READ AND WRITEABLE\n\nMeters / m"
        },
        night_lights_state: {
            type: "integer",
            description: "Aircraft night lights state\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"On\"}",
            enum: [
                0,
                1
            ]
        },
        activation_time: {
            type: "integer",
            description: "Aircraft activation time (Unix timestamp)\n\n READONLY\n\nSeconds / s"
        },
        maintain_status: {
            type: "object",
            description: "Maintenance information\n\n READONLY",
            properties: {
                maintain_status_array: {
                    type: "array",
                    description: "Maintenance information array\n\n",
                    items: {
                        type: "object",
                        properties: {
                            state: {
                                type: "integer",
                                description: "Maintenance state\n\n\n\n{\"0\":\"No maintenance\",\"1\":\"With maintenance\"}",
                                enum: [
                                    0,
                                    1
                                ]
                            },
                            last_maintain_type: {
                                type: "integer",
                                description: "Last maintenance type\n\n\n\n{\"1\":\"Basic maintenance of the aircraft\",\"2\":\"Regular maintenance of the aircraft\",\"3\":\"Deep maintenance of the aircraft\"}",
                                enum: [
                                    1,
                                    2,
                                    3
                                ]
                            },
                            last_maintain_flight_time: {
                                type: "integer",
                                description: "Last maintenance flight hours\n\n\n\nHours / h"
                            },
                            last_maintain_flight_sorties: {
                                type: "integer",
                                description: "Last maintenance flight sorties\n\n"
                            }
                        }
                    }
                }
            }
        },
        total_flight_sorties: {
            type: "integer",
            description: "Accumulated total sorties of the aircraft\n\n READONLY"
        },
        track_id: {
            type: "string",
            description: "Track ID\n\n READONLY"
        },
        position_state: {
            type: "object",
            description: "Satellite search state\n\n READONLY",
            properties: {
                is_fixed: {
                    type: "integer",
                    description: "Whether is Fixed\n\n\n\n{\"0\":\"Not started\",\"1\":\"Fixing\",\"2\":\"Fixing successful\",\"3\":\"Fixing failed\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                quality: {
                    type: "integer",
                    description: "Satellite acquisition mode\n\n\n\n{\"1\":\"Gear 1\",\"2\":\"Gear 2\",\"3\":\"Gear 3\",\"4\":\"Gear 4\",\"5\":\"Gear 5\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ]
                },
                gps_number: {
                    type: "integer",
                    description: "Number of GPS satellites\n\n"
                },
                rtk_number: {
                    type: "integer",
                    description: "Number of RTK satellite acquisitions\n\n"
                }
            }
        },
        storage: {
            type: "object",
            description: "Storage capacity\n\nkb READONLY",
            properties: {
                total: {
                    type: "integer",
                    description: "Total capacity\n\n\n\nKilobytes / KB"
                },
                used: {
                    type: "integer",
                    description: "Used capacity\n\n\n\nKilobytes / KB"
                }
            }
        },
        battery: {
            type: "object",
            description: "Aircraft battery information\n\n READONLY",
            properties: {
                capacity_percent: {
                    type: "integer",
                    description: "Total remaining battery capacity\n\n"
                },
                remain_flight_time: {
                    type: "integer",
                    description: "Remaining flight time\n\n\n\nSeconds / s"
                },
                return_home_power: {
                    type: "integer",
                    description: "Percentage of power required for return home\n\n"
                },
                landing_power: {
                    type: "integer",
                    description: "Forced landing battery percentage\n\n"
                },
                batteries: {
                    type: "array",
                    description: "Battery details\n\n",
                    items: {
                        type: "object",
                        properties: {
                            capacity_percent: {
                                type: "integer",
                                description: "Remaining battery capacity\n\n"
                            },
                            index: {
                                type: "integer",
                                description: "Battery serial number\n\n"
                            },
                            sn: {
                                type: "string",
                                description: "Battery serial number (SN)\n\n"
                            },
                            type: {
                                type: "integer",
                                description: "Battery type\n\n\n\n{}",
                                enum: [
                                    -1
                                ]
                            },
                            sub_type: {
                                type: "integer",
                                description: "Battery subtype\n\n\n\n{}",
                                enum: [
                                    -1
                                ]
                            },
                            firmware_version: {
                                type: "string",
                                description: "Firmware version\n\n"
                            },
                            loop_times: {
                                type: "integer",
                                description: "Battery cycle count\n\n"
                            },
                            voltage: {
                                type: "integer",
                                description: "Voltage\n\n\n\nMillivolts / mV"
                            },
                            temperature: {
                                type: "number",
                                description: "Temperature\n\nRetain one decimal place\n\nCelsius / °C"
                            },
                            high_voltage_storage_days: {
                                type: "integer",
                                description: "High voltage storage days\n\n\n\nDays / day"
                            }
                        }
                    }
                }
            }
        },
        total_flight_distance: {
            type: "number",
            description: "Accumulated total mileage of the aircraft\n\n READONLY\n\nMeters / m"
        },
        total_flight_time: {
            type: "integer",
            description: "Accumulated total flight time of the aircraft\n\n READONLY\n\nSeconds / s"
        },
        serious_low_battery_warning_threshold: {
            type: "integer",
            description: "Critical low battery warning\n\nUser-set battery critically low warning percentage READONLY"
        },
        low_battery_warning_threshold: {
            type: "integer",
            description: "Low battery warning\n\nUser-set battery low battery warning percentage READONLY"
        },
        control_source: {
            type: "string",
            description: "Current control source\n\nCan be a device or a browser. Devices use A/B to represent A control and B control, while browsers use a self-generated UUID as an identifier. READONLY"
        },
        wind_direction: {
            type: "integer",
            description: "Current wind direction\n\n READONLY\n\n{\"1\":\"True North\",\"2\":\"Northeast\",\"3\":\"East\",\"4\":\"Southeast\",\"5\":\"South\",\"6\":\"Southwest\",\"7\":\"West\",\"8\":\"Northwest\"}",
            enum: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ]
        },
        wind_speed: {
            type: "number",
            description: "Wind speed\n\nEstimated wind speed, calculated based on the aircraft's attitude with some margin of error. It is for reference only and should not be used as meteorological data. READONLY"
        },
        home_distance: {
            type: "number",
            description: "Distance from the Home point\n\n READONLY"
        },
        home_latitude: {
            type: "number",
            description: "Home point latitude\n\n READONLY"
        },
        home_longitude: {
            type: "number",
            description: "Home point longitude\n\n READONLY"
        },
        attitude_head: {
            type: "integer",
            description: "Yaw axis angle\n\nYaw axis angle with true north angle (longitude). Positive values from 0 to 6 o'clock direction, negative values from 6 to 12 o'clock direction. READONLY"
        },
        attitude_roll: {
            type: "number",
            description: "Roll axis angle\n\n READONLY"
        },
        attitude_pitch: {
            type: "number",
            description: "Pitch axis angle\n\n READONLY"
        },
        elevation: {
            type: "number",
            description: "Relative takeoff point altitude\n\n READONLY"
        },
        height: {
            type: "number",
            description: "Absolute height\n\nRelative to the Earth ellipsoid height. Calculation is height relative to takeoff point + ellipsoid height of takeoff point READONLY"
        },
        latitude: {
            type: "number",
            description: "Current latitude\n\n READONLY"
        },
        longitude: {
            type: "number",
            description: "Longitude of the current position\n\n READONLY"
        },
        vertical_speed: {
            type: "number",
            description: "Vertical speed\n\n READONLY\n\nMeters per second / m/s"
        },
        horizontal_speed: {
            type: "number",
            description: "Horizontal speed\n\n READONLY"
        },
        firmware_upgrade_status: {
            type: "integer",
            description: "Firmware upgrade state\n\n READONLY\n\n{\"0\":\"Not upgraded\",\"1\":\"Upgrading\"}",
            enum: [
                0,
                1
            ]
        },
        compatible_status: {
            type: "integer",
            description: "Firmware consistency\n\nConsistent firmware update means a consistent firmware update is required when the firmware versions of some modules of the aircraft are inconsistent with the compatible version of the system. For example, the aircraft and RC have been updated to newest version, but the used batteries is not updated. Then the Consistent firmware update will be prompted. Normal firmware update means developers update all modules of aircraft to selected firmware version. READONLY\n\n{\"0\":\"No consistency upgrade required\",\"1\":\"Consistency upgrade required\"}",
            enum: [
                0,
                1
            ]
        },
        firmware_version: {
            type: "string",
            description: "Firmware version\n\n READONLY"
        },
        gear: {
            type: "integer",
            description: "Gear\n\n READONLY\n\n{\"0\":\"A\",\"1\":\"P\",\"2\":\"NAV\",\"3\":\"FPV\",\"4\":\"FARM\",\"5\":\"S\",\"6\":\"F\",\"7\":\"M\",\"8\":\"G\",\"9\":\"T\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ]
        },
        camera_watermark_settings: {
            type: "object",
            description: "Camera watermark settings\n\nUser configuration for watermarks on photos and video files taken by the camera. Currently, live stream watermarks are not supported. READ AND WRITEABLE",
            properties: {
                global_enable: {
                    type: "integer",
                    description: "Watermark display global enable switch\n\nWatermark display requires global enable switch READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                drone_type_enable: {
                    type: "integer",
                    description: "Aircraft model display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                drone_sn_enable: {
                    type: "integer",
                    description: "Aircraft serial number display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                datetime_enable: {
                    type: "integer",
                    description: "Date and time display switch\n\nTime zone defaults to local time zone READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                gps_enable: {
                    type: "integer",
                    description: "Latitude, longitude and altitude display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                user_custom_string_enable: {
                    type: "integer",
                    description: "Custom text display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                user_custom_string: {
                    type: "string",
                    description: "Custom text content\n\nUp to 250 bytes can be displayed READ AND WRITEABLE"
                },
                layout: {
                    type: "integer",
                    description: "Position of the watermark in the frame\n\n READ AND WRITEABLE\n\n{\"0\":\"Top-left\",\"1\":\"Bottom-left\",\"2\":\"Top-right\",\"3\":\"Bottom-right\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            }
        }
    }
}

export interface MqttMavic3EnterpriseProperties_STABLE_FREQUENCY_TYPE {
    /**
     * Country area code
     *
     *  READONLY
     */
    country?: string;
    /**
     * Aircraft state
     *
     *  READONLY
     *
     * {"0":"Standby","1":"Takeoff preparation","2":"Takeoff preparation completed","3":"Manual flight","4":"Automatic takeoff","5":"Wayline flight","6":"Panoramic photography","7":"Intelligent tracking","8":"ADS-B avoidance","9":"Auto returning to home","10":"Automatic landing","11":"Forced landing","12":"Three-blade landing","13":"Upgrading","14":"Not connected","15":"APAS","16":"Virtual stick state","17":"Live flight Controls","18":"Airborne RTK fixing mode"}
     */
    mode_code?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
    /**
     * The reason the aircraft entered the current state
     *
     *  READONLY
     *
     * {"0":"No meaning","1":"Insufficient battery power (return, landing)","2":"Insufficient battery voltage (return, landing)","3":"Severely low voltage (return, landing)","4":"Requested by remote controller buttons (takeoff, return, landing)","5":"Requested by App (takeoff, return, landing)","6":"Loss of remote controller signal (return, landing, hover)","7":"Triggered by external devices such as navigation, SDK, etc. (takeoff, return, landing)","8":"Entered the dock GEO Zone (landing)","9":"Although a return was triggered, it was too close to the Home point (landing)","10":"Although a return was triggered, it was too far from the Home point (landing)","11":"Requested when executing waypoint missions (takeoff)","12":"Requested after reaching above the Home point in the return phase (landing)","13":"Continued descent after the aircraft's height dropped to 0.7m from the ground (second-stage descent limit) leading to (landing)","14":"Forced breakthrough of low altitude protection by devices like App, SDK (landing)","15":"Requested due to passing flights in the vicinity (returning, landing)","16":"Requested due to height control failure (return, landing)","17":"Entered after intelligent low battery return (landing)","18":"AP controls the flight mode (manual flight)","19":"Hardware abnormally (return, landing)","20":"End of anti-collision protection (landing)","21":"Return canceled (hover)","22":"Encountered obstacles during the return (landing)"}
     */
    mode_code_reason?:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22;
    /**
     * Aircraft camera information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    cameras?: {
        /**
         * Remaining number of photos to take
         *
         * Remaining number of photos to take
         */
        remain_photo_num?: number;
        /**
         * Remaining recording time
         *
         * Remaining recording time
         *
         * Seconds / s
         */
        remain_record_duration?: number;
        /**
         * Video recording duration
         *
         * Video recording duration
         *
         * Seconds / s
         */
        record_time?: number;
        /**
         * Payload index
         *
         * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
         */
        payload_index?: string;
        /**
         * Camera mode
         *
         * Camera mode
         *
         * {"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panoramic photography"}
         */
        camera_mode?: 0 | 1 | 2 | 3;
        /**
         * Photo capturing status
         *
         *
         *
         * {"0":"Idle","1":"Capturing photo"}
         */
        photo_state?: 0 | 1;
        /**
         * Is split screen enabled
         *
         *
         */
        screen_split_enable?: boolean;
        /**
         * Recording state
         *
         * Recording state
         *
         * {"0":"Idle","1":"Recording"}
         */
        recording_state?: 0 | 1;
        /**
         * Zoom factor
         *
         *
         *
         * null
         */
        zoom_factor?: number;
        /**
         * Infrared zoom factor
         *
         * Infrared zoom factor
         *
         * null
         */
        ir_zoom_factor?: number;
        /**
         * Field of view (FOV) region in liveview
         *
         * The field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.
         */
        liveview_world_region?: {
            /**
             * X-axis starting point in the top-left corner
             *
             * X-axis starting point in the top-left corner READONLY
             */
            left?: number;
            /**
             * Top-left corner's starting point on the y-axis
             *
             * Top-left corner's starting point on the y-axis READONLY
             */
            top?: number;
            /**
             * Starting point of the x-axis in the bottom right corner
             *
             * Starting point of the x-axis in the bottom right corner READONLY
             */
            right?: number;
            /**
             * Y-axis starting point in the lower right corner
             *
             * Y-axis starting point in the lower right corner READONLY
             */
            bottom?: number;
            [k: string]: unknown;
        };
        /**
         * Photo storage settings collection
         *
         * Value range {current, wide, zoom, ir}
         *
         * @minItems undefined
         * @maxItems undefined
         */
        photo_storage_settings?: unknown[];
        /**
         * Collection of video storage settings
         *
         * Value range {current, wide, zoom, ir}
         *
         * @minItems undefined
         * @maxItems undefined
         */
        video_storage_settings?: unknown[];
        /**
         * Wide-angle lens exposure mode
         *
         * Current configuration of wide-angle lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        wide_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Wide-angle lens ISO
         *
         * Current configuration of wide-angle lens ISO
         *
         * {"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        wide_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Wide-angle lens shutter speed
         *
         * Current configuration of wide-angle lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        wide_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Wide-angle lens exposure value
         *
         * Current configuration of wide-angle lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        wide_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Zoom lens exposure mode
         *
         * Current configuration of zoom lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        zoom_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Zoom lens ISO
         *
         * Current configuration of zoom lens ISO
         *
         * {"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        zoom_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Zoom lens shutter speed
         *
         * Current configuration of zoom lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        zoom_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Zoom lens exposure value
         *
         * Current configuration of zoom lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        zoom_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Zoom lens focus mode
         *
         *
         *
         * {"0":"MF","1":"AFS","2":"AFC"}
         */
        zoom_focus_mode?: 0 | 1 | 2;
        /**
         * Zoom lens focus value
         *
         *
         */
        zoom_focus_value?: number;
        /**
         * Zoom lens maximum focus value
         *
         *
         */
        zoom_max_focus_value?: number;
        /**
         * Zoom lens minimum focus value
         *
         *
         */
        zoom_min_focus_value?: number;
        /**
         * Zoom lens calibrated farthest focus value
         *
         * Farthest position with the clearest focus
         */
        zoom_calibrate_farthest_focus_value?: number;
        /**
         * Zoom lens calibrated nearest focus value
         *
         * Nearest position with the clearest focus
         */
        zoom_calibrate_nearest_focus_value?: number;
        /**
         * Zoom lens focus state
         *
         *
         *
         * {"0":"Idle","1":"Focusing","2":"Focus successful","3":"Focus failed"}
         */
        zoom_focus_state?: 0 | 1 | 2 | 3;
        /**
         * Infrared metering mode
         *
         *
         *
         * {"0":"Temperature measurement off","1":"Spot temperature measurement","2":"Area temperature measurement"}
         */
        ir_metering_mode?: 0 | 1 | 2;
        /**
         * Infrared metering point
         *
         * Information related to the infrared metering point
         */
        ir_metering_point?: {
            /**
             * Metering point coordinate x
             *
             * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
             */
            x?: number;
            /**
             * Metering point coordinate y
             *
             * The vertical coordinate y with the top left corner of the lens as the origin READONLY
             */
            y?: number;
            /**
             * Temperature of the metering point
             *
             *  READONLY
             */
            temperature?: number;
            [k: string]: unknown;
        };
        /**
         * Infrared metering area
         *
         * Information related to the infrared metering area
         */
        ir_metering_area?: {
            /**
             * Top-left corner coordinate x of the metering area
             *
             * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
             */
            x?: number;
            /**
             * Top-left corner coordinate y of the metering area
             *
             * The vertical coordinate y with the top left corner of the lens as the origin READONLY
             */
            y?: number;
            /**
             * Width of the metering area
             *
             * Width of the metering area READONLY
             */
            width?: number;
            /**
             * Height of the metering area
             *
             * Height of the metering area READONLY
             */
            height?: number;
            /**
             * Average temperature of the metering area
             *
             * Average temperature of the metering area READONLY
             */
            aver_temperature?: number;
            /**
             * Lowest temperature point in the metering area
             *
             * Information related to the lowest temperature point in the metering area READONLY
             */
            min_temperature_point?: {
                /**
                 * Coordinate x of the lowest temperature point
                 *
                 * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
                 */
                x?: number;
                /**
                 * Coordinate y of the lowest temperature point
                 *
                 * The vertical coordinate y with the top left corner of the lens as the origin READONLY
                 */
                y?: number;
                /**
                 * Temperature of the lowest temperature point
                 *
                 * Temperature of the lowest temperature point READONLY
                 */
                temperature?: number;
                [k: string]: unknown;
            };
            /**
             * Highest temperature point in the metering area
             *
             * Information related to the highest temperature point in the metering area READONLY
             */
            max_temperature_point?: {
                /**
                 * Coordinate x of the highest temperature point
                 *
                 * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
                 */
                x?: number;
                /**
                 * Coordinate y of the highest temperature point
                 *
                 * The vertical coordinate y with the top left corner of the lens as the origin READONLY
                 */
                y?: number;
                /**
                 * Temperature of the highest temperature point
                 *
                 * Temperature of the highest temperature point READONLY
                 */
                temperature?: number;
                [k: string]: unknown;
            };
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * 4G Dongle information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    dongle_infos?: {
        /**
         * dongle imei
         *
         * Unique identifier for the Dongle READONLY
         */
        imei?: string;
        /**
         * Dongle type
         *
         * Dongle type READONLY
         *
         * {"6":"Old Dongle","10":"New Dongle with eSIM support"}
         */
        dongle_type?: 6 | 10;
        /**
         * dongle eid
         *
         * Unique identifier for eSIM, used for public account query of plans and service purchase READONLY
         */
        eid?: string;
        /**
         * eSIM activation state
         *
         * Requires activation to use READONLY
         *
         * {"0":"Not activated","1":"Activated"}
         */
        esim_activate_state?: 0 | 1;
        /**
         * SIM card state
         *
         * Insertion state of the physical SIM card in the dongle READONLY
         *
         * {"0":"Not inserted","1":"Inserted"}
         */
        sim_card_state?: 0 | 1;
        /**
         * SIM card slot enable state
         *
         * Identifies the SIM card slot currently in use by the dongle READONLY
         *
         * {"0":"Unknown","1":"Physical SIM card","2":"eSIM"}
         */
        sim_slot?: 0 | 1 | 2;
        /**
         * eSIM information
         *
         *  READONLY
         *
         * @minItems undefined
         * @maxItems undefined
         */
        esim_infos?: {
            /**
             * Supported operators
             *
             * Telecom operators supported by eSIM READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * eSIM enable state
             *
             * Only one eSIM can be enabled at a time READONLY
             */
            enabled?: boolean;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        }[];
        /**
         * SIM card information
         *
         * Information about the physical SIM card that can be inserted into the dongle READONLY
         */
        sim_info?: {
            /**
             * Supported operators
             *
             * Telecom operator supported by the SIM card READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * SIM card type
             *
             * Type of physical SIM card READONLY
             *
             * {"0":"Unknown","1":"Other regular SIM card","2":"Three-network card"}
             */
            sim_type?: 0 | 1 | 2;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * Aircraft obstacle sensing state
     *
     *  READ AND WRITEABLE
     */
    obstacle_avoidance?: {
        /**
         * Horizontal obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        horizon?: 0 | 1;
        /**
         * Upward obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        upside?: 0 | 1;
        /**
         * Downward obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        downside?: 0 | 1;
        [k: string]: unknown;
    };
    /**
     * Whether approaching the GEO Zone
     *
     *  READONLY
     *
     * {"0":"Not reaching the GEO Zone","1":"Approaching the GEO Zone"}
     */
    is_near_area_limit?: 0 | 1;
    /**
     * Whether approaching the set height limit
     *
     *  READONLY
     *
     * {"0":"Not reaching the set height limit","1":"Approaching the set height limit"}
     */
    is_near_height_limit?: 0 | 1;
    /**
     * Aircraft height limit
     *
     *  READ AND WRITEABLE
     *
     * Meters / m
     */
    height_limit?: number;
    /**
     * Aircraft night lights state
     *
     *  READ AND WRITEABLE
     *
     * {"0":"Disable","1":"On"}
     */
    night_lights_state?: 0 | 1;
    /**
     * Aircraft activation time (Unix timestamp)
     *
     *  READONLY
     *
     * Seconds / s
     */
    activation_time?: number;
    /**
     * Maintenance information
     *
     *  READONLY
     */
    maintain_status?: {
        /**
         * Maintenance information array
         *
         *
         *
         * @minItems undefined
         * @maxItems undefined
         */
        maintain_status_array?: {
            /**
             * Maintenance state
             *
             *
             *
             * {"0":"No maintenance","1":"With maintenance"}
             */
            state?: 0 | 1;
            /**
             * Last maintenance type
             *
             *
             *
             * {"1":"Basic maintenance of the aircraft","2":"Regular maintenance of the aircraft","3":"Deep maintenance of the aircraft"}
             */
            last_maintain_type?: 1 | 2 | 3;
            last_maintain_time?: undefined;
            /**
             * Last maintenance flight hours
             *
             *
             *
             * Hours / h
             */
            last_maintain_flight_time?: number;
            /**
             * Last maintenance flight sorties
             *
             *
             */
            last_maintain_flight_sorties?: number;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Accumulated total sorties of the aircraft
     *
     *  READONLY
     */
    total_flight_sorties?: number;
    /**
     * Track ID
     *
     *  READONLY
     */
    track_id?: string;
    /**
     * Satellite search state
     *
     *  READONLY
     */
    position_state?: {
        /**
         * Whether is Fixed
         *
         *
         *
         * {"0":"Not started","1":"Fixing","2":"Fixing successful","3":"Fixing failed"}
         */
        is_fixed?: 0 | 1 | 2 | 3;
        /**
         * Satellite acquisition mode
         *
         *
         *
         * {"1":"Gear 1","2":"Gear 2","3":"Gear 3","4":"Gear 4","5":"Gear 5"}
         */
        quality?: 1 | 2 | 3 | 4 | 5;
        /**
         * Number of GPS satellites
         *
         *
         */
        gps_number?: number;
        /**
         * Number of RTK satellite acquisitions
         *
         *
         */
        rtk_number?: number;
        [k: string]: unknown;
    };
    /**
     * Storage capacity
     *
     * kb READONLY
     */
    storage?: {
        /**
         * Total capacity
         *
         *
         *
         * Kilobytes / KB
         */
        total?: number;
        /**
         * Used capacity
         *
         *
         *
         * Kilobytes / KB
         */
        used?: number;
        [k: string]: unknown;
    };
    /**
     * Aircraft battery information
     *
     *  READONLY
     */
    battery?: {
        /**
         * Total remaining battery capacity
         *
         *
         */
        capacity_percent?: number;
        /**
         * Remaining flight time
         *
         *
         *
         * Seconds / s
         */
        remain_flight_time?: number;
        /**
         * Percentage of power required for return home
         *
         *
         */
        return_home_power?: number;
        /**
         * Forced landing battery percentage
         *
         *
         */
        landing_power?: number;
        /**
         * Battery details
         *
         *
         *
         * @minItems undefined
         * @maxItems undefined
         */
        batteries?: {
            /**
             * Remaining battery capacity
             *
             *
             */
            capacity_percent?: number;
            /**
             * Battery serial number
             *
             *
             */
            index?: number;
            /**
             * Battery serial number (SN)
             *
             *
             */
            sn?: string;
            /**
             * Battery type
             *
             *
             *
             * {}
             */
            type?: -1;
            /**
             * Battery subtype
             *
             *
             *
             * {}
             */
            sub_type?: -1;
            /**
             * Firmware version
             *
             *
             */
            firmware_version?: string;
            /**
             * Battery cycle count
             *
             *
             */
            loop_times?: number;
            /**
             * Voltage
             *
             *
             *
             * Millivolts / mV
             */
            voltage?: number;
            /**
             * Temperature
             *
             * Retain one decimal place
             *
             * Celsius / °C
             */
            temperature?: number;
            /**
             * High voltage storage days
             *
             *
             *
             * Days / day
             */
            high_voltage_storage_days?: number;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Accumulated total mileage of the aircraft
     *
     *  READONLY
     *
     * Meters / m
     */
    total_flight_distance?: number;
    /**
     * Accumulated total flight time of the aircraft
     *
     *  READONLY
     *
     * Seconds / s
     */
    total_flight_time?: number;
    /**
     * Critical low battery warning
     *
     * User-set battery critically low warning percentage READONLY
     */
    serious_low_battery_warning_threshold?: number;
    /**
     * Low battery warning
     *
     * User-set battery low battery warning percentage READONLY
     */
    low_battery_warning_threshold?: number;
    /**
     * Current control source
     *
     * Can be a device or a browser. Devices use A/B to represent A control and B control, while browsers use a self-generated UUID as an identifier. READONLY
     */
    control_source?: string;
    /**
     * Current wind direction
     *
     *  READONLY
     *
     * {"1":"True North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"}
     */
    wind_direction?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /**
     * Wind speed
     *
     * Estimated wind speed, calculated based on the aircraft's attitude with some margin of error. It is for reference only and should not be used as meteorological data. READONLY
     */
    wind_speed?: number;
    /**
     * Distance from the Home point
     *
     *  READONLY
     */
    home_distance?: number;
    /**
     * Home point latitude
     *
     *  READONLY
     */
    home_latitude?: number;
    /**
     * Home point longitude
     *
     *  READONLY
     */
    home_longitude?: number;
    /**
     * Yaw axis angle
     *
     * Yaw axis angle with true north angle (longitude). Positive values from 0 to 6 o'clock direction, negative values from 6 to 12 o'clock direction. READONLY
     */
    attitude_head?: number;
    /**
     * Roll axis angle
     *
     *  READONLY
     */
    attitude_roll?: number;
    /**
     * Pitch axis angle
     *
     *  READONLY
     */
    attitude_pitch?: number;
    /**
     * Relative takeoff point altitude
     *
     *  READONLY
     */
    elevation?: number;
    /**
     * Absolute height
     *
     * Relative to the Earth ellipsoid height. Calculation is height relative to takeoff point + ellipsoid height of takeoff point READONLY
     */
    height?: number;
    /**
     * Current latitude
     *
     *  READONLY
     */
    latitude?: number;
    /**
     * Longitude of the current position
     *
     *  READONLY
     */
    longitude?: number;
    /**
     * Vertical speed
     *
     *  READONLY
     *
     * Meters per second / m/s
     */
    vertical_speed?: number;
    /**
     * Horizontal speed
     *
     *  READONLY
     */
    horizontal_speed?: number;
    /**
     * Firmware upgrade state
     *
     *  READONLY
     *
     * {"0":"Not upgraded","1":"Upgrading"}
     */
    firmware_upgrade_status?: 0 | 1;
    /**
     * Firmware consistency
     *
     * Consistent firmware update means a consistent firmware update is required when the firmware versions of some modules of the aircraft are inconsistent with the compatible version of the system. For example, the aircraft and RC have been updated to newest version, but the used batteries is not updated. Then the Consistent firmware update will be prompted. Normal firmware update means developers update all modules of aircraft to selected firmware version. READONLY
     *
     * {"0":"No consistency upgrade required","1":"Consistency upgrade required"}
     */
    compatible_status?: 0 | 1;
    /**
     * Firmware version
     *
     *  READONLY
     */
    firmware_version?: string;
    /**
     * Gear
     *
     *  READONLY
     *
     * {"0":"A","1":"P","2":"NAV","3":"FPV","4":"FARM","5":"S","6":"F","7":"M","8":"G","9":"T"}
     */
    gear?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * Camera watermark settings
     *
     * User configuration for watermarks on photos and video files taken by the camera. Currently, live stream watermarks are not supported. READ AND WRITEABLE
     */
    camera_watermark_settings?: {
        /**
         * Watermark display global enable switch
         *
         * Watermark display requires global enable switch READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        global_enable?: 0 | 1;
        /**
         * Aircraft model display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        drone_type_enable?: 0 | 1;
        /**
         * Aircraft serial number display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        drone_sn_enable?: 0 | 1;
        /**
         * Date and time display switch
         *
         * Time zone defaults to local time zone READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        datetime_enable?: 0 | 1;
        /**
         * Latitude, longitude and altitude display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        gps_enable?: 0 | 1;
        /**
         * Custom text display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        user_custom_string_enable?: 0 | 1;
        /**
         * Custom text content
         *
         * Up to 250 bytes can be displayed READ AND WRITEABLE
         */
        user_custom_string?: string;
        /**
         * Position of the watermark in the frame
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Top-left","1":"Bottom-left","2":"Top-right","3":"Bottom-right"}
         */
        layout?: 0 | 1 | 2 | 3;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}




export const MqttMavic3EnterpriseProperties_STATE_CHANGE_SCHEMA = {
    type: "object",
    properties: {
        country: {
            type: "string",
            description: "Country area code\n\n READONLY",
            required: false
        },
        mode_code: {
            type: "integer",
            description: "Aircraft state\n\n READONLY\n\n{\"0\":\"Standby\",\"1\":\"Takeoff preparation\",\"2\":\"Takeoff preparation completed\",\"3\":\"Manual flight\",\"4\":\"Automatic takeoff\",\"5\":\"Wayline flight\",\"6\":\"Panoramic photography\",\"7\":\"Intelligent tracking\",\"8\":\"ADS-B avoidance\",\"9\":\"Auto returning to home\",\"10\":\"Automatic landing\",\"11\":\"Forced landing\",\"12\":\"Three-blade landing\",\"13\":\"Upgrading\",\"14\":\"Not connected\",\"15\":\"APAS\",\"16\":\"Virtual stick state\",\"17\":\"Live flight Controls\",\"18\":\"Airborne RTK fixing mode\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18
            ],
            required: false
        },
        mode_code_reason: {
            type: "integer",
            description: "The reason the aircraft entered the current state\n\n READONLY\n\n{\"0\":\"No meaning\",\"1\":\"Insufficient battery power (return, landing)\",\"2\":\"Insufficient battery voltage (return, landing)\",\"3\":\"Severely low voltage (return, landing)\",\"4\":\"Requested by remote controller buttons (takeoff, return, landing)\",\"5\":\"Requested by App (takeoff, return, landing)\",\"6\":\"Loss of remote controller signal (return, landing, hover)\",\"7\":\"Triggered by external devices such as navigation, SDK, etc. (takeoff, return, landing)\",\"8\":\"Entered the dock GEO Zone (landing)\",\"9\":\"Although a return was triggered, it was too close to the Home point (landing)\",\"10\":\"Although a return was triggered, it was too far from the Home point (landing)\",\"11\":\"Requested when executing waypoint missions (takeoff)\",\"12\":\"Requested after reaching above the Home point in the return phase (landing)\",\"13\":\"Continued descent after the aircraft's height dropped to 0.7m from the ground (second-stage descent limit) leading to (landing)\",\"14\":\"Forced breakthrough of low altitude protection by devices like App, SDK (landing)\",\"15\":\"Requested due to passing flights in the vicinity (returning, landing)\",\"16\":\"Requested due to height control failure (return, landing)\",\"17\":\"Entered after intelligent low battery return (landing)\",\"18\":\"AP controls the flight mode (manual flight)\",\"19\":\"Hardware abnormally (return, landing)\",\"20\":\"End of anti-collision protection (landing)\",\"21\":\"Return canceled (hover)\",\"22\":\"Encountered obstacles during the return (landing)\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22
            ],
            required: false
        },
        cameras: {
            type: "array",
            description: "Aircraft camera information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    remain_photo_num: {
                        type: "integer",
                        description: "Remaining number of photos to take\n\nRemaining number of photos to take"
                    },
                    remain_record_duration: {
                        type: "integer",
                        description: "Remaining recording time\n\nRemaining recording time\n\nSeconds / s"
                    },
                    record_time: {
                        type: "integer",
                        description: "Video recording duration\n\nVideo recording duration\n\nSeconds / s"
                    },
                    payload_index: {
                        type: "string",
                        description: "Payload index\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
                    },
                    camera_mode: {
                        type: "integer",
                        description: "Camera mode\n\nCamera mode\n\n{\"0\":\"Capturing\",\"1\":\"Recording\",\"2\":\"Smart Low-Light\",\"3\":\"Panoramic photography\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    photo_state: {
                        type: "integer",
                        description: "Photo capturing status\n\n\n\n{\"0\":\"Idle\",\"1\":\"Capturing photo\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    screen_split_enable: {
                        type: "boolean",
                        description: "Is split screen enabled\n\n"
                    },
                    recording_state: {
                        type: "integer",
                        description: "Recording state\n\nRecording state\n\n{\"0\":\"Idle\",\"1\":\"Recording\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    zoom_factor: {
                        type: "number",
                        description: "Zoom factor\n\n\n\nnull"
                    },
                    ir_zoom_factor: {
                        type: "number",
                        description: "Infrared zoom factor\n\nInfrared zoom factor\n\nnull"
                    },
                    liveview_world_region: {
                        type: "object",
                        description: "Field of view (FOV) region in liveview\n\nThe field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.",
                        properties: {
                            left: {
                                type: "number",
                                description: "X-axis starting point in the top-left corner\n\nX-axis starting point in the top-left corner READONLY"
                            },
                            top: {
                                type: "number",
                                description: "Top-left corner's starting point on the y-axis\n\nTop-left corner's starting point on the y-axis READONLY"
                            },
                            right: {
                                type: "number",
                                description: "Starting point of the x-axis in the bottom right corner\n\nStarting point of the x-axis in the bottom right corner READONLY"
                            },
                            bottom: {
                                type: "number",
                                description: "Y-axis starting point in the lower right corner\n\nY-axis starting point in the lower right corner READONLY"
                            }
                        }
                    },
                    photo_storage_settings: {
                        type: "array",
                        description: "Photo storage settings collection\n\nValue range {current, wide, zoom, ir}"
                    },
                    video_storage_settings: {
                        type: "array",
                        description: "Collection of video storage settings\n\nValue range {current, wide, zoom, ir}"
                    },
                    wide_exposure_mode: {
                        type: "integer",
                        description: "Wide-angle lens exposure mode\n\nCurrent configuration of wide-angle lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    wide_iso: {
                        type: "integer",
                        description: "Wide-angle lens ISO\n\nCurrent configuration of wide-angle lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto(High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            255
                        ]
                    },
                    wide_shutter_speed: {
                        type: "integer",
                        description: "Wide-angle lens shutter speed\n\nCurrent configuration of wide-angle lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            32,
                            33,
                            34,
                            35,
                            36,
                            37,
                            38,
                            39,
                            40,
                            41,
                            42,
                            43,
                            44,
                            45,
                            46,
                            47,
                            48,
                            49,
                            50,
                            51,
                            52,
                            53,
                            54,
                            55,
                            56,
                            57,
                            58,
                            59,
                            65534
                        ]
                    },
                    wide_exposure_value: {
                        type: "integer",
                        description: "Wide-angle lens exposure value\n\nCurrent configuration of wide-angle lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            255
                        ]
                    },
                    zoom_exposure_mode: {
                        type: "integer",
                        description: "Zoom lens exposure mode\n\nCurrent configuration of zoom lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    zoom_iso: {
                        type: "integer",
                        description: "Zoom lens ISO\n\nCurrent configuration of zoom lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto(High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            255
                        ]
                    },
                    zoom_shutter_speed: {
                        type: "integer",
                        description: "Zoom lens shutter speed\n\nCurrent configuration of zoom lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            32,
                            33,
                            34,
                            35,
                            36,
                            37,
                            38,
                            39,
                            40,
                            41,
                            42,
                            43,
                            44,
                            45,
                            46,
                            47,
                            48,
                            49,
                            50,
                            51,
                            52,
                            53,
                            54,
                            55,
                            56,
                            57,
                            58,
                            59,
                            65534
                        ]
                    },
                    zoom_exposure_value: {
                        type: "integer",
                        description: "Zoom lens exposure value\n\nCurrent configuration of zoom lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                        enum: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                            12,
                            13,
                            14,
                            15,
                            16,
                            17,
                            18,
                            19,
                            20,
                            21,
                            22,
                            23,
                            24,
                            25,
                            26,
                            27,
                            28,
                            29,
                            30,
                            31,
                            255
                        ]
                    },
                    zoom_focus_mode: {
                        type: "integer",
                        description: "Zoom lens focus mode\n\n\n\n{\"0\":\"MF\",\"1\":\"AFS\",\"2\":\"AFC\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    zoom_focus_value: {
                        type: "integer",
                        description: "Zoom lens focus value\n\n"
                    },
                    zoom_max_focus_value: {
                        type: "integer",
                        description: "Zoom lens maximum focus value\n\n"
                    },
                    zoom_min_focus_value: {
                        type: "integer",
                        description: "Zoom lens minimum focus value\n\n"
                    },
                    zoom_calibrate_farthest_focus_value: {
                        type: "integer",
                        description: "Zoom lens calibrated farthest focus value\n\nFarthest position with the clearest focus"
                    },
                    zoom_calibrate_nearest_focus_value: {
                        type: "integer",
                        description: "Zoom lens calibrated nearest focus value\n\nNearest position with the clearest focus"
                    },
                    zoom_focus_state: {
                        type: "integer",
                        description: "Zoom lens focus state\n\n\n\n{\"0\":\"Idle\",\"1\":\"Focusing\",\"2\":\"Focus successful\",\"3\":\"Focus failed\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3
                        ]
                    },
                    ir_metering_mode: {
                        type: "integer",
                        description: "Infrared metering mode\n\n\n\n{\"0\":\"Temperature measurement off\",\"1\":\"Spot temperature measurement\",\"2\":\"Area temperature measurement\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    ir_metering_point: {
                        type: "object",
                        description: "Infrared metering point\n\nInformation related to the infrared metering point",
                        properties: {
                            x: {
                                type: "number",
                                description: "Metering point coordinate x\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                            },
                            y: {
                                type: "number",
                                description: "Metering point coordinate y\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                            },
                            temperature: {
                                type: "number",
                                description: "Temperature of the metering point\n\n READONLY"
                            }
                        }
                    },
                    ir_metering_area: {
                        type: "object",
                        description: "Infrared metering area\n\nInformation related to the infrared metering area",
                        properties: {
                            x: {
                                type: "number",
                                description: "Top-left corner coordinate x of the metering area\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                            },
                            y: {
                                type: "number",
                                description: "Top-left corner coordinate y of the metering area\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                            },
                            width: {
                                type: "number",
                                description: "Width of the metering area\n\nWidth of the metering area READONLY"
                            },
                            height: {
                                type: "number",
                                description: "Height of the metering area\n\nHeight of the metering area READONLY"
                            },
                            aver_temperature: {
                                type: "number",
                                description: "Average temperature of the metering area\n\nAverage temperature of the metering area READONLY"
                            },
                            min_temperature_point: {
                                type: "object",
                                description: "Lowest temperature point in the metering area\n\nInformation related to the lowest temperature point in the metering area READONLY",
                                properties: {
                                    x: {
                                        type: "number",
                                        description: "Coordinate x of the lowest temperature point\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                                    },
                                    y: {
                                        type: "number",
                                        description: "Coordinate y of the lowest temperature point\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                                    },
                                    temperature: {
                                        type: "number",
                                        description: "Temperature of the lowest temperature point\n\nTemperature of the lowest temperature point READONLY"
                                    }
                                }
                            },
                            max_temperature_point: {
                                type: "object",
                                description: "Highest temperature point in the metering area\n\nInformation related to the highest temperature point in the metering area READONLY",
                                properties: {
                                    x: {
                                        type: "number",
                                        description: "Coordinate x of the highest temperature point\n\nThe horizontal coordinate x with the top left corner of the lens as the origin READONLY"
                                    },
                                    y: {
                                        type: "number",
                                        description: "Coordinate y of the highest temperature point\n\nThe vertical coordinate y with the top left corner of the lens as the origin READONLY"
                                    },
                                    temperature: {
                                        type: "number",
                                        description: "Temperature of the highest temperature point\n\nTemperature of the highest temperature point READONLY"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            required: false
        },
        dongle_infos: {
            type: "array",
            description: "4G Dongle information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    imei: {
                        type: "string",
                        description: "dongle imei\n\nUnique identifier for the Dongle READONLY"
                    },
                    dongle_type: {
                        type: "integer",
                        description: "Dongle type\n\nDongle type READONLY\n\n{\"6\":\"Old Dongle\",\"10\":\"New Dongle with eSIM support\"}",
                        enum: [
                            6,
                            10
                        ]
                    },
                    eid: {
                        type: "string",
                        description: "dongle eid\n\nUnique identifier for eSIM, used for public account query of plans and service purchase READONLY"
                    },
                    esim_activate_state: {
                        type: "integer",
                        description: "eSIM activation state\n\nRequires activation to use READONLY\n\n{\"0\":\"Not activated\",\"1\":\"Activated\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_card_state: {
                        type: "integer",
                        description: "SIM card state\n\nInsertion state of the physical SIM card in the dongle READONLY\n\n{\"0\":\"Not inserted\",\"1\":\"Inserted\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_slot: {
                        type: "integer",
                        description: "SIM card slot enable state\n\nIdentifies the SIM card slot currently in use by the dongle READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Physical SIM card\",\"2\":\"eSIM\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    esim_infos: {
                        type: "array",
                        description: "eSIM information\n\n READONLY",
                        items: {
                            type: "object",
                            properties: {
                                telecom_operator: {
                                    type: "integer",
                                    description: "Supported operators\n\nTelecom operators supported by eSIM READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                    enum: [
                                        0,
                                        1,
                                        2,
                                        3
                                    ]
                                },
                                enabled: {
                                    type: "boolean",
                                    description: "eSIM enable state\n\nOnly one eSIM can be enabled at a time READONLY"
                                },
                                iccid: {
                                    type: "string",
                                    description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                                }
                            }
                        }
                    },
                    sim_info: {
                        type: "object",
                        description: "SIM card information\n\nInformation about the physical SIM card that can be inserted into the dongle READONLY",
                        properties: {
                            telecom_operator: {
                                type: "integer",
                                description: "Supported operators\n\nTelecom operator supported by the SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                enum: [
                                    0,
                                    1,
                                    2,
                                    3
                                ]
                            },
                            sim_type: {
                                type: "integer",
                                description: "SIM card type\n\nType of physical SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Other regular SIM card\",\"2\":\"Three-network card\"}",
                                enum: [
                                    0,
                                    1,
                                    2
                                ]
                            },
                            iccid: {
                                type: "string",
                                description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                            }
                        }
                    }
                }
            },
            required: false
        },
        obstacle_avoidance: {
            type: "object",
            description: "Aircraft obstacle sensing state\n\n READ AND WRITEABLE",
            properties: {
                horizon: {
                    type: "integer",
                    description: "Horizontal obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                upside: {
                    type: "integer",
                    description: "Upward obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                downside: {
                    type: "integer",
                    description: "Downward obstacle sensing state\n\n\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                }
            },
            required: false
        },
        is_near_area_limit: {
            type: "integer",
            description: "Whether approaching the GEO Zone\n\n READONLY\n\n{\"0\":\"Not reaching the GEO Zone\",\"1\":\"Approaching the GEO Zone\"}",
            enum: [
                0,
                1
            ],
            required: false
        },
        is_near_height_limit: {
            type: "integer",
            description: "Whether approaching the set height limit\n\n READONLY\n\n{\"0\":\"Not reaching the set height limit\",\"1\":\"Approaching the set height limit\"}",
            enum: [
                0,
                1
            ],
            required: false
        },
        height_limit: {
            type: "integer",
            description: "Aircraft height limit\n\n READ AND WRITEABLE\n\nMeters / m",
            required: false
        },
        night_lights_state: {
            type: "integer",
            description: "Aircraft night lights state\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"On\"}",
            enum: [
                0,
                1
            ],
            required: false
        },
        activation_time: {
            type: "integer",
            description: "Aircraft activation time (Unix timestamp)\n\n READONLY\n\nSeconds / s",
            required: false
        },
        maintain_status: {
            type: "object",
            description: "Maintenance information\n\n READONLY",
            properties: {
                maintain_status_array: {
                    type: "array",
                    description: "Maintenance information array\n\n",
                    items: {
                        type: "object",
                        properties: {
                            state: {
                                type: "integer",
                                description: "Maintenance state\n\n\n\n{\"0\":\"No maintenance\",\"1\":\"With maintenance\"}",
                                enum: [
                                    0,
                                    1
                                ]
                            },
                            last_maintain_type: {
                                type: "integer",
                                description: "Last maintenance type\n\n\n\n{\"1\":\"Basic maintenance of the aircraft\",\"2\":\"Regular maintenance of the aircraft\",\"3\":\"Deep maintenance of the aircraft\"}",
                                enum: [
                                    1,
                                    2,
                                    3
                                ]
                            },
                            last_maintain_flight_time: {
                                type: "integer",
                                description: "Last maintenance flight hours\n\n\n\nHours / h"
                            },
                            last_maintain_flight_sorties: {
                                type: "integer",
                                description: "Last maintenance flight sorties\n\n"
                            }
                        }
                    }
                }
            },
            required: false
        },
        total_flight_sorties: {
            type: "integer",
            description: "Accumulated total sorties of the aircraft\n\n READONLY",
            required: false
        },
        track_id: {
            type: "string",
            description: "Track ID\n\n READONLY",
            required: false
        },
        position_state: {
            type: "object",
            description: "Satellite search state\n\n READONLY",
            properties: {
                is_fixed: {
                    type: "integer",
                    description: "Whether is Fixed\n\n\n\n{\"0\":\"Not started\",\"1\":\"Fixing\",\"2\":\"Fixing successful\",\"3\":\"Fixing failed\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3
                    ]
                },
                quality: {
                    type: "integer",
                    description: "Satellite acquisition mode\n\n\n\n{\"1\":\"Gear 1\",\"2\":\"Gear 2\",\"3\":\"Gear 3\",\"4\":\"Gear 4\",\"5\":\"Gear 5\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4,
                        5
                    ]
                },
                gps_number: {
                    type: "integer",
                    description: "Number of GPS satellites\n\n"
                },
                rtk_number: {
                    type: "integer",
                    description: "Number of RTK satellite acquisitions\n\n"
                }
            },
            required: false
        },
        storage: {
            type: "object",
            description: "Storage capacity\n\nkb READONLY",
            properties: {
                total: {
                    type: "integer",
                    description: "Total capacity\n\n\n\nKilobytes / KB"
                },
                used: {
                    type: "integer",
                    description: "Used capacity\n\n\n\nKilobytes / KB"
                }
            },
            required: false
        },
        battery: {
            type: "object",
            description: "Aircraft battery information\n\n READONLY",
            properties: {
                capacity_percent: {
                    type: "integer",
                    description: "Total remaining battery capacity\n\n"
                },
                remain_flight_time: {
                    type: "integer",
                    description: "Remaining flight time\n\n\n\nSeconds / s"
                },
                return_home_power: {
                    type: "integer",
                    description: "Percentage of power required for return home\n\n"
                },
                landing_power: {
                    type: "integer",
                    description: "Forced landing battery percentage\n\n"
                },
                batteries: {
                    type: "array",
                    description: "Battery details\n\n",
                    items: {
                        type: "object",
                        properties: {
                            capacity_percent: {
                                type: "integer",
                                description: "Remaining battery capacity\n\n"
                            },
                            index: {
                                type: "integer",
                                description: "Battery serial number\n\n"
                            },
                            sn: {
                                type: "string",
                                description: "Battery serial number (SN)\n\n"
                            },
                            type: {
                                type: "integer",
                                description: "Battery type\n\n\n\n{}",
                                enum: [
                                    -1
                                ]
                            },
                            sub_type: {
                                type: "integer",
                                description: "Battery subtype\n\n\n\n{}",
                                enum: [
                                    -1
                                ]
                            },
                            firmware_version: {
                                type: "string",
                                description: "Firmware version\n\n"
                            },
                            loop_times: {
                                type: "integer",
                                description: "Battery cycle count\n\n"
                            },
                            voltage: {
                                type: "integer",
                                description: "Voltage\n\n\n\nMillivolts / mV"
                            },
                            temperature: {
                                type: "number",
                                description: "Temperature\n\nRetain one decimal place\n\nCelsius / °C"
                            },
                            high_voltage_storage_days: {
                                type: "integer",
                                description: "High voltage storage days\n\n\n\nDays / day"
                            }
                        }
                    }
                }
            },
            required: false
        },
        total_flight_distance: {
            type: "number",
            description: "Accumulated total mileage of the aircraft\n\n READONLY\n\nMeters / m",
            required: false
        },
        total_flight_time: {
            type: "integer",
            description: "Accumulated total flight time of the aircraft\n\n READONLY\n\nSeconds / s",
            required: false
        },
        serious_low_battery_warning_threshold: {
            type: "integer",
            description: "Critical low battery warning\n\nUser-set battery critically low warning percentage READONLY",
            required: false
        },
        low_battery_warning_threshold: {
            type: "integer",
            description: "Low battery warning\n\nUser-set battery low battery warning percentage READONLY",
            required: false
        },
        control_source: {
            type: "string",
            description: "Current control source\n\nCan be a device or a browser. Devices use A/B to represent A control and B control, while browsers use a self-generated UUID as an identifier. READONLY",
            required: false
        },
        wind_direction: {
            type: "integer",
            description: "Current wind direction\n\n READONLY\n\n{\"1\":\"True North\",\"2\":\"Northeast\",\"3\":\"East\",\"4\":\"Southeast\",\"5\":\"South\",\"6\":\"Southwest\",\"7\":\"West\",\"8\":\"Northwest\"}",
            enum: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ],
            required: false
        },
        wind_speed: {
            type: "number",
            description: "Wind speed\n\nEstimated wind speed, calculated based on the aircraft's attitude with some margin of error. It is for reference only and should not be used as meteorological data. READONLY",
            required: false
        },
        home_distance: {
            type: "number",
            description: "Distance from the Home point\n\n READONLY",
            required: false
        },
        home_latitude: {
            type: "number",
            description: "Home point latitude\n\n READONLY",
            required: false
        },
        home_longitude: {
            type: "number",
            description: "Home point longitude\n\n READONLY",
            required: false
        },
        attitude_head: {
            type: "integer",
            description: "Yaw axis angle\n\nYaw axis angle with true north angle (longitude). Positive values from 0 to 6 o'clock direction, negative values from 6 to 12 o'clock direction. READONLY",
            required: false
        },
        attitude_roll: {
            type: "number",
            description: "Roll axis angle\n\n READONLY",
            required: false
        },
        attitude_pitch: {
            type: "number",
            description: "Pitch axis angle\n\n READONLY",
            required: false
        },
        elevation: {
            type: "number",
            description: "Relative takeoff point altitude\n\n READONLY",
            required: false
        },
        height: {
            type: "number",
            description: "Absolute height\n\nRelative to the Earth ellipsoid height. Calculation is height relative to takeoff point + ellipsoid height of takeoff point READONLY",
            required: false
        },
        latitude: {
            type: "number",
            description: "Current latitude\n\n READONLY",
            required: false
        },
        longitude: {
            type: "number",
            description: "Longitude of the current position\n\n READONLY",
            required: false
        },
        vertical_speed: {
            type: "number",
            description: "Vertical speed\n\n READONLY\n\nMeters per second / m/s",
            required: false
        },
        horizontal_speed: {
            type: "number",
            description: "Horizontal speed\n\n READONLY",
            required: false
        },
        firmware_upgrade_status: {
            type: "integer",
            description: "Firmware upgrade state\n\n READONLY\n\n{\"0\":\"Not upgraded\",\"1\":\"Upgrading\"}",
            enum: [
                0,
                1
            ],
            required: false
        },
        compatible_status: {
            type: "integer",
            description: "Firmware consistency\n\nConsistent firmware update means a consistent firmware update is required when the firmware versions of some modules of the aircraft are inconsistent with the compatible version of the system. For example, the aircraft and RC have been updated to newest version, but the used batteries is not updated. Then the Consistent firmware update will be prompted. Normal firmware update means developers update all modules of aircraft to selected firmware version. READONLY\n\n{\"0\":\"No consistency upgrade required\",\"1\":\"Consistency upgrade required\"}",
            enum: [
                0,
                1
            ],
            required: false
        },
        firmware_version: {
            type: "string",
            description: "Firmware version\n\n READONLY",
            required: false
        },
        gear: {
            type: "integer",
            description: "Gear\n\n READONLY\n\n{\"0\":\"A\",\"1\":\"P\",\"2\":\"NAV\",\"3\":\"FPV\",\"4\":\"FARM\",\"5\":\"S\",\"6\":\"F\",\"7\":\"M\",\"8\":\"G\",\"9\":\"T\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ],
            required: false
        },
        camera_watermark_settings: {
            type: "object",
            description: "Camera watermark settings\n\nUser configuration for watermarks on photos and video files taken by the camera. Currently, live stream watermarks are not supported. READ AND WRITEABLE",
            properties: {
                global_enable: {
                    type: "integer",
                    description: "Watermark display global enable switch\n\nWatermark display requires global enable switch READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                drone_type_enable: {
                    type: "integer",
                    description: "Aircraft model display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                drone_sn_enable: {
                    type: "integer",
                    description: "Aircraft serial number display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                datetime_enable: {
                    type: "integer",
                    description: "Date and time display switch\n\nTime zone defaults to local time zone READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                gps_enable: {
                    type: "integer",
                    description: "Latitude, longitude and altitude display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                user_custom_string_enable: {
                    type: "integer",
                    description: "Custom text display switch\n\n READ AND WRITEABLE\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                user_custom_string: {
                    type: "string",
                    description: "Custom text content\n\nUp to 250 bytes can be displayed READ AND WRITEABLE"
                },
                layout: {
                    type: "integer",
                    description: "Position of the watermark in the frame\n\n READ AND WRITEABLE\n\n{\"0\":\"Top-left\",\"1\":\"Bottom-left\",\"2\":\"Top-right\",\"3\":\"Bottom-right\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            },
            required: false
        }
    }
}

export interface MqttMavic3EnterpriseProperties_STATE_CHANGE_TYPE {
    /**
     * Country area code
     *
     *  READONLY
     */
    country?: string;
    /**
     * Aircraft state
     *
     *  READONLY
     *
     * {"0":"Standby","1":"Takeoff preparation","2":"Takeoff preparation completed","3":"Manual flight","4":"Automatic takeoff","5":"Wayline flight","6":"Panoramic photography","7":"Intelligent tracking","8":"ADS-B avoidance","9":"Auto returning to home","10":"Automatic landing","11":"Forced landing","12":"Three-blade landing","13":"Upgrading","14":"Not connected","15":"APAS","16":"Virtual stick state","17":"Live flight Controls","18":"Airborne RTK fixing mode"}
     */
    mode_code?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;
    /**
     * The reason the aircraft entered the current state
     *
     *  READONLY
     *
     * {"0":"No meaning","1":"Insufficient battery power (return, landing)","2":"Insufficient battery voltage (return, landing)","3":"Severely low voltage (return, landing)","4":"Requested by remote controller buttons (takeoff, return, landing)","5":"Requested by App (takeoff, return, landing)","6":"Loss of remote controller signal (return, landing, hover)","7":"Triggered by external devices such as navigation, SDK, etc. (takeoff, return, landing)","8":"Entered the dock GEO Zone (landing)","9":"Although a return was triggered, it was too close to the Home point (landing)","10":"Although a return was triggered, it was too far from the Home point (landing)","11":"Requested when executing waypoint missions (takeoff)","12":"Requested after reaching above the Home point in the return phase (landing)","13":"Continued descent after the aircraft's height dropped to 0.7m from the ground (second-stage descent limit) leading to (landing)","14":"Forced breakthrough of low altitude protection by devices like App, SDK (landing)","15":"Requested due to passing flights in the vicinity (returning, landing)","16":"Requested due to height control failure (return, landing)","17":"Entered after intelligent low battery return (landing)","18":"AP controls the flight mode (manual flight)","19":"Hardware abnormally (return, landing)","20":"End of anti-collision protection (landing)","21":"Return canceled (hover)","22":"Encountered obstacles during the return (landing)"}
     */
    mode_code_reason?:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22;
    /**
     * Aircraft camera information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    cameras?: {
        /**
         * Remaining number of photos to take
         *
         * Remaining number of photos to take
         */
        remain_photo_num?: number;
        /**
         * Remaining recording time
         *
         * Remaining recording time
         *
         * Seconds / s
         */
        remain_record_duration?: number;
        /**
         * Video recording duration
         *
         * Video recording duration
         *
         * Seconds / s
         */
        record_time?: number;
        /**
         * Payload index
         *
         * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
         */
        payload_index?: string;
        /**
         * Camera mode
         *
         * Camera mode
         *
         * {"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panoramic photography"}
         */
        camera_mode?: 0 | 1 | 2 | 3;
        /**
         * Photo capturing status
         *
         *
         *
         * {"0":"Idle","1":"Capturing photo"}
         */
        photo_state?: 0 | 1;
        /**
         * Is split screen enabled
         *
         *
         */
        screen_split_enable?: boolean;
        /**
         * Recording state
         *
         * Recording state
         *
         * {"0":"Idle","1":"Recording"}
         */
        recording_state?: 0 | 1;
        /**
         * Zoom factor
         *
         *
         *
         * null
         */
        zoom_factor?: number;
        /**
         * Infrared zoom factor
         *
         * Infrared zoom factor
         *
         * null
         */
        ir_zoom_factor?: number;
        /**
         * Field of view (FOV) region in liveview
         *
         * The field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.
         */
        liveview_world_region?: {
            /**
             * X-axis starting point in the top-left corner
             *
             * X-axis starting point in the top-left corner READONLY
             */
            left?: number;
            /**
             * Top-left corner's starting point on the y-axis
             *
             * Top-left corner's starting point on the y-axis READONLY
             */
            top?: number;
            /**
             * Starting point of the x-axis in the bottom right corner
             *
             * Starting point of the x-axis in the bottom right corner READONLY
             */
            right?: number;
            /**
             * Y-axis starting point in the lower right corner
             *
             * Y-axis starting point in the lower right corner READONLY
             */
            bottom?: number;
            [k: string]: unknown;
        };
        /**
         * Photo storage settings collection
         *
         * Value range {current, wide, zoom, ir}
         *
         * @minItems undefined
         * @maxItems undefined
         */
        photo_storage_settings?: unknown[];
        /**
         * Collection of video storage settings
         *
         * Value range {current, wide, zoom, ir}
         *
         * @minItems undefined
         * @maxItems undefined
         */
        video_storage_settings?: unknown[];
        /**
         * Wide-angle lens exposure mode
         *
         * Current configuration of wide-angle lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        wide_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Wide-angle lens ISO
         *
         * Current configuration of wide-angle lens ISO
         *
         * {"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        wide_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Wide-angle lens shutter speed
         *
         * Current configuration of wide-angle lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        wide_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Wide-angle lens exposure value
         *
         * Current configuration of wide-angle lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        wide_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Zoom lens exposure mode
         *
         * Current configuration of zoom lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        zoom_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Zoom lens ISO
         *
         * Current configuration of zoom lens ISO
         *
         * {"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        zoom_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Zoom lens shutter speed
         *
         * Current configuration of zoom lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        zoom_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Zoom lens exposure value
         *
         * Current configuration of zoom lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        zoom_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Zoom lens focus mode
         *
         *
         *
         * {"0":"MF","1":"AFS","2":"AFC"}
         */
        zoom_focus_mode?: 0 | 1 | 2;
        /**
         * Zoom lens focus value
         *
         *
         */
        zoom_focus_value?: number;
        /**
         * Zoom lens maximum focus value
         *
         *
         */
        zoom_max_focus_value?: number;
        /**
         * Zoom lens minimum focus value
         *
         *
         */
        zoom_min_focus_value?: number;
        /**
         * Zoom lens calibrated farthest focus value
         *
         * Farthest position with the clearest focus
         */
        zoom_calibrate_farthest_focus_value?: number;
        /**
         * Zoom lens calibrated nearest focus value
         *
         * Nearest position with the clearest focus
         */
        zoom_calibrate_nearest_focus_value?: number;
        /**
         * Zoom lens focus state
         *
         *
         *
         * {"0":"Idle","1":"Focusing","2":"Focus successful","3":"Focus failed"}
         */
        zoom_focus_state?: 0 | 1 | 2 | 3;
        /**
         * Infrared metering mode
         *
         *
         *
         * {"0":"Temperature measurement off","1":"Spot temperature measurement","2":"Area temperature measurement"}
         */
        ir_metering_mode?: 0 | 1 | 2;
        /**
         * Infrared metering point
         *
         * Information related to the infrared metering point
         */
        ir_metering_point?: {
            /**
             * Metering point coordinate x
             *
             * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
             */
            x?: number;
            /**
             * Metering point coordinate y
             *
             * The vertical coordinate y with the top left corner of the lens as the origin READONLY
             */
            y?: number;
            /**
             * Temperature of the metering point
             *
             *  READONLY
             */
            temperature?: number;
            [k: string]: unknown;
        };
        /**
         * Infrared metering area
         *
         * Information related to the infrared metering area
         */
        ir_metering_area?: {
            /**
             * Top-left corner coordinate x of the metering area
             *
             * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
             */
            x?: number;
            /**
             * Top-left corner coordinate y of the metering area
             *
             * The vertical coordinate y with the top left corner of the lens as the origin READONLY
             */
            y?: number;
            /**
             * Width of the metering area
             *
             * Width of the metering area READONLY
             */
            width?: number;
            /**
             * Height of the metering area
             *
             * Height of the metering area READONLY
             */
            height?: number;
            /**
             * Average temperature of the metering area
             *
             * Average temperature of the metering area READONLY
             */
            aver_temperature?: number;
            /**
             * Lowest temperature point in the metering area
             *
             * Information related to the lowest temperature point in the metering area READONLY
             */
            min_temperature_point?: {
                /**
                 * Coordinate x of the lowest temperature point
                 *
                 * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
                 */
                x?: number;
                /**
                 * Coordinate y of the lowest temperature point
                 *
                 * The vertical coordinate y with the top left corner of the lens as the origin READONLY
                 */
                y?: number;
                /**
                 * Temperature of the lowest temperature point
                 *
                 * Temperature of the lowest temperature point READONLY
                 */
                temperature?: number;
                [k: string]: unknown;
            };
            /**
             * Highest temperature point in the metering area
             *
             * Information related to the highest temperature point in the metering area READONLY
             */
            max_temperature_point?: {
                /**
                 * Coordinate x of the highest temperature point
                 *
                 * The horizontal coordinate x with the top left corner of the lens as the origin READONLY
                 */
                x?: number;
                /**
                 * Coordinate y of the highest temperature point
                 *
                 * The vertical coordinate y with the top left corner of the lens as the origin READONLY
                 */
                y?: number;
                /**
                 * Temperature of the highest temperature point
                 *
                 * Temperature of the highest temperature point READONLY
                 */
                temperature?: number;
                [k: string]: unknown;
            };
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * 4G Dongle information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    dongle_infos?: {
        /**
         * dongle imei
         *
         * Unique identifier for the Dongle READONLY
         */
        imei?: string;
        /**
         * Dongle type
         *
         * Dongle type READONLY
         *
         * {"6":"Old Dongle","10":"New Dongle with eSIM support"}
         */
        dongle_type?: 6 | 10;
        /**
         * dongle eid
         *
         * Unique identifier for eSIM, used for public account query of plans and service purchase READONLY
         */
        eid?: string;
        /**
         * eSIM activation state
         *
         * Requires activation to use READONLY
         *
         * {"0":"Not activated","1":"Activated"}
         */
        esim_activate_state?: 0 | 1;
        /**
         * SIM card state
         *
         * Insertion state of the physical SIM card in the dongle READONLY
         *
         * {"0":"Not inserted","1":"Inserted"}
         */
        sim_card_state?: 0 | 1;
        /**
         * SIM card slot enable state
         *
         * Identifies the SIM card slot currently in use by the dongle READONLY
         *
         * {"0":"Unknown","1":"Physical SIM card","2":"eSIM"}
         */
        sim_slot?: 0 | 1 | 2;
        /**
         * eSIM information
         *
         *  READONLY
         *
         * @minItems undefined
         * @maxItems undefined
         */
        esim_infos?: {
            /**
             * Supported operators
             *
             * Telecom operators supported by eSIM READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * eSIM enable state
             *
             * Only one eSIM can be enabled at a time READONLY
             */
            enabled?: boolean;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        }[];
        /**
         * SIM card information
         *
         * Information about the physical SIM card that can be inserted into the dongle READONLY
         */
        sim_info?: {
            /**
             * Supported operators
             *
             * Telecom operator supported by the SIM card READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * SIM card type
             *
             * Type of physical SIM card READONLY
             *
             * {"0":"Unknown","1":"Other regular SIM card","2":"Three-network card"}
             */
            sim_type?: 0 | 1 | 2;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * Aircraft obstacle sensing state
     *
     *  READ AND WRITEABLE
     */
    obstacle_avoidance?: {
        /**
         * Horizontal obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        horizon?: 0 | 1;
        /**
         * Upward obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        upside?: 0 | 1;
        /**
         * Downward obstacle sensing state
         *
         *
         *
         * {"0":"Disable","1":"Enable"}
         */
        downside?: 0 | 1;
        [k: string]: unknown;
    };
    /**
     * Whether approaching the GEO Zone
     *
     *  READONLY
     *
     * {"0":"Not reaching the GEO Zone","1":"Approaching the GEO Zone"}
     */
    is_near_area_limit?: 0 | 1;
    /**
     * Whether approaching the set height limit
     *
     *  READONLY
     *
     * {"0":"Not reaching the set height limit","1":"Approaching the set height limit"}
     */
    is_near_height_limit?: 0 | 1;
    /**
     * Aircraft height limit
     *
     *  READ AND WRITEABLE
     *
     * Meters / m
     */
    height_limit?: number;
    /**
     * Aircraft night lights state
     *
     *  READ AND WRITEABLE
     *
     * {"0":"Disable","1":"On"}
     */
    night_lights_state?: 0 | 1;
    /**
     * Aircraft activation time (Unix timestamp)
     *
     *  READONLY
     *
     * Seconds / s
     */
    activation_time?: number;
    /**
     * Maintenance information
     *
     *  READONLY
     */
    maintain_status?: {
        /**
         * Maintenance information array
         *
         *
         *
         * @minItems undefined
         * @maxItems undefined
         */
        maintain_status_array?: {
            /**
             * Maintenance state
             *
             *
             *
             * {"0":"No maintenance","1":"With maintenance"}
             */
            state?: 0 | 1;
            /**
             * Last maintenance type
             *
             *
             *
             * {"1":"Basic maintenance of the aircraft","2":"Regular maintenance of the aircraft","3":"Deep maintenance of the aircraft"}
             */
            last_maintain_type?: 1 | 2 | 3;
            last_maintain_time?: undefined;
            /**
             * Last maintenance flight hours
             *
             *
             *
             * Hours / h
             */
            last_maintain_flight_time?: number;
            /**
             * Last maintenance flight sorties
             *
             *
             */
            last_maintain_flight_sorties?: number;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Accumulated total sorties of the aircraft
     *
     *  READONLY
     */
    total_flight_sorties?: number;
    /**
     * Track ID
     *
     *  READONLY
     */
    track_id?: string;
    /**
     * Satellite search state
     *
     *  READONLY
     */
    position_state?: {
        /**
         * Whether is Fixed
         *
         *
         *
         * {"0":"Not started","1":"Fixing","2":"Fixing successful","3":"Fixing failed"}
         */
        is_fixed?: 0 | 1 | 2 | 3;
        /**
         * Satellite acquisition mode
         *
         *
         *
         * {"1":"Gear 1","2":"Gear 2","3":"Gear 3","4":"Gear 4","5":"Gear 5"}
         */
        quality?: 1 | 2 | 3 | 4 | 5;
        /**
         * Number of GPS satellites
         *
         *
         */
        gps_number?: number;
        /**
         * Number of RTK satellite acquisitions
         *
         *
         */
        rtk_number?: number;
        [k: string]: unknown;
    };
    /**
     * Storage capacity
     *
     * kb READONLY
     */
    storage?: {
        /**
         * Total capacity
         *
         *
         *
         * Kilobytes / KB
         */
        total?: number;
        /**
         * Used capacity
         *
         *
         *
         * Kilobytes / KB
         */
        used?: number;
        [k: string]: unknown;
    };
    /**
     * Aircraft battery information
     *
     *  READONLY
     */
    battery?: {
        /**
         * Total remaining battery capacity
         *
         *
         */
        capacity_percent?: number;
        /**
         * Remaining flight time
         *
         *
         *
         * Seconds / s
         */
        remain_flight_time?: number;
        /**
         * Percentage of power required for return home
         *
         *
         */
        return_home_power?: number;
        /**
         * Forced landing battery percentage
         *
         *
         */
        landing_power?: number;
        /**
         * Battery details
         *
         *
         *
         * @minItems undefined
         * @maxItems undefined
         */
        batteries?: {
            /**
             * Remaining battery capacity
             *
             *
             */
            capacity_percent?: number;
            /**
             * Battery serial number
             *
             *
             */
            index?: number;
            /**
             * Battery serial number (SN)
             *
             *
             */
            sn?: string;
            /**
             * Battery type
             *
             *
             *
             * {}
             */
            type?: -1;
            /**
             * Battery subtype
             *
             *
             *
             * {}
             */
            sub_type?: -1;
            /**
             * Firmware version
             *
             *
             */
            firmware_version?: string;
            /**
             * Battery cycle count
             *
             *
             */
            loop_times?: number;
            /**
             * Voltage
             *
             *
             *
             * Millivolts / mV
             */
            voltage?: number;
            /**
             * Temperature
             *
             * Retain one decimal place
             *
             * Celsius / °C
             */
            temperature?: number;
            /**
             * High voltage storage days
             *
             *
             *
             * Days / day
             */
            high_voltage_storage_days?: number;
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Accumulated total mileage of the aircraft
     *
     *  READONLY
     *
     * Meters / m
     */
    total_flight_distance?: number;
    /**
     * Accumulated total flight time of the aircraft
     *
     *  READONLY
     *
     * Seconds / s
     */
    total_flight_time?: number;
    /**
     * Critical low battery warning
     *
     * User-set battery critically low warning percentage READONLY
     */
    serious_low_battery_warning_threshold?: number;
    /**
     * Low battery warning
     *
     * User-set battery low battery warning percentage READONLY
     */
    low_battery_warning_threshold?: number;
    /**
     * Current control source
     *
     * Can be a device or a browser. Devices use A/B to represent A control and B control, while browsers use a self-generated UUID as an identifier. READONLY
     */
    control_source?: string;
    /**
     * Current wind direction
     *
     *  READONLY
     *
     * {"1":"True North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"}
     */
    wind_direction?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    /**
     * Wind speed
     *
     * Estimated wind speed, calculated based on the aircraft's attitude with some margin of error. It is for reference only and should not be used as meteorological data. READONLY
     */
    wind_speed?: number;
    /**
     * Distance from the Home point
     *
     *  READONLY
     */
    home_distance?: number;
    /**
     * Home point latitude
     *
     *  READONLY
     */
    home_latitude?: number;
    /**
     * Home point longitude
     *
     *  READONLY
     */
    home_longitude?: number;
    /**
     * Yaw axis angle
     *
     * Yaw axis angle with true north angle (longitude). Positive values from 0 to 6 o'clock direction, negative values from 6 to 12 o'clock direction. READONLY
     */
    attitude_head?: number;
    /**
     * Roll axis angle
     *
     *  READONLY
     */
    attitude_roll?: number;
    /**
     * Pitch axis angle
     *
     *  READONLY
     */
    attitude_pitch?: number;
    /**
     * Relative takeoff point altitude
     *
     *  READONLY
     */
    elevation?: number;
    /**
     * Absolute height
     *
     * Relative to the Earth ellipsoid height. Calculation is height relative to takeoff point + ellipsoid height of takeoff point READONLY
     */
    height?: number;
    /**
     * Current latitude
     *
     *  READONLY
     */
    latitude?: number;
    /**
     * Longitude of the current position
     *
     *  READONLY
     */
    longitude?: number;
    /**
     * Vertical speed
     *
     *  READONLY
     *
     * Meters per second / m/s
     */
    vertical_speed?: number;
    /**
     * Horizontal speed
     *
     *  READONLY
     */
    horizontal_speed?: number;
    /**
     * Firmware upgrade state
     *
     *  READONLY
     *
     * {"0":"Not upgraded","1":"Upgrading"}
     */
    firmware_upgrade_status?: 0 | 1;
    /**
     * Firmware consistency
     *
     * Consistent firmware update means a consistent firmware update is required when the firmware versions of some modules of the aircraft are inconsistent with the compatible version of the system. For example, the aircraft and RC have been updated to newest version, but the used batteries is not updated. Then the Consistent firmware update will be prompted. Normal firmware update means developers update all modules of aircraft to selected firmware version. READONLY
     *
     * {"0":"No consistency upgrade required","1":"Consistency upgrade required"}
     */
    compatible_status?: 0 | 1;
    /**
     * Firmware version
     *
     *  READONLY
     */
    firmware_version?: string;
    /**
     * Gear
     *
     *  READONLY
     *
     * {"0":"A","1":"P","2":"NAV","3":"FPV","4":"FARM","5":"S","6":"F","7":"M","8":"G","9":"T"}
     */
    gear?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    /**
     * Camera watermark settings
     *
     * User configuration for watermarks on photos and video files taken by the camera. Currently, live stream watermarks are not supported. READ AND WRITEABLE
     */
    camera_watermark_settings?: {
        /**
         * Watermark display global enable switch
         *
         * Watermark display requires global enable switch READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        global_enable?: 0 | 1;
        /**
         * Aircraft model display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        drone_type_enable?: 0 | 1;
        /**
         * Aircraft serial number display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        drone_sn_enable?: 0 | 1;
        /**
         * Date and time display switch
         *
         * Time zone defaults to local time zone READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        datetime_enable?: 0 | 1;
        /**
         * Latitude, longitude and altitude display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        gps_enable?: 0 | 1;
        /**
         * Custom text display switch
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Disable","1":"Enable"}
         */
        user_custom_string_enable?: 0 | 1;
        /**
         * Custom text content
         *
         * Up to 250 bytes can be displayed READ AND WRITEABLE
         */
        user_custom_string?: string;
        /**
         * Position of the watermark in the frame
         *
         *  READ AND WRITEABLE
         *
         * {"0":"Top-left","1":"Bottom-left","2":"Top-right","3":"Bottom-right"}
         */
        layout?: 0 | 1 | 2 | 3;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}


export const MqttRcProEnterpriseDeviceManagementUpdateTopoUpReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseDeviceManagementUpdateTopo_UP_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseDeviceManagementUpdateTopoUp_SCHEMA = {
    type: "object",
    properties: {
        type: {
            type: "integer",
            description: "Gateway device product type\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Support\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Reference to\"}"
        },
        sub_type: {
            type: "integer",
            description: "Gateway sub-device product subtype\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Support\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Reference to\"}"
        },
        device_secret: {
            type: "string",
            description: "Gateway device key\n\n"
        },
        nonce: {
            type: "string",
            description: "nonce\n\n"
        },
        thing_version: {
            type: "string",
            description: "Thing model version of gateway device\n\n"
        },
        sub_devices: {
            type: "array",
            description: "Sub-device list\n\n",
            items: {
                type: "object",
                properties: {
                    sn: {
                        type: "string",
                        description: "Sub-device serial number (SN)\n\n"
                    },
                    type: {
                        type: "integer",
                        description: "Sub-device product type\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Support\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Reference to\"}"
                    },
                    sub_type: {
                        type: "integer",
                        description: "Sub-device product subtype\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Support\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Reference to\"}"
                    },
                    device_secret: {
                        type: "string",
                        description: "Sub-device key\n\n"
                    },
                    nonce: {
                        type: "string",
                        description: "nonce\n\n"
                    },
                    thing_version: {
                        type: "string",
                        description: "Thing model version of sub-device\n\n"
                    }
                }
            }
        }
    }
}

export interface MqttRcProEnterpriseDeviceManagementUpdateTopo_UP_TYPE {
    domain?: undefined;
    /**
     * Gateway device product type
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Support","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Reference to"}
     */
    type?: number;
    /**
     * Gateway sub-device product subtype
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Support","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Reference to"}
     */
    sub_type?: number;
    /**
     * Gateway device key
     *
     *
     */
    device_secret?: string;
    /**
     * nonce
     *
     *
     */
    nonce?: string;
    /**
     * Thing model version of gateway device
     *
     *
     */
    thing_version?: string;
    /**
     * Sub-device list
     *
     *
     *
     * @minItems undefined
     * @maxItems undefined
     */
    sub_devices?: {
        /**
         * Sub-device serial number (SN)
         *
         *
         */
        sn?: string;
        domain?: undefined;
        /**
         * Sub-device product type
         *
         * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Support","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Reference to"}
         */
        type?: number;
        /**
         * Sub-device product subtype
         *
         * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Support","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Reference to"}
         */
        sub_type?: number;
        index?: undefined;
        /**
         * Sub-device key
         *
         *
         */
        device_secret?: string;
        /**
         * nonce
         *
         *
         */
        nonce?: string;
        /**
         * Thing model version of sub-device
         *
         *
         */
        thing_version?: string;
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraAimDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraAim_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraAimDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        x: {
            type: "number",
            description: "Target coordinates x\n\nTarget coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x."
        },
        y: {
            type: "number",
            description: "Target coordinates y\n\nTarget coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraAim_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Target coordinates x
     *
     * Target coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x.
     */
    x?: number;
    /**
     * Target coordinates y
     *
     * Target coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y.
     */
    y?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraExposureModeSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraExposureModeSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraExposureModeSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        exposure_mode: {
            type: "integer",
            description: "Exposure Mode\n\n\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
            enum: [
                1,
                2,
                3,
                4
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraExposureModeSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Exposure Mode
     *
     *
     *
     * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
     */
    exposure_mode?: 1 | 2 | 3 | 4;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraExposureSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraExposureSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraExposureSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraExposureSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    exposure_value?: undefined;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocalLengthSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocalLengthSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocalLengthSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        zoom_factor: {
            type: "number",
            description: "Zoom factor\n\nZoom factor, 2-200 for visible light, 2-20 for infrared."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocalLengthSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Zoom factor
     *
     * Zoom factor, 2-200 for visible light, 2-20 for infrared.
     */
    zoom_factor?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocusModeSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocusModeSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocusModeSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        focus_mode: {
            type: "integer",
            description: "Focus mode\n\n\n\n{\"0\":\"MF\",\"1\":\"AFS\",\"2\":\"AFC\"}",
            enum: [
                0,
                1,
                2
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocusModeSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Focus mode
     *
     *
     *
     * {"0":"MF","1":"AFS","2":"AFC"}
     */
    focus_mode?: 0 | 1 | 2;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocusValueSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocusValueSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFocusValueSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        focus_value: {
            type: "integer",
            description: "Focus value\n\nFocus value, range refer to aircraft model attributes zoom_max_focus_value and zoom_min_focus_value."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFocusValueSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Focus value
     *
     * Focus value, range refer to aircraft model attributes zoom_max_focus_value and zoom_min_focus_value.
     */
    focus_value?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFrameZoomDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFrameZoom_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraFrameZoomDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        x: {
            type: "number",
            description: "Upper-left coordinate x of the target frame\n\n\n\nNone / "
        },
        y: {
            type: "number",
            description: "Upper-left coordinate y of the target frame\n\n\n\nNone / "
        },
        width: {
            type: "number",
            description: "Width of the target frame\n\n\n\nNone / "
        },
        height: {
            type: "number",
            description: "Height of target frame\n\n\n\nNone / "
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraFrameZoom_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     *
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Upper-left coordinate x of the target frame
     *
     *
     *
     * None /
     */
    x?: number;
    /**
     * Upper-left coordinate y of the target frame
     *
     *
     *
     * None /
     */
    y?: number;
    /**
     * Width of the target frame
     *
     *
     *
     * None /
     */
    width?: number;
    /**
     * Height of target frame
     *
     *
     *
     * None /
     */
    height?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraLookAtDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraLookAt_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraLookAtDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        latitude: {
            type: "number",
            description: "Target point latitude (in degree values)\n\nAngle value. Negative for south latitude, positive for north latitude, accurate to 6 decimal places."
        },
        longitude: {
            type: "number",
            description: "Target point longitude (in degree values)\n\nAngle value. East longitude is positive, west longitude is negative, precision to 6 decimal places."
        },
        height: {
            type: "number",
            description: "Target point height\n\nTarget point height (ellipsoid height)\n\nMeters / m"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraLookAt_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Target point latitude (in degree values)
     *
     * Angle value. Negative for south latitude, positive for north latitude, accurate to 6 decimal places.
     */
    latitude?: number;
    /**
     * Target point longitude (in degree values)
     *
     * Angle value. East longitude is positive, west longitude is negative, precision to 6 decimal places.
     */
    longitude?: number;
    /**
     * Target point height
     *
     * Target point height (ellipsoid height)
     *
     * Meters / m
     */
    height?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraModeSwitchDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraModeSwitch_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraModeSwitchDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        camera_mode: {
            type: "integer",
            description: "Camera mode\n\n\n\n{\"0\":\"Capturing\",\"1\":\"Recording\",\"2\":\"Smart Low-Light\",\"3\":\"Panoramic photography\"}",
            enum: [
                0,
                1,
                2,
                3
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraModeSwitch_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Camera mode
     *
     *
     *
     * {"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panoramic photography"}
     */
    camera_mode?: 0 | 1 | 2 | 3;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPhotoStopDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPhotoStop_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPhotoStopDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPhotoStop_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPhotoTakeDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPhotoTake_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    status?: undefined;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPhotoTakeDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPhotoTake_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPhotoTakeProgressUp_SCHEMA = {
    type: "object",
    properties: {
        output: {
            type: "object",
            description: "Output\n\n",
            properties: {
                progress: {
                    type: "object",
                    description: "Progress\n\n",
                    properties: {
                        current_step: {
                            type: "integer",
                            description: "Execution step\n\n\n\n{\"3000\":\"Capturing panorama has not started or is finished\",\"3002\":\"Panorama photo capturing in progress\",\"3005\":\"Panorama photo stitching in progress\"}",
                            enum: [
                                3000,
                                3002,
                                3005
                            ]
                        },
                        percent: {
                            type: "integer",
                            description: "Progress value\n\n"
                        }
                    }
                },
                ext: {
                    type: "object",
                    description: "Extended content\n\n",
                    properties: {
                        camera_mode: {
                            type: "integer",
                            description: "Current camera mode\n\n\n\n{\"3\":\"Panoramic photography\"}",
                            enum: [
                                3
                            ]
                        }
                    }
                }
            }
        },
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPhotoTakeProgress_UP_TYPE {
    /**
     * Output
     *
     *
     */
    output?: {
        status?: undefined;
        /**
         * Progress
         *
         *
         */
        progress?: {
            /**
             * Execution step
             *
             *
             *
             * {"3000":"Capturing panorama has not started or is finished","3002":"Panorama photo capturing in progress","3005":"Panorama photo stitching in progress"}
             */
            current_step?: 3000 | 3002 | 3005;
            /**
             * Progress value
             *
             *
             */
            percent?: number;
            [k: string]: unknown;
        };
        /**
         * Extended content
         *
         *
         */
        ext?: {
            /**
             * Current camera mode
             *
             *
             *
             * {"3":"Panoramic photography"}
             */
            camera_mode?: 3;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    };
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPointFocusActionDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPointFocusAction_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraPointFocusActionDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        x: {
            type: "number",
            description: "Focus point coordinate x\n\nCoordinate x with the upper left corner of the lens as the origin, horizontal direction.\n\nnull"
        },
        y: {
            type: "number",
            description: "Focus point coordinate y\n\nCoordinate y with the upper left corner of the lens as the origin, vertical direction.\n\nnull"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraPointFocusAction_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Focus point coordinate x
     *
     * Coordinate x with the upper left corner of the lens as the origin, horizontal direction.
     *
     * null
     */
    x?: number;
    /**
     * Focus point coordinate y
     *
     * Coordinate y with the upper left corner of the lens as the origin, vertical direction.
     *
     * null
     */
    y?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraRecordingStartDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraRecordingStart_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraRecordingStartDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraRecordingStart_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraRecordingStopDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraRecordingStop_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraRecordingStopDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraRecordingStop_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraScreenDragDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraScreenDrag_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraScreenDragDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        pitch_speed: {
            type: "number",
            description: "Gimbal pitch speed\n\nGimbal pitch speed\n\nDegree per second / degree/s"
        },
        yaw_speed: {
            type: "number",
            description: "Gimbal yaw speed\n\nGimbal yaw speed, effective only when the aircraft head is not locked.\n\nDegree per second / degree/s"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraScreenDrag_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Gimbal pitch speed
     *
     * Gimbal pitch speed
     *
     * Degree per second / degree/s
     */
    pitch_speed?: number;
    /**
     * Gimbal yaw speed
     *
     * Gimbal yaw speed, effective only when the aircraft head is not locked.
     *
     * Degree per second / degree/s
     */
    yaw_speed?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraScreenSplitDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraScreenSplit_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCameraScreenSplitDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        enable: {
            type: "boolean",
            description: "Whether to enable split screen\n\nEnable or disable split screen"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCameraScreenSplit_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Whether to enable split screen
     *
     * Enable or disable split screen
     */
    enable?: boolean;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCloudControlAuthNotifyUp_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        },
        output: {
            type: "object",
            description: "Output\n\n",
            properties: {}
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCloudControlAuthNotify_UP_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    /**
     * Output
     *
     *
     */
    output?: {
        status?: undefined;
        [k: string]: unknown;
    };
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCloudControlAuthRequestDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCloudControlAuthRequest_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCloudControlAuthRequestDown_SCHEMA = {
    type: "object",
    properties: {
        user_id: {
            type: "string",
            description: "User ID\n\nThe user ID of the cloud user requesting authorization."
        },
        user_callsign: {
            type: "string",
            description: "User Callsign\n\nThe nickname of the cloud user requesting authorization."
        },
        control_keys: {
            type: "array",
            description: "Control Keys\n\nTo request flight control authorization, please fill in \"flight\"."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCloudControlAuthRequest_DOWN_TYPE {
    /**
     * User ID
     *
     * The user ID of the cloud user requesting authorization.
     */
    user_id?: string;
    /**
     * User Callsign
     *
     * The nickname of the cloud user requesting authorization.
     */
    user_callsign?: string;
    /**
     * Control Keys
     *
     * To request flight control authorization, please fill in "flight".
     *
     * @minItems undefined
     * @maxItems undefined
     */
    control_keys?: unknown[];
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCloudControlReleaseDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCloudControlRelease_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsCloudControlReleaseDown_SCHEMA = {
    type: "object",
    properties: {
        control_keys: {
            type: "array",
            description: "Control key list\n\nList of control keys to release. \"flight\" represents flight control authority."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsCloudControlRelease_DOWN_TYPE {
    /**
     * Control key list
     *
     * List of control keys to release. "flight" represents flight control authority.
     *
     * @minItems undefined
     * @maxItems undefined
     */
    control_keys?: unknown[];
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsDelayInfoPushUp_SCHEMA = {
    type: "object",
    properties: {
        sdr_cmd_delay: {
            type: "integer",
            description: "Delay in the transmission protocol command link\n\nDelay in the transmission protocol command link\n\nMilliseconds / ms"
        },
        liveview_delay_list: {
            type: "array",
            description: "Video transmission video stream delay\n\nVideo transmission video stream delay, multiple streams",
            items: {
                type: "object",
                properties: {
                    video_id: {
                        type: "string",
                        description: "Stream number\n\nStream number"
                    },
                    liveview_delay_time: {
                        type: "integer",
                        description: "Stream delay\n\nStream delay\n\nMilliseconds / ms"
                    }
                }
            }
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsDelayInfoPush_UP_TYPE {
    /**
     * Delay in the transmission protocol command link
     *
     * Delay in the transmission protocol command link
     *
     * Milliseconds / ms
     */
    sdr_cmd_delay?: number;
    /**
     * Video transmission video stream delay
     *
     * Video transmission video stream delay, multiple streams
     *
     * @minItems undefined
     * @maxItems undefined
     */
    liveview_delay_list?: {
        /**
         * Stream number
         *
         * Stream number
         */
        video_id?: string;
        /**
         * Stream delay
         *
         * Stream delay
         *
         * Milliseconds / ms
         */
        liveview_delay_time?: number;
        [k: string]: unknown;
    }[];
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsDrcModeEnterDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsDrcModeEnter_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsDrcModeEnterDown_SCHEMA = {
    type: "object",
    properties: {
        mqtt_broker: {
            type: "object",
            description: "Broker connection information\n\nGet the address and authentication information of the MQTT relay service",
            properties: {
                address: {
                    type: "string",
                    description: "Server connection address\n\nServer connection address, for example, 192.0.2.1:8883, mqtt.dji.com:8883"
                },
                client_id: {
                    type: "string",
                    description: "Client ID\n\n{\"code\":\"drc-4J4R101\",\"#text\":\"Customizable MQTT client ID. It is recommended to use the device's serial number (SN code). It can also be combined with a meaningful prefix, such as\"}"
                },
                username: {
                    type: "string",
                    description: "User name\n\nUsername used when establishing a connection"
                },
                password: {
                    type: "string",
                    description: "Password\n\nPassword required for authentication when establishing a connection"
                },
                expire_time: {
                    type: "integer",
                    description: "Authentication information expiration time\n\nAuthentication information can be reused within the validity period. The expiration of authentication information does not affect devices that have already established a connection.\n\nSeconds / s"
                },
                enable_tls: {
                    type: "boolean",
                    description: "Whether to enable TLS\n\nEnable TLS, i.e., encrypt the MQTT link"
                }
            }
        },
        osd_frequency: {
            type: "integer",
            description: "OSD frequency\n\nSet OSD reporting frequency\n\nHertz / Hz"
        },
        hsi_frequency: {
            type: "integer",
            description: "HSI frequency\n\nSet HSI reporting frequency\n\nHertz / Hz"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsDrcModeEnter_DOWN_TYPE {
    /**
     * Broker connection information
     *
     * Get the address and authentication information of the MQTT relay service
     */
    mqtt_broker?: {
        /**
         * Server connection address
         *
         * Server connection address, for example, 192.0.2.1:8883, mqtt.dji.com:8883
         */
        address?: string;
        /**
         * Client ID
         *
         * {"code":"drc-4J4R101","#text":"Customizable MQTT client ID. It is recommended to use the device's serial number (SN code). It can also be combined with a meaningful prefix, such as"}
         */
        client_id?: string;
        /**
         * User name
         *
         * Username used when establishing a connection
         */
        username?: string;
        /**
         * Password
         *
         * Password required for authentication when establishing a connection
         */
        password?: string;
        /**
         * Authentication information expiration time
         *
         * Authentication information can be reused within the validity period. The expiration of authentication information does not affect devices that have already established a connection.
         *
         * Seconds / s
         */
        expire_time?: number;
        /**
         * Whether to enable TLS
         *
         * Enable TLS, i.e., encrypt the MQTT link
         */
        enable_tls?: boolean;
        [k: string]: unknown;
    };
    /**
     * OSD frequency
     *
     * Set OSD reporting frequency
     *
     * Hertz / Hz
     */
    osd_frequency?: number;
    /**
     * HSI frequency
     *
     * Set HSI reporting frequency
     *
     * Hertz / Hz
     */
    hsi_frequency?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsDrcStatusNotifyUp_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        },
        drc_state: {
            type: "integer",
            description: "Live flight controls state\n\n\n\n{\"0\":\"Not connected\",\"1\":\"Connecting\",\"2\":\"Connected\"}",
            enum: [
                0,
                1,
                2
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsDrcStatusNotify_UP_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    /**
     * Live flight controls state
     *
     *
     *
     * {"0":"Not connected","1":"Connecting","2":"Connected"}
     */
    drc_state?: 0 | 1 | 2;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsGimbalResetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsGimbalReset_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsGimbalResetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Payload index\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        reset_mode: {
            type: "integer",
            description: "Reset mode type\n\n\n\n{\"0\":\"Reset\",\"1\":\"Downward\",\"2\":\"Gimbal pan recenter\",\"3\":\"Gimbal pitch downward\"}",
            enum: [
                0,
                1,
                2,
                3
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsGimbalReset_DOWN_TYPE {
    /**
     * Payload index
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Payload index. Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Reset mode type
     *
     *
     *
     * {"0":"Reset","1":"Downward","2":"Gimbal pan recenter","3":"Gimbal pitch downward"}
     */
    reset_mode?: 0 | 1 | 2 | 3;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsHeartBeatDown_SCHEMA = {
    type: "object",
    properties: {
        seq: {
            type: "integer",
            description: "[Deprecated]Command sequence number\n\nIncremental sequence number to ensure the sequential execution of commands"
        },
        timestamp: {
            type: "integer",
            description: "Heartbeat transmission timestamp\n\n{\"code\":\"heart_beat\",\"#text\":\"Theprotocol can determine whether the DRC link is active or not. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal, and a retry can be initiated. If no heartbeat protocol is received for more than one minute, the device will consider the DRC link idle and exit the DRC link.\"}\n\nMilliseconds / ms"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsHeartBeat_DOWN_TYPE {
    /**
     * [Deprecated]Command sequence number
     *
     * Incremental sequence number to ensure the sequential execution of commands
     */
    seq?: number;
    /**
     * Heartbeat transmission timestamp
     *
     * {"code":"heart_beat","#text":"Theprotocol can determine whether the DRC link is active or not. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal, and a retry can be initiated. If no heartbeat protocol is received for more than one minute, the device will consider the DRC link idle and exit the DRC link."}
     *
     * Milliseconds / ms
     */
    timestamp?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsHeartBeatUp_SCHEMA = {
    type: "object",
    properties: {
        seq: {
            type: "integer",
            description: "[Deprecated]Command sequence number\n\nIncremental sequence number to ensure the sequential execution of commands"
        },
        timestamp: {
            type: "integer",
            description: "Heartbeat transmission timestamp\n\n{\"code\":\"heart_beat\",\"#text\":\"Theprotocol can determine whether the DRC link is active or not. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal, and a retry can be initiated. If no heartbeat protocol is received for more than one minute, the device will consider the DRC link idle and exit the DRC link.\"}\n\nMilliseconds / ms"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsHeartBeat_UP_TYPE {
    /**
     * [Deprecated]Command sequence number
     *
     * Incremental sequence number to ensure the sequential execution of commands
     */
    seq?: number;
    /**
     * Heartbeat transmission timestamp
     *
     * {"code":"heart_beat","#text":"Theprotocol can determine whether the DRC link is active or not. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal, and a retry can be initiated. If no heartbeat protocol is received for more than one minute, the device will consider the DRC link idle and exit the DRC link."}
     *
     * Milliseconds / ms
     */
    timestamp?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsHsiInfoPushUp_SCHEMA = {
    type: "object",
    properties: {
        up_distance: {
            type: "integer",
            description: "Upward obstacle distance\n\nUpward obstacle distance\n\nMillimeters / mm"
        },
        down_distance: {
            type: "integer",
            description: "Downward obstacle distance\n\nDownward obstacle distance\n\nMillimeters / mm"
        },
        up_enable: {
            type: "boolean",
            description: "Upward obstacle sensing switch state\n\nUpward obstacle sensing switch state"
        },
        up_work: {
            type: "boolean",
            description: "Upward obstacle sensing work state\n\nUpward obstacle sensing work state"
        },
        down_enable: {
            type: "boolean",
            description: "Downward obstacle sensing switch state\n\nDownward obstacle sensing switch state"
        },
        down_work: {
            type: "boolean",
            description: "Downward obstacle sensing work state\n\nDownward obstacle sensing work state"
        },
        around_distances: {
            type: "array",
            description: "Distances to surrounding obstacles\n\nDistances to surrounding obstacles"
        },
        left_enable: {
            type: "boolean",
            description: "Left obstacle sensing switch state\n\n"
        },
        left_work: {
            type: "boolean",
            description: "Left obstacle sensing working state\n\n"
        },
        right_enable: {
            type: "boolean",
            description: "Right obstacle sensing switch state\n\n"
        },
        right_work: {
            type: "boolean",
            description: "Right obstacle sensing working state\n\n"
        },
        front_enable: {
            type: "boolean",
            description: "Forward obstacle sensing switch state\n\n"
        },
        front_work: {
            type: "boolean",
            description: "Forward obstacle sensing working state\n\n"
        },
        back_enable: {
            type: "boolean",
            description: "Backward obstacle sensing switch state\n\n"
        },
        back_work: {
            type: "boolean",
            description: "Backward obstacle sensing working state\n\n"
        },
        vertical_enable: {
            type: "boolean",
            description: "Vertical obstacle sensing switch state\n\n"
        },
        vertical_work: {
            type: "boolean",
            description: "Vertical obstacle sensing working state\n\n"
        },
        horizontal_enable: {
            type: "boolean",
            description: "Horizontal obstacle sensing switch state\n\n"
        },
        horizontal_work: {
            type: "boolean",
            description: "Horizontal obstacle sensing work state\n\n"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsHsiInfoPush_UP_TYPE {
    /**
     * Upward obstacle distance
     *
     * Upward obstacle distance
     *
     * Millimeters / mm
     */
    up_distance?: number;
    /**
     * Downward obstacle distance
     *
     * Downward obstacle distance
     *
     * Millimeters / mm
     */
    down_distance?: number;
    /**
     * Upward obstacle sensing switch state
     *
     * Upward obstacle sensing switch state
     */
    up_enable?: boolean;
    /**
     * Upward obstacle sensing work state
     *
     * Upward obstacle sensing work state
     */
    up_work?: boolean;
    /**
     * Downward obstacle sensing switch state
     *
     * Downward obstacle sensing switch state
     */
    down_enable?: boolean;
    /**
     * Downward obstacle sensing work state
     *
     * Downward obstacle sensing work state
     */
    down_work?: boolean;
    /**
     * Distances to surrounding obstacles
     *
     * Distances to surrounding obstacles
     *
     * @minItems undefined
     * @maxItems undefined
     */
    around_distances?: unknown[];
    /**
     * Left obstacle sensing switch state
     *
     *
     */
    left_enable?: boolean;
    /**
     * Left obstacle sensing working state
     *
     *
     */
    left_work?: boolean;
    /**
     * Right obstacle sensing switch state
     *
     *
     */
    right_enable?: boolean;
    /**
     * Right obstacle sensing working state
     *
     *
     */
    right_work?: boolean;
    /**
     * Forward obstacle sensing switch state
     *
     *
     */
    front_enable?: boolean;
    /**
     * Forward obstacle sensing working state
     *
     *
     */
    front_work?: boolean;
    /**
     * Backward obstacle sensing switch state
     *
     *
     */
    back_enable?: boolean;
    /**
     * Backward obstacle sensing working state
     *
     *
     */
    back_work?: boolean;
    /**
     * Vertical obstacle sensing switch state
     *
     *
     */
    vertical_enable?: boolean;
    /**
     * Vertical obstacle sensing working state
     *
     *
     */
    vertical_work?: boolean;
    /**
     * Horizontal obstacle sensing switch state
     *
     *
     */
    horizontal_enable?: boolean;
    /**
     * Horizontal obstacle sensing work state
     *
     *
     */
    horizontal_work?: boolean;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringAreaSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringAreaSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringAreaSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        x: {
            type: "number",
            description: "Temperature area coordinate x of the upper left corner\n\nHorizontal direction x with the upper left corner of the lens as the coordinate center\n\nUNKNOWN"
        },
        y: {
            type: "number",
            description: "Temperature area coordinate y of the upper left corner\n\nVertical direction y with the upper left corner of the lens as the coordinate center\n\nUNKNOWN"
        },
        width: {
            type: "number",
            description: "Width of the temperature area\n\n\n\nUNKNOWN"
        },
        height: {
            type: "number",
            description: "Height of the temperature area\n\n\n\nUNKNOWN"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringAreaSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Temperature area coordinate x of the upper left corner
     *
     * Horizontal direction x with the upper left corner of the lens as the coordinate center
     *
     * UNKNOWN
     */
    x?: number;
    /**
     * Temperature area coordinate y of the upper left corner
     *
     * Vertical direction y with the upper left corner of the lens as the coordinate center
     *
     * UNKNOWN
     */
    y?: number;
    /**
     * Width of the temperature area
     *
     *
     *
     * UNKNOWN
     */
    width?: number;
    /**
     * Height of the temperature area
     *
     *
     *
     * UNKNOWN
     */
    height?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringModeSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringModeSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringModeSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        mode: {
            type: "integer",
            description: "Temperature mode\n\n\n\n{\"0\":\"Turn off temperature measurement\",\"1\":\"Point temperature measurement\",\"2\":\"Area temperature measurement\"}",
            enum: [
                0,
                1,
                2
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringModeSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Temperature mode
     *
     *
     *
     * {"0":"Turn off temperature measurement","1":"Point temperature measurement","2":"Area temperature measurement"}
     */
    mode?: 0 | 1 | 2;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringPointSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringPointSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsIrMeteringPointSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        x: {
            type: "number",
            description: "Temperature point coordinate x\n\nCoordinates x of temperature point with the upper left corner of the lens as the coordinate center, horizontal direction as x\n\nnull"
        },
        y: {
            type: "number",
            description: "Temperature point coordinate y\n\nCoordinates y of temperature point with the upper left corner of the lens as the coordinate center, vertical direction as y\n\nnull"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsIrMeteringPointSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Temperature point coordinate x
     *
     * Coordinates x of temperature point with the upper left corner of the lens as the coordinate center, horizontal direction as x
     *
     * null
     */
    x?: number;
    /**
     * Temperature point coordinate y
     *
     * Coordinates y of temperature point with the upper left corner of the lens as the coordinate center, vertical direction as y
     *
     * null
     */
    y?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsPhotoStorageSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsPhotoStorageSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsPhotoStorageSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        x: {
            type: "number",
            description: "Target coordinates x\n\nTarget coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x."
        },
        y: {
            type: "number",
            description: "Target coordinates y\n\nTarget coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsPhotoStorageSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Target coordinates x
     *
     * Target coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x.
     */
    x?: number;
    /**
     * Target coordinates y
     *
     * Target coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y.
     */
    y?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsVideoStorageSetDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsVideoStorageSet_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveFlightControlsVideoStorageSetDown_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        locked: {
            type: "boolean",
            description: "Whether the relative relationship between the aircraft's heading and the gimbal is locked\n\n"
        },
        x: {
            type: "number",
            description: "Target coordinates x\n\nTarget coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x."
        },
        y: {
            type: "number",
            description: "Target coordinates y\n\nTarget coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y."
        }
    }
}

export interface MqttRcProEnterpriseLiveFlightControlsVideoStorageSet_DOWN_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    camera_type?: undefined;
    /**
     * Whether the relative relationship between the aircraft's heading and the gimbal is locked
     *
     *
     */
    locked?: boolean;
    /**
     * Target coordinates x
     *
     * Target coordinates x, with the upper-left corner of the lens as the coordinate center, and the horizontal direction as x.
     */
    x?: number;
    /**
     * Target coordinates y
     *
     * Target coordinates y, with the upper-left corner of the lens as the coordinate center, and the vertical direction as y.
     */
    y?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveLensChangeDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveLensChange_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveLensChangeDown_SCHEMA = {
    type: "object",
    properties: {
        video_id: {
            type: "string",
            description: "ID of the live streaming video stream\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveLensChange_DOWN_TYPE {
    /**
     * ID of the live streaming video stream
     *
     * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
     */
    video_id?: string;
    video_type?: undefined;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveSetQualityDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveSetQuality_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveSetQualityDown_SCHEMA = {
    type: "object",
    properties: {
        video_id: {
            type: "string",
            description: "ID of the live streaming video stream\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
        },
        video_quality: {
            type: "integer",
            description: "Live streaming quality\n\nThe resolutions and bitrates for different video qualities are as follows: Fluent: 960 * 540, 512Kbps; Standard Definition (SD): 1280 * 720, 1Mbps; High Definition (HD): 1280 * 720, 1.5Mbps; Ultra High Definition (UHD): 1920 * 1080, 3Mbps.\n\n{\"0\":\"Adaptive\",\"1\":\"Smooth\",\"2\":\"Standard definition\",\"3\":\"High definition\",\"4\":\"Ultra-high definition\"}",
            enum: [
                0,
                1,
                2,
                3,
                4
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveSetQuality_DOWN_TYPE {
    /**
     * ID of the live streaming video stream
     *
     * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
     */
    video_id?: string;
    /**
     * Live streaming quality
     *
     * The resolutions and bitrates for different video qualities are as follows: Fluent: 960 * 540, 512Kbps; Standard Definition (SD): 1280 * 720, 1Mbps; High Definition (HD): 1280 * 720, 1.5Mbps; Ultra High Definition (UHD): 1920 * 1080, 3Mbps.
     *
     * {"0":"Adaptive","1":"Smooth","2":"Standard definition","3":"High definition","4":"Ultra-high definition"}
     */
    video_quality?: 0 | 1 | 2 | 3 | 4;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveStartPushDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveStartPush_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveStartPushDown_SCHEMA = {
    type: "object",
    properties: {
        url_type: {
            type: "integer",
            description: "Live streaming protocol type\n\n\n\n{\"0\":\"Agora\",\"1\":\"RTMP\",\"3\":\"GB28181\"}",
            enum: [
                0,
                1,
                3
            ]
        },
        url: {
            type: "string",
            description: "Live streaming parameters\n\nRTMP: (rtmp://xxxxxxx, example: rtmp://192.168.1.1:8080/live). GB28181: (serverIP&serverPort&serverID&agentID&agentPassword&localPort&channel, example: serverIP=192.168.1.1&serverPort=8080&serverID=34000000000000000000&agentID=300000000010000000000&agentPassword=0000000&localPort=7060&channel=340000000000000000000). Agora: (channel&sn&token&uid, example: channel=1ZNDH360010162_39-0-7&sn=1ZNDH360010162&token=006dca67721582a48768ec4d817b7b25a86IAB4cw2JgN6iX8BpTPdc3e4S1Iendz94IFJ56aSXKvzAJei27MqF2zyCIgCLIIoBt41+YAQAAQC3jX5gAgC3jX5gAwC3jX5gBAC3jX5g&uid=50000). Note: Agora-generated tokens may contain special characters like '+', which need to be URL-encoded once. Otherwise, the Pilot side may encounter parsing errors."
        },
        video_id: {
            type: "string",
            description: "ID of the live streaming video stream\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
        },
        video_quality: {
            type: "integer",
            description: "Live streaming quality\n\nThe resolutions and bitrates for different video qualities are as follows: Fluent: 960 * 540, 512Kbps; Standard Definition (SD): 1280 * 720, 1Mbps; High Definition (HD): 1280 * 720, 1.5Mbps; Ultra High Definition (UHD): 1920 * 1080, 3Mbps.\n\n{\"0\":\"Adaptive\",\"1\":\"Smooth\",\"2\":\"Standard definition\",\"3\":\"High definition\",\"4\":\"Ultra-high definition\"}",
            enum: [
                0,
                1,
                2,
                3,
                4
            ]
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveStartPush_DOWN_TYPE {
    /**
     * Live streaming protocol type
     *
     *
     *
     * {"0":"Agora","1":"RTMP","3":"GB28181"}
     */
    url_type?: 0 | 1 | 3;
    /**
     * Live streaming parameters
     *
     * RTMP: (rtmp://xxxxxxx, example: rtmp://192.168.1.1:8080/live). GB28181: (serverIP&serverPort&serverID&agentID&agentPassword&localPort&channel, example: serverIP=192.168.1.1&serverPort=8080&serverID=34000000000000000000&agentID=300000000010000000000&agentPassword=0000000&localPort=7060&channel=340000000000000000000). Agora: (channel&sn&token&uid, example: channel=1ZNDH360010162_39-0-7&sn=1ZNDH360010162&token=006dca67721582a48768ec4d817b7b25a86IAB4cw2JgN6iX8BpTPdc3e4S1Iendz94IFJ56aSXKvzAJei27MqF2zyCIgCLIIoBt41+YAQAAQC3jX5gAgC3jX5gAwC3jX5gBAC3jX5g&uid=50000). Note: Agora-generated tokens may contain special characters like '+', which need to be URL-encoded once. Otherwise, the Pilot side may encounter parsing errors.
     */
    url?: string;
    /**
     * ID of the live streaming video stream
     *
     * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
     */
    video_id?: string;
    /**
     * Live streaming quality
     *
     * The resolutions and bitrates for different video qualities are as follows: Fluent: 960 * 540, 512Kbps; Standard Definition (SD): 1280 * 720, 1Mbps; High Definition (HD): 1280 * 720, 1.5Mbps; Ultra High Definition (UHD): 1920 * 1080, 3Mbps.
     *
     * {"0":"Adaptive","1":"Smooth","2":"Standard definition","3":"High definition","4":"Ultra-high definition"}
     */
    video_quality?: 0 | 1 | 2 | 3 | 4;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveStopPushDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveStopPush_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseLiveStreamLiveStopPushDown_SCHEMA = {
    type: "object",
    properties: {
        video_id: {
            type: "string",
            description: "ID of the live streaming video stream\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
        }
    }
}

export interface MqttRcProEnterpriseLiveStreamLiveStopPush_DOWN_TYPE {
    /**
     * ID of the live streaming video stream
     *
     * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
     */
    video_id?: string;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseProperties_STABLE_FREQUENCY_SCHEMA = {
    type: "object",
    properties: {
        live_capacity: {
            type: "object",
            description: "Gateway device live streaming capability\n\n READONLY",
            properties: {
                available_video_number: {
                    type: "integer",
                    description: "Number of selectable streaming bitrates\n\n"
                },
                coexist_video_number_max: {
                    type: "integer",
                    description: "Maximum number of streams that can be simultaneously streamed\n\n"
                },
                device_list: {
                    type: "array",
                    description: "Selectable video device sources\n\nSelectable video device sources (device layer, such as aircraft)",
                    items: {
                        type: "object",
                        properties: {
                            sn: {
                                type: "string",
                                description: "Aircraft and other video source device serial number (SN)\n\n"
                            },
                            available_video_number: {
                                type: "integer",
                                description: "Number of streaming bitrates that can be selected for the serial number device\n\n"
                            },
                            coexist_video_number_max: {
                                type: "integer",
                                description: "The maximum number of streams that can be simultaneously streamed by the device with this serial number\n\n"
                            },
                            camera_list: {
                                type: "array",
                                description: "List of cameras on the device with the specified serial number\n\n",
                                items: {
                                    type: "object",
                                    properties: {
                                        camera_index: {
                                            type: "string",
                                            description: "Camera index\n\n{\"em\":\"{type-subtype-gimbalindex}\",\"#text\":\"Using the format\"}"
                                        },
                                        available_video_number: {
                                            type: "integer",
                                            description: "Number of streaming bitrates that can be selected for the camera level video source\n\n"
                                        },
                                        coexist_video_number_max: {
                                            type: "integer",
                                            description: "The maximum number of streams that can be simultaneously streamed for this camera level\n\n"
                                        },
                                        video_list: {
                                            type: "array",
                                            description: "List of streams that can be selected for this camera-level video source\n\n",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    video_index: {
                                                        type: "string",
                                                        description: "Index of the stream that can be selected for this camera-level video source\n\n"
                                                    },
                                                    video_type: {
                                                        type: "string",
                                                        description: "Types of streams that can be selected for this camera-level video source\n\n"
                                                    },
                                                    switchable_video_types: {
                                                        type: "array",
                                                        description: "Supported video camera types that the video stream can switch to\n\n"
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
        },
        country: {
            type: "string",
            description: "Country area code\n\n READONLY"
        },
        capacity_percent: {
            type: "integer",
            description: "Remaining capacity\n\nRemaining battery level of the remote control READONLY\n\nPercentage / %"
        },
        height: {
            type: "number",
            description: "Ellipsoid height\n\n READONLY\n\nMeters / m"
        },
        dongle_infos: {
            type: "array",
            description: "4G Dongle information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    imei: {
                        type: "string",
                        description: "dongle imei\n\nUnique identifier for the Dongle READONLY"
                    },
                    dongle_type: {
                        type: "integer",
                        description: "Dongle type\n\nDongle type READONLY\n\n{\"6\":\"Old Dongle\",\"10\":\"New Dongle with eSIM support\"}",
                        enum: [
                            6,
                            10
                        ]
                    },
                    eid: {
                        type: "string",
                        description: "dongle eid\n\nUnique identifier for eSIM, used for public account query of plans and service purchase READONLY"
                    },
                    esim_activate_state: {
                        type: "integer",
                        description: "eSIM activation state\n\nRequires activation to use READONLY\n\n{\"0\":\"Not activated\",\"1\":\"Activated\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_card_state: {
                        type: "integer",
                        description: "SIM card state\n\nInsertion state of the physical SIM card in the dongle READONLY\n\n{\"0\":\"Not inserted\",\"1\":\"Inserted\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_slot: {
                        type: "integer",
                        description: "SIM card slot enable state\n\nIdentifies the SIM card slot currently in use by the dongle READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Physical SIM card\",\"2\":\"eSIM\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    esim_infos: {
                        type: "array",
                        description: "eSIM information\n\n READONLY",
                        items: {
                            type: "object",
                            properties: {
                                telecom_operator: {
                                    type: "integer",
                                    description: "Supported operators\n\nTelecom operators supported by eSIM READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                    enum: [
                                        0,
                                        1,
                                        2,
                                        3
                                    ]
                                },
                                enabled: {
                                    type: "boolean",
                                    description: "eSIM enable state\n\nOnly one eSIM can be enabled at a time READONLY"
                                },
                                iccid: {
                                    type: "string",
                                    description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                                }
                            }
                        }
                    },
                    sim_info: {
                        type: "object",
                        description: "SIM card information\n\nInformation about the physical SIM card that can be inserted into the dongle READONLY",
                        properties: {
                            telecom_operator: {
                                type: "integer",
                                description: "Supported operators\n\nTelecom operator supported by the SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                enum: [
                                    0,
                                    1,
                                    2,
                                    3
                                ]
                            },
                            sim_type: {
                                type: "integer",
                                description: "SIM card type\n\nType of physical SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Other regular SIM card\",\"2\":\"Three-network card\"}",
                                enum: [
                                    0,
                                    1,
                                    2
                                ]
                            },
                            iccid: {
                                type: "string",
                                description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                            }
                        }
                    }
                }
            }
        },
        live_status: {
            type: "array",
            description: "Gateway's current overall live streaming state push\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    video_id: {
                        type: "string",
                        description: "Live streaming identifier\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
                    },
                    video_type: {
                        type: "string",
                        description: "Video type\n\nIndicates the type of video lens, such as normal/wide/zoom/infrared, etc."
                    },
                    video_quality: {
                        type: "integer",
                        description: "Quality of the live streaming\n\n\n\n{\"0\":\"Adaptive\",\"1\":\"Smooth\",\"2\":\"Standard definition\",\"3\":\"High definition\",\"4\":\"Ultra-high definition\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    status: {
                        type: "integer",
                        description: "Live streaming state\n\n\n\n{\"0\":\"Not live streaming\",\"1\":\"In live streaming\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    error_status: {
                        type: "integer",
                        description: "Error code\n\n"
                    }
                }
            }
        },
        wireless_link: {
            type: "object",
            description: "Image transmission link\n\n READONLY",
            properties: {
                dongle_number: {
                    type: "integer",
                    description: "Number of Dongles on the aircraft\n\n"
                },
                "4g_link_state": {
                    type: "integer",
                    description: "4G link connection state\n\n\n\n{\"0\":\"Disconnected\",\"1\":\"Connected\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                sdr_link_state: {
                    type: "integer",
                    description: "SDR link connection state\n\n\n\n{\"0\":\"Disconnected\",\"1\":\"Connected\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                link_workmode: {
                    type: "integer",
                    description: "Dock's video transmission link mode\n\n\n\n{\"0\":\"SDR Mode\",\"1\":\"4G Fusion Mode\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                sdr_quality: {
                    type: "integer",
                    description: "SDR signal quality\n\n"
                },
                "4g_quality": {
                    type: "integer",
                    description: "Overall 4G signal quality\n\n"
                },
                "4g_uav_quality": {
                    type: "integer",
                    description: "Sky-side 4G signal quality\n\nSignal quality between aircraft and 4G server"
                },
                "4g_gnd_quality": {
                    type: "integer",
                    description: "Ground-side 4G signal quality\n\nSignal quality between ground devices (for example, remote controller, DJI Dock, etc.) and 4G server"
                },
                sdr_freq_band: {
                    type: "number",
                    description: "SDR frequency band\n\n"
                },
                "4g_freq_band": {
                    type: "number",
                    description: "4G frequency band\n\n"
                }
            }
        },
        firmware_version: {
            type: "string",
            description: "Firmware version\n\n READONLY"
        },
        latitude: {
            type: "number",
            description: "Latitude\n\n READONLY"
        },
        longitude: {
            type: "number",
            description: "Longitude\n\nLongitude of the gateway device READONLY"
        }
    }
}

export interface MqttRcProEnterpriseProperties_STABLE_FREQUENCY_TYPE {
    /**
     * Gateway device live streaming capability
     *
     *  READONLY
     */
    live_capacity?: {
        /**
         * Number of selectable streaming bitrates
         *
         *
         */
        available_video_number?: number;
        /**
         * Maximum number of streams that can be simultaneously streamed
         *
         *
         */
        coexist_video_number_max?: number;
        /**
         * Selectable video device sources
         *
         * Selectable video device sources (device layer, such as aircraft)
         *
         * @minItems undefined
         * @maxItems undefined
         */
        device_list?: {
            /**
             * Aircraft and other video source device serial number (SN)
             *
             *
             */
            sn?: string;
            /**
             * Number of streaming bitrates that can be selected for the serial number device
             *
             *
             */
            available_video_number?: number;
            /**
             * The maximum number of streams that can be simultaneously streamed by the device with this serial number
             *
             *
             */
            coexist_video_number_max?: number;
            /**
             * List of cameras on the device with the specified serial number
             *
             *
             *
             * @minItems undefined
             * @maxItems undefined
             */
            camera_list?: {
                /**
                 * Camera index
                 *
                 * {"em":"{type-subtype-gimbalindex}","#text":"Using the format"}
                 */
                camera_index?: string;
                /**
                 * Number of streaming bitrates that can be selected for the camera level video source
                 *
                 *
                 */
                available_video_number?: number;
                /**
                 * The maximum number of streams that can be simultaneously streamed for this camera level
                 *
                 *
                 */
                coexist_video_number_max?: number;
                /**
                 * List of streams that can be selected for this camera-level video source
                 *
                 *
                 *
                 * @minItems undefined
                 * @maxItems undefined
                 */
                video_list?: {
                    /**
                     * Index of the stream that can be selected for this camera-level video source
                     *
                     *
                     */
                    video_index?: string;
                    /**
                     * Types of streams that can be selected for this camera-level video source
                     *
                     *
                     */
                    video_type?: string;
                    /**
                     * Supported video camera types that the video stream can switch to
                     *
                     *
                     *
                     * @minItems undefined
                     * @maxItems undefined
                     */
                    switchable_video_types?: unknown[];
                    [k: string]: unknown;
                }[];
                [k: string]: unknown;
            }[];
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Country area code
     *
     *  READONLY
     */
    country?: string;
    /**
     * Remaining capacity
     *
     * Remaining battery level of the remote control READONLY
     *
     * Percentage / %
     */
    capacity_percent?: number;
    /**
     * Ellipsoid height
     *
     *  READONLY
     *
     * Meters / m
     */
    height?: number;
    /**
     * 4G Dongle information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    dongle_infos?: {
        /**
         * dongle imei
         *
         * Unique identifier for the Dongle READONLY
         */
        imei?: string;
        /**
         * Dongle type
         *
         * Dongle type READONLY
         *
         * {"6":"Old Dongle","10":"New Dongle with eSIM support"}
         */
        dongle_type?: 6 | 10;
        /**
         * dongle eid
         *
         * Unique identifier for eSIM, used for public account query of plans and service purchase READONLY
         */
        eid?: string;
        /**
         * eSIM activation state
         *
         * Requires activation to use READONLY
         *
         * {"0":"Not activated","1":"Activated"}
         */
        esim_activate_state?: 0 | 1;
        /**
         * SIM card state
         *
         * Insertion state of the physical SIM card in the dongle READONLY
         *
         * {"0":"Not inserted","1":"Inserted"}
         */
        sim_card_state?: 0 | 1;
        /**
         * SIM card slot enable state
         *
         * Identifies the SIM card slot currently in use by the dongle READONLY
         *
         * {"0":"Unknown","1":"Physical SIM card","2":"eSIM"}
         */
        sim_slot?: 0 | 1 | 2;
        /**
         * eSIM information
         *
         *  READONLY
         *
         * @minItems undefined
         * @maxItems undefined
         */
        esim_infos?: {
            /**
             * Supported operators
             *
             * Telecom operators supported by eSIM READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * eSIM enable state
             *
             * Only one eSIM can be enabled at a time READONLY
             */
            enabled?: boolean;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        }[];
        /**
         * SIM card information
         *
         * Information about the physical SIM card that can be inserted into the dongle READONLY
         */
        sim_info?: {
            /**
             * Supported operators
             *
             * Telecom operator supported by the SIM card READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * SIM card type
             *
             * Type of physical SIM card READONLY
             *
             * {"0":"Unknown","1":"Other regular SIM card","2":"Three-network card"}
             */
            sim_type?: 0 | 1 | 2;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * Gateway's current overall live streaming state push
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    live_status?: {
        /**
         * Live streaming identifier
         *
         * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
         */
        video_id?: string;
        /**
         * Video type
         *
         * Indicates the type of video lens, such as normal/wide/zoom/infrared, etc.
         */
        video_type?: string;
        /**
         * Quality of the live streaming
         *
         *
         *
         * {"0":"Adaptive","1":"Smooth","2":"Standard definition","3":"High definition","4":"Ultra-high definition"}
         */
        video_quality?: 0 | 1 | 2 | 3 | 4;
        /**
         * Live streaming state
         *
         *
         *
         * {"0":"Not live streaming","1":"In live streaming"}
         */
        status?: 0 | 1;
        /**
         * Error code
         *
         *
         */
        error_status?: number;
        [k: string]: unknown;
    }[];
    /**
     * Image transmission link
     *
     *  READONLY
     */
    wireless_link?: {
        /**
         * Number of Dongles on the aircraft
         *
         *
         */
        dongle_number?: number;
        /**
         * 4G link connection state
         *
         *
         *
         * {"0":"Disconnected","1":"Connected"}
         */
        "4g_link_state"?: 0 | 1;
        /**
         * SDR link connection state
         *
         *
         *
         * {"0":"Disconnected","1":"Connected"}
         */
        sdr_link_state?: 0 | 1;
        /**
         * Dock's video transmission link mode
         *
         *
         *
         * {"0":"SDR Mode","1":"4G Fusion Mode"}
         */
        link_workmode?: 0 | 1;
        /**
         * SDR signal quality
         *
         *
         */
        sdr_quality?: number;
        /**
         * Overall 4G signal quality
         *
         *
         */
        "4g_quality"?: number;
        /**
         * Sky-side 4G signal quality
         *
         * Signal quality between aircraft and 4G server
         */
        "4g_uav_quality"?: number;
        /**
         * Ground-side 4G signal quality
         *
         * Signal quality between ground devices (for example, remote controller, DJI Dock, etc.) and 4G server
         */
        "4g_gnd_quality"?: number;
        /**
         * SDR frequency band
         *
         *
         */
        sdr_freq_band?: number;
        /**
         * 4G frequency band
         *
         *
         */
        "4g_freq_band"?: number;
        [k: string]: unknown;
    };
    /**
     * Firmware version
     *
     *  READONLY
     */
    firmware_version?: string;
    /**
     * Latitude
     *
     *  READONLY
     */
    latitude?: number;
    /**
     * Longitude
     *
     * Longitude of the gateway device READONLY
     */
    longitude?: number;
    [k: string]: unknown;
}




export const MqttRcProEnterpriseProperties_STATE_CHANGE_SCHEMA = {
    type: "object",
    properties: {
        live_capacity: {
            type: "object",
            description: "Gateway device live streaming capability\n\n READONLY",
            properties: {
                available_video_number: {
                    type: "integer",
                    description: "Number of selectable streaming bitrates\n\n"
                },
                coexist_video_number_max: {
                    type: "integer",
                    description: "Maximum number of streams that can be simultaneously streamed\n\n"
                },
                device_list: {
                    type: "array",
                    description: "Selectable video device sources\n\nSelectable video device sources (device layer, such as aircraft)",
                    items: {
                        type: "object",
                        properties: {
                            sn: {
                                type: "string",
                                description: "Aircraft and other video source device serial number (SN)\n\n"
                            },
                            available_video_number: {
                                type: "integer",
                                description: "Number of streaming bitrates that can be selected for the serial number device\n\n"
                            },
                            coexist_video_number_max: {
                                type: "integer",
                                description: "The maximum number of streams that can be simultaneously streamed by the device with this serial number\n\n"
                            },
                            camera_list: {
                                type: "array",
                                description: "List of cameras on the device with the specified serial number\n\n",
                                items: {
                                    type: "object",
                                    properties: {
                                        camera_index: {
                                            type: "string",
                                            description: "Camera index\n\n{\"em\":\"{type-subtype-gimbalindex}\",\"#text\":\"Using the format\"}"
                                        },
                                        available_video_number: {
                                            type: "integer",
                                            description: "Number of streaming bitrates that can be selected for the camera level video source\n\n"
                                        },
                                        coexist_video_number_max: {
                                            type: "integer",
                                            description: "The maximum number of streams that can be simultaneously streamed for this camera level\n\n"
                                        },
                                        video_list: {
                                            type: "array",
                                            description: "List of streams that can be selected for this camera-level video source\n\n",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    video_index: {
                                                        type: "string",
                                                        description: "Index of the stream that can be selected for this camera-level video source\n\n"
                                                    },
                                                    video_type: {
                                                        type: "string",
                                                        description: "Types of streams that can be selected for this camera-level video source\n\n"
                                                    },
                                                    switchable_video_types: {
                                                        type: "array",
                                                        description: "Supported video camera types that the video stream can switch to\n\n"
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
            },
            required: false
        },
        country: {
            type: "string",
            description: "Country area code\n\n READONLY",
            required: false
        },
        capacity_percent: {
            type: "integer",
            description: "Remaining capacity\n\nRemaining battery level of the remote control READONLY\n\nPercentage / %",
            required: false
        },
        height: {
            type: "number",
            description: "Ellipsoid height\n\n READONLY\n\nMeters / m",
            required: false
        },
        dongle_infos: {
            type: "array",
            description: "4G Dongle information\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    imei: {
                        type: "string",
                        description: "dongle imei\n\nUnique identifier for the Dongle READONLY"
                    },
                    dongle_type: {
                        type: "integer",
                        description: "Dongle type\n\nDongle type READONLY\n\n{\"6\":\"Old Dongle\",\"10\":\"New Dongle with eSIM support\"}",
                        enum: [
                            6,
                            10
                        ]
                    },
                    eid: {
                        type: "string",
                        description: "dongle eid\n\nUnique identifier for eSIM, used for public account query of plans and service purchase READONLY"
                    },
                    esim_activate_state: {
                        type: "integer",
                        description: "eSIM activation state\n\nRequires activation to use READONLY\n\n{\"0\":\"Not activated\",\"1\":\"Activated\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_card_state: {
                        type: "integer",
                        description: "SIM card state\n\nInsertion state of the physical SIM card in the dongle READONLY\n\n{\"0\":\"Not inserted\",\"1\":\"Inserted\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    sim_slot: {
                        type: "integer",
                        description: "SIM card slot enable state\n\nIdentifies the SIM card slot currently in use by the dongle READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Physical SIM card\",\"2\":\"eSIM\"}",
                        enum: [
                            0,
                            1,
                            2
                        ]
                    },
                    esim_infos: {
                        type: "array",
                        description: "eSIM information\n\n READONLY",
                        items: {
                            type: "object",
                            properties: {
                                telecom_operator: {
                                    type: "integer",
                                    description: "Supported operators\n\nTelecom operators supported by eSIM READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                    enum: [
                                        0,
                                        1,
                                        2,
                                        3
                                    ]
                                },
                                enabled: {
                                    type: "boolean",
                                    description: "eSIM enable state\n\nOnly one eSIM can be enabled at a time READONLY"
                                },
                                iccid: {
                                    type: "string",
                                    description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                                }
                            }
                        }
                    },
                    sim_info: {
                        type: "object",
                        description: "SIM card information\n\nInformation about the physical SIM card that can be inserted into the dongle READONLY",
                        properties: {
                            telecom_operator: {
                                type: "integer",
                                description: "Supported operators\n\nTelecom operator supported by the SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Mobile\",\"2\":\"China Unicom\",\"3\":\"Telecommunications\"}",
                                enum: [
                                    0,
                                    1,
                                    2,
                                    3
                                ]
                            },
                            sim_type: {
                                type: "integer",
                                description: "SIM card type\n\nType of physical SIM card READONLY\n\n{\"0\":\"Unknown\",\"1\":\"Other regular SIM card\",\"2\":\"Three-network card\"}",
                                enum: [
                                    0,
                                    1,
                                    2
                                ]
                            },
                            iccid: {
                                type: "string",
                                description: "sim iccid\n\nUnique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY"
                            }
                        }
                    }
                }
            },
            required: false
        },
        live_status: {
            type: "array",
            description: "Gateway's current overall live streaming state push\n\n READONLY",
            items: {
                type: "object",
                properties: {
                    video_id: {
                        type: "string",
                        description: "Live streaming identifier\n\n{\"em\":[\"{sn}/{camera_index}/{video_index}\",\"{sn}\",\"{camera_index}\",\"{type-subtype-gimbalindex}\",\"{video_index}\"],\"#text\":\"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level.\"}"
                    },
                    video_type: {
                        type: "string",
                        description: "Video type\n\nIndicates the type of video lens, such as normal/wide/zoom/infrared, etc."
                    },
                    video_quality: {
                        type: "integer",
                        description: "Quality of the live streaming\n\n\n\n{\"0\":\"Adaptive\",\"1\":\"Smooth\",\"2\":\"Standard definition\",\"3\":\"High definition\",\"4\":\"Ultra-high definition\"}",
                        enum: [
                            0,
                            1,
                            2,
                            3,
                            4
                        ]
                    },
                    status: {
                        type: "integer",
                        description: "Live streaming state\n\n\n\n{\"0\":\"Not live streaming\",\"1\":\"In live streaming\"}",
                        enum: [
                            0,
                            1
                        ]
                    },
                    error_status: {
                        type: "integer",
                        description: "Error code\n\n"
                    }
                }
            },
            required: false
        },
        wireless_link: {
            type: "object",
            description: "Image transmission link\n\n READONLY",
            properties: {
                dongle_number: {
                    type: "integer",
                    description: "Number of Dongles on the aircraft\n\n"
                },
                "4g_link_state": {
                    type: "integer",
                    description: "4G link connection state\n\n\n\n{\"0\":\"Disconnected\",\"1\":\"Connected\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                sdr_link_state: {
                    type: "integer",
                    description: "SDR link connection state\n\n\n\n{\"0\":\"Disconnected\",\"1\":\"Connected\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                link_workmode: {
                    type: "integer",
                    description: "Dock's video transmission link mode\n\n\n\n{\"0\":\"SDR Mode\",\"1\":\"4G Fusion Mode\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                sdr_quality: {
                    type: "integer",
                    description: "SDR signal quality\n\n"
                },
                "4g_quality": {
                    type: "integer",
                    description: "Overall 4G signal quality\n\n"
                },
                "4g_uav_quality": {
                    type: "integer",
                    description: "Sky-side 4G signal quality\n\nSignal quality between aircraft and 4G server"
                },
                "4g_gnd_quality": {
                    type: "integer",
                    description: "Ground-side 4G signal quality\n\nSignal quality between ground devices (for example, remote controller, DJI Dock, etc.) and 4G server"
                },
                sdr_freq_band: {
                    type: "number",
                    description: "SDR frequency band\n\n"
                },
                "4g_freq_band": {
                    type: "number",
                    description: "4G frequency band\n\n"
                }
            },
            required: false
        },
        firmware_version: {
            type: "string",
            description: "Firmware version\n\n READONLY",
            required: false
        },
        latitude: {
            type: "number",
            description: "Latitude\n\n READONLY",
            required: false
        },
        longitude: {
            type: "number",
            description: "Longitude\n\nLongitude of the gateway device READONLY",
            required: false
        }
    }
}

export interface MqttRcProEnterpriseProperties_STATE_CHANGE_TYPE {
    /**
     * Gateway device live streaming capability
     *
     *  READONLY
     */
    live_capacity?: {
        /**
         * Number of selectable streaming bitrates
         *
         *
         */
        available_video_number?: number;
        /**
         * Maximum number of streams that can be simultaneously streamed
         *
         *
         */
        coexist_video_number_max?: number;
        /**
         * Selectable video device sources
         *
         * Selectable video device sources (device layer, such as aircraft)
         *
         * @minItems undefined
         * @maxItems undefined
         */
        device_list?: {
            /**
             * Aircraft and other video source device serial number (SN)
             *
             *
             */
            sn?: string;
            /**
             * Number of streaming bitrates that can be selected for the serial number device
             *
             *
             */
            available_video_number?: number;
            /**
             * The maximum number of streams that can be simultaneously streamed by the device with this serial number
             *
             *
             */
            coexist_video_number_max?: number;
            /**
             * List of cameras on the device with the specified serial number
             *
             *
             *
             * @minItems undefined
             * @maxItems undefined
             */
            camera_list?: {
                /**
                 * Camera index
                 *
                 * {"em":"{type-subtype-gimbalindex}","#text":"Using the format"}
                 */
                camera_index?: string;
                /**
                 * Number of streaming bitrates that can be selected for the camera level video source
                 *
                 *
                 */
                available_video_number?: number;
                /**
                 * The maximum number of streams that can be simultaneously streamed for this camera level
                 *
                 *
                 */
                coexist_video_number_max?: number;
                /**
                 * List of streams that can be selected for this camera-level video source
                 *
                 *
                 *
                 * @minItems undefined
                 * @maxItems undefined
                 */
                video_list?: {
                    /**
                     * Index of the stream that can be selected for this camera-level video source
                     *
                     *
                     */
                    video_index?: string;
                    /**
                     * Types of streams that can be selected for this camera-level video source
                     *
                     *
                     */
                    video_type?: string;
                    /**
                     * Supported video camera types that the video stream can switch to
                     *
                     *
                     *
                     * @minItems undefined
                     * @maxItems undefined
                     */
                    switchable_video_types?: unknown[];
                    [k: string]: unknown;
                }[];
                [k: string]: unknown;
            }[];
            [k: string]: unknown;
        }[];
        [k: string]: unknown;
    };
    /**
     * Country area code
     *
     *  READONLY
     */
    country?: string;
    /**
     * Remaining capacity
     *
     * Remaining battery level of the remote control READONLY
     *
     * Percentage / %
     */
    capacity_percent?: number;
    /**
     * Ellipsoid height
     *
     *  READONLY
     *
     * Meters / m
     */
    height?: number;
    /**
     * 4G Dongle information
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    dongle_infos?: {
        /**
         * dongle imei
         *
         * Unique identifier for the Dongle READONLY
         */
        imei?: string;
        /**
         * Dongle type
         *
         * Dongle type READONLY
         *
         * {"6":"Old Dongle","10":"New Dongle with eSIM support"}
         */
        dongle_type?: 6 | 10;
        /**
         * dongle eid
         *
         * Unique identifier for eSIM, used for public account query of plans and service purchase READONLY
         */
        eid?: string;
        /**
         * eSIM activation state
         *
         * Requires activation to use READONLY
         *
         * {"0":"Not activated","1":"Activated"}
         */
        esim_activate_state?: 0 | 1;
        /**
         * SIM card state
         *
         * Insertion state of the physical SIM card in the dongle READONLY
         *
         * {"0":"Not inserted","1":"Inserted"}
         */
        sim_card_state?: 0 | 1;
        /**
         * SIM card slot enable state
         *
         * Identifies the SIM card slot currently in use by the dongle READONLY
         *
         * {"0":"Unknown","1":"Physical SIM card","2":"eSIM"}
         */
        sim_slot?: 0 | 1 | 2;
        /**
         * eSIM information
         *
         *  READONLY
         *
         * @minItems undefined
         * @maxItems undefined
         */
        esim_infos?: {
            /**
             * Supported operators
             *
             * Telecom operators supported by eSIM READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * eSIM enable state
             *
             * Only one eSIM can be enabled at a time READONLY
             */
            enabled?: boolean;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        }[];
        /**
         * SIM card information
         *
         * Information about the physical SIM card that can be inserted into the dongle READONLY
         */
        sim_info?: {
            /**
             * Supported operators
             *
             * Telecom operator supported by the SIM card READONLY
             *
             * {"0":"Unknown","1":"Mobile","2":"China Unicom","3":"Telecommunications"}
             */
            telecom_operator?: 0 | 1 | 2 | 3;
            /**
             * SIM card type
             *
             * Type of physical SIM card READONLY
             *
             * {"0":"Unknown","1":"Other regular SIM card","2":"Three-network card"}
             */
            sim_type?: 0 | 1 | 2;
            /**
             * sim iccid
             *
             * Unique identifier for the SIM card, can be used for purchasing packages for physical SIM cards READONLY
             */
            iccid?: string;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    }[];
    /**
     * Gateway's current overall live streaming state push
     *
     *  READONLY
     *
     * @minItems undefined
     * @maxItems undefined
     */
    live_status?: {
        /**
         * Live streaming identifier
         *
         * {"em":["{sn}/{camera_index}/{video_index}","{sn}","{camera_index}","{type-subtype-gimbalindex}","{video_index}"],"#text":"Identifier for pushing video streams on a certain route, formatted as.is the serial number of the video source device.is the camera index, using the format.is the index of the video stream that can be selected at the camera level."}
         */
        video_id?: string;
        /**
         * Video type
         *
         * Indicates the type of video lens, such as normal/wide/zoom/infrared, etc.
         */
        video_type?: string;
        /**
         * Quality of the live streaming
         *
         *
         *
         * {"0":"Adaptive","1":"Smooth","2":"Standard definition","3":"High definition","4":"Ultra-high definition"}
         */
        video_quality?: 0 | 1 | 2 | 3 | 4;
        /**
         * Live streaming state
         *
         *
         *
         * {"0":"Not live streaming","1":"In live streaming"}
         */
        status?: 0 | 1;
        /**
         * Error code
         *
         *
         */
        error_status?: number;
        [k: string]: unknown;
    }[];
    /**
     * Image transmission link
     *
     *  READONLY
     */
    wireless_link?: {
        /**
         * Number of Dongles on the aircraft
         *
         *
         */
        dongle_number?: number;
        /**
         * 4G link connection state
         *
         *
         *
         * {"0":"Disconnected","1":"Connected"}
         */
        "4g_link_state"?: 0 | 1;
        /**
         * SDR link connection state
         *
         *
         *
         * {"0":"Disconnected","1":"Connected"}
         */
        sdr_link_state?: 0 | 1;
        /**
         * Dock's video transmission link mode
         *
         *
         *
         * {"0":"SDR Mode","1":"4G Fusion Mode"}
         */
        link_workmode?: 0 | 1;
        /**
         * SDR signal quality
         *
         *
         */
        sdr_quality?: number;
        /**
         * Overall 4G signal quality
         *
         *
         */
        "4g_quality"?: number;
        /**
         * Sky-side 4G signal quality
         *
         * Signal quality between aircraft and 4G server
         */
        "4g_uav_quality"?: number;
        /**
         * Ground-side 4G signal quality
         *
         * Signal quality between ground devices (for example, remote controller, DJI Dock, etc.) and 4G server
         */
        "4g_gnd_quality"?: number;
        /**
         * SDR frequency band
         *
         *
         */
        sdr_freq_band?: number;
        /**
         * 4G frequency band
         *
         *
         */
        "4g_freq_band"?: number;
        [k: string]: unknown;
    };
    /**
     * Firmware version
     *
     *  READONLY
     */
    firmware_version?: string;
    /**
     * Latitude
     *
     *  READONLY
     */
    latitude?: number;
    /**
     * Longitude
     *
     * Longitude of the gateway device READONLY
     */
    longitude?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseRemoteControlDrcCameraOsdInfoPushUp_SCHEMA = {
    type: "object",
    properties: {
        payload_index: {
            type: "string",
            description: "Camera enumeration\n\n{\"a\":{\"span\":{\"svg\":{\"path\":{\"@_fill\":\"fill\",\"@_d\":\"d\"},\"polygon\":{\"@_fill\":\"fill\",\"@_points\":\"points\"},\"@_class\":\"class\",\"@_xmlns\":\"xmlns\",\"@_aria-hidden\":\"aria-hidden\",\"@_focusable\":\"focusable\",\"@_x\":\"x\",\"@_y\":\"y\",\"@_viewBox\":\"viewBox\",\"@_width\":\"width\",\"@_height\":\"height\"},\"span\":{\"#text\":\"open in new window\",\"@_class\":\"class\"}},\"#text\":\"Product Supported\",\"@_href\":\"href\",\"@_target\":\"target\",\"@_rel\":\"rel\"},\"#text\":\"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to\"}"
        },
        wide_lense: {
            type: "object",
            description: "Wide-angle lens info\n\n",
            properties: {
                wide_exposure_mode: {
                    type: "integer",
                    description: "Wide-angle lens exposure mode\n\nCurrent configuration of the wide-angle lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                wide_iso: {
                    type: "integer",
                    description: "Wide-angle lens ISO\n\nCurrent configuration of the wide-angle lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto (High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        255
                    ]
                },
                wide_shutter_speed: {
                    type: "integer",
                    description: "Wide-angle lens shutter speed\n\nCurrent configuration of the wide-angle lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44,
                        45,
                        46,
                        47,
                        48,
                        49,
                        50,
                        51,
                        52,
                        53,
                        54,
                        55,
                        56,
                        57,
                        58,
                        59,
                        65534
                    ]
                },
                wide_exposure_value: {
                    type: "integer",
                    description: "Wide-angle lens exposure value\n\nCurrent configuration of the wide-angle lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        255
                    ]
                },
                wide_aperture_value: {
                    type: "integer",
                    description: "Aperture value\n\n\n\n{\"280\":\"F2.8\",\"320\":\"F3.2\",\"350\":\"F3.5\",\"400\":\"F4\",\"450\":\"F4.5\",\"500\":\"F5\",\"560\":\"F5.6\",\"630\":\"F6.3\",\"710\":\"F7.1\",\"800\":\"F8\",\"900\":\"F9\",\"1000\":\"F10\",\"1100\":\"F11\"}",
                    enum: [
                        280,
                        320,
                        350,
                        400,
                        450,
                        500,
                        560,
                        630,
                        710,
                        800,
                        900,
                        1000,
                        1100
                    ]
                }
            }
        },
        zoom_lense: {
            type: "object",
            description: "Zoom lens info\n\n",
            properties: {
                zoom_exposure_mode: {
                    type: "integer",
                    description: "Zoom lens exposure mode\n\nCurrent configuration of the zoom lens exposure mode\n\n{\"1\":\"Auto\",\"2\":\"Shutter Priority\",\"3\":\"Aperture Priority\",\"4\":\"Manual\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4
                    ]
                },
                zoom_iso: {
                    type: "integer",
                    description: "Zoom lens ISO\n\nCurrent configuration of the zoom lens ISO\n\n{\"0\":\"Auto\",\"1\":\"Auto (High Sense)\",\"2\":\"50\",\"3\":\"100\",\"4\":\"200\",\"5\":\"400\",\"6\":\"800\",\"7\":\"1600\",\"8\":\"3200\",\"9\":\"6400\",\"10\":\"12800\",\"11\":\"25600\",\"255\":\"FIXED\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        255
                    ]
                },
                zoom_shutter_speed: {
                    type: "integer",
                    description: "Zoom lens shutter speed\n\nCurrent configuration of the zoom lens shutter speed\n\n{\"0\":\"1/8000 s\",\"1\":\"1/6400 s\",\"2\":\"1/6000 s\",\"3\":\"1/5000 s\",\"4\":\"1/4000 s\",\"5\":\"1/3200 s\",\"6\":\"1/3000 s\",\"7\":\"1/2500 s\",\"8\":\"1/2000 s\",\"9\":\"1/1600 s\",\"10\":\"1/1500 s\",\"11\":\"1/1250 s\",\"12\":\"1/1000 s\",\"13\":\"1/800 s\",\"14\":\"1/725 s\",\"15\":\"1/640 s\",\"16\":\"1/500 s\",\"17\":\"1/400 s\",\"18\":\"1/350 s\",\"19\":\"1/320 s\",\"20\":\"1/250 s\",\"21\":\"1/240 s\",\"22\":\"1/200 s\",\"23\":\"1/180 s\",\"24\":\"1/160 s\",\"25\":\"1/125 s\",\"26\":\"1/120 s\",\"27\":\"1/100 s\",\"28\":\"1/90 s\",\"29\":\"1/80 s\",\"30\":\"1/60 s\",\"31\":\"1/50 s\",\"32\":\"1/40 s\",\"33\":\"1/30 s\",\"34\":\"1/25 s\",\"35\":\"1/20 s\",\"36\":\"1/15 s\",\"37\":\"1/12.5 s\",\"38\":\"1/10 s\",\"39\":\"1/8 s\",\"40\":\"1/6.25 s\",\"41\":\"1/5 s\",\"42\":\"1/4 s\",\"43\":\"1/3 s\",\"44\":\"1/2.5 s\",\"45\":\"1/2 s\",\"46\":\"1/1.67 s\",\"47\":\"1/1.25 s\",\"48\":\"1.0 s\",\"49\":\"1.3 s\",\"50\":\"1.6 s\",\"51\":\"2.0 s\",\"52\":\"2.5 s\",\"53\":\"3.0 s\",\"54\":\"3.2 s\",\"55\":\"4.0 s\",\"56\":\"5.0 s\",\"57\":\"6.0 s\",\"58\":\"7.0 s\",\"59\":\"8.0 s\",\"65534\":\"Auto\"}",
                    enum: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37,
                        38,
                        39,
                        40,
                        41,
                        42,
                        43,
                        44,
                        45,
                        46,
                        47,
                        48,
                        49,
                        50,
                        51,
                        52,
                        53,
                        54,
                        55,
                        56,
                        57,
                        58,
                        59,
                        65534
                    ]
                },
                zoom_exposure_value: {
                    type: "integer",
                    description: "Zoom lens exposure value\n\nCurrent configuration of the zoom lens exposure value\n\n{\"1\":\"-5.0EV\",\"2\":\"-4.7EV\",\"3\":\"-4.3EV\",\"4\":\"-4.0EV\",\"5\":\"-3.7EV\",\"6\":\"-3.3EV\",\"7\":\"-3.0EV\",\"8\":\"-2.7EV\",\"9\":\"-2.3EV\",\"10\":\"-2.0EV\",\"11\":\"-1.7EV\",\"12\":\"-1.3EV\",\"13\":\"-1.0EV\",\"14\":\"-0.7EV\",\"15\":\"-0.3EV\",\"16\":\"0EV\",\"17\":\"0.3EV\",\"18\":\"0.7EV\",\"19\":\"1.0EV\",\"20\":\"1.3EV\",\"21\":\"1.7EV\",\"22\":\"2.0EV\",\"23\":\"2.3EV\",\"24\":\"2.7EV\",\"25\":\"3.0EV\",\"26\":\"3.3EV\",\"27\":\"3.7EV\",\"28\":\"4.0EV\",\"29\":\"4.3EV\",\"30\":\"4.7EV\",\"31\":\"5.0EV\",\"255\":\"FIXED\"}",
                    enum: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        255
                    ]
                },
                zoom_focus_mode: {
                    type: "integer",
                    description: "Zoom lens focus mode\n\nCurrent configuration of the zoom lens focus mode\n\n{\"0\":\"MF\",\"1\":\"AFS\",\"2\":\"AFC\"}",
                    enum: [
                        0,
                        1,
                        2
                    ]
                },
                zoom_focus_value: {
                    type: "integer",
                    description: "Zoom lens focus value\n\n"
                },
                zoom_max_focus_value: {
                    type: "integer",
                    description: "Zoom lens maximum focus value\n\n"
                },
                zoom_min_focus_value: {
                    type: "integer",
                    description: "Zoom lens minimum focus value\n\n"
                },
                zoom_calibrate_farthest_focus_value: {
                    type: "integer",
                    description: "Zoom lens calibrated farthest focus value\n\nFocused value at the farthest clear position"
                },
                zoom_calibrate_nearest_focus_value: {
                    type: "integer",
                    description: "Zoom lens calibrated nearest focus value\n\nFocused value at the nearest clear position"
                },
                zoom_focus_state: {
                    type: "integer",
                    description: "Zoom lens focus state\n\n"
                },
                zoom_factor: {
                    type: "integer",
                    description: "Zoom factor\n\n"
                },
                zoom_aperture_value: {
                    type: "integer",
                    description: "Zoom lens aperture value\n\n\n\n{\"440\":\"F4.4\"}",
                    enum: [
                        440
                    ]
                }
            }
        },
        measure_target: {
            type: "object",
            description: "Target ranging and height measurement\n\n",
            properties: {
                measure_target_longitude: {
                    type: "number",
                    description: "Laser ranging target longitude\n\n"
                },
                measure_target_latitude: {
                    type: "number",
                    description: "Laser ranging target latitude\n\n"
                },
                measure_target_altitude: {
                    type: "number",
                    description: "Laser ranging target altitude\n\n"
                },
                measure_target_distance: {
                    type: "number",
                    description: "Laser ranging distance\n\n"
                }
            }
        },
        ir_lense: {
            type: "object",
            description: "Infrared information\n\n",
            properties: {
                screen_split_enable: {
                    type: "boolean",
                    description: "Whether split screen is enabled\n\n"
                },
                ir_zoom_factor: {
                    type: "number",
                    description: "Infrared zoom factor\n\nInfrared zoom factor"
                },
                thermal_supported_palette_styles: {
                    type: "array",
                    description: "Collection of supported palette styles by the device\n\nThe capability of supported styles varies for different devices"
                },
                thermal_gain_mode: {
                    type: "integer",
                    description: "Gain Mode\n\nLow gain provides a larger temperature measurement range, while high gain offers higher temperature measurement accuracy.\n\n{\"0\":\"Auto\",\"1\":\"Low Gain. Temperature Range is from 0°C to 500°C\",\"2\":\"High Gain. Temperature Range is from -20°C to 150°C\"}",
                    enum: [
                        0,
                        1,
                        2
                    ]
                },
                thermal_isotherm_state: {
                    type: "integer",
                    description: "Whether isotherm is enabled\n\nIsotherm allows users to observe the content of temperature ranges of interest, making objects in the temperature range more prominent.\n\n{\"0\":\"Disable\",\"1\":\"Enable\"}",
                    enum: [
                        0,
                        1
                    ]
                },
                thermal_isotherm_upper_limit: {
                    type: "integer",
                    description: "Upper limit of the temperature range for isotherm\n\nEffective only when Isotherm is enabled"
                },
                thermal_isotherm_lower_limit: {
                    type: "integer",
                    description: "Lower limit of the temperature range for isotherm\n\nEffective only when Isotherm is enabled"
                },
                thermal_global_temperature_min: {
                    type: "number",
                    description: "Minimum temperature measured in the overall view\n\n"
                },
                thermal_global_temperature_max: {
                    type: "number",
                    description: "Maximum temperature measured in the overall view\n\n"
                }
            }
        },
        liveview: {
            type: "object",
            description: "Live view area information\n\n",
            properties: {
                liveview_world_region: {
                    type: "object",
                    description: "Field of view (FOV) region in liveview\n\nThe field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.",
                    properties: {
                        left: {
                            type: "number",
                            description: "X-axis starting point in the top-left corner\n\n"
                        },
                        top: {
                            type: "number",
                            description: "Y-axis starting point in the top-left corner\n\n"
                        },
                        right: {
                            type: "number",
                            description: "Starting point of the x-axis in the bottom right corner\n\n"
                        },
                        bottom: {
                            type: "number",
                            description: "Y-axis starting point in the lower right corner\n\n"
                        }
                    }
                }
            }
        }
    }
}

export interface MqttRcProEnterpriseRemoteControlDrcCameraOsdInfoPush_UP_TYPE {
    /**
     * Camera enumeration
     *
     * {"a":{"span":{"svg":{"path":{"@_fill":"fill","@_d":"d"},"polygon":{"@_fill":"fill","@_points":"points"},"@_class":"class","@_xmlns":"xmlns","@_aria-hidden":"aria-hidden","@_focusable":"focusable","@_x":"x","@_y":"y","@_viewBox":"viewBox","@_width":"width","@_height":"height"},"span":{"#text":"open in new window","@_class":"class"}},"#text":"Product Supported","@_href":"href","@_target":"target","@_rel":"rel"},"#text":"Camera enumeration values. Non-standard device_mode_key, formatted as {type-subtype-gimbalindex}. Please refer to"}
     */
    payload_index?: string;
    /**
     * Wide-angle lens info
     *
     *
     */
    wide_lense?: {
        /**
         * Wide-angle lens exposure mode
         *
         * Current configuration of the wide-angle lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        wide_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Wide-angle lens ISO
         *
         * Current configuration of the wide-angle lens ISO
         *
         * {"0":"Auto","1":"Auto (High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        wide_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Wide-angle lens shutter speed
         *
         * Current configuration of the wide-angle lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        wide_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Wide-angle lens exposure value
         *
         * Current configuration of the wide-angle lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        wide_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Aperture value
         *
         *
         *
         * {"280":"F2.8","320":"F3.2","350":"F3.5","400":"F4","450":"F4.5","500":"F5","560":"F5.6","630":"F6.3","710":"F7.1","800":"F8","900":"F9","1000":"F10","1100":"F11"}
         */
        wide_aperture_value?: 280 | 320 | 350 | 400 | 450 | 500 | 560 | 630 | 710 | 800 | 900 | 1000 | 1100;
        [k: string]: unknown;
    };
    /**
     * Zoom lens info
     *
     *
     */
    zoom_lense?: {
        /**
         * Zoom lens exposure mode
         *
         * Current configuration of the zoom lens exposure mode
         *
         * {"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}
         */
        zoom_exposure_mode?: 1 | 2 | 3 | 4;
        /**
         * Zoom lens ISO
         *
         * Current configuration of the zoom lens ISO
         *
         * {"0":"Auto","1":"Auto (High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}
         */
        zoom_iso?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 255;
        /**
         * Zoom lens shutter speed
         *
         * Current configuration of the zoom lens shutter speed
         *
         * {"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}
         */
        zoom_shutter_speed?:
            | 0
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 32
            | 33
            | 34
            | 35
            | 36
            | 37
            | 38
            | 39
            | 40
            | 41
            | 42
            | 43
            | 44
            | 45
            | 46
            | 47
            | 48
            | 49
            | 50
            | 51
            | 52
            | 53
            | 54
            | 55
            | 56
            | 57
            | 58
            | 59
            | 65534;
        /**
         * Zoom lens exposure value
         *
         * Current configuration of the zoom lens exposure value
         *
         * {"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}
         */
        zoom_exposure_value?:
            | 1
            | 2
            | 3
            | 4
            | 5
            | 6
            | 7
            | 8
            | 9
            | 10
            | 11
            | 12
            | 13
            | 14
            | 15
            | 16
            | 17
            | 18
            | 19
            | 20
            | 21
            | 22
            | 23
            | 24
            | 25
            | 26
            | 27
            | 28
            | 29
            | 30
            | 31
            | 255;
        /**
         * Zoom lens focus mode
         *
         * Current configuration of the zoom lens focus mode
         *
         * {"0":"MF","1":"AFS","2":"AFC"}
         */
        zoom_focus_mode?: 0 | 1 | 2;
        /**
         * Zoom lens focus value
         *
         *
         */
        zoom_focus_value?: number;
        /**
         * Zoom lens maximum focus value
         *
         *
         */
        zoom_max_focus_value?: number;
        /**
         * Zoom lens minimum focus value
         *
         *
         */
        zoom_min_focus_value?: number;
        /**
         * Zoom lens calibrated farthest focus value
         *
         * Focused value at the farthest clear position
         */
        zoom_calibrate_farthest_focus_value?: number;
        /**
         * Zoom lens calibrated nearest focus value
         *
         * Focused value at the nearest clear position
         */
        zoom_calibrate_nearest_focus_value?: number;
        /**
         * Zoom lens focus state
         *
         *
         */
        zoom_focus_state?: number;
        /**
         * Zoom factor
         *
         *
         */
        zoom_factor?: number;
        /**
         * Zoom lens aperture value
         *
         *
         *
         * {"440":"F4.4"}
         */
        zoom_aperture_value?: 440;
        [k: string]: unknown;
    };
    /**
     * Target ranging and height measurement
     *
     *
     */
    measure_target?: {
        /**
         * Laser ranging target longitude
         *
         *
         */
        measure_target_longitude?: number;
        /**
         * Laser ranging target latitude
         *
         *
         */
        measure_target_latitude?: number;
        /**
         * Laser ranging target altitude
         *
         *
         */
        measure_target_altitude?: number;
        /**
         * Laser ranging distance
         *
         *
         */
        measure_target_distance?: number;
        [k: string]: unknown;
    };
    /**
     * Infrared information
     *
     *
     */
    ir_lense?: {
        /**
         * Whether split screen is enabled
         *
         *
         */
        screen_split_enable?: boolean;
        /**
         * Infrared zoom factor
         *
         * Infrared zoom factor
         */
        ir_zoom_factor?: number;
        /**
         * Collection of supported palette styles by the device
         *
         * The capability of supported styles varies for different devices
         *
         * @minItems undefined
         * @maxItems undefined
         */
        thermal_supported_palette_styles?: unknown[];
        /**
         * Gain Mode
         *
         * Low gain provides a larger temperature measurement range, while high gain offers higher temperature measurement accuracy.
         *
         * {"0":"Auto","1":"Low Gain. Temperature Range is from 0°C to 500°C","2":"High Gain. Temperature Range is from -20°C to 150°C"}
         */
        thermal_gain_mode?: 0 | 1 | 2;
        /**
         * Whether isotherm is enabled
         *
         * Isotherm allows users to observe the content of temperature ranges of interest, making objects in the temperature range more prominent.
         *
         * {"0":"Disable","1":"Enable"}
         */
        thermal_isotherm_state?: 0 | 1;
        /**
         * Upper limit of the temperature range for isotherm
         *
         * Effective only when Isotherm is enabled
         */
        thermal_isotherm_upper_limit?: number;
        /**
         * Lower limit of the temperature range for isotherm
         *
         * Effective only when Isotherm is enabled
         */
        thermal_isotherm_lower_limit?: number;
        /**
         * Minimum temperature measured in the overall view
         *
         *
         */
        thermal_global_temperature_min?: number;
        /**
         * Maximum temperature measured in the overall view
         *
         *
         */
        thermal_global_temperature_max?: number;
        [k: string]: unknown;
    };
    /**
     * Live view area information
     *
     *
     */
    liveview?: {
        /**
         * Field of view (FOV) region in liveview
         *
         * The field of view angle of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens.
         */
        liveview_world_region?: {
            /**
             * X-axis starting point in the top-left corner
             *
             *
             */
            left?: number;
            /**
             * Y-axis starting point in the top-left corner
             *
             *
             */
            top?: number;
            /**
             * Starting point of the x-axis in the bottom right corner
             *
             *
             */
            right?: number;
            /**
             * Y-axis starting point in the lower right corner
             *
             *
             */
            bottom?: number;
            [k: string]: unknown;
        };
        [k: string]: unknown;
    };
    [k: string]: unknown;
}


export const MqttRcProEnterpriseRemoteControlDrcDroneStatePushUp_SCHEMA = {
    type: "object",
    properties: {
        stealth_state: {
            type: "boolean",
            description: "Stealth mode state\n\n"
        },
        night_lights_state: {
            type: "boolean",
            description: "Night flight lights state\n\n"
        },
        mode_code: {
            type: "integer",
            description: "Aircraft state\n\n\n\n{\"0\":\"Standby\",\"1\":\"Takeoff preparation\",\"2\":\"Takeoff preparation completed\",\"3\":\"Manual flight\",\"4\":\"Automatic takeoff\",\"5\":\"Wayline flight\",\"6\":\"Panorama\",\"7\":\"Intelligent tracking\",\"8\":\"ADS-B avoidance\",\"9\":\"Automatic returning to home\",\"10\":\"Automatic landing\",\"11\":\"Forced landing\",\"12\":\"Three-blade landing\",\"13\":\"Upgrading\",\"14\":\"Not connected\",\"15\":\"APAS\",\"16\":\"Virtual stick state\",\"17\":\"Live flight Controls\"}",
            enum: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17
            ]
        }
    }
}

export interface MqttRcProEnterpriseRemoteControlDrcDroneStatePush_UP_TYPE {
    /**
     * Stealth mode state
     *
     *
     */
    stealth_state?: boolean;
    /**
     * Night flight lights state
     *
     *
     */
    night_lights_state?: boolean;
    /**
     * Aircraft state
     *
     *
     *
     * {"0":"Standby","1":"Takeoff preparation","2":"Takeoff preparation completed","3":"Manual flight","4":"Automatic takeoff","5":"Wayline flight","6":"Panorama","7":"Intelligent tracking","8":"ADS-B avoidance","9":"Automatic returning to home","10":"Automatic landing","11":"Forced landing","12":"Three-blade landing","13":"Upgrading","14":"Not connected","15":"APAS","16":"Virtual stick state","17":"Live flight Controls"}
     */
    mode_code?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseRemoteControlDrcInitialStateSubscribeDownReply_SCHEMA = {
    type: "object",
    properties: {
        result: {
            type: "integer",
            description: "Return code\n\nNon-zero represents an error"
        }
    }
}

export interface MqttRcProEnterpriseRemoteControlDrcInitialStateSubscribe_DOWN_REPLY_TYPE {
    /**
     * Return code
     *
     * Non-zero represents an error
     */
    result?: number;
    [k: string]: unknown;
}


export const MqttRcProEnterpriseRemoteControlDrcInitialStateSubscribeDown_SCHEMA = {
    type: "object",
    properties: {
        null: {
            type: "number",
            description: "null\n\n"
        }
    }
}

export interface MqttRcProEnterpriseRemoteControlDrcInitialStateSubscribe_DOWN_TYPE {
    /**
     * null
     *
     *
     */
    null?: number;
    [k: string]: unknown;
}


