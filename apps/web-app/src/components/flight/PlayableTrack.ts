import { EventManager } from "@/sdks/dji-pilot-2/dji-open-platform-connect-sdk"
import { bearing } from "@turf/turf"

export type Track = {
    height: number
    longitude: number
    latitude: number
    time: string
}[]

export type PositionMeta = {
    calculatedHeading: number
}

export type PlayableTrack_State = 'playing' | 'paused' | 'stopped'

export default class PlayableTrack extends EventManager<{
    stateChange: PlayableTrack_State
    positionUpdate: {position: Track[number], meta: PositionMeta, progress: number}//position, progress in track (0-1)
}> {

    private track: Track
    private currentTrackIndex = 0
    private state: PlayableTrack_State = 'stopped'
    private nextTimeoutHandle?: ReturnType<typeof setTimeout> | undefined

    private playbackSpeed = 1

    private readonly PLAY_STEP_MIN_TIMEOUT = 1 //ms

    constructor(track: Track) {
        super()
        this.track = track

        for(const point of track){
            if(typeof point.time !== 'string'){
                throw new Error('All track points must have a time property!')
            }
        }
    }

    /**
     *
     * @param resume if not present, plays from start
     */
    play(resume?: boolean){
        if(this.state === 'playing'){
            return
        } else if (this.state === 'paused'){
            if(resume === true){
                this.doPlay()
                return
            } else {
                this.restart()
                return
            }
        } else if (this.state === 'stopped'){
            this.restart()
            return
        }
    }

    pause(){
        if(this.state !== 'playing'){
            return
        }

        this.state = 'paused'
        clearTimeout(this.nextTimeoutHandle)
        this.dispatch('stateChange', this.state)
    }

    stop(){
        if(this.state === 'stopped'){
            return
        }
        this.state = 'stopped'
        this.currentTrackIndex = 0
        clearTimeout(this.nextTimeoutHandle)
        this.dispatch('stateChange', this.state)
    }

    setPlaybackSpeed(speed: number){
        if(speed <= 0){
            throw new Error('Speed must be greater than 0!')
        }

        this.playbackSpeed = speed
    }

    private doPlay(){
        this.state = 'playing'

        this.nextTimeoutHandle = setTimeout(()=>{
            this.next()
        }, this.getTimeoutUntilNextStep())

        this.dispatch('stateChange', this.state)
    }

    private restart(){
        if(typeof this.nextTimeoutHandle !== 'undefined'){
            clearTimeout(this.nextTimeoutHandle)
        }

        this.state = 'stopped'
        this.currentTrackIndex = 0
        this.doPlay()
    }

    private calculateTimeToNextStep(){
        if(this.currentTrackIndex >= this.track.length - 1){
            return this.PLAY_STEP_MIN_TIMEOUT
        }

        return new Date(this.track[this.currentTrackIndex + 1].time).getTime() - new Date(this.track[this.currentTrackIndex].time).getTime()
    }

    private next(){
        if(this.state !== 'playing'){
            return
        }

        if(this.currentTrackIndex >= this.track.length - 1){
            this.stop()
            return
        }

        const currentPoint = this.track[this.currentTrackIndex]
        this.currentTrackIndex++
        const nextPoint = this.track[this.currentTrackIndex]

        this.dispatch('positionUpdate', {
            position: nextPoint,
            meta: {calculatedHeading: this.calculateHeadingBetweenPoints(currentPoint, nextPoint)},
            progress: this.getTrackProgress()
        })

        this.nextTimeoutHandle = setTimeout(()=>{
            this.next()
        }, this.getTimeoutUntilNextStep())
    }

    private getTimeoutUntilNextStep(){
        return Math.max(this.PLAY_STEP_MIN_TIMEOUT, this.calculateTimeToNextStep() / this.playbackSpeed)
    }

    /**
     * @returns return deegrees, 0 = north, 90 = east
     */
    private calculateHeadingBetweenPoints(pointA: Track[number], pointB: Track[number]): number {
        return bearing([pointA.longitude, pointA.latitude], [pointB.longitude, pointB.latitude])
    }

    public getTrackProgress(){
        return this.currentTrackIndex / (this.track.length - 1)
    }

}