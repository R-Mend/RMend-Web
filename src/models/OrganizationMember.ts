export interface OrganizationMember {
    userID: number;
    organizationId: number;
    role: OrganizationMemberRole;
    status: OrganizationMemberStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type OrganizationMemberRole = 'admin' | 'member';

export type OrganizationMemberStatus = 'active' | 'suspended';