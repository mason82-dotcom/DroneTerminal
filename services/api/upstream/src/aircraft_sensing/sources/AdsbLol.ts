// data provided as ObenDB license, we need to follow some rules when publishing this service: https://opendatacommons.org/licenses/odbl/summary/

import { SensingSourceArea } from "../Source";

import { validate } from "../../util/schema";
import dayjs from "dayjs";
import { DBType_Geo_Object_SubType_TYPES, DBType_Geo_Object_SubTypeType } from "../../generated-definitions/db/DBTypes";

const FETCH_INTERVAL = 1000 * 5

export default class AdsbLolSensingArea extends SensingSourceArea {


    //@ts-ignore
    private callApiInterval: ReturnType<typeof setInterval>

    protected onSetup(): void {

        this.callApiInterval = setInterval(async ()=>{

            try {
                const response = await fetch('https://api.adsb.lol/v2/point/' + this.latitude + '/' + this.longitude + '/' + this.radiusInNm())

                const json = await response.json()

                const valid = validate(json, {
                    type: 'object',
                    required: ['ac'],
                    properties: {
                        ac: {
                            type: "array",
                            items: {
                                type: 'object'
                            }
                        }
                    }
                })

                if(valid !== true){
                    throw new Error('invalid structure: ' + valid)
                }

                for(const aircraft of json.ac){
                    if(typeof aircraft.hex === 'string' && typeof aircraft.lon === 'number' && typeof aircraft.lat === 'number'){
                        this.dispatch('traffic', {
                            id: aircraft.hex,
                            name: '[adsb.lol] ' + aircraft.hex,
                            type: mapADSBCategoryToTrafficType(aircraft.category),
                            position: {
                                latitude: aircraft.lat,
                                longitude: aircraft.lon,
                                reported_at: dayjs().toISOString(),//TODO add timefrom packet
                                height: typeof aircraft.alt_baro === 'number' ? feetToMeter(aircraft.alt_baro) : typeof aircraft.alt_geom === 'number' ? feetToMeter(aircraft.alt_geom) : undefined
                            }
                        })
                    }
                }

            } catch (err){
                console.warn('error occured when calling adsb.lol api', err)
            }

        }, FETCH_INTERVAL)
    }

    protected onShutdown(): void {
        clearInterval(this.callApiInterval)
    }

    private radiusInNm(){
        return this.radius / 1852
    }

}

function feetToMeter(feet: number){
    return feet / 3.281
}

// see https://support.adsbexchange.com/hc/en-us/articles/44705224053517-Emitter-Category-ADS-B-DO-260B-2-2-3-2-5-2
function mapADSBCategoryToTrafficType(category?: string): DBType_Geo_Object_SubTypeType<1> {
    switch (category) {
        case undefined:
        case 'A0':
            return DBType_Geo_Object_SubType_TYPES.traffic.other

        case 'A1':
        case 'A2':
            return DBType_Geo_Object_SubType_TYPES.traffic.powered_aircraft

        case 'A3':
        case 'A4':
        case 'A5':
        case 'A6':
            return DBType_Geo_Object_SubType_TYPES.traffic.jet_aicraft
        case 'A7':
            return DBType_Geo_Object_SubType_TYPES.traffic.helicopter

        case 'B0':
            return DBType_Geo_Object_SubType_TYPES.traffic.other
        case 'B1':
            return DBType_Geo_Object_SubType_TYPES.traffic.moto_glider
        case 'B2':
            return DBType_Geo_Object_SubType_TYPES.traffic.balloon
        case 'B3':
            return DBType_Geo_Object_SubType_TYPES.traffic.parachute
        case 'B4':
            return DBType_Geo_Object_SubType_TYPES.traffic.para_glider
        case 'B6':
            return DBType_Geo_Object_SubType_TYPES.traffic.uav

        case 'B7':
            return DBType_Geo_Object_SubType_TYPES.traffic.other

        case 'C0':
            return DBType_Geo_Object_SubType_TYPES.traffic.other
        case 'C1':
            return DBType_Geo_Object_SubType_TYPES.traffic.ground_support
        case 'C2':
            return DBType_Geo_Object_SubType_TYPES.traffic.ground_support
        case 'C3':
        case 'C4':
        case 'C5':
            return DBType_Geo_Object_SubType_TYPES.traffic.static_object

        default:
            console.warn('unknown adsb category received from adsb.lol: ' + category)
            return DBType_Geo_Object_SubType_TYPES.traffic.other
    }

}
