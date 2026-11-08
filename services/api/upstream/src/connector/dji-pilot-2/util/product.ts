// see https://developer.dji.com/doc/cloud-api-tutorial/en/overview/product-support.html

import { DBType_Drone_TYPES, DBType_Drone_TypeType, DBType_Remote_Controller_TYPES, DBType_Remote_Controller_TypeType } from "../../../generated-definitions/db/DBTypes"

/**
 * if domain is camera, then use getCameraType() to identify the camera
 */
export function getProductType(domain: string | number, type: string | number, subType: string | number){

    const domainString = decodeDomain(domain)

    const typeString = decodeType(domainString, type)

    const subTypeString = decodeSubType(domainString, typeString, subType)

    return {
        domain: domainString,
        type: typeString,
        subType: subTypeString
    }
}

export type ProductDomain = 'drone' | 'controller' | 'dock' | 'camera'
function decodeDomain(domain: string | number): ProductDomain {
    const domainInt = parseInt('' + domain)

    switch(domainInt){
        case 0: return 'drone'
        case 1: return 'camera'
        case 2: return 'controller'
        case 3: return 'dock'
        default: throw new Error('invalid domain: ' + domainInt)
    }
}

export type ProductType = ('matrice_350_rtk' | 'matrice_300_rtk' | 'matrice_30' | 'mavic_3_enterprise' | 'matrice_3' | 'matrice_4')
| ('camera')
| ('smart_controller_enterprise' | 'rc_plus' | 'rc_plus_2' | 'rc_pro_enterprise')
| ('dock' | 'dock_2')

function decodeType(domain: ProductDomain, type: string | number): ProductType {
    const typeInt = parseInt('' + type)

    switch(domain){
        case 'drone': {

            switch(typeInt){
                case 89: return 'matrice_350_rtk'
                case 60: return 'matrice_300_rtk'
                case 67: return 'matrice_30'
                case 77: return 'mavic_3_enterprise'
                case 91: return 'matrice_3'
                case 99: return 'matrice_4'
                default: throw new Error('invalid type: ' + typeInt + ' for domain: ' + domain)
            }
        }

        case 'camera': return 'camera'

        case 'controller': {

            switch(typeInt){
                case 56: return 'smart_controller_enterprise'
                case 119: return 'rc_plus'
                case 174: return 'rc_plus_2'
                case 144: return 'rc_pro_enterprise'
                default: throw new Error('invalid type: ' + typeInt + ' for domain: ' + domain)
            }
        }

        case 'dock': {

            switch(typeInt){
                case 1: return 'dock'
                case 2: return 'dock_2'
                default: throw new Error('invalid type: ' + typeInt + ' for domain: ' + domain)
            }
        }
    }
}

export type ProductSubType = ('matrice_350_rtk' | 'matrice_300_rtk' | 'matrice_30' | 'matrice_30_t' | 'mavic_3_enterprise' | 'mavic_3_enterprise_t' | 'matrice_3' | 'matrice_3_t' | 'matrice_4' | 'matrice_4_t')
| ('camera')
| ('smart_controller_enterprise' | 'rc_plus' | 'rc_plus_2' | 'rc_pro_enterprise')
| ('dock' | 'dock_2')

