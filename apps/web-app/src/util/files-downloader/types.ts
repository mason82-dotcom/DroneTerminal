
export interface FileSystemDirectoryHandleAsyncIterator<T> extends AsyncIteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.asyncIterator](): FileSystemDirectoryHandleAsyncIterator<T>;
}

export interface FileSystemDirectoryHandle {
    name: string
    [Symbol.asyncIterator](): FileSystemDirectoryHandleAsyncIterator<[string, FileSystemHandle]>;
    entries(): FileSystemDirectoryHandleAsyncIterator<[string, FileSystemHandle]>;
    keys(): FileSystemDirectoryHandleAsyncIterator<string>;
    values(): FileSystemDirectoryHandleAsyncIterator<FileSystemHandle>;
    getDirectoryHandle(name: string, options?: {create?: boolean}): Promise<FileSystemDirectoryHandle>
    getFileHandle(name: string, options?: {create?: boolean}): Promise<FileSystemFileHandle>
}

export interface FileSystemFileHandle extends FileSystemHandle {
    readonly kind: "file";
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/createWritable) */
    createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FileSystemFileHandle/getFile) */
    getFile(): Promise<File>;
}
