import {parsePGM, Geoid} from '@math.gl/geoid'
import { ref } from 'vue'

export const geoidIsLoaded = ref(false)

let geoid: Geoid

export async function loadGeoid(){
    geoid = parsePGM(new Uint8Array(await getPGMFile('/geo/geoids/egm96-15.pgm')), {})
    geoidIsLoaded.value = true
}

async function getPGMFile(url: string){

    const request = new Request(url, {
        credentials: 'same-origin'
    })

    const response = await fetch(request)

    return await response.arrayBuffer()
}

function getGeoidHeightAt(longitude: number, latitude: number){
    if(geoid === undefined){
        throw new Error('geoid not loaded')
    }

    return geoid.getHeight(latitude, longitude)
}

export function convertEllipsoidalHeightToOrthometricHeight(longitude: number, latitude: number, height: number){
    return height - getGeoidHeightAt(longitude, latitude)
}

export function convertOrthometricHeightToEllisoidalHeight(longitude: number, latitude: number, height: number){
    return height + getGeoidHeightAt(longitude, latitude)
}


