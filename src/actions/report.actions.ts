import { reportConstants } from "../constants";
import { reportService } from "../services";
import type { AppThunk } from "../helpers";
import type { Report } from "../types";
import { alertActions } from "./alert.actions";

interface LatLng {
    longitude: number;
    latitude: number;
}

function getReports(location: LatLng): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return reportService.getReports(location).then(
            (response) => {
                dispatch(success(response.reports));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: reportConstants.GET_REPORTS_REQUEST };
    }
    function success(reports: Report[]) {
        return { type: reportConstants.GET_REPORTS_SUCCESS, reports };
    }
    function failure(error: string) {
        return { type: reportConstants.GET_REPORTS_FAILURE, error };
    }
}

function getAdminReports(): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return reportService.getAdminReports().then(
            (response) => {
                dispatch(success(response.reports));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: reportConstants.GET_ADMIN_REPORTS_REQUEST };
    }
    function success(reports: Report[]) {
        return { type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports };
    }
    function failure(error: string) {
        return { type: reportConstants.GET_ADMIN_REPORTS_FAILURE, error };
    }
}

function createReport(report: Partial<Report>): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return reportService.createReport(report).then(
            (response) => {
                dispatch(success(response.report));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: reportConstants.CREATE_REPORT_REQUEST };
    }
    function success(report: Report) {
        return { type: reportConstants.CREATE_REPORT_SUCCESS, report };
    }
    function failure(error: string) {
        return { type: reportConstants.CREATE_REPORT_FAILURE, error };
    }
}

function updateReport(reportId: string, newReport: Partial<Report>): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return reportService.updateReport(reportId, newReport).then(
            (response) => {
                dispatch(success(response.report));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: reportConstants.UPDATE_REPORT_REQUEST };
    }
    function success(report: Report) {
        return { type: reportConstants.UPDATE_REPORT_SUCCESS, report };
    }
    function failure(error: string) {
        return { type: reportConstants.UPDATE_REPORT_FAILURE, error };
    }
}

function deleteReport(reportId: string): AppThunk<Promise<void>> {
    return (dispatch) => {
        dispatch(request());

        return reportService.deleteReport(reportId).then(
            (response) => {
                dispatch(success(response.reportId));
            },
            (error) => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request() {
        return { type: reportConstants.DELETE_REPORT_REQUEST };
    }
    function success(reportId: string) {
        return { type: reportConstants.DELETE_REPORT_SUCCESS, reportId };
    }
    function failure(error: string) {
        return { type: reportConstants.DELETE_REPORT_FAILURE, error };
    }
}

export const reportActions = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
};
