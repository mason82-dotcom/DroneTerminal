import { lineString } from '@turf/turf'
import { Feature, LineString, Point } from 'geojson'
import * as pgp from 'pg-promise'

// see https://github.com/vitaly-t/pg-promise#custom-type-formatting
// ST functions used here: https://postgis.net/docs/reference.html#Geometry_Constructors

const DEFAULT_SRID = 4979 // WGS 84 but with ellipsoidal height (2d WGS48 is 4326)

export class ST_Geometry {

    rawType = true

    constructor() {

    }

    _getPsqlStringRepresentation(): string {
        throw new Error('not implemented')
    }

    toPostgres(self: ST_Geometry) {
        return pgp.as.format(`ST_SetSRID(${self._getPsqlStringRepresentation()}, $1)`, [DEFAULT_SRID])
    }

    static fromGeoJSON(geoJSON: Feature['geometry']) {
        if(geoJSON.type === 'Point'){
            return ST_Point.fromGeoJSON(geoJSON)
        } else if(geoJSON.type === 'LineString'){
            return ST_Line.fromGeoJSON(geoJSON)
        } else if(geoJSON.type === 'Polygon'){
            return ST_Line.fromGeoJSON(lineString(geoJSON.coordinates[0]).geometry)//we only use the exterior ring
        }

        throw new Error('unsupported geometry type:' + geoJSON.type)
    }
}

export class ST_Point extends ST_Geometry {

    longitude: number
    latitude: number
    elevation?: number

    constructor(longitude: number, latitude: number, elevation?: number) {
        super()

        this.longitude = longitude
        this.latitude = latitude
        this.elevation = elevation
    }

    _getPsqlStringRepresentation(): string {
        return typeof this.elevation === 'number' ?
            pgp.as.format('ST_MakePoint($1, $2, $3)', [this.longitude, this.latitude, this.elevation]) :
            pgp.as.format('ST_MakePoint($1, $2)', [this.longitude, this.latitude])
    }

    getCoordinates(): [number, number, number?]{
        return [this.longitude, this.latitude, this.elevation]
    }

    static fromGeoJSON(geoJSON: Point) {
        return new ST_Point(geoJSON.coordinates[0], geoJSON.coordinates[1], geoJSON.coordinates[2])
    }
}

export class ST_Line extends ST_Geometry {

    points: ST_Point[]

    constructor(stPoints: ST_Point[]) {
        super()
        this.points = stPoints
    }

    _getPsqlStringRepresentation(): string {
        return 'ST_MakeLine(ARRAY[' + this.points.map(p => p._getPsqlStringRepresentation()).join(', ') + '])'
    }

    getCoordinates(): [number, number, number?][]{
        return this.points.map(p => p.getCoordinates())
    }

    static fromGeoJSON(geoJSON: LineString) {
        return new ST_Line(geoJSON.coordinates.map(coord => new ST_Point(coord[0], coord[1], coord[2])))
    }
}



