import { MultiPolygon } from "./geojson/Geometry"

export interface CoverageRule {
    id: number,
    authorityID: number,
    issueCategoryID: number,
    geom: MultiPolygon,
    priority: number,
    active: boolean,
    createdAt: Date,
    updatedAt: Date,
}