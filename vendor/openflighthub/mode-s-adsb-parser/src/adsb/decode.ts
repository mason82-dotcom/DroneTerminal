import { bitStringToUnsignedIntegerSafe, bitStringToUnsignedIntegerSafeRangeFromBits, bytesToFullBitString, parseBitStructure } from '../util/bits_and_bytes'
import { addMissingProperties, ComputeRange } from '../util/typescript'
import { ADSB_ParsedMessage } from './parse'
import { decodeGrayCode } from '../util/gray_code'
import {feetToMeter, meterToFeet, knotsToKmh} from './decode_util'


export type ADSB_Decoded_LocationInformation = {
    locationAvailable: false
} | {
    locationAvailable: true
    location: CprData
}

export type ADSB_DecodedMessage = ADSB_DecodedMessage_AircraftIdentificationAndCategory | ADSB_DecodedMessage_SurfacePosition | ADSB_DecodedMessage_AirbornePosition | ADSB_DecodedMessage_OperationStatus

export type ADSB_DecodedMessage_Type = 'aircraft_identification_and_category' | 'surface_position' | 'airborne_position_with_baro_altitude' | 'airborne_position_with_gnss_altitude' | 'airborne_velocity' | 'aircraft_operation_status_v1' | 'aircraft_operation_status_v2'

type ADSB_DecodedMessage_Base = {
    type: ADSB_DecodedMessage_Type
}

type ADSB_WakeVortexCategory = 'no_category_information' | 'surface_emergency_vehicle' | 'surface_service_vehicle' | 'ground_obstruction' | 'glider_or_sailplane' | 'lighter_than_air' | 'parachutist_or_skydiver' | 'ultralight_or_hangglider_or_paraglider' | 'unmanned_aerial_vehicle' | 'space_or_transatmospheric_vehicle' | 'light_less_than_7000_kg' | 'medium1_between_7000_kg_and_34000_kg' | 'medium2_between_34000_kg_and_136000_kg' | 'high_vortex_aircraft' | 'heavy_larger_than_136000_kg' | 'high_performance_above_5_g_acceleration_and_high_speed_above_400_kt' | 'rotorcraft'

export interface ADSB_DecodedMessage_AircraftIdentificationAndCategory extends ADSB_DecodedMessage_Base {
    type: 'aircraft_identification_and_category'
    aircraftCategory: ADSB_WakeVortexCategory
    callsign8chars: string
}

export interface ADSB_DecodedMessage_SurfacePosition extends ADSB_DecodedMessage_Base {
    groundSpeedInformation: ADSB_Decoded_GroundSpeedInformation
    groundTrackInformation: ADSB_Decoded_GroundTrackInformation
    cpr: CprData
}

export type ADSB_DecodedMessage_AirbornePosition = ADSB_DecodedMessage_AirbornePosition_AltitudeBarometric | ADSB_DecodedMessage_AirbornePosition_AltitudeGnss

interface ADSB_DecodedMessage_AirbornePosition_Base extends ADSB_DecodedMessage_Base {
    surveilanceStatus: 'no_condition' | 'permanent_alert' | 'temporary_alert' | 'spi_condition'
    singleAntenna: boolean
    cpr: CprData
}

export interface ADSB_DecodedMessage_AirbornePosition_AltitudeBarometric extends ADSB_DecodedMessage_AirbornePosition_Base {
    type: 'airborne_position_with_baro_altitude'
    altitudeBarometric: {
        feet: number
        meter: number
    }
}

export interface ADSB_DecodedMessage_AirbornePosition_AltitudeGnss extends ADSB_DecodedMessage_AirbornePosition_Base {
    type: 'airborne_position_with_gnss_altitude'
    altitudeGnss: {
        meter: number
        feet: number
    }
}

export type ADSB_DecodedMessage_OperationStatus = ADSB_DecodedMessage_OperationStatus_v1 | ADSB_DecodedMessage_OperationStatus_v2

export type ADSB_DecodedMessage_OperationStatus_v1 = ADSB_DecodedMessage_OperationStatus_v1_Airborne | ADSB_DecodedMessage_OperationStatus_v1_Surface

interface ADSB_DecodedMessage_OperationStatus_v1_Base extends ADSB_DecodedMessage_Base {
    type: 'aircraft_operation_status_v1'
    subType: 'airborne' | 'surface'
    operationalModeCode: number
    adsbVersion: 0 | 1
    nicSuplement: boolean
    navigationalAccuracyCategoryCodePosition: number
    surveilanceIntegrityLevelCode: number
    horizontalReferenceDirection: boolean
}

