/** The authenticated user persisted in localStorage. Holds the JWT used for auth. */
export interface IAuthUser {
    _id?: string;
    username?: string;
    email?: string;
    token?: string;
    [key: string]: unknown;
}
