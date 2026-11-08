import { EventManager } from "@/sdks/dji-pilot-2/dji-open-platform-connect-sdk"
import { along, distance, lineString } from "@turf/turf"

export type Position = {
    longitude: number
    latitude: number
    height: number
}

type PositionWithTime = {
    position: Position
    timeMs: number
}

export default class SmoothMovement extends EventManager<{
    'position-update': { position: Position, time: number }
}>{

    private positionsPerSecond: number

    private timeoutHandle?: ReturnType<typeof setTimeout> | undefined

    private currentTrackDistance = 0

    private tracks: {from: PositionWithTime, to: PositionWithTime, length3D: number}[] = []

    private lastCalculatedPosition: Position | undefined = undefined

    constructor(positionsPerSecond: number){
        super()

        this.positionsPerSecond = positionsPerSecond
        setTimeout(()=>{
            this.step()
        }, 1)
    }


    private step(){

        const timeUntilNextStep = 1000 / this.positionsPerSecond

        if(this.tracks.length > 0){
            //calculate when we expect the next position to be added (based on last add)
            const timeBetweenLastAdds = this.tracks[this.tracks.length - 1].to.timeMs - this.tracks[this.tracks.length - 1].from.timeMs

            const expectedNextAddTime = this.tracks[this.tracks.length - 1].to.timeMs + timeBetweenLastAdds

            //console.log('time until next add', (expectedNextAddTime - Date.now()) / 1000, 's', 'time between last adds', timeBetweenLastAdds / 1000, 's')

            const totalDistanceOfTracks = this.tracks.reduce((sum, track) => sum + track.length3D, 0) - this.currentTrackDistance

            const timeBuffer = timeBetweenLastAdds / 2

            const metersPerMs = Math.max(0, totalDistanceOfTracks / ((expectedNextAddTime + timeBuffer) - Date.now()))

            //console.log('meters per s', metersPerMs * 1000)

            this.currentTrackDistance += metersPerMs * timeUntilNextStep

            this.dispatch('position-update', this.calculatePositionAndTime())
        } else {
            //console.log('no tracks')
        }

        this.timeoutHandle = setTimeout(()=>{
            this.step()
        }, timeUntilNextStep)
    }

    private calculatePositionAndTime(): {position: Position, time: number} {
        if(this.tracks.length === 0){
            throw new Error('no position available')
        }

        while(this.currentTrackDistance >= this.tracks[0].length3D){
            // continue overflowing distance to next track
            if(this.tracks.length > 1){
                this.currentTrackDistance = Math.max(0, this.tracks[0].length3D - this.currentTrackDistance)
                this.tracks.shift()
            } else {
                const ret = this.tracks[0].to.position
                const time = this.tracks[0].to.timeMs

                this.currentTrackDistance = 0
                this.tracks.shift()

                this.lastCalculatedPosition = ret
                return {
                    position: ret,
                    time
                }
            }
        }

        if(!this.tracks[0] || !this.tracks[0].from || !this.tracks[0].to || !this.tracks[0].from.position || !this.tracks[0].to.position){
            console.error(this.tracks[0])
            throw new Error('invalid track data')
        }

        if(this.currentTrackDistance < 0){
            console.error('currentTrackDistance is negative', this.currentTrackDistance)
            this.currentTrackDistance = 0
        }
        //TODO implement 3d length
        const ret = this.along3D(this.tracks, this.currentTrackDistance)

        this.lastCalculatedPosition = ret
        return {
            position: ret,
            time: this.tracks[0].from.timeMs + (this.tracks[0].to.timeMs - this.tracks[0].from.timeMs) * (this.currentTrackDistance / this.tracks[0].length3D)
        }
    }

    private along3D(tracks: typeof this.tracks, distanceMeters: number){

        let distanceToGoLeft = distanceMeters

        for(const track of tracks){
            if(distanceToGoLeft <= track.length3D){

                const lengthHorizontal = distance([track.from.position.longitude, track.from.position.latitude], [track.to.position.longitude, track.to.position.latitude], {units: 'meters'})

                const relativeProgress = distanceToGoLeft / track.length3D
                const position = along(lineString([track.from.position, track.to.position].map(p => [p.longitude, p.latitude])), lengthHorizontal * relativeProgress, {units: 'meters'})


                const heightDiff = track.to.position.height - track.from.position.height
                const height = track.from.position.height + heightDiff * relativeProgress

                return {
                    longitude: position.geometry.coordinates[0],
                    latitude: position.geometry.coordinates[1],
                    height
                }

            } else {
                distanceToGoLeft -= track.length3D
            }
        }

        throw new Error('something went wrong')
    }

    addPosition(position: Position, timeMs: number) {

        const from = this.tracks.length === 0 ? {position: this.lastCalculatedPosition ?? position, timeMs: timeMs - 1} : this.tracks[this.tracks.length - 1].to

        const lengthHorizontal = distance([from.position.longitude, from.position.latitude], [position.longitude, position.latitude], {units: 'meters'})
        const lengthVertical = Math.abs(from.position.height - position.height)

        this.tracks.push({
            from,
            to: {position, timeMs},
            length3D: Math.sqrt(lengthHorizontal ** 2 + lengthVertical ** 2)
        })
    }

    destroy(){
        if(this.timeoutHandle){
            clearTimeout(this.timeoutHandle)
        }
    }

}