import type { AnyAction } from "redux";
import { userConstants } from "../constants";
import type { User, UserState } from "../types";

const initialState: UserState = { users: null, requests: null };

export function user(state: UserState = initialState, action: AnyAction): UserState {
    switch (action.type) {
        case userConstants.GET_AUTHORITY_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };
        case userConstants.GET_AUTHORITY_USERS_FAILURE:
            return {
                ...state,
                users: [],
            };
        case userConstants.GET_AUTHORITY_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: action.requests,
            };
        case userConstants.GET_AUTHORITY_REQUESTS_FAILURE:
            return {
                ...state,
                requests: [],
            };
        case userConstants.ACCEPT_USER_SUCCESS:
            return {
                ...state,
                users: [...(state.users ?? []), action.user],
                requests: (state.requests ?? []).filter((request: User) => request._id !== action.userId),
            };
        case userConstants.UPDATE_USER_ACCESS_LEVEL_SUCCESS:
            return {
                ...state,
                users: (state.users ?? []).map((user: User) =>
                    user._id === action.user._id ? action.user : user
                ),
            };
        case userConstants.REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: (state.users ?? []).filter((user: User) => user._id !== action.userId),
            };
        default:
            return state;
    }
}
