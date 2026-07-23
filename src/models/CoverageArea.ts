import { MultiPolygon } from "./geojson/Geometry"

export interface CoverageArea {
    id: number;
    organizationId: number;
    geom: MultiPolygon;
    priority: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CoverageAreaCategories {
    coverageAreaID: number;
    issueCategoryID: number;
}