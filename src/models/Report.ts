import { Point } from "./geojson/Geometry";

export interface Report {
    id: number;
    geom: Point;
    issueCategory: number;
    authorityID: number;
    status: ReportStatus;
    reporterContact: string; // TODO: consider updating to userID
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ReportStatus = "new" | "triage" | "assigned" | "in_progress" | "resolved";
