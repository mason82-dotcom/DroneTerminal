
import {DBType_Connection, DBType_Geo_Object, DBType_Geo_Object_Base, DBType_Geo_Object_ConfigType, DBType_Geo_Object_SubType_TYPES, DBType_Geo_Object_SubTypeType, DBType_Geo_Object_Type_TYPES, DBType_Geo_Object_TypeType} from '../../generated-definitions/db/DBTypes'
import {DBInsert_Geo_Object, DBUpdate_Geo_Object, delete_Geo_Object, insert_Geo_Object, select_Geo_Object, update_Geo_Object} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'

import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket'
import { ClientId } from '../../live-websocket/websocket'
import { TrafficData } from '../../aircraft_sensing/TrafficSensing'
import { getCore } from '..'

import pgp from 'pg-promise'
import { assignObject, WithRequired } from '../../util/typescript'
import dayjs from 'dayjs'
import { WorkspaceTrafficSensingHandle } from './WorkspaceModule'
import { ST_Geometry, ST_Line, ST_Point } from '../../util/postgis'
import CollisionObjectsManager from '../../collision-objects'
import * as turf from '@turf/turf'
import {joinObjects} from '../../util/object'

//@ts-ignore
const db = global.db as pgp.IDatabase<any>

//@ts-ignore
const sendCreateGeoObjectMessageToClient = global.sendCreateGeoObjectMessageToClient as (geoObject: DBType_Geo_Object_Base<0, DBType_Geo_Object_SubTypeType<0>>, connection: DBType_Connection) => void

export default class GeoObjectModule extends Module_Base<
    {
        workspaceId: number | true,//true means global context
        id: number
    },

    {
        create_geo_object: {
            eventDataType: DBType_Geo_Object,
            availableContexts: 'workspaceId' | 'id'
        },
        update_geo_object: {
            eventDataType: DBType_Geo_Object,
            availableContexts: 'workspaceId' | 'id'
        },
        delete_geo_object: {
            eventDataType: DBType_Geo_Object,
            availableContexts: 'workspaceId' | 'id'
        }
    }