export interface ADSB_DecodedMessage_OperationStatus_v1_Airborne extends ADSB_DecodedMessage_OperationStatus_v1_Base {
    subType: 'airborne'
    airborneCapacityClassCode: number
    barometricAltitudeQualityCode: number
    barometricAltitudeIntegrityCode: number
}

export interface ADSB_DecodedMessage_OperationStatus_v1_Surface extends ADSB_DecodedMessage_OperationStatus_v1_Base {
    subType: 'surface'
    surfaceCapacityClassCode: number
    lengthWidthCode: number
    trackAngleOrHeading: boolean
}

export type ADSB_DecodedMessage_OperationStatus_v2 = ADSB_DecodedMessage_OperationStatus_v2_Airborne | ADSB_DecodedMessage_OperationStatus_v2_Surface

interface ADSB_DecodedMessage_OperationStatus_v2_Base extends ADSB_DecodedMessage_Base {
    type: 'aircraft_operation_status_v2'
    subType: 'airborne' | 'surface'
    adsbVersion: 0 | 1 | 2
    nicSuplementA: boolean
    navigationalAccuracyCategoryCodePosition: number
    sourceIntegrityLevelCode: number
    horizontalReferenceDirection: boolean
    silSupplement: boolean
}


export interface ADSB_DecodedMessage_OperationStatus_v2_Airborne extends ADSB_DecodedMessage_OperationStatus_v2_Base {
    subType: 'airborne'
    airborneCapacityClassCode: number
    airborneOperationalModeCode: number
    geometricVerticalAccuracyCode: number
    barometricAltitudeIntegrityCode: number
}

export interface ADSB_DecodedMessage_OperationStatus_v2_Surface extends ADSB_DecodedMessage_OperationStatus_v2_Base {
    subType: 'surface'
    surfaceCapacityClassCode: number
    lengthWidthCode: number
    surfaceOperationalModeCode: number
    trackAngleOrHeading: boolean
}


export type CprData = {
    format: 'odd' | 'even'
    encodedPosition: {
        latitude: number
        longitude: number
    }
}

export type ADSB_Decoded_BaseInformation = {
    type: ADSB_DecodedMessage_Type
    locationInformation: ADSB_Decoded_LocationInformation
}

/**
 * only decodes the basic information of the message (so you can identify if you really want to decode the full message or not)
 * @see decode() when you want to fully decode the message
 */
export function decodeBasics(parsedMessage: ADSB_ParsedMessage): ADSB_Decoded_BaseInformation {

    const bitString = bytesToFullBitString(parsedMessage.messageData)
    const type = decodeTypeCode(parsedMessage.typeCode, bitString)

    if(type === 'airborne_position_with_baro_altitude' || type === 'airborne_position_with_gnss_altitude' || type === 'surface_position'){

        return {
            type,
            locationInformation: {
                locationAvailable: true,
                location: decodeLocationInformation(bitString.slice(5 + 2 + 1 + 12 + 1))
            }
        }
    }

    return {
        type,
        locationInformation: {
            locationAvailable: false
        }
    }

}

function decodeLocationInformation(bitString: string) : CprData {

    const struct = parseBitStructure(bitString, [{
        name: 'cprFormat',
        bits: 1
    }, {
        name: 'cprEncodedLatitude',
        bits: 17
    }, {
        name: 'cprEncodedLongitude',
        bits: 17
    }])

    return {
        format: convertIntegerTo(
            bitStringToUnsignedIntegerSafeRangeFromBits(struct.get('cprFormat'), 1, 'cprFormat'),
            {
                '0': 'even',
                '1': 'odd'
            }, 'cprFormat'
        ),
        encodedPosition: {
            latitude: bitStringToUnsignedIntegerSafeRangeFromBits(struct.get('cprEncodedLatitude'), 17, 'cprEncodedLatitude'),
            longitude: bitStringToUnsignedIntegerSafeRangeFromBits(struct.get('cprEncodedLongitude'), 17, 'cprEncodedLongitude')
        }
    }
}


export type Location = {
    latitude: number
    longitude: number
}

/**
 * the order of locationInformations matters! first one should be the message you received first, second one the message you received afterwards. If you don't do this, the resulting location will not be accurate!
 * @param locationInformationA
 * @param locationInformationB
 */
