// Shared domain models and Redux state types for the RMend web console.

export interface Report {
    _id: string;
    title: string;
    details: string;
    author: string;
    priority: boolean;
    in_review: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    access_level: string;
}

/** The authenticated user persisted in localStorage. Holds the JWT used for auth. */
export interface AuthUser {
    _id?: string;
    username?: string;
    email?: string;
    token?: string;
    [key: string]: unknown;
}

export interface AlertState {
    type?: string;
    message?: string;
}

export interface AuthState {
    loggingIn?: boolean;
    loggedIn?: boolean;
    user?: AuthUser;
}

export interface ReportState {
    reports: Report[] | null;
}

export interface UserState {
    users: User[] | null;
    requests: User[] | null;
}
