import { Cartographic, sampleTerrainMostDetailed, Viewer, Math as MathCesium } from "cesium"
import { getPointFromOriginWithBearingAndDistance } from "@/util/cesium"
import Timer from "./timer"

export type TerrainVisibilityOptions = {
    observerLonLat: [number, number]
    observerHeightAboveGround?: number
    observerHeightMsl?: number
    headingDeg: number
    horizontalFovDeg?: number
    maxDistanceMeters: number
    radialStepMeters?: number
    bearingSamples?: number
}

export type TerrainVisibilitySample = {
    bearingDeg: number
    distanceMeters: number
    longitude: number
    latitude: number
    terrainHeight: number
    elevationAngleRad: number
    visible: boolean
}

export type TerrainVisibilityResult = {
    radialStepMeters: number
    observerGroundHeight: number
    observerHeightMsl: number
    visible: TerrainVisibilitySample[]
    occluded: TerrainVisibilitySample[]
    all: TerrainVisibilitySample[]
}

const USE_CACHE = false //TODO before enabling cache, implement size limit ot cache and make it more intelligent -> remove old unused entries?

type LongLatHash = string
const ELEVATION_CACHE = new Map<LongLatHash, number>()

let cacheHitCount = 0
let cacheMissCount = 0
let elevationSourcesCounted = new Map<string, number>()

function printTerrainElevationStats(){
    console.log(`elevation cache hit rate: ${(cacheHitCount/(cacheHitCount+cacheMissCount)*100).toFixed(2)}% (${cacheHitCount} hits, ${cacheMissCount} misses)`)
    console.log('elevation sources:', elevationSourcesCounted)
}

//@ts-ignore
window.printTerrainElevationStats = printTerrainElevationStats

/**
 * height is relative to geoid, if you need orthometric (normal height) use convertEllipsoidalHeightToOrthometricHeight()
 */
export async function getElevationAtPosition(viewer: Viewer, longitude: number, latitude: number, source?: string){

    if(!viewer.terrainProvider){
        console.warn("viewer has no terrain provider, returning 0 elevation")
        return Cartographic.fromDegrees(longitude, latitude, 0)
    }

    let hash = ''

    if(USE_CACHE){
        hash = makeLongLatHash(longitude, latitude)//Needed later too!

        const cachedElevation = ELEVATION_CACHE.get(hash)
        if(cachedElevation !== undefined){
            cacheHitCount++
            return Cartographic.fromDegrees(longitude, latitude, cachedElevation)
        } else {
            cacheMissCount++
        }

        if(cacheMissCount % 100 === 0){
            printTerrainElevationStats()
        }
    }

    const sourceString = source ?? 'unknown'
    const currentCount = elevationSourcesCounted.get(sourceString) ?? 0
    elevationSourcesCounted.set(sourceString, currentCount + 1)

    const inAirPos = Cartographic.fromDegrees(longitude, latitude, undefined, new Cartographic())

    const onGroundPos = inAirPos.clone()
    await sampleTerrainMostDetailed(viewer.terrainProvider, [onGroundPos])

    if(USE_CACHE){
        ELEVATION_CACHE.set(hash, onGroundPos.height)
    }

    return onGroundPos
}

function makeLongLatHash(longitude: number, latitude: number): LongLatHash{
    return `${longitude.toFixed(8)},${latitude.toFixed(8)}`
}

/**
 * Calculates terrain visibility in a horizontal view sector.
 * The algorithm samples terrain points in radial lines and marks a point visible
 * when its elevation angle is greater than all prior points on the same bearing.
 */
