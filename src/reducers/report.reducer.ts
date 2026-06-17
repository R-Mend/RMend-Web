import type { AnyAction } from "redux";
import { reportConstants } from "../constants";
import type { Report, ReportState } from "../types";

const initialState: ReportState = { reports: null };

export function report(state: ReportState = initialState, action: AnyAction): ReportState {
    switch (action.type) {
        case reportConstants.GET_REPORTS_REQUEST:
            return {
                ...state,
            };
        case reportConstants.GET_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.reports,
            };
        case reportConstants.GET_REPORTS_FAILURE:
            return {
                ...state,
                reports: [],
            };
        case reportConstants.GET_ADMIN_REPORTS_REQUEST:
            return {
                ...state,
                reports: null,
            };
        case reportConstants.GET_ADMIN_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.reports,
            };
        case reportConstants.GET_ADMIN_REPORTS_FAILURE:
            return {
                ...state,
                reports: [],
            };
        case reportConstants.CREATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: [...(state.reports ?? []), action.report],
            };
        case reportConstants.UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: (state.reports ?? []).map((report: Report) =>
                    report._id === action.report._id ? action.report : report
                ),
            };
        case reportConstants.DELETE_REPORT_SUCCESS:
            return {
                ...state,
                reports: (state.reports ?? []).filter((report: Report) => report._id !== action.reportId),
            };
        default:
            return state;
    }
}
