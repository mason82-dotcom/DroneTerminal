import sharp from 'sharp';
import fs from 'fs/promises'
import sizeOf from 'image-size'

/**
 *
 * default size is 10% of original image
 * @returns
 */
export async function generateThumbnailForPath(path: string, options?: {
    size?: { width: number } | { height: number } | { width: number, height: number } | {percentage: number}
}){
    const imageBuffer = await fs.readFile(path)

    const targetDimensions = getTargetDimensions(imageBuffer, options?.size)

    const result = await resizeWithSharp(imageBuffer, targetDimensions)

    return {
        buffer: result.data,
        format: result.info.format.toLowerCase()
    }

}


function getTargetDimensions(imageBuffer: Buffer, size?: { width: number } | { height: number } | { width: number, height: number } | {percentage: number}): {width: number, height: number}{
    if(!size){
        size = { percentage: 10 }
    }

    if('percentage' in size){
        const originalDimensions = sizeOf(imageBuffer)

        return {
            width: Math.max(1, parseInt((originalDimensions.width! * (size.percentage / 100)).toFixed(0))),
            height: Math.max(1, parseInt((originalDimensions.height! * (size.percentage / 100)).toFixed(0)))
        }
    }

    if('width' in size && !('height' in size)){
        const originalDimensions = sizeOf(imageBuffer)
        const ratio = originalDimensions.width! / originalDimensions.height!

        const targetWidth = Math.min(size.width, originalDimensions.width!)

        return {
            width: Math.max(1, parseInt((targetWidth).toFixed(0))),
            height: Math.max(1, parseInt((targetWidth / ratio).toFixed(0)))
        }
    }

    if('height' in size && !('width' in size)){
        const originalDimensions = sizeOf(imageBuffer)
        const ratio = originalDimensions.width! / originalDimensions.height!

        const targetHeight = Math.min(size.height, originalDimensions.height!)

        return {
            width: Math.max(1, parseInt((targetHeight * ratio).toFixed(0))),
            height: Math.max(1, parseInt((targetHeight).toFixed(0)))
        }
    }

    return size

}

async function resizeWithSharp(imageBuffer: Buffer, dimensions: {width: number, height: number}){

    const resizedImage = sharp(imageBuffer, {failOn: 'error'}).resize({
        width: dimensions.width,
        height: dimensions.height,
        withoutEnlargement: true,//TODO check what happens when image original size is smaller then width/height
        fit: 'contain'
    })

    return resizedImage.toBuffer({resolveWithObject: true})
}