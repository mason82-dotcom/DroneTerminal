import pgp from 'pg-promise'
import {EventManager} from '../util/event_manager'
import type GeoObjectModule from '../core/modules/GeoObjectModule'
import { ApiType_Info_Collision_Objects } from '../generated-definitions/api/ApiTypes'
import { delete_Collision_Object_Geo_Object, delete_Geo_Object, insert_Collision_Object_Coverage_Area, insert_Collision_Object_Geo_Object, replaceGeometryWithParsed, select_Collision_Object_Coverage_Area, update_Collision_Object_Coverage_Area } from '../generated-definitions/db/DBHelpers'
import * as turf from '@turf/turf'
import { sortByISODateString } from '../util/sort'
import { DBType_Collision_Object_Coverage_Area, DBType_Geo_Object_Base, DBType_Geo_Object_SubTypeType, DBType_Geo_Object_Type_TYPES } from '../generated-definitions/db/DBTypes'
import { ST_Line, ST_Point } from '../util/postgis'
import dayjs from 'dayjs'
import { getCore } from '../core'
import { DBInsert_Geo_Object_without_geom } from '../core/modules/GeoObjectModule'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>

export default class CollisionObjectsManager extends EventManager<{

}> {

    private readonly geoObjectModule: GeoObjectModule

    constructor(geoObjectModule: GeoObjectModule){
        super()
        this.geoObjectModule = geoObjectModule
    }
    //TODO cleanup unused coverage areas and their geo objects

    async hasCollisionObjectsDirectlyAvailable(longitude: number, latitude: number, radiusInMeters: number): Promise<false | { area: DBType_Collision_Object_Coverage_Area; state: "fresh" | "stale" }> {
        const existingCoverageAreasThatIncludeThisArea = await select_Collision_Object_Coverage_Area(pgp.as.format('WHERE ST_Distance(\'SRID=4979;POINT(${longitude} ${latitude} 0)\'::geometry, geom) < LEAST(radius, ${diameterInner})', {
            longitude,
            latitude,
            diameterInner: turf.lengthToDegrees(radiusInMeters, 'meters') * 2 * 0.95 //allow 5% tolerance
        }))

        const sortedByUpdatedAt = existingCoverageAreasThatIncludeThisArea.sort((a, b) => sortByISODateString(a.updated_at, b.updated_at))

        let latestCoverageArea: DBType_Collision_Object_Coverage_Area | undefined = sortedByUpdatedAt[0]

        if(!latestCoverageArea){
            return false
        }

        if(refreshingCoverageAreasInProgress.has(latestCoverageArea.id)){
            return {
                area: latestCoverageArea,
                state: 'stale'
            }
        }

        const minutesSinceLastUpdate = dayjs().diff(dayjs(latestCoverageArea.updated_at), 'minute')

        if(minutesSinceLastUpdate > 7 * 24 * 60){// every 7 days refresh data
            return {
                area: latestCoverageArea,
                state: 'stale'
            }
        } else {
            const existingGeoObjectsForThisCoverageArea = await db.one('SELECT count(*) FROM collision_object_geo_objects WHERE coverage_area_id = ${coverageAreaId}', {coverageAreaId: latestCoverageArea.id})

            if(existingGeoObjectsForThisCoverageArea.count === 0 && minutesSinceLastUpdate > 10) {
                //the refresh process was potentially bricked, so we retry after 1 hour
                return {
                    area: latestCoverageArea,
                    state: 'stale'
                }
            }
        }

        return {
            area: latestCoverageArea,
            state: 'fresh'
        }
    }

    /**
     * this function may run for a while, call hasCollisionObjectsDirectlyAvailable() first to check
     */
    async getCollisionObjects(longitude: number, latitude: number, radiusInMeters: number): Promise<ApiType_Info_Collision_Objects> {
        let existingArea = await this.hasCollisionObjectsDirectlyAvailable(longitude, latitude, radiusInMeters)

        if(existingArea === false){
            existingArea = {
                area: await this.loadCollisionObjects({longitude, latitude, radiusInMeters}),
                state: 'fresh'
            }
        }


            //TODO if the new area includes existing coverage areas, delete those


        if(existingArea.state === 'stale'){
            await this.loadCollisionObjects(existingArea.area)
        }

        // filter for radius, because the areas radius can be bigger than the requested radius, so we might have some extra objects in the area that we need to filter out here
        const geoObjects = await db.manyOrNone<DBType_Geo_Object_Base<3, DBType_Geo_Object_SubTypeType<3>>>('SELECT geo_objects.*, ST_AsGeoJSON(geo_objects.geom) as geom_parsed FROM geo_objects INNER JOIN collision_object_geo_objects ON geo_objects.id = collision_object_geo_objects.geo_object_id INNER JOIN collision_object_coverage_areas ON collision_object_coverage_areas.id = collision_object_geo_objects.coverage_area_id WHERE coverage_area_id = ${coverageAreaId} AND ST_Distance(\'SRID=4979;POINT(${longitude} ${latitude} 0)\'::geometry, geo_objects.geom) < ${radius}', {
            coverageAreaId: existingArea.area.id,
            type: DBType_Geo_Object_Type_TYPES.collision,
            longitude,
            latitude,
            radius: turf.lengthToDegrees(radiusInMeters * 1.05, 'meters') //allow 5% tolerance //TODO check ST_Distance really works
        })

        replaceGeometryWithParsed(geoObjects, 'geom', 'geom_parsed')

        return geoObjects.map(convertGeoObjectToCollisionObject)
    }

    async loadCollisionObjects(area: DBType_Collision_Object_Coverage_Area | {longitude: number, latitude: number, radiusInMeters: number}){

        if('id' in area === false){
            area = await insert_Collision_Object_Coverage_Area({geom: new ST_Point(area.longitude, area.latitude, 0), radius: area.radiusInMeters * 2})//always create an area with double the radius of the requested area, so that if the client requests a nearby area shortly after, we can directly provide data without needing to load it again
        }

        try {
            await refreshDataForCoverageArea(area)
            await update_Collision_Object_Coverage_Area(area.id, {updated_at: new Date().toISOString()})
        } catch (ex){

            await update_Collision_Object_Coverage_Area(area.id, {updated_at: dayjs().subtract(1, 'year').toISOString()})//make sure this is being retried soon
            throw ex
        }

        return area
    }
}

