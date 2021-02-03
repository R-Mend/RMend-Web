import { reportConstants } from '../constants';
import { reportService } from '../services'

export const reportActions = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport
}

function getReports(location) {
    return dispatch => {
        dispatch(request());

        return reportService.getReports(location).then(
            reports => {
                dispatch(success(reports));
            },
            error => {
                dispatch(failure(error));
            }
        );
    }

    function request() {return {type: reportConstants.GET_REPORTS_REQUEST}}
    function success(reports) {return {type: reportConstants.GET_REPORTS_SUCCESS, reports}}
    function failure(error) {return {type: reportConstants.GET_REPORTS_FAILURE, error}}
}

function getAdminReports(authorityId) {
    return dispatch => {
        dispatch(request());

        return reportService.getAdminReports(authorityId).then(
            reports => {
                dispatch(success(reports));
            },
            error => {
                dispatch(failure(error));
            }
        );
    }

    function request() {return {type: reportConstants.GET_ADMIN_REPORTS_REQUEST}}
    function success(reports) {return {type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports}}
    function failure(error) {return {type: reportConstants.GET_ADMIN_REPORTS_FAILURE, error}}
}

function createReport(report) {
    return dispatch => {
        dispatch(request());

        return reportService.createReport(report).then(
            report => {
                dispatch(success(report));
            },
            error => {
                dispatch(failure(error));
            }
        );
    }

    function request() {return {type: reportConstants.CREATE_REPORT_REQUEST}}
    function success(report) {return {type: reportConstants.CREATE_REPORT_SUCCESS, report}}
    function failure(error) {return {type: reportConstants.CREATE_REPORT_FAILURE, error}}
}

function updateReport(authorityId, newReport) {
    return dispatch => {
        dispatch(request());

        return reportService.updateReport(authorityId, newReport).then(
            report => {
                dispatch(success(report));
            },
            error => {
                dispatch(failure(error));
            }
        );
    }

    function request() {return {type: reportConstants.UPDATE_REPORT_REQUEST}}
    function success(report) {return {type: reportConstants.UPDATE_REPORT_SUCCESS, report}}
    function failure(error) {return {type: reportConstants.UPDATE_REPORT_FAILURE, error}}
}

function deleteReport(authorityId, reportId) {
    return dispatch => {
        dispatch(request());

        return reportService.deleteReport(authorityId, reportId).then(
            reportId => {
                dispatch(success(reportId));
            },
            error => {
                dispatch(failure(error));
            }
        );
    }

    function request() {return {type: reportConstants.DELETE_REPORT_REQUEST}}
    function success(reportId) {return {type: reportConstants.DELETE_REPORT_SUCCESS, reportId}}
    function failure(error) {return {type: reportConstants.DELETE_REPORT_FAILURE, error}}
}