> {

    readonly subscribableEventHandlerGeoObjects: SubscribableEventHandler<'geo_object'>

    private readonly activeHandles = new Map<ClientId, WorkspaceTrafficSensingHandle>()

    private existingGeoObjectsNameIdMap = new Map<number, Map<string, number>>()//workspaceId -> name -> id (if workspaceId = -1, it means global)
    private existingGeoObjectsNameIdMap_isInitialized = false

    readonly collisionObjectsManager: CollisionObjectsManager

    constructor(){
        super()

        this.initExistingGeoObjectsNameIdMap().catch(err => {
            console.error('failed to initialize existingGeoObjectsNameIdMap', err)
        })

        setInterval(()=>{
            try {
                this.cleanupOldTrafficGeoObjects()
            } catch (err){
                console.error('Error in cleanupOldTrafficGeoObjects:', err)
            }
        }, 1000 * 30)//every 30 seconds

        this.subscribableEventHandlerGeoObjects = registerSubscribableEvent('geo_object', async(event, filter, client)=>{

            const filterOptions = this.parseFilter(filter)

            const workspaceId = parseInt(filterOptions.default)

            if(isNaN(workspaceId)){
                throw new Error('invalid workspaceId')
            }

            if(!(await getCore().modules.user.userHasPermissionForWorkspace(client.userId, workspaceId))){
                return 'no permission to access this workspace'
            }

            const handle = await getCore().modules.workspace.activateTrafficSensing(workspaceId)
            this.activeHandles.set(client.id, handle)

        }, (event, filter, client)=>{
            const handle = this.activeHandles.get(client.id)
            if(handle){
                handle.stop()
            }
        })

        this.collisionObjectsManager = new CollisionObjectsManager(this)
    }

    /**
     * if the new geoObject has the same uuid as an existing one, and the same data, no error wil be thrown!
     */
    async createGeoObject(data: DBInsert_Geo_Object_without_geom){
        const existingObject = (await select_Geo_Object(pgp.as.format('WHERE uuid = ${uuid}', {uuid: data.uuid})))[0]

        if(existingObject){
            const areSame = areSameGeoObjects(existingObject, data)
            if(areSame === true){
                console.log('a geoObject with the same uuid and same data already exists', existingObject.uuid)


                if(!existingObject.is_synced_with_dji && typeof existingObject.workspace_id === 'number'){//TODO update via websocket connection if already exists (the is_synced_with_dji flag only means its been created, which is misleading, we might need a second flag for is_up_to_date)
                    //@ts-ignore
                    this.syncGeoObjectWithDjiAsyncronously(existingObject)
                }

                return existingObject
            } else {
                console.error(existingObject, data)
                throw new Error(`a different geoObject with the same uuid already exists, difference: ${areSame}, id: ${existingObject.id}, uuid: ${existingObject.uuid}`)
            }
        }

        const geoObject = await insert_Geo_Object(recalculateGeom(data))

        if(!geoObject.is_synced_with_dji && typeof geoObject.workspace_id === 'number'){
            //@ts-ignore
            this.syncGeoObjectWithDjiAsyncronously(geoObject)
        }

        this.dispatch('create_geo_object', {
            id: geoObject.id,
            workspaceId: typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : true
        }, geoObject)

        this.subscribableEventHandlerGeoObjects.triggerListener('' + geoObject.workspace_id, {//TODO if workspace_id is not a number then filter geo object location, if the location is very far away from the client, we should not send it to the client, this has to be done for all events
            event_type: 'create',
            uuid: geoObject.uuid,
            data: geoObject
        })

        return geoObject
    }

    /**
     *
     * @param idOrUUID id = number, uuid = string
     * @returns false if does not exist
     * @see updateGeoObjectSafe
     */
    async updateGeoObject(idOrUUID: number | string, data: DBUpdate_Geo_Object_without_geom){

        const existingGeoObject = await this.getGeoObject(idOrUUID)

        if(existingGeoObject === false){
            return false
        }

        const newGeoObject = recalculateGeom(joinObjects(existingGeoObject, data))

        let geoObject = (await update_Geo_Object(typeof idOrUUID === 'string' ? pgp.as.format('WHERE uuid = ${uuid}', {uuid: idOrUUID}) : idOrUUID,
            newGeoObject
        ))

        if(geoObject === false){
            return false
        }

        if(geoObject instanceof Array){
            geoObject = geoObject[0]
        }

        if(!geoObject.is_synced_with_dji && typeof geoObject.workspace_id === 'number'){
            //@ts-ignore
            this.syncGeoObjectWithDjiAsyncronously(geoObject)
        }

        this.dispatch('update_geo_object', {
            id: geoObject.id,
            workspaceId: typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : true
        }, geoObject)

        this.subscribableEventHandlerGeoObjects.triggerListener('' + (typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : ''), {
            event_type: 'update',
            uuid: geoObject.uuid,
            data: geoObject
        })

        return geoObject
    }

    /**
     *
     * @see updateGeoObject
     */
    updateGeoObjectSafe = makeFunctionIdSafe(this, this.updateGeoObject)

    /**
     *
     * @returns false if does not exist
     * @see deleteGeoObjectSafe
     */
    async deleteGeoObject(idOrUUID: number | string){
        let geoObject = await delete_Geo_Object(typeof idOrUUID === 'string' ? pgp.as.format('WHERE uuid = ${uuid}', {uuid: idOrUUID}) : idOrUUID)

        if(geoObject === false){
            return false
        }

        if(geoObject instanceof Array){
            geoObject = geoObject[0]
        }

        const workspaceKey = typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : -1
        let workspaceMap = this.existingGeoObjectsNameIdMap.get(workspaceKey)
        if(workspaceMap){
            workspaceMap.delete(geoObject.name)
        }

        this.dispatch('delete_geo_object', {
            id: geoObject.id,
            workspaceId: typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : true
        }, geoObject)


        this.subscribableEventHandlerGeoObjects.triggerListener(typeof geoObject.workspace_id === 'number' ? '' + geoObject.workspace_id : '', {
            event_type: 'delete',
            uuid: geoObject.uuid,
            data: undefined
        })
    }

    /**
     *
     * @see deleteGeoObject
     */
    deleteGeoObjectSafe = makeFunctionIdSafe(this, this.deleteGeoObject)

    /**
     *
     * @returns false if does not exist
     * @see getGeoObjectSafe
     */
    async getGeoObject(idOrUUID: number | string){
        let ret = await select_Geo_Object(typeof idOrUUID === 'string' ? pgp.as.format('WHERE uuid = ${uuid}', {uuid: idOrUUID}) : idOrUUID)

        if(ret instanceof Array){
            ret = ret[0]
        }

        return ret
    }

    /**
     *
     * @see getGeoObject
     */
    getGeoObjectSafe = makeFunctionIdSafe(this, this.getGeoObject)

    async getGeoObjectsWithTasks(geoObjects: DBType_Geo_Object[]) {

        const geoObjectsWithTasks: (DBType_Geo_Object & {tasks: {id: number}[]})[] = []

        await Promise.all(geoObjects.map(geoObject => {
            return db.manyOrNone<{id: number}>('SELECT tasks.id FROM tasks INNER JOIN task_geo_objects ON tasks.id = task_geo_objects.task_id WHERE task_geo_objects.geo_object_id = ${geoObjectId}', {
                geoObjectId: geoObject.id
            }).then(tasks => {
                geoObjectsWithTasks.push(assignObject(geoObject, {
                    tasks
                }))
            })
        }))

        return geoObjectsWithTasks
    }

    /**
     *
     * @param data
     * @param workspaceId only set for traffic data, that you dont want to make globally available
     * @returns
     */
    async processTrafficSensingData(data: TrafficData, workspaceId?: number){

        if(this.existingGeoObjectsNameIdMap_isInitialized === false){
            return
        }

        const filter = typeof workspaceId === 'number' ? '' + workspaceId : ''

        // using a hasmap fixes a nasty race condition
        const workspaceKey = typeof workspaceId === 'number' ? workspaceId : -1
        let workspaceMap = this.existingGeoObjectsNameIdMap.get(workspaceKey)

        if(!workspaceMap){
            workspaceMap = new Map<string, number>()
            this.existingGeoObjectsNameIdMap.set(workspaceKey, workspaceMap)
        }

        let existingGeoObjectId = workspaceMap.get(data.name)//TODO use id
        let existingGeoObject: DBType_Geo_Object | undefined

        if(typeof existingGeoObjectId === 'number'){
            if(existingGeoObjectId === -1){
                //skip: insert is not done yet
                return
            }

            await this.updateGeoObjectSafe(existingGeoObjectId, {
                config: {
                    longitude: data.position.longitude,
                    latitude: data.position.latitude,
                    height: data.position.height
                },
                updated_at: new Date().toISOString(),
                workspace_id: typeof workspaceId === 'number' ? workspaceId : undefined
            })

        } else {

            workspaceMap.set(data.name, -1)// a flag to prevent race conditions, see above

            const dataToInsert: DBInsert_Geo_Object_without_geom = {
                type: DBType_Geo_Object_Type_TYPES.traffic,
                name: data.name,
                workspace_id: workspaceId,
                sub_type: data.type,
                config: {
                    longitude: data.position.longitude,
                    latitude: data.position.latitude,
                    height: data.position.height
                }
            }

            existingGeoObject = await insert_Geo_Object(recalculateGeom(dataToInsert))

            workspaceMap.set(existingGeoObject.name, existingGeoObject.id)

            this.subscribableEventHandlerGeoObjects.triggerListener(filter, {
                event_type: 'create',
                uuid: existingGeoObject.uuid,
                data: existingGeoObject
            })
        }
    }

    getUnsyncedGeoObjects(workspaceId: number){
        return select_Geo_Object(pgp.as.format('WHERE workspace_id = ${workspaceId} AND is_synced_with_dji = false', {
            workspaceId
        }))
    }

    private syncGeoObjectWithDjiAsyncronously(geoObject: WithRequired<DBType_Geo_Object, 'workspace_id'>){

        if(geoObject.type !== DBType_Geo_Object_Type_TYPES.marking){
            // only sync markings
            // but set the others as "synced" too, to prevent infinite sync attempts
            this.updateGeoObject(geoObject.id, {
                is_synced_with_dji: true
            })
            return
        }

        getCore().modules.connection.getFirstConnectionForWorkspaceThatHasConnectedRemoteController(geoObject.workspace_id).then(connection => {
            if(connection){
                sendCreateGeoObjectMessageToClient(geoObject, connection)

                this.updateGeoObjectSafe(geoObject.id, {
                    is_synced_with_dji: true
                })//TODO only set this to true if the message was successfully sent and acknowledged by the client, otherwise we might lose unsynced geoObjects if the server restarts before the next update
            }
        }).catch(err => {
            console.error('@syncGeoObjectWithDjiAsyncronously(): failed to get first connection for workspace', err)
        })
    }

    private parseFilter(filter: string){
        const filterOptions: Record<string, any> & {default: string} = {
            default: ''
        }

        const filterParts = filter.split('&')
        filterParts.map(fp => {
            const keyValueSplit = fp.split('=')
            if(keyValueSplit.length === 1){
                filterOptions['default'] = keyValueSplit[0]
            } else if(keyValueSplit.length === 2) {
                const key = keyValueSplit[0]
                let value = keyValueSplit[1]

                try {
                    const parsed = JSON.parse(value)
                    value = parsed
                } catch (err){
                    //ignored
                }

                filterOptions[key] = value
            } else {
                throw new Error('invalid syntax for filter options "' + filter + '"')
            }
        })

        return filterOptions
    }

    private async initExistingGeoObjectsNameIdMap() {

        const oldGeoObjects = await select_Geo_Object(pgp.as.format('WHERE type = ${type} AND updated_at < ${cleanupDate}', {
            type: DBType_Geo_Object_Type_TYPES.traffic,
            cleanupDate: dayjs().subtract(1, 'hour').toISOString()
        }))

        await Promise.all(oldGeoObjects.map(geoObject => {
            return this.deleteGeoObject(geoObject.id)
        }))


        const trafficGeoObjects = await db.manyOrNone('SELECT name, id FROM geo_objects WHERE type = ${type}', {type: DBType_Geo_Object_Type_TYPES.traffic})


        for(const geoObject of trafficGeoObjects){
            const workspaceKey = typeof geoObject.workspace_id === 'number' ? geoObject.workspace_id : -1

            let workspaceMap = this.existingGeoObjectsNameIdMap.get(workspaceKey)

            if(!workspaceMap){
                workspaceMap = new Map<string, number>()
                this.existingGeoObjectsNameIdMap.set(workspaceKey, workspaceMap)
            }

            workspaceMap.set(geoObject.name, geoObject.id)
        }
        this.existingGeoObjectsNameIdMap_isInitialized = true
    }

    private async cleanupOldTrafficGeoObjects(){
        const oldTrafficGeoObjects = await db.manyOrNone('SELECT * FROM geo_objects WHERE type = ${type} AND updated_at < ${cleanupDate}', {
            type: DBType_Geo_Object_Type_TYPES.traffic,
            cleanupDate: dayjs().subtract(1, 'minute').toISOString()
        })

        for(const geoObject of oldTrafficGeoObjects){
            await this.deleteGeoObject(geoObject.id)
        }
    }

    async getGeoObjectsCollision(longitude: number, latitude: number, radiusInMeters: number){
        return await select_Geo_Object(pgp.as.format('WHERE ST_Distance(\'SRID=4979;POINT(${longitude} ${latitude})\'::geometry, geo_objects.geom) < ${radius}', {
            longitude,
            latitude,
            radius: turf.lengthToDegrees(radiusInMeters, 'meters')//TODO we should probably first convert to 2D, otherwise 3d ST_Distance might give weird results
        }))
    }
}

