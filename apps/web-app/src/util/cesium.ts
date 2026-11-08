import { MapNoGeoObjectSelectedEvent } from "@/components/geo-object/GeoObjectEvents";
import { radiansToDegrees } from "@turf/turf";
import { Cartesian2, Cartesian3, Cartographic, defined, Entity, HeadingPitchRoll, Viewer, Math as MathCesium, Transforms, Matrix3, Ray, Color } from "cesium";

type Callback = () => void

class ElementClickHandler {
    readonly mapContainer: HTMLElement
    readonly viewer: Viewer
    readonly entities = new Map<Entity, Callback[]>()

    readonly thisBoundOnClick = this.onClick.bind(this)

    constructor(mapContainer: HTMLElement, viewer: Viewer){
        this.mapContainer = mapContainer
        this.viewer = viewer
        this.mapContainer.addEventListener('click', this.thisBoundOnClick)
    }

    private onClick(evt: MouseEvent){
        const clickX = evt.pageX
        const clickY = evt.pageY
        const bounds = this.mapContainer.getBoundingClientRect()

        const containerX = bounds.left + window.scrollX
        const containerY = bounds.top + window.scrollY

        const relativeX = clickX - containerX
        const relativeY = clickY - containerY

        const clickedEntity = pickEntity(this.viewer, new Cartesian2(relativeX, relativeY))

        if(clickedEntity){
            const callback = this.entities.get(clickedEntity)
            if(callback){
                for(const cb of callback){
                    cb()
                }
            }
        } else {
            this.mapContainer.dispatchEvent(new MapNoGeoObjectSelectedEvent())
        }
    }

    makeHandleForEntity(entity: Entity, callback: ()=>void){
        let existingCallbacks = this.entities.get(entity)
        if(!existingCallbacks){
            existingCallbacks = [callback]
            this.entities.set(entity, existingCallbacks)
        }

        if(existingCallbacks.indexOf(callback) < 0){ //if exists, skip
            existingCallbacks.push(callback)
        }

        return new ClickMyEntityHandle(this, entity, callback)
    }

    deleteHandle(handle: ClickMyEntityHandle){
        const callbacks = this.entities.get(handle._entity)
        if(callbacks){
            const index = callbacks.indexOf(handle._callback)
            if(index !== -1){
                callbacks.splice(index, 1)
            }
            if(callbacks.length === 0){
                this.entities.delete(handle._entity)
            }
        }
    }

    destroy(){
        for(const entity of this.entities.keys()){
            this.entities.delete(entity)
        }
        this.mapContainer.removeEventListener('click', this.thisBoundOnClick)
    }
}



export class ClickMyEntityHandle {
    private readonly elementClickHandler: ElementClickHandler
    readonly _entity: Entity
    readonly _callback: Callback

    constructor(elementClickHandler: ElementClickHandler, entity: Entity, callback: Callback){
        this.elementClickHandler = elementClickHandler
        this._entity = entity
        this._callback = callback
    }

    destroy(){
        this.elementClickHandler.deleteHandle(this)
    }
}

const mapContainerToHandlerMap = new Map<HTMLElement, ElementClickHandler>()

export function setupClickMyEntity(mapContainer: HTMLElement, viewer: Viewer, entity: Entity, callback: ()=>void){

    let callbackMap = mapContainerToHandlerMap.get(mapContainer)
    if(!callbackMap){

        callbackMap = new ElementClickHandler(mapContainer, viewer)

        mapContainerToHandlerMap.set(mapContainer, callbackMap)
    }

    return callbackMap.makeHandleForEntity(entity, callback)
}


/**
 * Returns the top-most entity at the provided window coordinates
 * or undefined if no entity is at that location.
 *
 * source: https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/#managing-entities
 *
 * @param windowPosition The window coordinates.
 * @returns The picked entity or undefined.
 */
