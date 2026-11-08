import { EventManager } from "@/sdks/dji-pilot-2/dji-open-platform-connect-sdk";
import Timer from "@/util/timer";
import { cloneObject } from "@/util/vue";
import { along, bearing, destination, distance, intersect, lineIntersect, lineString, midpoint, point } from "@turf/turf";
import dayjs from "dayjs";
import { ApiResponse_WorkspaceGeoObjectsGet } from "openflighthub-api-client-sdk";

const TIME_BETWEEN_CHECKS_MILLISECONDS = 5 * 1000; // in milliseconds
const TIME_BETWEEN_DETAILED_SIMULATION_STEPS_SECONDS = 5; // in seconds

type ComputedAircraftData = {
    currentPositionLngLat: [number, number]
    speed: number
    heading: number
    vertical?: {
        height: number
        verticalSpeed: number
    },
    geoObject: ApiResponse_WorkspaceGeoObjectsGet[number]
}

export type TCAS_Options = {
    alertTime: number
    warningTime: number
    bubbleRadius: number
}

export type TCAS_Event_Data = {
    type: 'warning' | 'alert'
    aircraftA: ApiResponse_WorkspaceGeoObjectsGet[number]
    aircraftB: ApiResponse_WorkspaceGeoObjectsGet[number]
    intersection: IntersectionData
    eventId: number
    timestamp: number//in milliseconds since epoch
}

type IntersectionData = {
    intersectionPoint: [number, number],
    intersectionHeight?: number,
    timeToIntersectionSeconds: number
}

let eventIdCounter = 0

