// TODO once available, we should set up persistent version of the "grant access to local folder" popup: https://developer.chrome.com/blog/persistent-permissions-for-the-file-system-access-api

import { ApiResponse_WorkspaceMyWorkspacesGet } from "openflighthub-api-client-sdk";
import { createFileStreamInDirectory, DirectoryPicker_StartIn, filesApiIsSupported, selectFolderToSaveFilesTo } from "./util.js";
import type {FileSystemDirectoryHandle } from './types.js'

/**
 * use FilesDownloader.askUserToSelectFolder() as an entry point
 */
export class FilesDownloader {

    protected readonly globalFolderHandle: FileSystemDirectoryHandle

    constructor(folderHandle: FileSystemDirectoryHandle){
        this.globalFolderHandle = folderHandle
    }


    protected makeFolderNameWithId(id: number, name: string){
        return '' + id + '_' + name
    }

    protected async getFolderById(context: FileSystemDirectoryHandle, folderId: number){
        for await (const entry of context.entries()){
            const name = entry[0]

            const nameSplit = name.split('_')
            if(nameSplit[0] === ('' + folderId)){
                // exists
                return await context.getDirectoryHandle(name)
            }
        }

        return false
    }

    protected async getFolderOrCreateById(context: FileSystemDirectoryHandle, folderId: number, folderName: string, renameIfRequired?: boolean){
        let folder = await this.getFolderById(context, folderId)

        if(folder === false){
            folder = await this.createFolder(context, folderId, folderName)
        }

        const folderNameSplit = folder.name.split('_')

        folderNameSplit.splice(0, 1)
        const existingFolderName = folderNameSplit.join('_')

        if(existingFolderName !== folderName){
            //TODO implement (chrome does not currently support this!)
        }

        return folder
    }

    protected async createFolder(context: FileSystemDirectoryHandle, folderId: number, folderName: string){
        return await context.getDirectoryHandle(this.makeFolderNameWithId(folderId, folderName), {
            create: true
        })
    }


    /**
     *
     * @param fileOrUrl File, Blob or url to file
     */
    protected async saveFileToFolder(folder: FileSystemDirectoryHandle, fileOrUrl: File | Blob | string, fileName: string){

        const fs = await createFileStreamInDirectory(fileName, folder)

        if(fileOrUrl instanceof File || fileOrUrl instanceof Blob){
            await fileOrUrl.stream().pipeTo(fs)
        } else {
            const fe = await fetch(fileOrUrl)

            const blob = new Blob([await fe.arrayBuffer()])

            await blob.stream().pipeTo(fs)
        }
    }

    protected async fileExistsAndIsNotEmpty(folder: FileSystemDirectoryHandle, fileName: string){

        try {
            const fileHandle = await folder.getFileHandle(fileName)

            const file = await fileHandle.getFile()

            if(file.size === 0){
                return false
            }

            return true
        } catch (err){
            return false
        }
    }

    static async askUserToSelectFolder(id?: string, startIn?: DirectoryPicker_StartIn){
        const handle = await selectFolderToSaveFilesTo(id, startIn)

        return new FilesDownloader(handle)
    }

    static isSupported(){
        return filesApiIsSupported()
    }
}

export class WorkspaceFilesDownloader extends FilesDownloader {



    async setWorkspaces(workspaces: ApiResponse_WorkspaceMyWorkspacesGet){
        for(const workspace of workspaces){
            await this.getWorkspaceFolderOrCreate(workspace.id, workspace.name, true)
        }
    }

    protected async getWorkspaceFolder(workspaceId: number){
        return this.getFolderById(this.globalFolderHandle, workspaceId)
    }

    protected async createWorkspaceFolder(workspaceId: number, workspaceName: string){
        return this.createFolder(this.globalFolderHandle, workspaceId, workspaceName)
    }

    protected async getWorkspaceFolderOrCreate(workspaceId: number, workspaceName: string, renameIfRequired?: boolean){
        return this.getFolderOrCreateById(this.globalFolderHandle, workspaceId, workspaceName, renameIfRequired)
    }

