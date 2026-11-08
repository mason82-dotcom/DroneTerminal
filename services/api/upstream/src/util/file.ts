
export function getFileExtension(fileName: string){
    const lastDotIndex = fileName.lastIndexOf('.')
    const ext = lastDotIndex < 0 ? '' : fileName.substring(lastDotIndex + 1)

    return ext
}