export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}

export type UserStatus = 'active' | 'disabled';
