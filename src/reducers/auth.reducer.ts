import type { AnyAction } from "redux";
import { authConstants } from "../constants";
import type { AuthState, AuthUser } from "../types";

function initialAuthState(): AuthState {
    if (typeof window === "undefined") {
        return {};
    }

    const stored = localStorage.getItem("user");
    const user: AuthUser | null = stored ? JSON.parse(stored) : null;
    return user ? { loggedIn: true, user } : {};
}

export function auth(state: AuthState = initialAuthState(), action: AnyAction): AuthState {
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
