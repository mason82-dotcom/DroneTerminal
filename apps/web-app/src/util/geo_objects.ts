import { ApiResponse_MissionGet, ApiResponse_TaskGet, ApiResponse_WorkspaceGeoObjectsGet, ApiResponse_WorkspaceGet } from "openflighthub-api-client-sdk";

/**
 *
 * @returns [0, 0] when array is empty
 */
export function getCenter(geoObjects: ApiResponse_WorkspaceGeoObjectsGet): [number, number]{

    if (geoObjects.length === 0) {
        return [0, 0]
    }

    const centerCoordinates: number[][] = geoObjects.map(geoObject => {
        switch(geoObject.type){ // not a marking

            case 0: // marking
                switch(geoObject.sub_type) {
                    case 0: return geoObject.config.point

                    case 1: return getCenterOfCoordinates(geoObject.config.line)

                    case 2: return getCenterOfCoordinates(geoObject.config.polygon)

                    case 3: return geoObject.config.center

                    default: return false
                }

            case 1: // traffic
                return [geoObject.config.longitude, geoObject.config.latitude]

            case 2: // unit
                return [geoObject.config.longitude, geoObject.config.latitude]

            default: return false
        }
    }).filter(obj => obj !== false)

    return getCenterOfCoordinates(centerCoordinates)
}

/**
 *
 * @param coordinates [longitude, latitude]
 * @returns
 */
function getCenterOfCoordinates(coordinates: number[][]): [number, number] {

    let totalLatitude = 0
    let totalLongitude = 0

    if (coordinates.length === 0) {
        return [0, 0]
    }

    for(const coordinate of coordinates) {
        totalLatitude += coordinate[1]
        totalLongitude += coordinate[0]
    }

    return [totalLongitude / coordinates.length, totalLatitude / coordinates.length]
}

export function getCenterOfTaskGeoObjectsOrFalse(task: ApiResponse_TaskGet) {

    if (task.geo_objects.length === 0) {
        return false
    }

    const center = getCenter(task.geo_objects)

    return {latitude: center[1], longitude: center[0]}

}

export function getCenterOfTaskGeoObjects(task: ApiResponse_TaskGet, workspace: ApiResponse_WorkspaceGet) {

    const center = getCenterOfTaskGeoObjectsOrFalse(task)

    if (center === false) {
        return {latitude: workspace.latitude, longitude: workspace.longitude}
    }

    return center
}
