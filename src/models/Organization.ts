export interface Organization {
    id: number;
    name: string;
    regionID: string;
    contactEmail: string;
    status: OrganizationStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type OrganizationStatus = "onboarding" | "active" | "suspended";