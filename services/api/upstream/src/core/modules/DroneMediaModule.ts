import {DBInsert_Drone_Media, DBUpdate_Drone_Media, delete_Drone_Media, insert_Drone_Media, select_Drone_Media, select_Workspace, update_Drone_Media} from '../../generated-definitions/db/DBHelpers'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import { DBType_Drone, DBType_Drone_Media, DBType_Drone_Media_TypeType } from '../../generated-definitions/db/DBTypes'
import { assignObject } from '../../util/typescript'

import dayjs from "dayjs";
import { ApiType_Media_Ground_Coverage } from "../../generated-definitions/api/ApiTypes";
import { getMetaFromExifData } from "../../util/exif";
import { getCore } from '..'
import SecretsLoader from '../../util/SecretsLoader'
import { registerSubscribableEvent, SubscribableEventHandler } from '../../live-websocket/websocket';
import DroneModule from './DroneModule';
import { getFileExtension } from '../../util/file';
import { deleteObject } from '../../s3-store';
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets(['terrain_service_adress'])

const LAST_UPDATE_OF_TERRAIN_MODEL = dayjs('2025-04-01T00:00:00Z')
const LAST_UPDATE_OF_COVERAGE_ALGORITHM = dayjs('2025-10-15T10:12:00Z')



export default class DroneMediaModule extends Module_Base<
    {
        id: number
        workspaceId: number
    },

    {
        create_drone_media: {
            eventDataType: DBType_Drone_Media,
            availableContexts: 'id' | 'workspaceId'
        },
        update_drone_media: {
            eventDataType: DBType_Drone_Media,
            availableContexts: 'id' | 'workspaceId'
        },
        delete_drone_media: {
            eventDataType: DBType_Drone_Media,
            availableContexts: 'id' | 'workspaceId'
        }
    }