function convertGeoObjectToCollisionObject(geoObject: DBType_Geo_Object_Base<3, DBType_Geo_Object_SubTypeType<3>>): ApiType_Info_Collision_Objects[number] {

    const marking = getCollisionObjectMarkingForGeoObject(geoObject)

    return {
        id: geoObject.id,
        name: geoObject.name,
        type: geoObject.sub_type,
        marking
    }
}

function getCollisionObjectMarkingForGeoObject(geoObject: DBType_Geo_Object_Base<3, DBType_Geo_Object_SubTypeType<3>>): ApiType_Info_Collision_Objects[number]['marking'] {

    if([0, 1, 4].includes(geoObject.sub_type)){

        const geomTyped = geoObject.geom as ST_Point

        return {
            type: 0,
            longitude: geomTyped.longitude,
            latitude: geomTyped.latitude,
            height_above_ground: geomTyped.elevation || getDefaultHeightAboveGroundForCollisionGeoObject(geoObject)
        }
    } else if(geoObject.sub_type === 6){

        const geomTyped = geoObject.geom as ST_Line

        return {
            type: 2,
            points: geomTyped.getCoordinates().map(coord => {
                return {
                    longitude: coord[0],
                    latitude: coord[1],
                    height_above_ground: coord[2] || getDefaultHeightAboveGroundForCollisionGeoObject(geoObject)
                }
            })
        }
    } else {
        const geomTyped = geoObject.geom as ST_Line

        return {
            type: 1,
            points: geomTyped.getCoordinates().map(coord => {
                return {
                    longitude: coord[0],
                    latitude: coord[1],
                    height_above_ground: coord[2] || getDefaultHeightAboveGroundForCollisionGeoObject(geoObject)
                }
            })
        }
    }
}

