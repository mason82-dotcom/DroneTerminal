
import { DBInsert_File, DBUpdate_File, delete_File, insert_File, select_File, update_File } from '../../generated-definitions/db/DBHelpers'
import {DBType_File} from '../../generated-definitions/db/DBTypes'
import Module_Base, { makeFunctionIdSafe } from '../Module_Base'
import safeJsonStringify from 'safe-json-stringify'
import fs from 'fs'
import path from 'path'
import { readFile } from 'fs/promises'
import { getExifData } from '../../util/exif'
import { Tags } from 'exifreader'
import { getFileExtension } from '../../util/file'
import { Waitable } from '../../util/waitable'
import {generateThumbnailForPath} from '../../util/thumbnail'

import SecretsLoader from '../../util/SecretsLoader'
const secretsLoader = new SecretsLoader('secrets.json')
const secrets = secretsLoader.getSecrets(['files_path'])

const THUMBNAILS_FOLDER = 'thumbnails'
const THUMBNAIL_WIDTH = 300


import pgp from 'pg-promise'
import { downloadObject } from '../../s3-store'
import { assignObject } from '../../util/typescript'
import { MulterFile } from '../../app'
//@ts-ignore
const db = global.db as pgp.IDatabase<any>


export default class FileModule extends Module_Base<
    {
        workspaceId: number,
        id: number
    },

    {
        create_file: {
            eventDataType: DBType_File,
            availableContexts: 'workspaceId' | 'id'
        },
        update_file: {
            eventDataType: DBType_File,
            availableContexts: 'workspaceId' | 'id'
        },
        delete_file: {
            eventDataType: DBType_File,
            availableContexts: 'workspaceId' | 'id'
        }
    }