function decodeSubType(domain: ProductDomain, type: ProductType, subType: string | number): ProductSubType {
    const subTypeInt = parseInt('' + subType)

    switch(domain){
        case 'drone': {

            switch(type){
                case 'matrice_350_rtk': {

                    switch(subTypeInt){
                        case 0: return 'matrice_350_rtk'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'matrice_300_rtk': {

                    switch(subTypeInt){
                        case 0: return 'matrice_300_rtk'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'matrice_30': {

                    switch(subTypeInt){
                        case 0: return 'matrice_30'
                        case 1: return 'matrice_30_t'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'mavic_3_enterprise': {

                    switch(subTypeInt){
                        case 0: return 'mavic_3_enterprise'
                        case 1: return 'mavic_3_enterprise_t'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }


                case 'matrice_3': {

                    switch(subTypeInt){
                        case 0: return 'matrice_3'
                        case 1: return 'matrice_3_t'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }


                case 'matrice_4': {

                    switch(subTypeInt){
                        case 0: return 'matrice_4'
                        case 1: return 'matrice_4_t'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }
            }
        }

        case 'camera': return 'camera'

        case 'controller': {

            switch(type){
                case 'smart_controller_enterprise': {

                    switch(subTypeInt){
                        case 0: return 'smart_controller_enterprise'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'rc_plus': {

                    switch(subTypeInt){
                        case 0: return 'rc_plus'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'rc_plus_2': {

                    switch(subTypeInt){
                        case 0: return 'rc_plus_2'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'rc_pro_enterprise': {

                    switch(subTypeInt){
                        case 0: return 'rc_pro_enterprise'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                default: throw new Error('invalid type: ' + type)
            }
        }

        case 'dock': {



            switch(type){
                case 'dock': {

                    switch(subTypeInt){
                        case 0: return 'dock'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                case 'dock_2': {

                    switch(subTypeInt){
                        case 0: return 'dock_2'
                        default: throw new Error('invalid subType: ' + subTypeInt + ' for domain: ' + domain +' and type: ' + type)
                    }
                }

                default: throw new Error('invalid type: ' + type)
            }
        }

        default:  throw new Error('invalid domain: ' + domain)
    }
}


export type CameraInfo = {
    type: CameraType
    subType: CameraSubType
    gimbalPosition: CameraGimbalPosition
}

export type CameraType = 'fpv' | 'vision_assist' | 'camera_external' | 'camera_internal' | 'dock'

export type CameraSubType = ('fpv')
| ('vision_assist')
| ('zenmuse_z30' | 'zenmuse_xt2' | 'zenmuse_xts' | 'zenmuse_h20' | 'zenmuse_h20t' | 'zenmuse_h20n' | 'zenmuse_h30' | 'zenmuse_h30t')
| ('matrice_30_camera' | 'matrice_30t_camera' | 'matrice_4e_camera' | 'matrice_4t_camera' | 'matrice_3d_camera' | 'matrice_3td_camera' | 'mavic_3e_camera' | 'mavic_3t_camera')
| ('dock_camera' | 'dock_2_camera')

export type CameraGimbalPosition = ('fpv' | 'main_or_bottom_single_or_bottom_dual_portside' | 'bottom_starboard' | 'up' | 'vision_assist')
| ('dock_camera')


/**
 * @param type_subtype_gimbalindex is format as [type]-[subtype]-[gimbalindex] e.g. 20-0-0 is a Zenmuse Z30, that is connected to the bottom connector (if it is a dual gimbal, it's the portside connector)
 */
export function getCameraInfo(type_subtype_gimbalindex: string): CameraInfo {
    const parts = type_subtype_gimbalindex.split('-')

    if(parts.length !== 3){
        throw new Error('invalid format: ' + type_subtype_gimbalindex)
    }

    const typeInt = parseInt(parts[0])
    const subTypeInt = parseInt(parts[1])
    const gimbalIndexInt = parseInt(parts[2])

    switch(typeInt){
        case 39: {
            const type: CameraType = 'fpv'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'fpv'

                    switch(gimbalIndexInt){
                        case 7: return {
                            type,
                            subType,
                            gimbalPosition: 'fpv'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 176: {
            const type: CameraType = 'vision_assist'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'vision_assist'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 20: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_z30'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 26: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_xt2'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 41: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_xts'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 42: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_h20'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 43: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_h20t'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 61: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_h20n'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 82: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_h30'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 83: {
            const type: CameraType = 'camera_external'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'zenmuse_h30t'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }
                        case 1: return {
                            type,
                            subType,
                            gimbalPosition: 'bottom_starboard'
                        }
                        case 2: return {
                            type,
                            subType,
                            gimbalPosition: 'up'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 52: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_30_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 53: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_30t_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 88: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_4e_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 89: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_4t_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 66: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'mavic_3e_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 67: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'mavic_3t_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 80: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_3d_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 81: {
            const type: CameraType = 'camera_internal'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'matrice_3td_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'main_or_bottom_single_or_bottom_dual_portside'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        case 165: {// even though dji dock 2 has 2 cameras, they appear as the same id (says dji devs). You must use the api two switch between them
            const type: CameraType = 'dock'

            switch(subTypeInt){

                case 0: {
                    const subType: CameraSubType = 'dock_camera'

                    switch(gimbalIndexInt){
                        case 0: return {
                            type,
                            subType,
                            gimbalPosition: 'dock_camera'
                        }

                        default: throw new Error('invalid gimbalIndex: ' + gimbalIndexInt + ' for type: ' + typeInt + ' and subType: ' + subTypeInt)
                    }
                }

                default: throw new Error('invalid subType: ' + subTypeInt + ' for type: ' + typeInt)
            }
        }

        default: throw new Error('invalid type: ' + typeInt)
    }
}

export type DeviceModelEnum = {
    domain: string
    type: string
    sub_type: string
    key: ProductKey
}

export type ProductKey = string // see https://developer.dji.com/doc/cloud-api-tutorial/en/overview/product-support.html


const DEVICE_MODEL_ENUMS_DRONES = new Map<DBType_Drone_TypeType, DeviceModelEnum>()

DEVICE_MODEL_ENUMS_DRONES.set(DBType_Drone_TYPES.dji_mavic_3, {
    domain: '0',
    key: '00-77-0',//TODO correctly support M3E/M3T/M3TA
    type: '77',
    sub_type: '0'
})

DEVICE_MODEL_ENUMS_DRONES.set(DBType_Drone_TYPES.dji_matrice_30, {
    domain: '0',
    key: '00-67-0',//TODO correctly support M30T
    type: '67',
    sub_type: '0'
})


DEVICE_MODEL_ENUMS_DRONES.set(DBType_Drone_TYPES.dji_matrice_300, {
    domain: '0',
    key: '00-60-0',
    type: '60',
    sub_type: '0'
})

DEVICE_MODEL_ENUMS_DRONES.set(DBType_Drone_TYPES.dji_matrice_350, {
    domain: '0',
    key: '00-89-0',
    type: '89',
    sub_type: '0'
})

export function getModelEnumForDroneType(droneType: DBType_Drone_TypeType): DeviceModelEnum {
    const modelEnum = DEVICE_MODEL_ENUMS_DRONES.get(droneType)

    if(!modelEnum){
        return undefined
    }

    return modelEnum
}



const DEVICE_MODEL_ENUMS_REMOTE_CONTROLLERS = new Map<DBType_Remote_Controller_TypeType, DeviceModelEnum>()

DEVICE_MODEL_ENUMS_DRONES.set(DBType_Remote_Controller_TYPES.dji_smart_controller, {
    domain: '2',
    key: '00-56-0',
    type: '56',
    sub_type: '0'
})

DEVICE_MODEL_ENUMS_REMOTE_CONTROLLERS.set(DBType_Remote_Controller_TYPES.dji_rc_plus, {
    domain: '2',
    key: '00-119-0',
    type: '119',
    sub_type: '0'
})

DEVICE_MODEL_ENUMS_REMOTE_CONTROLLERS.set(DBType_Remote_Controller_TYPES.dji_rc_plus_2, {
    domain: '2',
    key: '00-174-0',
    type: '174',
    sub_type: '0'
})


DEVICE_MODEL_ENUMS_REMOTE_CONTROLLERS.set(DBType_Remote_Controller_TYPES.dji_rc_pro_enterprise, {
    domain: '2',
    key: '00-144-0',
    type: '144',
    sub_type: '0'
})

export function getModelEnumForRemoteControllerType(remoteControllerType: DBType_Remote_Controller_TypeType): DeviceModelEnum {
    const modelEnum = DEVICE_MODEL_ENUMS_REMOTE_CONTROLLERS.get(remoteControllerType)

    if(!modelEnum){
        return undefined
    }

    return modelEnum
}
