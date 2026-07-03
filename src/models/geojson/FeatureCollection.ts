import type { Feature, GeoJsonProperties } from "./Feature";
import type { Geometry } from "./Geometry";

/**
 * A FeatureCollection is a set of Features.
 * See RFC 7946 §3.3.
 *
 * @typeParam G - the geometry type carried by the collection's features.
 * @typeParam P - the shape of each feature's properties.
 */
export interface FeatureCollection<
    G extends Geometry = Geometry,
    P = GeoJsonProperties
> {
    type: "FeatureCollection";
    features: Feature<G, P>[];
}
