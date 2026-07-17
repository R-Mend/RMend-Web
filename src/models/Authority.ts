export interface Authority {
    id: number;
    name: string;
    regionID: string;
    contactEmail: string;
    status: AuthorityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type AuthorityStatus = "onboarding" | "active" | "suspended";