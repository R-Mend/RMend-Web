import { authHeader } from "../helpers";
const config = { apiUrl: process.env.REACT_APP_API_URL };

export const authService = {
    login,
    logout,
    getById,
    update,
};

function login(email, password) {
    const requestOptions = {
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
            return response.user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401 && localStorage.getItem("user") !== null) {
                // auto logout if 401 response returned from api and user is logged in
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
