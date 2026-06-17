import { userConstants } from "../constants";
import { userService } from "../services";
import type { AppThunk } from "../helpers";
import type { User } from "../types";
import { alertActions } from "./alert.actions";

function acceptUserRequest(userId: string): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return userService.acceptUserRequest(userId).then(
            (response) => {
                dispatch(success(response.message));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.ACCEPT_USER_REQUEST };
    }
    function success(message: string) {
        return { type: userConstants.ACCEPT_USER_SUCCESS, message };
    }
    function failure(error: string) {
        return { type: userConstants.ACCEPT_USER_SUCCESS, error };
    }
}

function getAuthorityUsers(): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return userService.getAuthorityUsers().then(
            (response) => {
                dispatch(success(response.users));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GET_AUTHORITY_USERS_REQUEST };
    }
    function success(users: User[]) {
        return { type: userConstants.GET_AUTHORITY_USERS_SUCCESS, users };
    }
    function failure(error: string) {
        return { type: userConstants.GET_AUTHORITY_USERS_FAILURE, error };
    }
}

function getAuthorityRequests(): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return userService.getAuthorityRequests().then(
            (response) => {
                dispatch(success(response.requests));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.GET_AUTHORITY_REQUESTS_REQUEST };
    }
    function success(requests: User[]) {
        return { type: userConstants.GET_AUTHORITY_REQUESTS_SUCCESS, requests };
    }
    function failure(error: string) {
        return { type: userConstants.GET_AUTHORITY_REQUESTS_FAILURE, error };
    }
}

function updateUsersAccessLevel(userId: string, accessLevel: string): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return userService.updateUsersAccessLevel(userId, accessLevel).then(
            (response) => {
                dispatch(success(response.user));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.UPDATE_USER_ACCESS_LEVEL_REQUEST };
    }
    function success(user: User) {
        return { type: userConstants.UPDATE_USER_ACCESS_LEVEL_SUCCESS, user };
    }
    function failure(error: string) {
        return { type: userConstants.UPDATE_USER_ACCESS_LEVEL_FAILURE, error };
    }
}

function removeUserFromAuthority(userId: string): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return userService.removeUserFromAuthority(userId).then(
            (response) => {
                dispatch(success(response.userId));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: userConstants.REMOVE_USER_REQUEST };
    }
    function success(userId: string) {
        return { type: userConstants.REMOVE_USER_SUCCESS, userId };
    }
    function failure(error: string) {
        return { type: userConstants.REMOVE_USER_FAILURE, error };
    }
}

export const userActions = {
    acceptUserRequest,
    getAuthorityUsers,
    getAuthorityRequests,
    updateUsersAccessLevel,
    removeUserFromAuthority,
};
