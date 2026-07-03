import { MultiPolygon } from "./geojson/Geometry"

export interface Region {
    id: number,
    type: RegionType,
    name: string,
    geom: MultiPolygon
}

export type RegionType = 'state' | 'county' | 'municipality'