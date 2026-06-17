import { authConstants } from "../constants";
import { authService } from "../services";
import type { AppThunk } from "../helpers";
import type { AuthUser } from "../types";
import { alertActions } from "./alert.actions";

function login(email: string, password: string): AppThunk {
    return (dispatch) => {
        dispatch(request({ email }));

        authService.login(email, password).then(
            (user) => {
                dispatch(success(user));
            },
            (error) => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
        );
    };

    function request(user: { email: string }) {
        return { type: authConstants.LOGIN_REQUEST, user };
    }
    function success(user: AuthUser) {
        return { type: authConstants.LOGIN_SUCCESS, user };
    }
    function failure(error: string) {
        return { type: authConstants.LOGIN_FAILURE, error };
    }
}

function logout(): AppThunk<Promise<void>> {
    return async (dispatch) => {
        await authService.logout();
        dispatch(request());
    };

    function request() {
        return { type: authConstants.LOGOUT };
    }
}

export const authActions = {
    login,
    logout,
};
