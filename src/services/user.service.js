import { authHeader } from "../helpers";
const config = { apiUrl: process.env.REACT_APP_API_URL };

export const userService = {
    acceptUserRequest,
    getAuthorityUsers,
    getAuthorityRequests,
    updateUsersAccessLevel,
    removeUserFromAuthority,
};

function acceptUserRequest(userId) {
    const requestOptions = {
        method: "PUT",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/accept-request/${userId}`, requestOptions).then(handleResponse);
}

function getAuthorityUsers() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/users`, requestOptions).then(handleResponse);
}

function getAuthorityRequests() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/requests`, requestOptions).then(handleResponse);
}

function updateUsersAccessLevel(userId, accessLevel) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify({ access_level: accessLevel }),
        headers: { ...authHeader(), "Content-Type": "application/json" },
    };

    return fetch(`${config.apiUrl}/authority/users/${userId}`, requestOptions).then(handleResponse);
}

function removeUserFromAuthority(userId) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/users/${userId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
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