export default class TCAS extends EventManager<{
    'new': TCAS_Event_Data
    'update': TCAS_Event_Data
    'remove': TCAS_Event_Data
}> {

    private readonly geoObjects: ApiResponse_WorkspaceGeoObjectsGet;
    private intervalHandle : ReturnType<typeof setInterval> | undefined;
    private lastCheckAircraftGeoObjects: ApiResponse_WorkspaceGeoObjectsGet | undefined;

    private readonly options: TCAS_Options;

    private readonly activeEvents: TCAS_Event_Data[] = []

    /**
     *
     * @param geoObjects an array that is being updated
     */
    constructor(geoObjects: ApiResponse_WorkspaceGeoObjectsGet, options: TCAS_Options) {
        super()
        this.geoObjects = geoObjects
        this.options = options//TODO check alert time is smaller then warn time?

        this.intervalHandle = setInterval(() => {
            const checkTimer = new Timer('tcas check')
            checkTimer.start()
            this.check()
            checkTimer.end()
        }, TIME_BETWEEN_CHECKS_MILLISECONDS)

    }

    setOptions(options: TCAS_Options) {
        this.options.alertTime = options.alertTime
        this.options.warningTime = options.warningTime
        this.options.bubbleRadius = options.bubbleRadius
    }

    private check() {

        const computedData = this.calculateAircraftData()

        for (const computedDataA of computedData) {
            for(const computedDataB of computedData) {
                if(computedDataA === computedDataB) {
                    continue;
                }

                if((computedDataA.geoObject.type === 2 || computedDataB.geoObject.type === 2) === false){
                    continue;//ignore warnings when no unit of us is involved (e.g. collision between two 3rd party aircraft)
                }

                const intersection = this.calculateVectorIntersection(computedDataA, computedDataB)

                if(intersection) {
                    if(intersection.timeToIntersectionSeconds <= this.options.alertTime) {
                        this.makeEvent('alert', computedDataA, computedDataB, intersection)
                        continue
                    } else if(intersection.timeToIntersectionSeconds <= this.options.warningTime) {
                        this.makeEvent('warning', computedDataA, computedDataB, intersection)
                        continue
                    }
                }

                const activeEvent = this.getActiveEvent(computedDataA, computedDataB)
                if(activeEvent) {
                    this.dispatch("remove", activeEvent)
                    this.activeEvents.splice(this.activeEvents.indexOf(activeEvent), 1)
                }
            }
        }

        //cleanup active events
        for(const activeEvent of this.activeEvents) {
            const stillActive = computedData.find(computedDataA => computedDataA.geoObject.id === activeEvent.aircraftA.id) && computedData.find(computedDataB => computedDataB.geoObject.id === activeEvent.aircraftB.id)

            if(!stillActive) {
                this.dispatch("remove", activeEvent)
                this.activeEvents.splice(this.activeEvents.indexOf(activeEvent), 1)
            }
        }
    }

    private getActiveEvent(aircraftA: ComputedAircraftData, aircraftB: ComputedAircraftData): TCAS_Event_Data | undefined {
        for(const existingEvent of this.activeEvents) {
            if(existingEvent.aircraftA.id === aircraftA.geoObject.id && existingEvent.aircraftB.id === aircraftB.geoObject.id) {
                return existingEvent
            }
        }
    }

    private makeEvent(type: 'warning' | 'alert', aircraftA: ComputedAircraftData, aircraftB: ComputedAircraftData, intersection: IntersectionData) {

        const existingEvent = this.getActiveEvent(aircraftA, aircraftB)
        if(existingEvent) {
            this.dispatch("update", {
                type,
                aircraftA: aircraftA.geoObject,
                aircraftB: aircraftB.geoObject,
                intersection,
                eventId: existingEvent.eventId,
                timestamp: Date.now()
            })
            return
        }

        const newEvent: TCAS_Event_Data = {
            type,
            aircraftA: aircraftA.geoObject,
            aircraftB: aircraftB.geoObject,
            intersection,
            eventId: eventIdCounter++,
            timestamp: Date.now()
        }

        this.activeEvents.push(newEvent)
        this.dispatch("new", newEvent)
    }

    private calculateVectorIntersection(aircraftA: ComputedAircraftData, aircraftB: ComputedAircraftData): false | IntersectionData {

        //check if they are already in the bubble radius

        function getDistance3D(aircraftApos: [number, number], aircraftBpos: [number, number], aircraftAheight?: number, aircraftBheight?: number): number {
            const horizontalDistance = distance(aircraftApos, aircraftBpos, { units: 'meters' })
            const verticalDistance = typeof aircraftAheight === 'number' && typeof aircraftBheight === 'number' ? Math.abs(aircraftAheight - aircraftBheight) : 0
            const totalDistance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
            return totalDistance
        }

        const currentDistance = getDistance3D(aircraftA.currentPositionLngLat, aircraftB.currentPositionLngLat, aircraftA.vertical?.height, aircraftB.vertical?.height)

        if(currentDistance < this.options.bubbleRadius) {
            return {
                intersectionPoint: midpoint(aircraftA.currentPositionLngLat, aircraftB.currentPositionLngLat).geometry.coordinates as [number, number],
                intersectionHeight: aircraftA.vertical && aircraftB.vertical ? (aircraftA.vertical.height + aircraftB.vertical.height) / 2 : undefined,
                timeToIntersectionSeconds: 0
            }
        }


        // quick check to see if the aircraft are too far apart to intersect at all

        const destinationA = calculateFuturePosition(aircraftA, Math.max(this.options.warningTime, this.options.alertTime) * 2)//safety factor of 2
        const destinationB = calculateFuturePosition(aircraftB, Math.max(this.options.warningTime, this.options.alertTime) * 2)//safety factor of 2

        const lineA = lineString([aircraftA.currentPositionLngLat, destinationA])
        const lineB = lineString([aircraftB.currentPositionLngLat, destinationB])

        const intersection = lineIntersect(lineA, lineB)

        if(intersection.features.length === 0) {
            return false
        }


        //detailed simulation to see if they will intersect within the warning time

        for(let t = TIME_BETWEEN_DETAILED_SIMULATION_STEPS_SECONDS; t < Math.max(this.options.warningTime, this.options.alertTime); t += TIME_BETWEEN_DETAILED_SIMULATION_STEPS_SECONDS) {

            const destinationA = calculateFuturePosition(aircraftA, t)//safety factor of 2
            const destinationB = calculateFuturePosition(aircraftB, t)//safety factor of 2

            const futureHeightA = calculateFutureHeight(aircraftA, t)
            const futureHeightB = calculateFutureHeight(aircraftB, t)

            const totalDistance = getDistance3D(destinationA, destinationB, futureHeightA, futureHeightB)

            //@ts-ignore
            if(aircraftA.geoObject.config.name === 'Fake Mavic 3' || aircraftB.geoObject.config.name === 'Fake Mavic 3') {
                console.log(`t=${t}s, distance=${totalDistance}m`)
            }

            if(totalDistance <= this.options.bubbleRadius) {
                return {
                    intersectionPoint: midpoint(destinationA, destinationB).geometry.coordinates as [number, number],
                    intersectionHeight: aircraftA.vertical ? (futureHeightA + futureHeightB) / 2 : undefined,
                    timeToIntersectionSeconds: t
                }
            }
        }

        return false
    }

    private calculateAircraftData() {

        const aircraftGeoObjects = cloneObject(this.geoObjects).filter(geoObject => geoObject.type === 1 || (geoObject.type === 2 && [0,1,2].includes(geoObject.sub_type))); // type traffic or type unit and helicopter, airplane or drone

        const ret: ComputedAircraftData[] = []

        if(this.lastCheckAircraftGeoObjects){

            for (const geoObject of aircraftGeoObjects) {

                const lastData = this.lastCheckAircraftGeoObjects.find(lastGeoObject => lastGeoObject.id === geoObject.id);
                if(!lastData) {
                    continue// no data found, we see this geoobject for the first time
                }

                const computedData = computeData(lastData, geoObject)
                if(computedData) {
                    ret.push(computedData)
                }
            }
        }

        this.lastCheckAircraftGeoObjects = aircraftGeoObjects;

        return ret
    }

    public destroy() {
        if(this.intervalHandle){
            clearInterval(this.intervalHandle);
            this.intervalHandle = undefined;
        }
    }
}