    static async askUserToSelectFolder(id?: string, startIn?: DirectoryPicker_StartIn){
        const handle = await selectFolderToSaveFilesTo(id, startIn)

        return new DroneMediaDownloader(handle)
    }
}

export class DroneMediaDownloader extends WorkspaceFilesDownloader {

    protected async getDroneFolder(workspaceId: number, droneId: number){
        const workspaceFolder = await this.getWorkspaceFolder(workspaceId)

        if(workspaceFolder === false){
            return false
        }

        return this.getFolderById(workspaceFolder, droneId)
    }

    protected async createDroneFolder(workspaceId: number, workspaceName: string, droneId: number, droneName: string){
        const workspaceFolder = await this.getWorkspaceFolderOrCreate(workspaceId, workspaceName)
        return this.createFolder(workspaceFolder, droneId, droneName)
    }

    protected async getDroneFolderOrCreate(workspaceId: number, workspaceName: string, droneId: number, droneName: string, renameIfRequired?: boolean){
        const workspaceFolder = await this.getWorkspaceFolderOrCreate(workspaceId, workspaceName, renameIfRequired)
        return await this.getFolderOrCreateById(workspaceFolder, droneId, droneName, renameIfRequired)
    }

    async saveDroneFile(workspaceId: number, workspaceName: string, droneId: number, droneName: string, fileOrUrl: File | Blob | string, fileName: string){
        const droneFolder = await this.getDroneFolderOrCreate(workspaceId, workspaceName, droneId, droneName)
        return await this.saveFileToFolder(droneFolder, fileOrUrl, fileName)
    }

    async droneFileExistsAndIsNotEmpty(workspaceId: number, droneId: number, fileName: string){
        const droneFolder = await this.getDroneFolder(workspaceId, droneId)

        if(droneFolder === false){
            return false
        }

        return await this.fileExistsAndIsNotEmpty(droneFolder, fileName)
    }

    static async askUserToSelectFolder(id?: string, startIn?: DirectoryPicker_StartIn){
        const handle = await selectFolderToSaveFilesTo(id, startIn)

        return new DroneMediaDownloader(handle)
    }
}


export class FlightMediaDownloader extends DroneMediaDownloader {

    protected async getFlightFolder(workspaceId: number, droneId: number, flightId: number){
        const droneFolder = await this.getDroneFolder(workspaceId, droneId)

        if(droneFolder === false){
            return false
        }

        return this.getFolderById(droneFolder, flightId)
    }

    protected async createFlightFolder(workspaceId: number, workspaceName: string, droneId: number, droneName: string, flightId: number, flightName: string){
        const droneFolder = await this.getDroneFolderOrCreate(workspaceId, workspaceName, droneId, droneName)
        return this.createFolder(droneFolder, flightId, flightName)
    }

    protected async getFlightFolderOrCreate(workspaceId: number, workspaceName: string, droneId: number, droneName: string, flightId: number, flightName: string, renameIfRequired?: boolean){
        const droneFolder = await this.getDroneFolderOrCreate(workspaceId, workspaceName, droneId, droneName, renameIfRequired)
        return await this.getFolderOrCreateById(droneFolder, flightId, flightName, renameIfRequired)
    }

    async saveFlightFile(workspaceId: number, workspaceName: string, droneId: number, droneName: string, flightId: number, flightName: string, fileOrUrl: File | Blob | string, fileName: string){
        const flightFolder = await this.getFlightFolderOrCreate(workspaceId, workspaceName, droneId, droneName, flightId, flightName)
        return await this.saveFileToFolder(flightFolder, fileOrUrl, fileName)
    }

    async flightFileExistsAndIsNotEmpty(workspaceId: number, droneId: number, flightId: number, fileName: string){
        const flightFolder = await this.getFlightFolder(workspaceId, droneId, flightId)

        if(flightFolder === false){
            return false
        }

        return await this.fileExistsAndIsNotEmpty(flightFolder, fileName)
    }

    static async askUserToSelectFolder(id?: string, startIn?: DirectoryPicker_StartIn){
        const handle = await selectFolderToSaveFilesTo(id, startIn)

        return new FlightMediaDownloader(handle)
    }
}