export function calculateUnambigiousLocation(locationInformations: [CprData, CprData]): Location {
    // see https://mode-s.org/1090mhz/content/ads-b/3-airborne-position.html

    if(locationInformations[0].format === locationInformations[1].format){
        throw new Error('both locationInformations have the same cpr format')
    }

    const locationInformationOdd = locationInformations[0].format === 'odd' ? locationInformations[0] : locationInformations[1]
    const locationInformationEven = locationInformations[0].format === 'even' ? locationInformations[0] : locationInformations[1]

    //airborne
    const NZ = 15


    const cprOdd = cpr(locationInformationOdd.encodedPosition)
    const cprEven = cpr(locationInformationEven.encodedPosition)

    const dLatEven = 360 / (4 * NZ)
    const dLatOdd = 360 / (4 * NZ - 1)

    const latitudeZoneIndexJ = Math.floor(59 * cprEven.latitude - 60 * cprOdd.latitude + 0.5)

    let latEven = dLatEven * (mod(latitudeZoneIndexJ, 60) + cprEven.latitude)
    let latOdd = dLatOdd * (mod(latitudeZoneIndexJ, 59) + cprOdd.latitude)

    if(latEven >= 270){
        latEven -= 360
    }

    if(latOdd >= 270){
        latOdd -= 360
    }

    const NLEven = NL(latEven)
    const NLOdd = NL(latOdd)
    if(Math.abs(NLEven - NLOdd) >= Number.EPSILON){
        throw new Error('locationInformations are not in the same longitude zones')
    }

    const lat = locationInformations[1].format === 'even' ? latEven : latOdd // TODO put this check further up in the code to reduce required calculations

    const NLlat = NL(lat)

    const m = Math.floor(cprEven.longitude * (NLlat - 1) - cprOdd.longitude * NLlat + 0.5)

    const nEven = Math.max(NLlat, 1)
    const nOdd = Math.max(NL(lat - 1), 1)

    const dLonEven = 360 / nEven
    const dLonOdd = 360 / nOdd

    const lonEven = dLonEven * (mod(m, nEven) + cprEven.longitude)
    const lonOdd = dLonOdd * (mod(m, nOdd) + cprOdd.longitude)

    let lon = locationInformations[1].format === 'even' ? lonEven : lonOdd // TODO put this check further up in the code to reduce required calculations

    if(lon >= 180){
        lon = lon - 360
    }

    return {
        latitude: lat,
        longitude: lon
    }

    function cpr(encodedPosition: {latitude: number, longitude: number}){
        return {
            latitude: encodedPosition.latitude / (2**17),
            longitude: encodedPosition.longitude / (2**17)
        }
    }

    function mod(x: number, y: number){
        return x - y * Math.floor(x/y)
    }

    function NL(lat: number){

        if(lat === 0){
            return 59
        } else if (lat === 87 || lat === -87){
            return 2
        } else if (lat > 87 || lat < -87){
            return 1
        }

        return Math.floor( (2 * Math.PI) / (Math.acos(1 - ((1 - Math.cos(Math.PI / (2 * NZ))) / (Math.cos(Math.PI / 180 * lat)**2)))))
    }
}

/**
 * @param locationInformationA
 * @param locationInformationB
 */
export function calculateLocationWithReference(locationInformation: CprData, reference: Location): Location {
    //TODO

    return {
        latitude: 0,
        longitude: 0
    }
}


/**
 * @see decodeLocation() if you only want to decode location information and not the full message (saves time)
 */
