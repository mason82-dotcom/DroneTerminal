import * as turf from "@turf/turf"
import { Feature, LineString, Point } from "geojson"

export default class FakeTrack {

    private path: PathWithHeight
    private line: Feature<LineString>
    private lineLength: number // in meters
    private currentDistance = 0 // in meters
    private currentPosition: Feature<Point>

    private lastPosition: Feature<Point> | false = false

    private speed: number // in meters per tick

    private lastTick = Date.now()
    /**
     *
     * @param path [[long, lat, height]] height is being ignored right now!
     * @param speed in meters/second
     */
    constructor(path: PathWithHeight, speed: number){//TODO implement height
        this.path = path
        this.line = turf.lineString(removeHeightFromPath(path))
        this.lineLength = turf.length(this.line, {
            units: 'meters'
        })

        this.speed = speed

        const millisecondsBetweenTicks = 100
        setInterval(this.nextTick.bind(this), millisecondsBetweenTicks)
    }

    private nextTick(){
        const now = Date.now()
        const tickDelta = now - this.lastTick
        this.lastTick = now

        const distanceTraveled = this.speed * (tickDelta / 1000)

        this.currentDistance += distanceTraveled

        if(this.currentDistance > this.lineLength){
            this.currentDistance = 0
        }

        this.lastPosition = this.currentPosition
        this.currentPosition = turf.along(this.line, this.currentDistance, {units: "meters"})
    }

    getCurrentHeight(){
        return heightAlong(this.path, this.currentDistance)
    }

    getCurrentPosition(){
        return {
            longitude: this.currentPosition.geometry.coordinates[0],
            latitude: this.currentPosition.geometry.coordinates[1]
        }
    }

    getCurrentHeading(){
        if(this.lastPosition === false){
            return 0
        }

        return turf.bearing([
            this.lastPosition.geometry.coordinates[0],
            this.lastPosition.geometry.coordinates[1]
        ], [
            this.currentPosition.geometry.coordinates[0],
            this.currentPosition.geometry.coordinates[1]
        ])
    }

}



function removeHeightFromPath(path: PathWithHeight): [number, number][]{
    return path.map(p=>[p[0], p[1]])
}

export type PathWithHeightEntry = [number, number, number]
export type PathWithHeight = PathWithHeightEntry[]

/**
 *
 * @param path
 * @param distance in meters
 * @returns in meters
 */
function heightAlong(path: PathWithHeight, distance: number){
    let traveledDistance = 0

    for(let i = 0; i < path.length; i++){

        const current = path[i]
        const next = path[i+1]

        if(next instanceof Array === false){
            console.warn('distance is beyond path', distance, path)
            return 0
        }

        const distanceUntilNext = turf.distance([current[0], current[1]], [next[0], next[1]], {units: 'meters'})

        const traveledDistanceIncludingNext = traveledDistance + distanceUntilNext
        if(distance <= traveledDistanceIncludingNext){
            const relativeDistanceFromCurrentToNext = (distance - traveledDistance) / distanceUntilNext
            return getIntermediateHeight(current, next, relativeDistanceFromCurrentToNext)
        }

        traveledDistance = traveledDistanceIncludingNext
    }


}


/**
 *
 * @param relativePath e.g. 0.3 for the height at 30% distance from "begin" to "end"
 */
function getIntermediateHeight(begin: PathWithHeightEntry, end: PathWithHeightEntry, relativePath: number){
    return begin[2] + (end[2] - begin[2]) * relativePath
}