type DBType_Geo_Object_without_geom = Omit<DBType_Geo_Object, 'geom'>
export type DBInsert_Geo_Object_without_geom = Omit<DBInsert_Geo_Object, 'geom'>
export type DBUpdate_Geo_Object_without_geom = Omit<DBUpdate_Geo_Object, 'geom'>

/**
 *
 * @returns true or a string describing what is different between the two geoObjects
 */
function areSameGeoObjects(geoObject1: DBType_Geo_Object_without_geom, geoObject2: DBInsert_Geo_Object_without_geom){
    if(geoObject1.uuid !== geoObject2.uuid) return 'uuid'
    if(geoObject1.name !== geoObject2.name) return 'name'
    if(geoObject1.type !== geoObject2.type) return 'type'
    if(geoObject1.sub_type !== geoObject2.sub_type) return 'sub_type'
    if(geoObject1.workspace_id !== geoObject2.workspace_id) return 'workspace_id'
    if(JSON.stringify(geoObject1.config) !== JSON.stringify(geoObject2.config)) return 'config'

    return true
}

type GeoObjectWithTypesAndConfig = {
    type: number
    sub_type: number
    config?: DBType_Geo_Object_ConfigType<DBType_Geo_Object_TypeType, DBType_Geo_Object_SubTypeType<DBType_Geo_Object_TypeType>>
}

