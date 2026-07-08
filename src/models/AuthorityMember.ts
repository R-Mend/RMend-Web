export interface AuthorityMember {
    userID: number;
    authorityID: number;
    role: AuthorityMemberRole;
    status: AuthorityMemberStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type AuthorityMemberRole = 'admin' | 'member';

export type AuthorityMemberStatus = 'active' | 'suspended';