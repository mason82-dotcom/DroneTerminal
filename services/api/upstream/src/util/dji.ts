import { ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post, ApiType_Dji_Pilot_2_Api_Map_Elements_Put } from '../generated-definitions/api/ApiTypes'
import {DBType_Geo_Object, DBType_Geo_Object_ConfigType, DBType_Geo_Object_SubTypeType} from '../generated-definitions/db/DBTypes'


export function getDJIGeoJsonForGeoObject(geoObject: DBType_Geo_Object){
    switch(geoObject.type){
        case 0:
            switch(geoObject.sub_type){
                case 0: return {
                    geometry: {
                        coordinates: geoObject.config.point,
                        radius: 0,
                        type: 'Point'
                    },
                    properties: {
                        clampToGround: true,//TODO support elevation?
                        color: getDjiColorForColorHex(geoObject.config.color)
                    },
                    type: 'Feature'
                }
                case 1: return {
                    geometry: {
                        coordinates: geoObject.config.line,
                        type: 'LineString'
                    },
                    properties: {
                        clampToGround: true,//TODO support elevation?
                        color: getDjiColorForColorHex(geoObject.config.color)
                    },
                    type: 'Feature'
                }
                case 2: return {
                    geometry: {
                        coordinates: geoObject.config.polygon,
                        type: 'Polygon'
                    },
                    properties: {
                        clampToGround: true,//TODO support elevation?
                        color: getDjiColorForColorHex(geoObject.config.color)
                    },
                    type: 'Feature'
                }
                case 3: return {
                    geometry: {
                        coordinates: geoObject.config.center,//TODO support elevation?
                        radius: geoObject.config.radius,
                        type: 'Circle'
                    },
                    properties: {
                        clampToGround: false,//TODO support elevation?
                        color: getDjiColorForColorHex(geoObject.config.color)
                    },
                    type: 'Feature'
                }
            }
    }

    throw new Error('unsupported geoObject type and subtype for conversion to dji geojson: ' + geoObject.type + ', ' + geoObject.sub_type)
}

export function getGeoObjectConfigForDJIMapElementContent(mapElementContent: ApiType_Dji_Pilot_2_Api_Map_Elements_Put["content"] | ApiType_Dji_Pilot_2_Api_Map_Element_Groups_Elements_Post["resource"]["content"], geoObjectSubType: DBType_Geo_Object_SubTypeType<0>) {

    switch(geoObjectSubType){
        case 0: return {
            color: (mapElementContent.properties as {color: string}).color,
            point: enforceElevationIndex((mapElementContent.geometry as {coordinates: [number, number, number?]}).coordinates)
        } satisfies DBType_Geo_Object_ConfigType<0, 0>
        case 1: return {
            color: (mapElementContent.properties as {color: string}).color,
            line: (mapElementContent.geometry as {coordinates: [[number, number, number?], [number, number, number?]]}).coordinates.map(enforceElevationIndex)
        } satisfies DBType_Geo_Object_ConfigType<0, 1>
        case 2: return {
            color: (mapElementContent.properties as {color: string}).color,
            polygon: (mapElementContent.geometry as {coordinates: [[number, number, number][]]}).coordinates[0].map(enforceElevationIndex)
        } satisfies DBType_Geo_Object_ConfigType<0, 2>
        case 3: return {
            color: (mapElementContent.properties as {color: string}).color,
            center: enforceElevationIndex((mapElementContent.geometry as {coordinates: [number, number, number]}).coordinates),
            radius: (mapElementContent.geometry as {radius: number}).radius
        } satisfies DBType_Geo_Object_ConfigType<0, 3>
    }

    throw new Error('invalid geoObjectSubType: ' + geoObjectSubType)
}

function enforceElevationIndex(coordinates: [number, number, number?]){
    if(coordinates.length === 2){
        coordinates[2] = 0
    }
    return coordinates as [number, number, number]
}

export function getDJIMapElementTypeForGeoObject(geoObjectSubType: DBType_Geo_Object_SubTypeType<0>){
    switch(geoObjectSubType){
        case 0: return 0
        case 1: return 1
        case 2: return 2
        case 3: return 7
    }
}

export function getGeoObjectSubTypeForDJIMapElementType(mapElementType: number){
    switch(mapElementType){
        case 0: return 0
        case 1: return 1
        case 2: return 2
        case 7: return 3
    }

    throw new Error('invalid dji map element type: ' + mapElementType)
}

export const DJI_SUPPORTED_COLORS = {
    BLUE: '#2D8CF0',
    GREEN: '#19BE6B',
    YELLOW: '#FFBB00',
    RED: '#E23C39',
    PURPLE: '#B620E0'
} as const

export function getDjiColorForColorHex(colorHex: string){

    for(const [key, value] of Object.entries(DJI_SUPPORTED_COLORS)){
        if(value.toLowerCase() === colorHex.toLowerCase()){
            return colorHex.toUpperCase()
        }
    }

    console.warn('unsupported color for dji map element', colorHex, ', defaulting to blue. supported colors are:', DJI_SUPPORTED_COLORS)
    return '#2D8CF0'
}