> {

    private subscribableEventHandlerDroneMedia: SubscribableEventHandler<'drone_media'>
    private subscribableEventHandlerWorkspaceDronesMedia: SubscribableEventHandler<'workspace_drones_media'>

    constructor(){
        super()

        this.subscribableEventHandlerDroneMedia = registerSubscribableEvent('drone_media', async(event, filter, client)=>{

            const droneId = parseInt(filter)

            if(isNaN(droneId) || droneId < 0){
                return 'invalid filter: ' + droneId
            }

            let connection: Awaited<ReturnType<DroneModule["getActiveConnectionForDrone"]>>

            try {
                connection = await getCore().modules.drone.getActiveConnectionForDrone(droneId)//TODO if drone does not exist, api crashes
            } catch(err){
                return 'drone not found'//TODO this might not always be the case if an error is thrown, so message could be misleading
            }

            if(connection === false){
                return 'drone has no valid connection'
            }

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, connection.workspace_id)

            if(!hasPermission){
                return 'Permission denied'
            }

        })

        this.subscribableEventHandlerWorkspaceDronesMedia = registerSubscribableEvent('workspace_drones_media', async(event, filter, client)=>{

            const id = parseInt(filter)

            if(isNaN(id) || id < 0){
                return 'invalid filter: ' + id
            }

            const workspace = await select_Workspace(id)

            if(workspace === false){
                return 'workspace does not exist'
            }

            const hasPermission = await getCore().modules.user.userHasPermissionForWorkspace(client.userId, workspace.id)

            if(!hasPermission){
                return 'Permission denied'
            }

        })
    }

    private async createDroneMedia(data: DBInsert_Drone_Media){
        const droneMedia = await insert_Drone_Media(data)

        const workspaceId = await getCore().modules.drone.getCurrentWorkspaceOfDrone(droneMedia.drone_id)

        this.dispatch('create_drone_media', {
            id: droneMedia.id,
            workspaceId: workspaceId || 0
        }, droneMedia)

        if(workspaceId === false){
            console.warn('drone had no workspace when creating droneMedia', droneMedia)
        }

        return droneMedia
    }

    /**
     * @returns false if does not exist
     * @see updateDroneMediaSafe
     */
    async updateDroneMedia(id: number, data: DBUpdate_Drone_Media){
        const droneMedia = await update_Drone_Media(id, data)

        if(droneMedia === false){
            return false
        }

        const workspaceId = await getCore().modules.drone.getCurrentWorkspaceOfDrone(droneMedia.drone_id)

        this.dispatch('update_drone_media', {
            id: droneMedia.id,
            workspaceId: workspaceId || 0
        }, droneMedia)

        if(workspaceId === false){
            console.warn('drone had no workspace when updating droneMedia', droneMedia)
        }

        return droneMedia
    }

    /**
     *
     * @see updateDroneMedia
     */
    updateDroneMediaSafe = makeFunctionIdSafe(this, this.updateDroneMedia)

    /**
     *
     * @returns false if does not exist
     * @see deleteDroneMediaSafe
     */
    async deleteDroneMedia(id: number){
        const droneMedia = await delete_Drone_Media(id)//TODO delete file too?

        if(droneMedia === false){
            return false
        }

        const workspaceId = await getCore().modules.drone.getCurrentWorkspaceOfDrone(droneMedia.drone_id)

        this.dispatch('delete_drone_media', {
            id: droneMedia.id,
            workspaceId: workspaceId || 0
        }, droneMedia)

        if(workspaceId === false){
            console.warn('drone had no workspace when deleting droneMedia', droneMedia)
        }
    }

    /**
     *
     * @see deleteDroneMedia
     */
    deleteDroneMediaSafe = makeFunctionIdSafe(this, this.deleteDroneMedia)

    /**
     *
     * @returns false if does not exist
     * @see getDroneMediaSafe
     */
    async getDroneMedia(id: number){
        return await select_Drone_Media(id)
    }

    /**
     *
     * @see getDroneMedia
     */
    getDroneMediaSafe = makeFunctionIdSafe(this, this.getDroneMedia)


    _createRaw(data: DBInsert_Drone_Media){
        return this.createDroneMedia(data)
    }

    async createDroneMediaFromBucketObject(bucketName: string, objectKey: string, drone: DBType_Drone, fingerprint: string, tiny_fingerprint: string, mediaType: DBType_Drone_Media_TypeType, meta: string){

        const workspaceId = await getCore().modules.flight.getWorkspaceIdForFlight(drone.current_flight_id)

        const theFile = await getCore().modules.file.createFileFromBucketObject({
            workspace_id: workspaceId,
            created_by: 0,
            ext: getFileExtension(objectKey)
        }, bucketName, objectKey)

        const droneMeta = await this.getDroneMetaFromFile(theFile.id)

        let droneMedia: DBType_Drone_Media

        try {

            droneMedia = await this.createDroneMedia({
                drone_id: drone.id,
                fingerprint,
                tiny_fingerprint,
                flight_id: drone.current_flight_id,
                type: mediaType,
                file_id: theFile.id,
                captured_at: droneMeta === false ? undefined : droneMeta.createdAt,
                camera_location: droneMeta === false ? undefined : JSON.stringify({position: droneMeta.position, height: droneMeta.altitude}),
                camera_angles: droneMeta === false ? undefined : JSON.stringify({heading: droneMeta.gimbal.yaw, pitch: droneMeta.gimbal.pitch, roll: droneMeta.gimbal.roll}),
                meta
            })

        } catch (err){

            console.error('failed to create drone media. Cleaning up file', theFile.id, err)

            await getCore().modules.file.deleteFile(theFile.id)

            throw err
        }

        try {
            await deleteObject(bucketName, objectKey)
        } catch (err){
            console.error('failed to delete object after it was downloaded', err)
        }

        return droneMedia
    }

    async getMediaCoverage(media: DBType_Drone_Media){

        const generatedAt = dayjs(media.coverage_generated_at)

        if(!media.coverage || media.coverage && (generatedAt.isBefore(LAST_UPDATE_OF_TERRAIN_MODEL) || generatedAt.isBefore(LAST_UPDATE_OF_COVERAGE_ALGORITHM))){
            return await this.fetchMediaCoverage(media)
        } else {
            return JSON.parse(media.coverage) as ApiType_Media_Ground_Coverage
        }
    }


    private async fetchMediaCoverage(media: DBType_Drone_Media){

        const meta = await this.getDroneMetaFromFile(media.file_id)

        if(meta === false){
            return false
        }

        const response = await fetch(secrets.terrain_service_adress + (secrets.terrain_service_adress.endsWith('/') ? '' : '/') + 'camera-ground-coverage', {
            body: JSON.stringify({
                longitude: meta.position!.longitude,
                latitude: meta.position!.latitude,
                altitude: meta.altitude! - 50,//TODO remove this dirty geoid fix
                heading: meta.gimbal.yaw,
                pitch: meta.gimbal.pitch,
                fovVertical: meta.fov!.angular.vertical,
                fovHorizontal: meta.fov!.angular.horizontal
                //TODO implement camera roll?
            }),
            method: 'post',
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        })

        if(('' + response.status).startsWith('2') === false){
            console.error('failed to generate coverage for media', media.id, response.statusText + ': ' + await response.text())
            return false
        }

        const responseJson = await response.text()
        const obj = JSON.parse(responseJson)

        try {
            await this.updateDroneMedia(media.id, {
                coverage: responseJson,
                coverage_generated_at: new Date().toISOString()
            })
        } catch (err){
            console.error('failed to update coverage of drone_media', err)
        }

        return obj as ApiType_Media_Ground_Coverage
    }


    async getDroneMetaFromFile(fileId: number){

        const exifData = await getCore().modules.file.getExifDataForFile(fileId)

        if(exifData === false){
            return false
        } else {
            return getMetaFromExifData(exifData)
        }
    }


    parseCameraMetaOfMedia<m extends DBType_Drone_Media>(media: m){//use generic to fix a typescript typing "glitch" with assignObject
        return assignObject(media, {
            camera_angles: typeof media.camera_angles === 'string' ? JSON.parse(media.camera_angles) : undefined,
            camera_location: typeof media.camera_location === 'string' ? JSON.parse(media.camera_location) : undefined
        })
    }
}
