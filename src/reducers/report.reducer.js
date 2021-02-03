import { reportConstants } from '../constants';

const initalState = {reports: [], isUpdated: false}

export function report(state=initalState, action) {
    switch(action.type) {
        case reportConstants.GET_REPORTS_REQUEST:
            return {
                ...state,
                isUpdated: false
            };
        case reportConstants.GET_REPORTS_SUCCESS:
            return {
                ...state,
                isUpdated: true,
                reports: action.reports
            };
        case reportConstants.GET_REPORTS_FAILURE:
            return {
                ...state,
                isUpdated: false
            };
        case reportConstants.GET_ADMIN_REPORTS_REQUEST:
            return {
                ...state,
                isUpdated: false
            };
        case reportConstants.GET_ADMIN_REPORTS_SUCCESS:
            return {
                ...state,
                isUpdated: true,
                reports: action.reports
            };
        case reportConstants.GET_ADMIN_REPORTS_FAILURE:
            return {
                ...state,
                isUpdated: false
            };
        case reportConstants.CREATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: [...state.reports, action.report]
            };
        case reportConstants.UPDATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.map(report => report.id == action.report.id ? action.report : report)
            };
        case reportConstants.DELETE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.filter((report) => report.id != action.reportId)
            }
        default:
            return state;
    }
}