export function decode(parsedMessage: ADSB_ParsedMessage): ADSB_DecodedMessage {

    const bitString = bytesToFullBitString(parsedMessage.messageData)

    const structBase = parseBitStructure(bitString, [{
        name: 'typeCode',
        bits: 5
    }, {
        name: 'rest',
        bits: 56 - 5
    }])

    const type = decodeTypeCode(bitStringToUnsignedIntegerSafeRangeFromBits(structBase.get('typeCode'), 5, 'typeCode'), bitString)

    const retBase: ADSB_DecodedMessage_Base = {
        type
    }

    if(type === 'aircraft_identification_and_category'){
        // see https://mode-s.org/1090mhz/content/ads-b/2-identification.html

        const structIdentificationAndCategory = parseBitStructure(structBase.get('rest'), [{
            name: 'category',
            bits: 3
        }, {
            name: 'callsign',
            bits: 6 * 8
        }])

        const aircraftCategoryCode = bitStringToUnsignedIntegerSafeRangeFromBits(structIdentificationAndCategory.get('category'), 3, 'category')

        const ret: ADSB_DecodedMessage_AircraftIdentificationAndCategory = addMissingProperties(retBase, {
            aircraftCategory: decodeWakeVortexCategory(parsedMessage.typeCode, aircraftCategoryCode),
            callsign8chars: decodeCallsignBytes(structIdentificationAndCategory.get('callsign'))
        })

        return ret

    } else if(type === 'surface_position'){
        // see https://mode-s.org/1090mhz/content/ads-b/4-surface-position.html

        const structSurfacePosition = parseBitStructure(structBase.get('rest'), [{
            name: 'groundSpeed',
            bits: 7
        }, {
            name: 'groundTrackStatus',
            bits: 1
        }, {
            name: 'groundTrack',
            bits: 7
        }, {
            name: 'time',
            bits: 1
        }, {
            name: 'cprFormat',
            bits: 1
        }, {
            name: 'cprEncodedLatitude',
            bits: 17
        }, {
            name: 'cprEncodedLongitude',
            bits: 17
        }])


        const encodedGroundSpeed = bitStringToUnsignedIntegerSafeRangeFromBits(structSurfacePosition.get('groundSpeed'), 7, 'groundSpeed')
        const groundSpeedInformation = decodeQuantizedGroundSpeed(encodedGroundSpeed)

        const groundTrackInformation = decodeGroundTrack(structSurfacePosition.get('groundTrackStatus'), structSurfacePosition.get('groundTrack'))

        const ret: ADSB_DecodedMessage_SurfacePosition = addMissingProperties(retBase, {
            groundSpeedInformation,
            groundTrackInformation,
            cpr: {
                format: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structSurfacePosition.get('cprFormat'), 1, 'cprFormat'),
                    {
                        '0': 'even',
                        '1': 'odd'
                    }, 'cprFormat'
                ),
                encodedPosition: {
                    latitude: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfacePosition.get('cprEncodedLatitude'), 17, 'cprEncodedLatitude'),
                    longitude: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfacePosition.get('cprEncodedLongitude'), 17, 'cprEncodedLongitude')
                }
            }
        })

        return ret

    } else if(type === 'airborne_position_with_baro_altitude' || type === 'airborne_position_with_gnss_altitude'){
        // see https://mode-s.org/1090mhz/content/ads-b/3-airborne-position.html

        const structAirbornePosition = parseBitStructure(structBase.get('rest'), [{
            name: 'surveilanceStatus',
            bits: 2
        }, {
            name: 'singleAntennaFlag',
            bits: 1
        }, {
            name: 'encodedAltitude',
            bits: 12
        }, {
            name: 'time',
            bits: 1
        }, {
            name: 'cprFormat',
            bits: 1
        }, {
            name: 'cprEncodedLatitude',
            bits: 17
        }, {
            name: 'cprEncodedLongitude',
            bits: 17
        }])

        const retBaseAirbornePosition: ADSB_DecodedMessage_AirbornePosition_Base = addMissingProperties(retBase, {
            surveilanceStatus: convertIntegerTo(
                bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('surveilanceStatus'), 2, 'surveilanceStatus'),
                {
                    '0': 'no_condition',
                    '1': 'permanent_alert',
                    '2': 'temporary_alert',
                    '3': 'spi_condition',
                }, 'surveilanceStatus'),
            singleAntenna: convertIntegerTo(
                bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('singleAntennaFlag'), 1, 'singleAntennaFlag'),
                {
                    '0': false,
                    '1': true
                }, 'singleAntennaFlag'),
            cpr: {
                format: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('cprFormat'), 1, 'cprFormat'),
                    {
                        '0': 'even',
                        '1': 'odd'
                    }, 'time'
                ),
                encodedPosition: {
                    latitude: bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('cprEncodedLatitude'), 17, 'cprEncodedLatitude'),
                    longitude: bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('cprEncodedLongitude'), 17, 'cprEncodedLongitude')
                }
            }
        })


        if(type === 'airborne_position_with_baro_altitude'){

            const struct = parseBitStructure(structAirbornePosition.get('encodedAltitude'), [{
                name: 'beforeQbit',
                bits: 7
            }, {
                name: 'qBit',
                bits: 1
            }, {
                name: 'afterQbit',
                bits: 4
            }])

            const qBit = struct.get('qBit') === '1'

            const numb = bitStringToUnsignedIntegerSafeRangeFromBits(struct.get('beforeQbit') + struct.get('afterQbit'), 7 + 4, 'encodedAltitudeWithoutQbit')

            const altitudeInFeetBarometric = qBit ? (25 * numb - 1000) : (decodeGrayCode(numb) * 100)

            const ret: ADSB_DecodedMessage_AirbornePosition_AltitudeBarometric = addMissingProperties(retBaseAirbornePosition, {
                altitudeBarometric: {
                    feet: altitudeInFeetBarometric,
                    meter: feetToMeter(altitudeInFeetBarometric)
                }
            })

            return ret
        } else {

            const altitudeInMetersGnss = bitStringToUnsignedIntegerSafeRangeFromBits(structAirbornePosition.get('encodedAltitude'), 12, 'encodedAltitudeAsMetersInGnss')

            const ret: ADSB_DecodedMessage_AirbornePosition_AltitudeGnss = addMissingProperties(retBaseAirbornePosition, {
                altitudeGnss: {
                    meter: altitudeInMetersGnss,
                    feet: meterToFeet(altitudeInMetersGnss)
                }
            })

            return ret
        }


    } else if(type === 'airborne_velocity'){
        // see https://mode-s.org/1090mhz/content/ads-b/5-airborne-velocity.html

        //TODO
    } else if(type === 'aircraft_operation_status_v1' || type === 'aircraft_operation_status_v2'){
        // operation status see https://mode-s.org/1090mhz/content/ads-b/6-operation-status.html

        const structOperationStatus = parseBitStructure(structBase.get('rest'), [{
            name: 'subType',
            bits: 3
        }, {
            name: 'capacityClassCodes',
            bits: 16
        }, {
            name: 'operationalModeCodes',
            bits: 16
        }, {
            name: 'adsbVersion',
            bits: 3
        }, {
            name: 'rest',
            bits: 1 + 4 + 2 + 2 + 1 + 1 + 2
        }])

        const adsbVersion = bitStringToUnsignedIntegerSafe(structOperationStatus.get('adsbVersion'), [0, 1, 2], 'adsbVersion')

        if(adsbVersion === 0){
            throw new DecodingError('invalid adsbVersionNumber, version 0 does not send messages')
        } else if(adsbVersion === 1){

            const structOperationStatus_v1 = parseBitStructure(structBase.get('rest'), [{
                name: 'subType',
                bits: 3
            }, {
                name: 'capacityClassCode',
                bits: 16
            }, {
                name: 'operationalModeCode',
                bits: 16
            }, {
                name: 'adsbVersion',
                bits: 3
            }, {
                name: 'nicSupplement',
                bits: 1
            }, {
                name: 'navigationalAccuracyCategoryCodePosition',
                bits: 4
            }, {
                name: 'barometricAltitudeQualityCode_or_reserved',
                bits: 2
            }, {
                name: 'surveilanceIntegrityLevelCode',
                bits: 2
            }, {
                name: 'barometricAltitudeIntegrityCode_or_trackAngleOrHeading',
                bits: 1
            }, , {
                name: 'horizontalReferenceDirectionCode',
                bits: 1
            }, {
                name: 'reserved',
                bits: 2
            }])

            const subType = convertIntegerTo(bitStringToUnsignedIntegerSafe(structOperationStatus_v1.get('subType'), [0, 1], 'subType'), {
                '0': 'airborne',
                '1': 'surface'
            }) as 'airborne' | 'surface' //TODO fix this typing

            const retBaseOperationStatus_v1: ADSB_DecodedMessage_OperationStatus_v1_Base = addMissingProperties(retBase, {
                subType,
                adsbVersion: bitStringToUnsignedIntegerSafe(structOperationStatus_v1.get('adsbVersion'), [0, 1], 'adsbVersion'),
                operationalModeCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('operationalModeCode'), 16, 'operationalModeCode'),
                nicSuplement: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('nicSupplement'), 1, 'nicSuplement'), {
                        '0': false,
                        '1': true
                    }
                ),
                navigationalAccuracyCategoryCodePosition: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('navigationalAccuracyCategoryCodePosition'), 4, 'navigationalAccuracyCategoryCodePosition'),

                surveilanceIntegrityLevelCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('surveilanceIntegrityLevelCode'), 2, 'surveilanceIntegrityLevelCode'),

                horizontalReferenceDirection: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('horizontalReferenceDirectionCode'), 1, 'horizontalReferenceDirectionCode'), {
                        '0': false,
                        '1': true
                    }
                )
            })

            if(subType == 'airborne'){

                const ret: ADSB_DecodedMessage_OperationStatus_v1_Airborne = addMissingProperties(retBaseOperationStatus_v1, {
                    airborneCapacityClassCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('capacityClassCode'), 16, 'capacityClassCode'),

                    barometricAltitudeQualityCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('barometricAltitudeQualityCode_or_reserved'), 2, 'barometricAltitudeQualityCode_or_reserved'),

                    barometricAltitudeIntegrityCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('barometricAltitudeIntegrityCode_or_trackAngleOrHeading'), 1, 'barometricAltitudeIntegrityCode_or_trackAngleOrHeading'),
                })

                return ret

            } else if(subType === 'surface'){

                const structSurfaceCapacityClass = parseBitStructure(structOperationStatus_v1.get('capacityClassCode'), [{
                    name: 'capacityCode',
                    bits: 12
                }, {
                    name: 'lengthWidthCode',
                    bits: 4
                }])

                const ret: ADSB_DecodedMessage_OperationStatus_v1_Surface = addMissingProperties(retBaseOperationStatus_v1, {
                    surfaceCapacityClassCode: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfaceCapacityClass.get('capacityCode')
                        , 12, 'capacityCode'),

                    lengthWidthCode: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfaceCapacityClass.get('lengthWidthCode'), 4, 'lengthWidthCode'),

                    trackAngleOrHeading: convertIntegerTo(
                        bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v1.get('barometricAltitudeIntegrityCode_or_trackAngleOrHeading'), 1, 'trackAngleHeading'), {
                            '0': false,
                            '1': true
                        }
                    )
                })

                return ret
            }

        } else if(adsbVersion === 2){

            const structOperationStatus_v2 = parseBitStructure(structBase.get('rest'), [{
                name: 'subType',
                bits: 3
            }, {
                name: 'capacityClassCode',
                bits: 16
            }, {
                name: 'operationalModeCode',
                bits: 16
            }, {
                name: 'adsbVersion',
                bits: 3
            }, {
                name: 'nicSupplementA',
                bits: 1
            }, {
                name: 'navigationalAccuracyCategoryCodePosition',
                bits: 4
            }, {
                name: 'geometricVerticalAccuracyCode_or_reserved',
                bits: 2
            }, {
                name: 'sourceIntegrityLevelCode',
                bits: 2
            }, {
                name: 'barometricAltitudeIntegrityCode_or_trackAngleOrHeading',
                bits: 1
            }, , {
                name: 'horizontalReferenceDirectionCode',
                bits: 1
            }, {
                name: 'silSupplement',
                bits: 1
            }, {
                name: 'reserved',
                bits: 1
            }])

            const subType = convertIntegerTo(bitStringToUnsignedIntegerSafe(structOperationStatus_v2.get('subType'), [0, 1], 'subType'), {
                '0': 'airborne',
                '1': 'surface'
            }) as 'airborne' | 'surface' //TODO fix this typing

            const retBaseOperationStatus_v2: ADSB_DecodedMessage_OperationStatus_v2_Base = addMissingProperties(retBase, {
                subType,
                adsbVersion: bitStringToUnsignedIntegerSafe(structOperationStatus_v2.get('adsbVersion'), [0, 1], 'adsbVersion'),
                nicSuplementA: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('nicSupplementA'), 1, 'nicSuplementA'), {
                        '0': false,
                        '1': true
                    }
                ),
                navigationalAccuracyCategoryCodePosition: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('navigationalAccuracyCategoryCodePosition'), 4, 'navigationalAccuracyCategoryCodePosition'),

                sourceIntegrityLevelCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('sourceIntegrityLevelCode'), 2, 'sourceIntegrityLevelCode'),

                horizontalReferenceDirection: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('horizontalReferenceDirectionCode'), 1, 'horizontalReferenceDirectionCode'), {
                        '0': false,
                        '1': true
                    }
                ),

                silSupplement: convertIntegerTo(
                    bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('silSupplement'), 1, 'silSupplement'), {
                        '0': false,
                        '1': true
                    }
                )

            })

            if(subType == 'airborne'){

                return addMissingProperties<typeof retBaseOperationStatus_v2, ADSB_DecodedMessage_OperationStatus_v2_Airborne>(retBaseOperationStatus_v2, {
                    airborneOperationalModeCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('operationalModeCode'), 16, 'operationalModeCode'),

                    airborneCapacityClassCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('capacityClassCode'), 16, 'capacityClassCode'),

                    geometricVerticalAccuracyCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('geometricVerticalAccuracyCode_or_reserved'), 2, 'barometricAltitudeIntegrityCode_or_trackAngleOrHeading'),

                    barometricAltitudeIntegrityCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('barometricAltitudeIntegrityCode_or_trackAngleOrHeading'), 1, 'barometricAltitudeIntegrityCode_or_trackAngleOrHeading'),
                })

            } else if(subType === 'surface'){

                const structSurfaceCapacityClass = parseBitStructure(structOperationStatus_v2.get('capacityClassCode'), [{
                    name: 'capacityCode',
                    bits: 12
                }, {
                    name: 'lengthWidthCode',
                    bits: 4
                }])

                return addMissingProperties<typeof retBaseOperationStatus_v2, ADSB_DecodedMessage_OperationStatus_v2_Surface>(retBaseOperationStatus_v2, {
                    surfaceOperationalModeCode: bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('operationalModeCode'), 16, 'operationalModeCode'),

                    surfaceCapacityClassCode: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfaceCapacityClass.get('capacityCode')
                        , 12, 'capacityCode'),

                    lengthWidthCode: bitStringToUnsignedIntegerSafeRangeFromBits(structSurfaceCapacityClass.get('lengthWidthCode'), 4, 'lengthWidthCode'),

                    trackAngleOrHeading: convertIntegerTo(
                        bitStringToUnsignedIntegerSafeRangeFromBits(structOperationStatus_v2.get('barometricAltitudeIntegrityCode_or_trackAngleOrHeading'), 1, 'trackAngleHeading'), {
                            '0': false,
                            '1': true
                        }
                    )
                })
            }
        }

    } else {
        throw new DecodingNotSupportedError('type "'+ type + '" (typeCode ' + parsedMessage.typeCode + ')')
    }

}


