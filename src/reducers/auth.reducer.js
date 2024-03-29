import { authConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function auth(state = initialState, action) {
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user,
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user,
            };
        case authConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
            };
        case authConstants.LOGOUT:
            return {
                loggedIn: false,
            };
        default:
            return state;
    }
}
