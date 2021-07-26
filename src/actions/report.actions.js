import { reportConstants } from "../constants";
import { reportService } from "../services";
import { alertActions } from "./alert.actions.js";

export const reportActions = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
};

function getReports(location) {
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
    function success(reports) {
        return { type: reportConstants.GET_REPORTS_SUCCESS, reports };
    }
    function failure(error) {
        return { type: reportConstants.GET_REPORTS_FAILURE, error };
    }
}

function getAdminReports() {
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
    function success(reports) {
        return { type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports };
    }
    function failure(error) {
        return { type: reportConstants.GET_ADMIN_REPORTS_FAILURE, error };
    }
}

function createReport(report) {
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
    function success(report) {
        return { type: reportConstants.CREATE_REPORT_SUCCESS, report };
    }
    function failure(error) {
        return { type: reportConstants.CREATE_REPORT_FAILURE, error };
    }
}

function updateReport(newReport) {
    return (dispatch) => {
        dispatch(request());

        return reportService.updateReport(newReport).then(
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
    function success(report) {
        return { type: reportConstants.UPDATE_REPORT_SUCCESS, report };
    }
    function failure(error) {
        return { type: reportConstants.UPDATE_REPORT_FAILURE, error };
    }
}

function deleteReport(reportId) {
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
    function success(reportId) {
        return { type: reportConstants.DELETE_REPORT_SUCCESS, reportId };
    }
    function failure(error) {
        return { type: reportConstants.DELETE_REPORT_FAILURE, error };
    }
}