export type ADSB_Decoded_GroundTrackInformation = {
    available: false
} | {
    available: true
    heading: number // true north (the point on the Earth's surface that intersects the Earth's rotational axis.)
}

/**
 *
 * @param groundTrackStatusBit "0" or "1"
 * @param groundTrackBits string with length 7
 * @returns
 */
function decodeGroundTrack(groundTrackStatusBit: string, groundTrackBits: string): ADSB_Decoded_GroundTrackInformation{

    if(groundTrackStatusBit.length > 1){
        throw new DecodingError('groundTrackStatusBit is more then 1 char: "' + groundTrackStatusBit + '"')
    }

    const groundTrackAvailable = groundTrackStatusBit === '1'

    if(groundTrackAvailable){
        return {
            available: true,
            heading: bitStringToUnsignedIntegerSafeRangeFromBits(groundTrackBits, 7, 'groundTrackBits') * 360 / 128
        }
    }

    return {
        available: false
    }
}

export type ADSB_Decoded_GroundSpeedInformation = {
    available: false
} | {
    available: true
    knots: {
        speedAtLeast175: boolean,
        speed: number
    },
    kmh: {
        speedAtLeast324: boolean,
        speed: number
    }
}


/**
*
* @param speed any integer between 0 and 127 (including 0 and 127)
* @returns
*/
function decodeQuantizedGroundSpeed(speed: ComputeRange<128>[number]): ADSB_Decoded_GroundSpeedInformation {

    // see https://mode-s.org/1090mhz/content/ads-b/4-surface-position.html#tb:adsb-surf-pos-mov

    const quantizations: {from: number, to: number, beginSpeed: number, step: number}[] = [{
        from: 2,
        to: 8,
        beginSpeed: 0.125,
        step: 0.125
    },{
        from: 9,
        to: 12,
        beginSpeed: 1,
        step: 0.25
    },{
        from: 13,
        to: 38,
        beginSpeed: 2,
        step: 0.5
    },{
        from: 39,
        to: 93,
        beginSpeed: 15,
        step: 1
    },{
        from: 94,
        to: 108,
        beginSpeed: 70,
        step: 2
    },{
        from: 109,
        to: 123,
        beginSpeed: 100,
        step: 5
    }]

    if(speed === 0){
        return {
            available: false
        }
    } else if(speed === 1){
        return makeAvailableRet(0)
    } else if(speed === 124){
        return makeAvailableRet(175)
    } else if(speed >= 125){
        throw new DecodingError('invalid groundSpeed for quantization: ' + speed)
    } else {
        const quantization = quantizations.find(a => {
            return speed >= a.from && speed <= a.to
        })

        if(!quantization){
            throw new DecodingError('could not find quantization definition for speed: ' + speed)
        }

        return makeAvailableRet(quantization.beginSpeed + (speed - quantization.from) * quantization.step)
    }


    function makeAvailableRet(speed: number): ADSB_Decoded_GroundSpeedInformation {

        const speedAtLeast175 = speed >= 175

        return {
            available: true,
            knots: {
                speed,
                speedAtLeast175
            },
            kmh: {
                speed: knotsToKmh(speed),
                speedAtLeast324: speedAtLeast175
            }
        }
    }
}


