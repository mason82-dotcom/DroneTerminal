import type {FileSystemDirectoryHandle, FileSystemFileHandle } from './types.js'

export function filesApiIsSupported(){
    return ('showDirectoryPicker' in self)
}

export async function selectFolderToSaveFilesTo(id?: string, startIn?: DirectoryPicker_StartIn){

    const win = window as (Window & typeof globalThis & {showDirectoryPicker: showDirectoryPicker})

    return await win.showDirectoryPicker({
        id,
        mode: 'readwrite',
        startIn
    })
}

export async function createFileStreamInDirectory(filename: string, handle: FileSystemDirectoryHandle){
    const fileHandle = await handle.getFileHandle(filename, {
        create: true
    })

    return await fileHandle.createWritable({
        keepExistingData: false
    })
}

type showDirectoryPicker = (options?: {
    id?: string
    mode?: 'read' | 'readwrite'
    startIn?: DirectoryPicker_StartIn
}) => Promise<FileSystemDirectoryHandle>

export type DirectoryPicker_StartIn = FileSystemFileHandle | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos'
