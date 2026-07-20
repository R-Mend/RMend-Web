export interface MemberInvite {
    id: number;
    organizationId: number;
    userID: number;
    status: InviteRequestStatus;
    createdAt: Date;
    decidedAt: Date;
    sentBy: number;
}

export type InviteRequestStatus =  "pending" | "approved" | "rejected";