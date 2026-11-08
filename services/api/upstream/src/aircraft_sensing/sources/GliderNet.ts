// data provided as ObenDB license, we need to follow some rules when publishing this service: https://opendatacommons.org/licenses/odbl/summary/

import { EventManager } from "../../util/event_manager";
import { SensingSourceArea } from "../Source";

import {ISSocket} from 'js-aprs-is'
import {aprsPacket, aprsParser} from 'js-aprs-fap'
import { TrafficData } from "../TrafficSensing";
import { DBType_Geo_Object_SubType_TYPES, DBType_Geo_Object_SubTypeType } from "../../generated-definitions/db/DBTypes";



export default class GliderNetSensingArea extends SensingSourceArea {

    private receiver: GliderNetReceiver

    protected onSetup(): void {
        this.receiver = new GliderNetReceiver(this.latitude, this.longitude, this.radius)

        this.receiver.addListener('aircraft', data=>{

            this.dispatch('traffic', {
                id: data.id,
                name: '[Glidernet] ' + data.id,
                type: data.type,
                position: data.position
            })
        })

        this.receiver.start()
    }

    protected onShutdown(): void {
        this.receiver.stop()
    }

}

type GliderNetReceiverEvents = {
    'aircraft': TrafficData
}

const aprsMessageParser = new aprsParser()

class GliderNetReceiver extends EventManager<GliderNetReceiverEvents> {

    private readonly latitude: number
    private readonly longitude: number
    private readonly radius: number

    private isSocket: ISSocket

    /**
     * @param radius in meters
     */
    constructor(latitude: number, longitude: number, radius: number){
        super()

        this.latitude = latitude
        this.longitude = longitude
        this.radius = radius
    }

    start(){
        console.log('starting glidernet receiver ...')

        const radiusInKilometers = this.radius / 1000

        this.isSocket = new ISSocket('ofh', 'aprs.glidernet.org', 14580, 'OFH')//, -1, true, 'ARG', `r/${this.latitude}/${this.longitude}/${radiusInKilometers}\r\n`)

        this.isSocket.addListener('error', err=>{
            console.error('glidernet ISSocket error', err)
        })

        this.isSocket.addListener('close', ()=>{
            console.info('glidernet ISSocket closed, restarting ...')

            this.isSocket.destroy()

            setTimeout(()=>{
                this.start()
            }, 1000 * 10)
        })

        this.isSocket.addListener('connect', ()=>{
            console.info('glidernet ISSocket connected: lat ', this.latitude, 'lon', this.longitude, 'radius in km', radiusInKilometers)

            this.isSocket.sendLogin()

            this.isSocket.send(`#filter r/${this.latitude}/${this.longitude}/${radiusInKilometers}`)
        })

        this.isSocket.on('packet', p => {

            const message = p as string
            if(! message.startsWith('#') && ! message.startsWith('user')){
                const parsed: aprsPacket & {flarm?: FlarmData} = aprsMessageParser.parseaprs(message)

                if(parsed.destCallsign === 'OGFLR'){
                    parsed.flarm = parseOGNFlarmComment(parsed.comment)
                    if(typeof parsed.flarm === 'undefined'){
                        console.warn('no comment provided for OGN Flarm data: ', parsed)
                    }
                }


                // APRS symbols: http://www.aprs.net/vm/DOS/SYMBOLS.HTM

                // Receiver Stations seem to be pac.type = 'location' && pac.symbolcode === '&'
                // (while aircraft have pac.symbolcode === 'g'

                if(parsed.symbolcode !== 'g' && parsed.symbolcode !== '\'' && parsed.symbolcode !== '^'){// no glider, small aircraft, large aicraft
                    return
                }

                const id = parsed.flarm?.id || parsed.sourceCallsign || ('' + parsed.id)//TODO sourceCallsign and parsed.id are not really helpfull...


                if(typeof parsed.flarm?.senderType === 'number' && parsed.flarm.senderType > 15){
                    console.log('unknown flarm sender type:', parsed.flarm.senderType, parsed)
                }

                this.dispatch('aircraft', {
                    id,
                    name: id,
                    type: parsed.flarm ? parsed.flarm.senderType : mapAprsSymbolCodeToTrafficType(parsed.symbolcode),
                    position: {
                        latitude: parsed.latitude,
                        longitude: parsed.longitude,
                        height: parsed.altitude,
                        reported_at: new Date(parsed.receivedTime).toISOString()
                    }
                })
            }
        })


        this.isSocket.connect()

    }