> {

    constructor(){
        super()

        const thumbnailsFolderPath = path.join(path.resolve(secrets.files_path), THUMBNAILS_FOLDER)
        if(fs.existsSync(thumbnailsFolderPath) === false){
            fs.mkdirSync(thumbnailsFolderPath)
        }

        setTimeout(()=>{
             this.checkForMissingThumbnails()
        }, 0)
    }

    /**
     *
     * @param waitUntil see util/waitable.ts
     */
    private async createFile(data: DBInsert_File, waitUntil?: Waitable){
        const file = await insert_File(data)



        const after = async ()=>{
            try {
                await this.generateExifDataForFile(file.id)
            } catch (err){
                console.warn('failed to generateExifDataForFile', file.id, err)
            }

            try {
                await this.generateThumbnailForFile(file)
            } catch (err){
                console.warn('failed to generate thumbnail for file', file.id, err)
            }

            this.dispatch('create_file', {
                id: file.id,
                workspaceId: file.workspace_id
            }, file)
        }

        if(waitUntil){
            setTimeout(async()=>{
                await waitUntil.getPromise()//TODO check if this code works

                await after()
            }, 1)
        } else {
            await after()
        }

        return file
    }

    /**
     *
     * @returns false if does not exist
     * @see updateFileSafe
     */
    async updateFile(id: number, data: DBUpdate_File){
        const file = await update_File(id, data)

        if(file === false){
            return false
        }

        this.dispatch('update_file', {
            id: file.id,
            workspaceId: file.workspace_id
        }, file)

        return file
    }

    /**
     *
     * @see updateFile
     */
    updateFileSafe = makeFunctionIdSafe(this, this.updateFile)

    /**
     *
     * @returns false if does not exist
     * @see deleteFileSafe
     */
    async deleteFile(id: number){
        const file = await delete_File(id)

        if(file === false){
            return false
        }

        this.dispatch('delete_file', {
            id: file.id,
            workspaceId: file.workspace_id
        }, file)

        await this.deleteFileIfExists(this.getAbsoluteFilePathForFile(file))

        await this.deleteThumbnailIfExists(file)
    }

    /**
     *
     * @see deleteFile
     */
    deleteFileSafe = makeFunctionIdSafe(this, this.deleteFile)

    /**
     *
     * @returns false if does not exist
     * @see getFileSafe
     */
    async getFile(id: number){
        return await select_File(id)
    }

    /**
     *
     * @see getFile
     */
    getFileSafe = makeFunctionIdSafe(this, this.getFile)

    async createFileFromBucketObject(file: Omit<DBInsert_File, 'name'>, bucketName: string, objectKey: string){

        const waitable = await Waitable.make()

        const theFile = await this.createFile(assignObject(file, {
            name: objectKey
        }), waitable)

        try {
            await downloadObject(bucketName, objectKey, this.getAbsoluteFilePathForFile(theFile))
        } catch (err){

            try {
                await this.deleteFile(theFile.id)
            } catch (err){
                console.error('failed to cleanup file after downloading did not work', err)
            }

            throw err
        }

        waitable.finish()

        return theFile
    }

    async getAbsoluteFilePathForFileId(fileId: number){
        const file = await this.getFileSafe(fileId)
        return this.getAbsoluteFilePathForFile(file)
    }

    getAbsoluteFilePathForFile(file: DBType_File){
        return path.join(path.resolve(secrets.files_path), '' + file.id + '.' + file.ext)
    }

    async getAbsoluteThumbnailPathForFile(file: DBType_File){

        return path.join(path.resolve(secrets.files_path), THUMBNAILS_FOLDER, '' + file.id + '.' + file.thumbnail_format!)
    }

    private async checkForMissingThumbnails(){//TODO this probably blocks the main thread?
        try {
            const filesThatRequireThumbnails = await db.manyOrNone('SELECT * FROM files WHERE thumbnail_format is null AND thumbnail_generation_has_failed = false AND LOWER(ext) in(' + ('avif gif heif jp2 jpg jpeg jxl png webp tiff'.split(/\s/).map(m => '\'' + m + '\'').join(',')) + ');')

            for(const file of filesThatRequireThumbnails){

                // check if thumbnail got generated in the meantime (e.g. by direct api call)
                const upToDateFile = await this.getFileSafe(file.id)
                if(typeof upToDateFile.thumbnail_format === 'string' || upToDateFile.thumbnail_generation_has_failed){
                    continue
                }

                console.log('generate missing thumbnail for file', file.id)
                await this.generateThumbnailForFile(file)
            }

        } catch (err){
            console.warn('error while checkForMissingThumbnails', err)
        }

        setTimeout(()=>{
            this.checkForMissingThumbnails()
        }, 1000 * 60)
    }





    /**
     * generates a thumbnail for this file, and updates the file database entry. If it fails to generate one, the file database entry is marked as "generation_failed" and after that an error is thrown
     */
    private async generateThumbnailForFile(file: DBType_File){
        const filePath = await this.getAbsoluteFilePathForFileId(file.id)

        let thumbnail: Awaited<ReturnType<typeof generateThumbnailForPath>>
        try {
            thumbnail = await generateThumbnailForPath(filePath, {
                size: {
                    width: THUMBNAIL_WIDTH
                }
            })
        } catch (err){
            try {
                await this.updateFile(file.id, {
                    thumbnail_generation_has_failed: true
                })
            } catch (err){
                console.error('failed to mark thumbnail_generation_has_failed', err)
            }

            throw err
        }

        assignObject(file, {
            thumbnail_format: thumbnail.format
        })

        const thumbnailPath = await this.getAbsoluteThumbnailPathForFile(file)

        const writeStream = fs.createWriteStream(thumbnailPath)
        writeStream.write(thumbnail.buffer)
        writeStream.close()

        await this.updateFile(file.id, {
            thumbnail_format: thumbnail.format
        })

        return thumbnailPath
    }


    private async deleteTmpMulterFile(multerFile: MulterFile){
        await fs.promises.rm(multerFile.path)
    }

    async storeTmpMulterFileInDatabase(multerFile: MulterFile, workspaceId: number, createdBy: number){

        const file = await this.createFile({
            name: multerFile.originalname,
            ext: getFileExtension(multerFile.originalname),
            created_by: createdBy,
            workspace_id: workspaceId
        })

        this.deleteTmpMulterFile(multerFile).catch(err => {
            console.warn('failed to delete tmp multer file', err)
        })

        return file
    }

    private async deleteFileIfExists(filePath: string){
        if(fs.promises.access(filePath), fs.constants.W_OK){
            await fs.promises.rm(filePath)
        }
    }

    private async deleteThumbnailIfExists(file: DBType_File){
        await this.deleteFileIfExists(await this.getAbsoluteThumbnailPathForFile(file))
    }

    /**
     * generates the exif data for this file, and updates the file database entry.
     */
    private async generateExifDataForFile(fileId: number){
        const filePath = await this.getAbsoluteFilePathForFileId(fileId)

        const buf = await readFile(filePath)

        //@ts-ignore
        const exifData = await getExifData(buf)

        try {

            const clean = {}
            for(const key of Object.keys(exifData)){

                if(key === 'Images' || key === 'Thumbnail'){
                    continue //skip to safe storage space
                }

                const safeJSON = safeJsonStringify(exifData[key]) as string

                if(safeJSON.length > 100000 && ['MakerNote'].includes(key) === false){
                    console.log('removed key', key, safeJSON.length)
                } else {
                    clean[key] = JSON.parse(safeJSON)
                }
            }

            const cleanJson = JSON.stringify(clean)

            const len = cleanJson.length

            await this.updateFile(fileId, {
                exif_data: cleanJson
            })
        } catch (err){

            try {
                await this.updateFile(fileId, {
                    exif_data_generation_has_failed: true
                })
            } catch (err){
                console.error('failed to mark exif_data_generation_has_failed', err)
            }

            throw err
        }

        return exifData
    }

    async getExifDataForFile(fileId: number){
        const file = await this.getFileSafe(fileId)

        if(file.exif_data){
            return JSON.parse(file.exif_data) as Tags
        } else {
            if(file.exif_data_generation_has_failed){
                return false
            } else {
                try {
                    return await this.generateExifDataForFile(fileId)
                } catch (err){
                    return false
                }
            }
        }
    }

}