export async function calculateVisibleTerrainInDirection(viewer: Viewer, options: TerrainVisibilityOptions): Promise<TerrainVisibilityResult>{

    const horizontalFovDeg = typeof options.horizontalFovDeg === 'number' ? Math.max(0, options.horizontalFovDeg) : 60
    const radialStepMeters = typeof options.radialStepMeters === 'number' ? Math.max(1, options.radialStepMeters) : 50
    const bearingSamples = typeof options.bearingSamples === 'number' ? Math.max(1, Math.floor(options.bearingSamples)) : 31

    if(options.maxDistanceMeters <= 0){
        throw new Error('maxDistanceMeters must be > 0')
    }

    const observerGround = Cartographic.fromDegrees(options.observerLonLat[0], options.observerLonLat[1])
    await sampleTerrainMostDetailed(viewer.terrainProvider, [observerGround])

    const observerGroundHeight = typeof observerGround.height === 'number' ? observerGround.height : 0
    const observerHeightMsl = typeof options.observerHeightMsl === 'number'
        ? options.observerHeightMsl
        : observerGroundHeight + (typeof options.observerHeightAboveGround === 'number' ? options.observerHeightAboveGround : 1.7)

    const minBearing = options.headingDeg - horizontalFovDeg / 2
    const bearingStep = bearingSamples === 1 ? 0 : horizontalFovDeg / (bearingSamples - 1)

    const distanceSteps = Math.ceil(options.maxDistanceMeters / radialStepMeters)

    console.log('calculateVisibleTerrainInDirection', options)
    const timer = new Timer("calculateVisibleTerrainInDirection").start()

    const sampleMeta: {bearingDeg: number, distanceMeters: number, cartographic: Cartographic}[] = []
    for(let bearingIndex = 0; bearingIndex < bearingSamples; bearingIndex++){
        const bearingDeg = minBearing + bearingStep * bearingIndex

        for(let distanceIndex = 1; distanceIndex <= distanceSteps; distanceIndex++){
            const distanceMeters = Math.min(distanceIndex * radialStepMeters, options.maxDistanceMeters)

            const destinationCartesian = getPointFromOriginWithBearingAndDistance([
                options.observerLonLat[0],
                options.observerLonLat[1],
                observerHeightMsl
            ], bearingDeg, distanceMeters)

            const destinationCartographic = Cartographic.fromCartesian(destinationCartesian)
            sampleMeta.push({
                bearingDeg,
                distanceMeters,
                cartographic: destinationCartographic
            })
        }
    }

    await sampleTerrainMostDetailed(viewer.terrainProvider, sampleMeta.map(me => me.cartographic))

    const groupedByBearing = new Map<number, TerrainVisibilitySample[]>()

    for(const point of sampleMeta){
        if(typeof point.cartographic.height !== 'number'){
            console.warn("point has no height", point)
            continue
        }
        const terrainHeight = typeof point.cartographic.height === 'number' ? point.cartographic.height : 0
        const elevationAngleRad = Math.atan2(terrainHeight - observerHeightMsl, point.distanceMeters)

        const sample: TerrainVisibilitySample = {
            bearingDeg: point.bearingDeg,
            distanceMeters: point.distanceMeters,
            longitude: MathCesium.toDegrees(point.cartographic.longitude),
            latitude: MathCesium.toDegrees(point.cartographic.latitude),
            terrainHeight,
            elevationAngleRad,
            visible: false
        }

        const list = groupedByBearing.get(point.bearingDeg)
        if(list){
            list.push(sample)
        } else {
            groupedByBearing.set(point.bearingDeg, [sample])
        }
    }

    const visible: TerrainVisibilitySample[] = []
    const occluded: TerrainVisibilitySample[] = []

    for(const [, samples] of groupedByBearing){

        samples.sort((a, b)=>a.distanceMeters - b.distanceMeters)

        let currentMaxElevationAngle = Number.NEGATIVE_INFINITY
        for(const sample of samples){
            if(sample.elevationAngleRad > currentMaxElevationAngle + 1e-7){
                sample.visible = true
                currentMaxElevationAngle = sample.elevationAngleRad
                visible.push(sample)
            } else {
                occluded.push(sample)
            }
        }
    }

    timer.end();

    return {
        radialStepMeters,
        observerGroundHeight,
        observerHeightMsl,
        visible,
        occluded,
        all: [...visible, ...occluded]
    }
}