function convertIntegerTo<DK extends number, DKString extends `${DK}`, D extends Record<DKString, any>>(int: DK, definitions: D, debugLabel?: string){
    if(int > Number.MAX_SAFE_INTEGER || int < Number.MIN_SAFE_INTEGER || Math.floor(int) !== int){
        throw new Error('int is not an integer')
    }

    const intString = '' + int

    if(typeof definitions[intString] === 'undefined'){
        throw new Error('int ' + (debugLabel ? debugLabel + ' ' : '') + 'does not fit any definition: "' + int + '"')
    }

    return definitions[intString]
}

/**
*
* @returns string with length 8
*/
function decodeCallsignBytes(bitString: string){
    // identification and category, see https://mode-s.org/1090mhz/content/ads-b/2-identification.html

    const struct = parseBitStructure(bitString, [{
        name: 'callsign_0',
        bits: 6
    }, {
        name: 'callsign_1',
        bits: 6
    }, {
        name: 'callsign_2',
        bits: 6
    }, {
        name: 'callsign_3',
        bits: 6
    }, {
        name: 'callsign_4',
        bits: 6
    }, {
        name: 'callsign_5',
        bits: 6
    }, {
        name: 'callsign_6',
        bits: 6
    }, {
        name: 'callsign_7',
        bits: 6
    }])

    const callsignChars = []

    for(let i = 0; i < 8; i++){
        const callsignCharNumber = bitStringToUnsignedIntegerSafeRangeFromBits(struct.get(
            // @ts-ignore
            'callsign_' + i
        ), 6, 'callsign_' + i)

        const char = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ##### ###############0123456789######'.charAt(callsignCharNumber)
        callsignChars.push(char)
    }

    return callsignChars.join('')
}

