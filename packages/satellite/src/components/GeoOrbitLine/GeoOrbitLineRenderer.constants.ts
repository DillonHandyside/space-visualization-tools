const EARTH_RAD = 6378.137; // earth radius in km
const GEO_ALTITUDE = EARTH_RAD + 35786; // geostationary orbit altitude in km

/** exact altitude/radius of geostationary orbit */
export const GEO_RADIUS = GEO_ALTITUDE / EARTH_RAD;

/** number of line segments that make up the geostationary orbit line */
export const SEGMENTS = 128;
