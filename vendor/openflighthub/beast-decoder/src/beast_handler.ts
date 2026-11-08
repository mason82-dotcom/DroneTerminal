import EventManager from "./util/event_manager";
import {BeastParsedFrame, BeastParsedFrameType, parseBeastSocketData} from './parse'
import { decodeBasics, parseADSB, parseModeS, calculateUnambigiousLocation, CprData } from "mode-s-adsb-parser";

export type AircraftData = {
    icaoAddress: AircraftIcaoAddress
}

export interface AircraftDataWithLocation extends AircraftData {
    location: {
        latitude: number
        longitude: number
    }
}

export type BeastHandlerEvents = {
    'aircraft_new': AircraftData // first time we see a message from this aircraft (aircraft not in the cache)
    'aircraft_update': AircraftData // received message from aircraft
    'aircraft_update_with_location': AircraftDataWithLocation // received message from aircraft and we can locate it
    'warning': {message: string, context: any}
    'removed_from_cache': AircraftIcaoAddress // no message received from this aircraft for some time
}

type AircraftIcaoAddress = string

type EncodedCprData = {
    receivedTime: number
    cpr: CprData
}

type AircraftCacheData = {
    lastDataReceivedTime: number
    lastUnambigiousLocation?: {
        latitude: number
        longitude: number
    }
    lastEncodedLocationOdd?: EncodedCprData
    lastEncodedLocationEven?: EncodedCprData
}

const MAX_AIRCRAFT_CACHE_TIME = 1000 * 60 * 30 // 30 minutes

export class BeastHandler extends EventManager<BeastHandlerEvents> {

    private readonly aircraftCache = new Map<AircraftIcaoAddress, AircraftCacheData>()
    private cleanUpCacheInterval: NodeJS.Timeout

    /**
     * don't forget to call stop() once you are done
     */
    constructor(){
        super()

        this.cleanUpCacheInterval = setInterval(()=>{
            this.cleanUpCache()
        }, 1000 * 30)
    }

    stop(){
        clearInterval(this.cleanUpCacheInterval)
        this.aircraftCache.clear()
    }

    //TODO rewrite to be non-blocking
    private cleanUpCache(){

        const now = Date.now()

        for(const aircraftEntry of this.aircraftCache){
            const aircraft = aircraftEntry[1]

            if(now - aircraft.lastDataReceivedTime > MAX_AIRCRAFT_CACHE_TIME){
                const icaoAddress = aircraftEntry[0]
                this.aircraftCache.delete(icaoAddress)

                this.dispatch('removed_from_cache', icaoAddress)
            }
        }
    }


    handleBeastData(data: Buffer<ArrayBufferLike>){
        const frames = parseBeastSocketData(data, true)

        for(const frame of frames){
            this.handleBeastFrame(frame)
        }
    }

    private handleBeastFrame(frame: BeastParsedFrame<BeastParsedFrameType>){
        if(frame.type === 'ADSB'){
            try {
                const parsedModeS = parseModeS(frame.dataBytes)
                const parsedADSB = parseADSB(parsedModeS)

                const myIcaoAddressHex = icaoNumberToHex(parsedModeS.icaoAddress)

                const existingAircraft = this.aircraftCache.get(myIcaoAddressHex)
                const aircraft: AircraftCacheData = existingAircraft || {
                    lastDataReceivedTime: Date.now()
                }

                this.aircraftCache.set(myIcaoAddressHex, aircraft)

                const decodedBasics = decodeBasics(parsedADSB)

                if(decodedBasics.locationInformation.locationAvailable){
                    if(decodedBasics.locationInformation.location.format === 'even'){
                        aircraft.lastEncodedLocationEven = {
                            receivedTime: Date.now(),//TODO shouldnt we use mlatTimestamp for this?
                            cpr: decodedBasics.locationInformation.location
                        }
                    } else {
                        aircraft.lastEncodedLocationOdd = {
                            receivedTime: Date.now(),//TODO shouldnt we use mlatTimestamp for this?
                            cpr: decodedBasics.locationInformation.location
                        }
                    }
                }

                if(aircraft.lastEncodedLocationEven && aircraft.lastEncodedLocationOdd){
                    if(Math.abs(aircraft.lastEncodedLocationEven.receivedTime - aircraft.lastEncodedLocationOdd.receivedTime) < 1000 * 60 * 2){// 2 minutes

                        const olderMessage = aircraft.lastEncodedLocationEven.receivedTime < aircraft.lastEncodedLocationOdd.receivedTime ? aircraft.lastEncodedLocationEven.cpr : aircraft.lastEncodedLocationOdd.cpr

                        const moreRecentMessage = aircraft.lastEncodedLocationEven.receivedTime < aircraft.lastEncodedLocationOdd.receivedTime ? aircraft.lastEncodedLocationOdd.cpr : aircraft.lastEncodedLocationEven.cpr

                        const unambigiousLocation = calculateUnambigiousLocation([olderMessage, moreRecentMessage])

                        aircraft.lastUnambigiousLocation = unambigiousLocation

                        this.dispatch('aircraft_update_with_location', {
                            icaoAddress: myIcaoAddressHex,
                            location: unambigiousLocation
                        })
                    }
                }



                if(!existingAircraft){
                    this.dispatch('aircraft_new', {
                        icaoAddress: myIcaoAddressHex
                    })
                } else {
                    if(!aircraft.lastUnambigiousLocation){
                        this.dispatch('aircraft_update', {
                            icaoAddress: myIcaoAddressHex
                        })
                    }
                }

            } catch (err){
                this.dispatch('warning', {
                    message: 'Failed to decode adsb frame',
                    context: err
                })
            }
        } else if(frame.type === 'MODE_S') {
            try {
                const parsedModeS = parseModeS(frame.dataBytes)

                const myIcaoAddressHex = icaoNumberToHex(parsedModeS.icaoAddress)

                const existingAircraft = this.aircraftCache.get(myIcaoAddressHex)
                const aircraft: AircraftCacheData = existingAircraft || {
                    lastDataReceivedTime: Date.now()
                }

                this.aircraftCache.set(myIcaoAddressHex, aircraft)

                if(existingAircraft){
                    this.dispatch('aircraft_update', {
                        icaoAddress: myIcaoAddressHex
                    })
                } else {
                    this.dispatch('aircraft_new', {
                        icaoAddress: myIcaoAddressHex
                    })
                }

            } catch (err){
                this.dispatch('warning', {
                    message: 'Failed to decode mode s frame',
                    context: err
                })
            }
        } else {
            this.dispatch('warning', {
                message: 'Unsupported frame type',
                context: frame.type
            })
        }
    }

}

function icaoNumberToHex(n: number){
    return n.toString(16)
}
