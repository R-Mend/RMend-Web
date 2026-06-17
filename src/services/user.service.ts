import { authHeader } from "../helpers";

const config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };

function acceptUserRequest(userId: string): Promise<any> {
    const requestOptions: RequestInit = {
        method: "PUT",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/accept-request/${userId}`, requestOptions).then(handleResponse);
}

function getAuthorityUsers(): Promise<any> {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/users`, requestOptions).then(handleResponse);
}

function getAuthorityRequests(): Promise<any> {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/requests`, requestOptions).then(handleResponse);
}

function updateUsersAccessLevel(userId: string, accessLevel: string): Promise<any> {
    const requestOptions: RequestInit = {
        method: "PUT",
        body: JSON.stringify({ access_level: accessLevel }),
        headers: { ...authHeader(), "Content-Type": "application/json" },
    };

    return fetch(`${config.apiUrl}/authority/users/${userId}`, requestOptions).then(handleResponse);
}

function removeUserFromAuthority(userId: string): Promise<any> {
    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/users/${userId}`, requestOptions).then(handleResponse);
}

function handleResponse(response: Response): Promise<any> {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("NOT LOGGED IN");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const userService = {
    acceptUserRequest,
    getAuthorityUsers,
    getAuthorityRequests,
    updateUsersAccessLevel,
    removeUserFromAuthority,
};
