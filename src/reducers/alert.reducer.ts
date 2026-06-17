import type { AnyAction } from "redux";
import { alertConstants } from "../constants";
import type { AlertState } from "../types";

export function alert(state: AlertState = {}, action: AnyAction): AlertState {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: "alert-success",
                message: action.message,
            };
        case alertConstants.ERROR:
            return {
                type: "alert-danger",
                message: action.message,
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
