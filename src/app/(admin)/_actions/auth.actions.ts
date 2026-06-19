import { authHeader } from "../../../helpers/auth-header";
import type { IAuthUser } from "@/models/IAuthUser";

const config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };

export function loginUser(email: string, password: string): Promise<IAuthUser> {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    };

    return fetch(`${config.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then((response) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(response.user));

            // Remove token from user
            delete response.user["token"];

            // Return users info
            return response.user as IAuthUser;
        });
}

export function logoutUser(): void {
    // remove user from local storage to log user out
    if (typeof window !== "undefined") {
        localStorage.removeItem("user");
    }
}

export function getUserById(id: string): Promise<unknown> {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

export function updateUser(user: IAuthUser): Promise<unknown> {
    const requestOptions: RequestInit = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(`${config.apiUrl}/users/${user._id}`, requestOptions).then(handleResponse);
}

function handleResponse(response: Response): Promise<any> {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 && typeof window !== "undefined" && localStorage.getItem("user") !== null) {
                // auto logout if 401 response returned from api and user is logged in
                logoutUser();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
