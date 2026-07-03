import type { Geometry } from "./Geometry";

/**
 * A Feature's properties: any JSON object, or null.
 * See RFC 7946 §3.2 and the `@types/geojson` package.
 */
export type GeoJsonProperties = { [name: string]: any } | null;

/**
 * A Feature ties a geometry to a set of properties.
 * See RFC 7946 §3.2.
 *
 * @typeParam G - the geometry type carried by this feature.
 * @typeParam P - the shape of the feature's properties.
 */
export interface Feature<
    G extends Geometry = Geometry,
    P = GeoJsonProperties
> {
    type: "Feature";
    geometry: G;
    properties: P;
    /** Optional identifier for the feature (string or number). */
    id?: string | number;
}
