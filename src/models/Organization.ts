export interface Organization {
    id: string;
    name: string;
    status: OrganizationStatus;
    createdAt: string;
}

export type OrganizationStatus = "onboarding" | "active" | "suspended";