function recalculateGeom<G extends GeoObjectWithTypesAndConfig>(
    geoObject: G
): G['config'] extends undefined ? G : G & {geom: ST_Geometry} {
    if(typeof geoObject.config === 'undefined'){
        //@ts-ignore
        return geoObject
    }

    return assignObject(geoObject, {
        geom: makeGeomFromConfig(geoObject)
    })
}

function makeGeomFromConfig(geoObject: GeoObjectWithTypesAndConfig): ST_Geometry {

    if(geoObject.type === DBType_Geo_Object_Type_TYPES.marking) {
        const config = geoObject.config

        if(geoObject.sub_type === DBType_Geo_Object_SubType_TYPES.marking.point){
            const typedConfig = config as unknown as DBType_Geo_Object_ConfigType<0, 0>
            return new ST_Point(typedConfig.point[0], typedConfig.point[1], typedConfig.point[2])
        } else if(geoObject.sub_type === DBType_Geo_Object_SubType_TYPES.marking.line){
            const typedConfig = config as unknown as DBType_Geo_Object_ConfigType<0, 1>
            return new ST_Line(typedConfig.line.map(point => new ST_Point(point[0], point[1], point[2])))
        } else if(geoObject.sub_type === DBType_Geo_Object_SubType_TYPES.marking.polygon){
            const typedConfig = config as unknown as DBType_Geo_Object_ConfigType<0, 2>
            return new ST_Line(typedConfig.polygon.map(point => new ST_Point(point[0], point[1], point[2])))
        } else if(geoObject.sub_type === DBType_Geo_Object_SubType_TYPES.marking.circle){
            const typedConfig = config as unknown as DBType_Geo_Object_ConfigType<0, 3>
            return new ST_Point(typedConfig.center[0], typedConfig.center[1], typedConfig.center[2])
        }

    } else if(geoObject.type === DBType_Geo_Object_Type_TYPES.traffic) {
        const config = geoObject.config as unknown as DBType_Geo_Object_ConfigType<1, DBType_Geo_Object_SubTypeType<1>>

        return new ST_Point(config.longitude, config.latitude, config.height)
    } else if(geoObject.type === DBType_Geo_Object_Type_TYPES.unit) {
        const config = geoObject.config as unknown as DBType_Geo_Object_ConfigType<2, DBType_Geo_Object_SubTypeType<2>>

        return new ST_Point(config.longitude, config.latitude, config.height)
    } else if(geoObject.type === DBType_Geo_Object_Type_TYPES.collision) {
        const config = geoObject.config as unknown as DBType_Geo_Object_ConfigType<3, DBType_Geo_Object_SubTypeType<3>>

        if([0, 1, 4].includes(geoObject.sub_type)){
            const configTyped = config as unknown as DBType_Geo_Object_ConfigType<3, 0 | 1 | 4>

            return new ST_Point(configTyped.point[0], configTyped.point[1], configTyped.point[2])
        } else if(geoObject.sub_type === 6){
            return new ST_Line((config as unknown as DBType_Geo_Object_ConfigType<3, 6>).polygon.map(point => new ST_Point(point[0], point[1], point[2])))
        } else {
            return new ST_Line((config as unknown as DBType_Geo_Object_ConfigType<3, 2 | 3 | 5>).line.map(point => new ST_Point(point[0], point[1], point[2])))
        }

    }

    //@ts-ignore
    throw new Error('unsupported geoobject type and subtype: ' + geoObject.type + ', ' + geoObject.sub_type)
}