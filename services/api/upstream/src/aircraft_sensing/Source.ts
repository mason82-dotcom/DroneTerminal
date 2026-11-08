import {EventManager} from '../util/event_manager'
import * as turf from '@turf/turf'
import { TrafficData } from './TrafficSensing'

export default class SensingSource {

    private readonly areas: SensingSourceArea[] = []
    private readonly areaFactory: SensingSourceAreaFactory

    constructor(areaFactory: SensingSourceAreaFactory){
        this.areaFactory = areaFactory
    }

    /**
     * @param radius in meters
     */
    startSensing(latitude: number, longitude: number, radius: number){//TODO idea for performance optimization: double radius of the new area and when there is traffic, check if it is inside the original radius, that way, we can increase the chance to reuse existing areas and reduce the number of areas we have to create

        for(const area of this.areas){

            const centerDistance = turf.distance([latitude, longitude], [area.latitude, area.longitude], {
                units: 'meters'
            })

            const smallerRadius = Math.min(radius, area.radius)
            const biggerRadius = Math.max(radius, area.radius)

            if(centerDistance + smallerRadius < biggerRadius){
                // smaller circle is completely inside the bigger circle

                const handle = new SensingSourceHandle(latitude, longitude, radius, area)

                area._addHandle(handle)
                return handle
            }
        }

        //not inside any existing area

        const newArea = this.areaFactory(latitude, longitude, radius)

        newArea.addListener('shutdown', ()=>{
            this.removeArea(newArea)
        })

        const handle = new SensingSourceHandle(latitude, longitude, radius, newArea)

        newArea._addHandle(handle)
        this.areas.push(newArea)

        return handle
    }

    private removeArea(area: SensingSourceArea){
        const areaIndex = this.areas.indexOf(area)

        if(areaIndex >= 0){
            this.areas.splice(areaIndex, 1)
        }
    }

}


export type SensingSourceAreaFactory = (latitude: number, longitude: number, radius: number) => SensingSourceArea


type SensingSourceAreaEvents = {
    'traffic': TrafficData
    'shutdown': undefined
}

export class SensingSourceArea extends EventManager<SensingSourceAreaEvents> {

    readonly latitude: number
    readonly longitude: number
    readonly radius: number

    private readonly handles: SensingSourceHandle[] = []

    constructor(latitude: number, longitude: number, radius: number){
        super()

        this.latitude = latitude
        this.longitude = longitude
        this.radius = radius

        this.onSetup()
    }

    protected onSetup(){
        throw new Error('must be implemented by inheriting classes')
    }

    _addHandle(handle: SensingSourceHandle){
        this.handles.push(handle)

        handle.addListener('stopped', ()=>{
            this._removeHandle(handle)
        })
    }

    _removeHandle(handle: SensingSourceHandle){
        const handleIndex = this.handles.indexOf(handle)

        if(handleIndex >= 0){
            this.handles.splice(handleIndex, 1)
        }

        if(this.handles.length === 0){
            this.shutdown()
        }
    }

    private shutdown(){
        if(this.handles.length !== 0){
            throw new Error('can not shutdown, still has some handles')
        }

        this.onShutdown()

        this.dispatch('shutdown', undefined)
    }

    protected onShutdown(){
        throw new Error('must be implemented by inheriting classes')
    }

    static getFactory() : SensingSourceAreaFactory {
        return (latitude: number, longitude: number, radius: number) => {
            return new this(latitude, longitude, radius)
        }
    }
}

type SensingSourceHandleEvents = {
    'traffic': TrafficData
    'stopped': undefined
}

export class SensingSourceHandle extends EventManager<SensingSourceHandleEvents> {

    readonly latitude: number
    readonly longitude: number
    readonly radius: number

    constructor(latitude: number, longitude: number, radius: number, area: SensingSourceArea){
        super()

        this.latitude = latitude
        this.longitude = longitude
        this.radius = radius

        area.addListener('traffic', data => {
            this.dispatch('traffic', data)
        })
    }

    stop(){
        this.dispatch('stopped', undefined)
    }
}