function getDefaultHeightAboveGroundForCollisionGeoObject(geoObject: DBType_Geo_Object_Base<3, DBType_Geo_Object_SubTypeType<3>>): number {
    switch(geoObject.sub_type){
        case 0: return DEFAULT_HEIGHTS.power_tower
        case 1: return DEFAULT_HEIGHTS.power_pole_or_catenary_mast
        case 2: return DEFAULT_HEIGHTS.power_line_large
        case 3: return DEFAULT_HEIGHTS.power_line_small_or_catenary
        case 4: return DEFAULT_HEIGHTS.aerialway_pylon
        case 5: return DEFAULT_HEIGHTS.aerialway
        case 6: return DEFAULT_HEIGHTS.building
        default: throw new Error('unknown collision object sub type: ' + geoObject.sub_type)
    }
}


const refreshingCoverageAreasInProgress = new Set<number>()

async function refreshDataForCoverageArea(coverageArea: DBType_Collision_Object_Coverage_Area){

    if(refreshingCoverageAreasInProgress.has(coverageArea.id)){
        return//TODO instead we could wait for that other refresh to finish and then resolve together with it
    }

    refreshingCoverageAreasInProgress.add(coverageArea.id)

    const collisionObjectsFromOSM = await getCollisionObjectsFromOSM(coverageArea.geom.longitude, coverageArea.geom.latitude, coverageArea.radius)

    const geoObjectIds = await db.manyOrNone<{id: number}>('SELECT geo_object_id as id FROM collision_object_geo_objects WHERE coverage_area_id = ${coverageAreaId}', {
        coverageAreaId: coverageArea.id
    })

    if(geoObjectIds.length > 0){
        await Promise.all(geoObjectIds.map(async objId => {
            return getCore().modules.geoObject.deleteGeoObject(objId.id)
        }))
    }

    await delete_Collision_Object_Geo_Object(pgp.as.format('WHERE coverage_area_id = ${coverageAreaId}', {coverageAreaId: coverageArea.id}))

    await Promise.all(collisionObjectsFromOSM.map(async collisionObject => {
        const geoObject = await getCore().modules.geoObject.createGeoObject(collisionObject)

        await insert_Collision_Object_Geo_Object({
            coverage_area_id: coverageArea.id,
            geo_object_id: geoObject.id
        })
    }))

    refreshingCoverageAreasInProgress.delete(coverageArea.id)
}

async function getCollisionObjectsFromOSM(longitude: number, latitude: number, radius: number){

    console.log('fetching collision objects from overpass api for area with center at ' + longitude + ',' + latitude + ' and radius ' + radius + ' meters ...')

    const aroundStr = `around:${radius},${latitude},${longitude}`

    const body = 'data=' + encodeURIComponent(`[out:json];
    (
    nwr(${aroundStr})["power"="line"];
    nwr(${aroundStr})["power"="tower"];
    nwr(${aroundStr})["power"="minor_line"];
    nwr(${aroundStr})["power"="pole"];
    nwr(${aroundStr})["power"="catenary_mast"];
    nwr(${aroundStr})["aerialway"="pylon"];
    nwr(${aroundStr})["aerialway"="chair_lift"];
    nwr(${aroundStr})["aerialway"="goods"];
    nwr(${aroundStr})["aerialway"="zip_line"];
    nwr(${aroundStr})["aerialway"="gondola"];
    nwr(${aroundStr})["aerialway"="cable_car"];
    nwr(${aroundStr})["aerialway"="yes"];
    nwr(${aroundStr})["aerialway"="mixed_lift"];
    );
    out geom;`)//TODO support high towers (e.g. masts for radio or tv) as well and use the building marking for it

    let result: Response
    try {
        result = await fetch("https://overpass-api.de/api/interpreter", {
            "credentials": "omit",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:150.0) Gecko/20100101 Firefox/150.0",
                "Accept": "*/*",
                "Accept-Language": "en-US,en;q=0.9",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "Priority": "u=0",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": "https://overpass-turbo.eu/",
            "body": body,
            "method": "POST",
            "mode": "cors"
        })

        if(('' + result.status).startsWith('2') == false){
            throw new Error(result.status + ': ' + result.statusText + ' - ' + await result.text())
        }

    } catch (ex){
        if((ex as Error).message.includes('504')){
            throw new Error('failed to fetch collision objects: overpass api busy')
        }

        if((ex as Error).message.includes('429')){
            throw new Error('failed to fetch collision objects: overpass api rate limited')
        }

        console.error('failed to fetch collision objects from overpass api', ex)
        throw new Error('failed to fetch collision objects')
    }


    const jsonResult = await result.json() as {elements: OsmElement[]}

    //TODO possible improvement: if height tag exists, we could use that to determine height_above_ground. E.g. for aerialways, if height for a node is gifen, we could use that
    // right now the most elements in openstreetmap lack this information, so probably not worth it

    return jsonResult.elements.map(convertOsmElementToGeoObject).filter(e => e !== false)
}