function decodeTypeCode(typeCode: number, allMessageBits: string) : ADSB_DecodedMessage_Type {
    // see https://mode-s.org/1090mhz/content/ads-b/1-basics.html#tb:adsb-tc

    if(typeCode >= 1 && typeCode <= 4){
        return 'aircraft_identification_and_category'
    } else if(typeCode >= 5 && typeCode <= 8){
        return 'surface_position'
    } else if(typeCode >= 9 && typeCode <= 18){
        return 'airborne_position_with_baro_altitude'
    } else if(typeCode >= 20 && typeCode <= 22){
        return 'airborne_position_with_gnss_altitude'
    } else if(typeCode === 19){
        return 'airborne_velocity'
    } else if(typeCode === 31){

        const struct = parseBitStructure(allMessageBits, [{
            name: 'before',
            bits: 5 + 3 + 6 + 16
        }, {
            name: 'adsbVersionNumber',
            bits: 3
        }, {
            name: 'after',
            bits: -1
        }])

        const adsbVersionNumber = bitStringToUnsignedIntegerSafe(struct.get('adsbVersionNumber'), [1, 2], 'adsbVersionNumber')

        return adsbVersionNumber === 1 ? 'aircraft_operation_status_v1' : 'aircraft_operation_status_v2'
    }

    if(typeCode === 28 || typeCode === 29){
        throw new DecodingNotSupportedError('unsupported typeCode: ' + typeCode)// 'aircraft_status' | 'target_state_and_status_information'
    }

    throw new DecodingError('invalid typeCode: ' + typeCode)
}

