export interface JoinRequest {
    id: number;
    authorityID: number;
    userID: number;
    status: JoinRequestStatus;
    createdAt: Date;
    decidedAt: Date;
    decidedBy: number;
}

export type JoinRequestStatus =  "pending" | "approved" | "rejected";