import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./alert.actions.js";

export const userActions = {
    acceptUserRequest,
    getAuthorityUsers,
    getAuthorityRequests,
    updateUsersAccessLevel,
    removeUserFromAuthority,
};

function acceptUserRequest(userId) {
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
    function success(message) {
        return { type: userConstants.ACCEPT_USER_SUCCESS, message };
    }
    function failure(error) {
        return { type: userConstants.ACCEPT_USER_SUCCESS, error };
    }
}

function getAuthorityUsers() {
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
    function success(users) {
        return { type: userConstants.GET_AUTHORITY_USERS_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.GET_AUTHORITY_USERS_FAILURE, error };
    }
}

function getAuthorityRequests() {
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
        return { type: userConstants.GET_AUTHORITY_USERS_REQUEST };
    }
    function success(users) {
        return { type: userConstants.GET_AUTHORITY_USERS_SUCCESS, users };
    }
    function failure(error) {
        return { type: userConstants.GET_AUTHORITY_USERS_FAILURE, error };
    }
}

function updateUsersAccessLevel(userId, accessLevel) {
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
    function success(user) {
        return { type: userConstants.UPDATE_USER_ACCESS_LEVEL_SUCCESS, user };
    }
    function failure(error) {
        return { type: userConstants.UPDATE_USER_ACCESS_LEVEL_FAILURE, error };
    }
}

function removeUserFromAuthority(userId) {
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
    function success(userId) {
        return { type: userConstants.REMOVE_USER_SUCCESS, userId };
    }
    function failure(error) {
        return { type: userConstants.REMOVE_USER_FAILURE, error };
    }
}