/**
 *
 * @param lastData must be the same geoobject as currentData
 * @returns in meters per second
 */
function computeData(lastData: ApiResponse_WorkspaceGeoObjectsGet[number], currentData: ApiResponse_WorkspaceGeoObjectsGet[number]): ComputedAircraftData | false {

    let last: {
        longitude: number
        latitude: number
        height?: number
        speed?: number
        heading?: number
    }
    let current: {
        longitude: number
        latitude: number
        height?: number
        speed?: number
        heading?: number
    }


    if(currentData.type === 1 && lastData.type === 1){
        last = {
            longitude: lastData.config.longitude,
            latitude: lastData.config.latitude,
            height: lastData.config.height,
            speed: lastData.config.speed,
            heading: lastData.config.heading
        }

        current = {
            longitude: currentData.config.longitude,
            latitude: currentData.config.latitude,
            height: currentData.config.height,
            speed: currentData.config.speed,
            heading: currentData.config.heading
        }
    } else if(lastData.type === 2 && currentData.type === 2){
        last = {
            longitude: lastData.config.longitude,
            latitude: lastData.config.latitude,
            height: lastData.config.height,
            speed: lastData.config.speed,
            heading: lastData.config.heading
        }

        current = {
            longitude: currentData.config.longitude,
            latitude: currentData.config.latitude,
            height: currentData.config.height,
            speed: currentData.config.speed,
            heading: currentData.config.heading
        }
    } else {
        return false
    }

    if(typeof last.longitude !== 'number' || typeof last.latitude !== 'number' || typeof current.longitude !== 'number' || typeof current.latitude !== 'number'){
        console.warn('unexpected invalid data inside geo objects:', lastData, currentData)
        return false
    }

    const timeDeltaSeconds = dayjs(currentData.updated_at).diff(dayjs(lastData.updated_at)) / 1000;

    const horizontalDistance = distance([lastData.config.longitude, lastData.config.latitude], [currentData.config.longitude, currentData.config.latitude], { units: 'meters' });

    const speedHorizontalMetersPerSecond_calculated = timeDeltaSeconds === 0 ? 0 : (horizontalDistance / timeDeltaSeconds); // in m/s

    let speedHorizontalMetersPerSecond: number

    if(typeof current.speed === 'number'){
        speedHorizontalMetersPerSecond = current.speed
    } else {
        speedHorizontalMetersPerSecond = speedHorizontalMetersPerSecond_calculated
    }


    let speedVerticalMetersPerSecond: number | undefined = undefined;
    if(typeof last.height === 'number' && typeof current.height === 'number'){
        const verticalDistance = current.height - last.height;
        speedVerticalMetersPerSecond = timeDeltaSeconds === 0 ? undefined : (verticalDistance / timeDeltaSeconds); // in m/s
    }


    const heading_calculated = bearing([last.longitude, last.latitude], [current.longitude, current.latitude])

    let heading: number

    if(typeof current.heading === 'number'){
        heading = current.heading
    } else {
        heading = heading_calculated
    }

    return {
        currentPositionLngLat: [current.longitude, current.latitude],
        speed: speedHorizontalMetersPerSecond,
        heading,
        vertical: typeof speedVerticalMetersPerSecond === 'number' ? {
            height: current.height!,//is always defined if speedVerticalMetersPerSecond is defined
            verticalSpeed: speedVerticalMetersPerSecond
        } : undefined,
        geoObject: currentData
    }
}


function calculateFuturePosition(aircraft: ComputedAircraftData, timeSeconds: number): [number, number] {
    const distanceToTravel = aircraft.speed * timeSeconds; // in meters

    const position = destination(aircraft.currentPositionLngLat, distanceToTravel, aircraft.heading, { units: 'meters' })

    return position.geometry.coordinates as [number, number]

}

function calculateFutureHeight(aircraft: ComputedAircraftData, timeSeconds: number): number {
    if(!aircraft.vertical) {
        return 0
    }

    return aircraft.vertical.height + aircraft.vertical.verticalSpeed * timeSeconds
}
