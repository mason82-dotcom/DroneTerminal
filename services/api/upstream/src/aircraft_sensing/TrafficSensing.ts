import { randomUUID } from 'crypto'
import { EventManager } from '../util/event_manager'
import SensingSource, { SensingSourceAreaFactory, SensingSourceHandle } from './Source'
import FakeSensingArea from './sources/Fake'
import GliderNetSensingArea from './sources/GliderNet'
import AdsbLol from './sources/AdsbLol'
import {DBType_Geo_Object_SubTypeType} from '../generated-definitions/db/DBTypes'

export type TrafficData = {
    id: string //uuid v4
    name: string
    type: DBType_Geo_Object_SubTypeType<1>
    position: {
        latitude: number
        longitude: number
        height?: number
        reported_at: string // ISO 8601 timestamp
    }
}

export default class TrafficSensing {

    private readonly sources: SensingSource[] = []

    constructor(){
        this.addSource(FakeSensingArea.getFactory())
        this.addSource(GliderNetSensingArea.getFactory())//TODO glidernet generates duplicates
        //this.addSource(AdsbLol.getFactory())// broken at least for local dev ip
    }

    private addSource(factory: SensingSourceAreaFactory){
        this.sources.push(new SensingSource(factory))//TODO each source should have its own id prefix, also we should try to aggregate all sources and remove duplicates
    }


    /**
     * @param radius in meters
     */
    startSensing(latitude: number, longitude: number, radius: number){

        const sourceHandles: SensingSourceHandle[] = []

        for(const source of this.sources){
            sourceHandles.push(source.startSensing(latitude, longitude, radius))
        }

        return new SensingHandle(sourceHandles)
    }
}


export type SensingHandleEvents = {
    'traffic': TrafficData
    'stopped': undefined
}

/**
 * Combines multiple SensingSourceHandles
 */
export class SensingHandle extends EventManager<SensingHandleEvents> {

    private readonly sourceHandles: SensingSourceHandle[]

    private idToUuidMap = new Map<string, string>()

    constructor(sourceHandles: SensingSourceHandle[]){
        super()

        this.sourceHandles = sourceHandles

        for(const sourceHandle of this.sourceHandles){
            sourceHandle.addListener('traffic', data => {
                this.dispatch('traffic', {
                    id: data.id,//this.getUuidForId(data.id),
                    name: data.name,
                    type: data.type,
                    position: data.position
                })
            })
        }
    }

    stop(){

        for(const sourceHandle of this.sourceHandles){
            sourceHandle.stop()
        }

        this.dispatch('stopped', undefined)
    }

    private getUuidForId(id: string){ //TODO deduplication (e.g. adsb.lol "3e203c" and Glidernet ICA3E203C)
        const existing = this.idToUuidMap.get(id)

        if(typeof existing !== 'undefined'){
            return existing
        } else {
            const newUuid = randomUUID()

            this.idToUuidMap.set(id, newUuid)

            return newUuid
        }
    }
}