type OsmElement = {
    type: 'node'
    id: number
    lat: number
    lon: number
    tags: OpenStreetMapTags
} | {
    type: 'way'
    id: number
    nodes: number[]
    geometry: {lat: number, lon: number}[]
    tags: OpenStreetMapTags
}

type OpenStreetMapTags = {
    name?: string
    power?: 'line' | 'tower' | 'minor_line' | 'pole' | 'catenary_mast'
    aerialway?: 'pylon' | 'chair_lift' | 'goods' | 'zip_line' | 'gondola' | 'cable_car' | 'yes' | 'mixed_lift'
}

const DEFAULT_HEIGHTS = {
    power_tower: 80,
    power_pole_or_catenary_mast: 30,
    aerialway_pylon: 50,
    power_line_large: 80,
    power_line_small_or_catenary: 30,
    aerialway: 50,
    building: 20
} as const

function convertOsmElementToGeoObject(element: OsmElement): DBInsert_Geo_Object_without_geom & {type: 3, sub_type: DBType_Geo_Object_SubTypeType<3>} | false {

    //   5 = aerialway (like chair lift or gondola), 6 = building (e.g. tower)"
    if(element.type === 'node'){

        if(element.tags.power === 'tower'){
            return {
                type: 3,
                sub_type: 0,
                config: {
                    id: element.id,
                    point: [element.lon, element.lat, DEFAULT_HEIGHTS.power_tower]
                },
                name: element.tags.name ?? ''
            }
        } else if (element.tags.power === 'pole' || element.tags.power === 'catenary_mast'){
            return {
                type: 3,
                sub_type: 1,
                config: {
                    id: element.id,
                    point: [element.lon, element.lat, DEFAULT_HEIGHTS.power_pole_or_catenary_mast]
                },
                name: element.tags.name ?? ''
            }
        } else if(element.tags.aerialway === 'pylon'){
            return {
                type: 3,
                sub_type: 4,
                config: {
                    id: element.id,
                    point: [element.lon, element.lat, DEFAULT_HEIGHTS.aerialway_pylon]
                },
                name: element.tags.name ?? ''
            }
        }

    } else if(element.type === 'way'){

        if(element.tags.power === 'line'){
            return {
                type: 3,
                sub_type: 2,
                config: {
                    id: element.id,
                    line: element.geometry.map(g => [g.lon, g.lat, DEFAULT_HEIGHTS.power_line_large])
                },
                name: element.tags.name ?? ''
            }
        } else if(element.tags.power === 'minor_line'){
            return {
                type: 3,
                sub_type: 3,
                config: {
                    id: element.id,
                    line: element.geometry.map(g => [g.lon, g.lat, DEFAULT_HEIGHTS.power_line_small_or_catenary])
                },
                name: element.tags.name ?? ''
            }
        } else if(element.tags.aerialway === 'cable_car' || element.tags.aerialway === 'gondola' || element.tags.aerialway === 'chair_lift' || element.tags.aerialway === 'zip_line' || element.tags.aerialway === 'goods' || element.tags.aerialway === 'mixed_lift' || element.tags.aerialway === 'yes'){
            return {

                type: 3,
                sub_type: 5,
                config: {
                    id: element.id,
                    line: element.geometry.map(g => [g.lon, g.lat, DEFAULT_HEIGHTS.aerialway])
                },
                name: element.tags.name ?? ''
            }
        }
    }

    return false
}