function decodeWakeVortexCategory(typeCode: number, aircraftCategoryCode: number) : ADSB_WakeVortexCategory {

    // see https://mode-s.org/1090mhz/content/ads-b/2-identification.html#tb:adsb_id_wake_category

    if(aircraftCategoryCode === 0){
        return 'no_category_information'
    }

    if(typeCode === 2){
        if(aircraftCategoryCode === 1){
            return 'surface_emergency_vehicle'
        } else if(aircraftCategoryCode === 3){
            return 'surface_service_vehicle'
        } else if(aircraftCategoryCode >= 4 && aircraftCategoryCode <= 7){
            return 'ground_obstruction'
        }

    } else if(typeCode === 3){
        if(aircraftCategoryCode === 1){
            return 'glider_or_sailplane'
        } else if(aircraftCategoryCode === 2){
            return 'lighter_than_air'
        } else if(aircraftCategoryCode === 3){
            return 'parachutist_or_skydiver'
        } else if(aircraftCategoryCode === 4){
            return 'ultralight_or_hangglider_or_paraglider'
        } else if(aircraftCategoryCode === 6){
            return 'unmanned_aerial_vehicle'
        } else if(aircraftCategoryCode === 7){
            return 'space_or_transatmospheric_vehicle'
        }

    } else if(typeCode === 4){
        if(aircraftCategoryCode === 1){
            return 'light_less_than_7000_kg'
        } else if(aircraftCategoryCode === 2){
            return 'medium1_between_7000_kg_and_34000_kg'
        } else if(aircraftCategoryCode === 3){
            return 'medium2_between_34000_kg_and_136000_kg'
        } else if(aircraftCategoryCode === 4){
            return 'high_vortex_aircraft'
        } else if(aircraftCategoryCode === 5){
            return 'heavy_larger_than_136000_kg'
        } else if(aircraftCategoryCode === 6){
            return 'high_performance_above_5_g_acceleration_and_high_speed_above_400_kt'
        } else if(aircraftCategoryCode === 7){
            return 'rotorcraft'
        }

    }

    throw new WakeVortexCategoryDecodingError(typeCode, aircraftCategoryCode)
}

class DecodingError extends Error {

    constructor(message: string){
        super(message)
    }
}
export type {DecodingError}

class DecodingNotSupportedError extends DecodingError {
    constructor(whatIsNotSupported: string){
        super('Not supported: ' + whatIsNotSupported)
    }
}

class WakeVortexCategoryDecodingError extends DecodingError {

    constructor(typeCode: number, aircraftCategory: number){
        super('invalid aircraftCategory in combination with typeCode "' + typeCode + '": ' + aircraftCategory)
    }
}
export type {WakeVortexCategoryDecodingError}
