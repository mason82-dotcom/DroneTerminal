import { Color } from "cesium";

export function colorizeCanvas(canvas: HTMLCanvasElement, color: Color){

    if(canvas.width === 0 && canvas.height === 0){
        return
    }

    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height)

    for(let y = 0; y < canvas.height; y++){
        for(let x = 0; x < canvas.width; x++){
            const rIndex = y * canvas.width * 4 + x * 4
            const gIndex = rIndex + 1
            const bIndex = rIndex + 2
            const aIndex = rIndex + 3

            const alpha = imageData.data[aIndex]/255
            const combinedAlpha = alpha * color.alpha

            imageData.data[rIndex] = Math.floor(color.red * 255 * combinedAlpha)
            imageData.data[gIndex] = Math.floor(color.green * 255 * combinedAlpha)
            imageData.data[bIndex] = Math.floor(color.blue * 255 * combinedAlpha)
            imageData.data[aIndex] = Math.floor(combinedAlpha * 255)
        }
    }

    canvas.getContext('2d').putImageData(imageData, 0, 0)
}

export function drawLogoOntopOfImage(baseImage: HTMLImageElement, logoImage: HTMLImageElement, maxLogoSize: number): HTMLCanvasElement {

    const canvas = document.createElement('canvas')
    canvas.width = baseImage.width
    canvas.height = baseImage.height

    const ctx = canvas.getContext('2d')

    if(!ctx){
        throw new Error('Could not get canvas context')
    }

    ctx.drawImage(baseImage, 0, 0)

    const baseMaxSize = Math.max(baseImage.width, baseImage.height)

    const logoScale = (maxLogoSize * baseMaxSize) / Math.max(logoImage.width, logoImage.height)
    const logoWidth = logoImage.width * logoScale
    const logoHeight = logoImage.height * logoScale

    ctx.save()
    ctx.fillStyle = '#fff'
    ctx.rect((baseImage.width - logoWidth) / 2, (baseImage.height - logoHeight) / 2, logoWidth, logoHeight)
    ctx.fill()
    ctx.restore()

    ctx.drawImage(
        logoImage,
        (baseImage.width - logoWidth) / 2,
        (baseImage.height - logoHeight) / 2,
        logoWidth,
        logoHeight,
    )

    return canvas
}

export function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.style.position = 'absolute'
        img.style.left = '-9999px'
        img.style.top = '-9999px'
        document.body.appendChild(img)
        img.onload = () => resolve(img)
        img.onerror = (err=> {
            console.error(err)
            reject(err)
        })
        img.src = src
    })
}