import { authConstants } from "../constants";
import { authService } from "../services";
import { history } from "../helpers";
import { alertActions } from "./alert.actions.js";

export const authActions = {
    login,
    logout,
};

function login(email, password, from) {
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

    function request(user) {
        return { type: authConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
        return { type: authConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
        return { type: authConstants.LOGIN_FAILURE, error };
    }
}

function logout() {
    return async (dispatch) => {
        await authService.logout();
        dispatch(request());
    };

    function request() {
        return { type: authConstants.LOGOUT };
    }
}