    stop(){

        if(!this.isSocket){
            return
        }

        this.isSocket.destroySoon()
    }
}

type FlarmData = {
    id: string
    address: string
    stealth: boolean
    noTracking: boolean
    senderType: FlarmSenderType
    addressType: FlarmAddressType
    climbRate: number  // climb rate in feet per minute
    turnRate: number // turn rate in half turns per minute (lol)
    signalToNoiseRatio: number // in dB
    bitErrorsCorrected: number
    frequencyOffset: number // in kHz
}

type FlarmSenderType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 // see APRS symbol table http://wiki.glidernet.org/wiki:ogn-flavoured-aprs

type FlarmAddressType = 0 | 1 | 2 | 3 // 0 = unknown, 1 = ICAO, 2 = flarm, 3 = ogn tracker


// Note: some fields my be undefined if comment does not include them
function parseOGNFlarmComment(comment?: string){
    //parse ogn data, see section "OGN-specific beacons" http://wiki.glidernet.org/wiki:ogn-flavoured-aprs

    const ret: Partial<FlarmData> = {}

    if(typeof comment !== 'string'){
       return undefined
    }

    let commentFields = comment.split(' ')

    if(commentFields.length < 1){
        throw new Error('not enough fields contained in ogn comment: "' + comment + '"')
    }

    for(const field of commentFields){

        if(field.startsWith('id')){
            ret.id = field

            ret.address = field.substring(4)

            let encoded = parseInt(field.substring(2, 4), 16)

            ret.stealth = (encoded & 128) == 128 //bool should never be true

            ret.noTracking = (encoded & 64) == 64 //bool

            ret.senderType = ((encoded & 60) >> 2) as FlarmSenderType

            ret.addressType = (encoded & 3) as FlarmAddressType// 0 = unknown, 1 = ICAO, 2 = flarm, 3 = ogn tracker

        } else if(field.endsWith('fpm')){
            ret.climbRate = parseInt(commentFields[1].replace('fpm', ''))

        } else if(field.endsWith('rot')){
            ret.turnRate = parseFloat(field.replace('rot', ''))

        } else if(field.endsWith('dB')){
            ret.signalToNoiseRatio = parseFloat(field.replace('dB', ''))

        } else if(field.endsWith('e')){
            ret.bitErrorsCorrected = parseInt(field.replace('e', ''))

        } else if(field.endsWith('id')){
            ret.frequencyOffset = parseFloat(field.replace('kHz', ''))
        } else {
            // ignore field
        }
    }

    return ret as FlarmData
}

function mapAprsSymbolCodeToTrafficType(symbolCode: string): DBType_Geo_Object_SubTypeType<1> {
    switch(symbolCode){
        case 'g'://glider
            return DBType_Geo_Object_SubType_TYPES.traffic.moto_glider
        case '\''://small aircraft
            return DBType_Geo_Object_SubType_TYPES.traffic.powered_aircraft
        case '^'://large aircraft
            return DBType_Geo_Object_SubType_TYPES.traffic.jet_aicraft
        case 'O'://balolon
            return DBType_Geo_Object_SubType_TYPES.traffic.balloon
        case '>'://car
        case '<'://motorcycle
        case 'U'://bus
        case 'v'://van
        case 'k'://truck
        case 'u'://truck large
        case '!'://police
        case 'a'://ambulance
            return DBType_Geo_Object_SubType_TYPES.traffic.ground_support

        case 'r'://antenna
            return DBType_Geo_Object_SubType_TYPES.traffic.static_object

        default:
            return DBType_Geo_Object_SubType_TYPES.traffic.other
    }
}
