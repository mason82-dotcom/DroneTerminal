import ExifReader from 'exifreader'


type ExifData = Awaited<ReturnType<typeof getExifData>>


export type MediaMeta = {
    position?: {
        longitude: number
        latitude: number
    }
    height: number
    thumbnail: File
}

export type ImageMeta = {
    position?: {
        longitude: number
        latitude: number
    }
    altitude?: number
    fov?: FOV
    createdAt?: string //ISO without timezone
    gimbal: {
        pitch?: number
        yaw?: number
        roll?: number
    }
}


export async function getMetaFromExifData(exifData: ExifData): Promise<ImageMeta> {

    const gpsParsed = parseExifGps(exifData)

    const fovParsed = parseExifFOV(exifData)

    const gimbalParsed = parseExifGimbal(exifData)

    const createDateIso = exifData["CreateDate"]?.description

    return {
        position: gpsParsed === false ? undefined : gpsParsed.position,
        altitude: gpsParsed === false ? undefined : gpsParsed.altitude,
        fov: fovParsed === false ? undefined : fovParsed,
        createdAt: createDateIso,
        gimbal: gimbalParsed
    }
}

// see https://exiv2.org/tags.html
function parseExifGps(exif: ExifData){
    const gpsLon = parseFloat('' + exif.GPSLongitude.description)
    const gpsLat = parseFloat('' + exif.GPSLatitude.description)

    const gpsAltitude = parseFloat('' + exif.GPSAltitude.description)

    if(isNaN(gpsLon)){
        return false
    }

    if(isNaN(gpsLat)){
        return false
    }

    return {
        position: {
            longitude: gpsLon,
            latitude: gpsLat,
        },
        altitude: (exif.GPSAltitudeRef?.value !== 1) ? gpsAltitude : undefined
    }
}

export type FOV = {
    angular: {
        horizontal: number
        vertical: number
    }
}

function parseExifFOV(exif: ExifData): false | FOV {
    // see https://www.bobatkins.com/photography/technical/field_of_view.html

    const focalLength = parseFloat('' + exif.FocalLengthIn35mmFilm.value)


    if(isNaN(focalLength)){
        return false
    }

    return {
        angular: {
            horizontal: getFovRectilinear(36, focalLength),
            vertical: getFovRectilinear(24, focalLength)
        }

    }
}

/**
 *
 * @returns angular fov in degrees
 */
function getFovRectilinear(frameSize: number, focalLength: number){
    return toDegrees(2 * Math.atan(frameSize / (focalLength * 2)))
}

function parseExifGimbal(exif: ExifData){

    const gimbalPitch = parseFloat('' + exif.GimbalPitchDegree.value)
    const gimbalYaw = parseFloat('' + exif.GimbalYawDegree.value)
    const gimbalRoll = parseFloat('' + exif.GimbalRollDegree.value)

    return {
        pitch: isNaN(gimbalPitch) ? undefined : gimbalPitch,
        yaw: isNaN(gimbalYaw) ? undefined : gimbalYaw,
        roll: isNaN(gimbalRoll) ? undefined : gimbalRoll
    }
}

function toDegrees(rad: number){
    return rad / (Math.PI/180)
}


export function getExifData(buffer: ArrayBuffer){
    return ExifReader.load(buffer, {
        async: true
    })
}


/**
 * @param str format: '2000:08:04 18:22:57'
 * @returns ISO Date string without timezone
 */
export function parseExifTimestamp(str?: string): string | undefined {
    if(typeof str !== 'string'){
        return
    }

    const match = str.match(/\s*(\d\d\d\d):(\d\d):(\d\d)\s+(\d\d):(\d\d):(\d\d)\s*/)

    if(!match){
        return
    }

    return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}`
}
