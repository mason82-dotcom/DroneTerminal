
# Coordinate reference systems

WGS84 is the most commonly used system across maps, gps and applications.

It contains a coordinate center (mass center of earth), an ellipsoid that represents earth surface (egg shaped) and a geoid (due to differences in gravitational forces, some parts of the earth are actually thicker or thinner).

The current geoid used for WGS84 is the EGM96

The ellipsoid GRS80 is pretty much the same as the WGS84 ellipsoid.

## Altitude references

There is different ways to calculate altitude. Cesium and DJI is using "ellipsoidal height".

For human use (maps, etc.) usually the orthometric height (or geoid height or mean sea level or ASL or MSL) is used, which is the "ellipsoidal height" + "geoid height above the ellipsoid".

[https://images.prismic.io/cesium/2015-10-26-image05.jpg?auto=compress%2Cformat&w=945]

Source: https://cesium.com/blog/2015/10/26/cloudahoy-migration-to-cesium/


# Usage in this project

## Cesium

Cesium is using WGS84 and the ellipsoidal height

## DJI

In the flight logs and on the system it is using the ellipsoidal height,
in the remote controller (and on it's maps), it is using ASL (= orthometric height).

# Conversion

This project is using the lib https://visgl.github.io/math.gl/docs/modules/geoid/api-reference/geoid.

You can find the function in /src/util/geoid.ts