function pickEntity(viewer: Viewer, windowPosition: Cartesian2) : Entity | undefined {
    try {
        const picked = viewer.scene.pick(windowPosition);
        if (defined(picked)) {
            const id = defaultValue(picked.id, picked.primitive.id);
            if (id instanceof Entity) {
                return id;
            }
        }

    } catch(e) {
        //catch if terrain for this area not provided (e.g. no global terrain coverage)
        if((e as Error).message === 'normalized result is not a number' ){
            return undefined
        } else {
            throw e
        }
    }

    return undefined;
}

  /**
   * Returns the list of entities at the provided window coordinates.
   * The entities are sorted front to back by their visual order.
   *
   * source: https://cesium.com/learn/cesiumjs-learn/cesiumjs-creating-entities/#managing-entities
   *
   * @param  windowPosition The window coordinates.
   * @returns The picked entities or undefined.
   */
  function drillPickEntities(viewer: Viewer, windowPosition: Cartesian2): Entity[] | undefined {
      let picked, entity, i;
      const pickedPrimitives = viewer.scene.drillPick(windowPosition);
      const length = pickedPrimitives.length;
      const result: Entity[] = [];
      const hash = {};

      for (i = 0; i < length; i++) {
          picked = pickedPrimitives[i];
          entity = defaultValue(picked.id, picked.primitive.id);
          if (entity instanceof Entity && !defined(hash[entity.id])) {
              result.push(entity);
              hash[entity.id] = true;
          }
      }
      return result;
  }


/**
 * @param originLonLat in degrees
 * @param originElevation in meters
 * @param bearing in degrees, 0 is north (360)
 * @param distance in meters
 */
export function getPointFromOriginWithBearingAndDistance(originLonLatElevation: [number, number, number], bearing: number, distance: number){

    const origin = Cartesian3.fromDegrees(originLonLatElevation[0], originLonLatElevation[1], originLonLatElevation[2])

    const hpr = HeadingPitchRoll.fromDegrees(bearing, 0, 0)
    hpr.heading -= MathCesium.PI_OVER_TWO // fix cesium 0 = east

    const orientation = Transforms.headingPitchRollQuaternion(origin, hpr)
    const direction = Matrix3.multiplyByVector(Matrix3.fromQuaternion(orientation), Cartesian3.UNIT_X, new Cartesian3())
    const ray = new Ray(origin, direction)

    const destination = Ray.getPoint(ray, distance)

    const carto = Cartographic.fromCartesian(destination)
    const destinationWithCorrectedElevation = Cartesian3.fromRadians(carto.longitude, carto.latitude, originLonLatElevation[2])

    return destinationWithCorrectedElevation
}

/**
 *
 * @param alpha 0-1
 */
export function getColorForHex(hexString: string, alpha?: number){

    const match = hexString.match(/#([\dabcdefABCDEF]{2,2})([\dabcdefABCDEF]{2,2})([\dabcdefABCDEF]{2,2})/)

    if(!match){
        throw new Error('Invalid hex color string: ' + hexString)
    }

    return new Color(parseInt(match[1], 16)/255, parseInt(match[2], 16)/255, parseInt(match[3], 16)/255, alpha)
}

function defaultValue(a, b){
    return typeof a !== 'undefined' ? a : b
}

export function toCssRGBA(color: Color){
    return `rgba(${color.red * 255},${color.green * 255},${color.blue * 255},${color.alpha})`
}

export function getMapCenter(viewer: Viewer){
    return getMapTerrainLocationAt(viewer, 0.5, 0.5)
}

/**
 *
 * @param realtiveX 0-1 (0 = left, 1 = right)
 * @param relativeY 0-1 (0 = top, 1 = bottom)
 * @returns 0,0 if viewer is undefined or terrain not available
 */
export function getMapTerrainLocationAt(viewer: Viewer, relativeX: number, relativeY: number){
    const DEFAULT = {
        latitude: 0,
        longitude: 0
    }

    if(!viewer){
        return DEFAULT
    }

    let windowPosition = new Cartesian2(relativeX * viewer.container.clientWidth, relativeY * viewer.container.clientHeight);

    let pickRay = viewer.scene.camera.getPickRay(windowPosition)

    if(!pickRay){
        return DEFAULT
    }

    let pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene)

    if(!pickPosition){
        return DEFAULT
    }

    let pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition)

    return {
        latitude: radiansToDegrees(pickPositionCartographic.latitude),
        longitude: radiansToDegrees(pickPositionCartographic.longitude)
    }
}