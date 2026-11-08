/**
 *
 * @param r 0-255
 * @param g 0-255
 * @param b 0-255
 * @returns 0-1
 */
export function lightness(r: number, g: number, b: number) {

    const rInt = parseInt('' + r)
    const gInt = parseInt('' + g)
    const bInt = parseInt('' + b)

    const rLin = (rInt / 255.0) ** 2.218
    const gLin = (gInt / 255.0) ** 2.218
    const bLin = (bInt / 255.0) ** 2.218

    const yLum = rLin * 0.2126 + gLin * 0.7156 + bLin * 0.0722;   // convert to Luminance Y

    return Math.pow(yLum, 0.68)
}

export function getBlackOrWhiteForColor(colorHex: string){
    const r = parseInt(colorHex.slice(1, 3), 16)
    const g = parseInt(colorHex.slice(3, 5), 16)
    const b = parseInt(colorHex.slice(5, 7), 16)

    const theLightness = lightness(r, g, b)

    return theLightness > 0.4 ? '#000000' : '#ffffff'
}