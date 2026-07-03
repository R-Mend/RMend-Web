/**
 * A single position: [longitude, latitude] with an optional elevation.
 * See RFC 7946 §3.1.1.
 */
export type Position = [number, number] | [number, number, number];

/**
 * A linear ring is a closed LineString with 4 or more positions where the
 * first and last positions are equivalent. Used to describe polygon rings.
 */
export type LinearRing = Position[];

/**
 * A Point is a single position.
 * See RFC 7946 §3.1.2.
 */
export interface Point {
    type: "Point";
    coordinates: Position;
}

/**
 * A Polygon is an array of linear rings. The first ring is the exterior ring;
 * any subsequent rings are interior rings (holes).
 * See RFC 7946 §3.1.6.
 */
export interface Polygon {
    type: "Polygon";
    coordinates: LinearRing[];
}

/**
 * A MultiPolygon is an array of Polygon coordinate arrays.
 * See RFC 7946 §3.1.7.
 */
export interface MultiPolygon {
    type: "MultiPolygon";
    coordinates: LinearRing[][];
}

/**
 * The subset of GeoJSON geometry objects used across the app.
 * Extend this union as additional geometry types are needed.
 */
export type Geometry = Point | Polygon | MultiPolygon;
