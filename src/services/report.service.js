import { authHeader } from "../helpers";
const config = { apiUrl: process.env.REACT_APP_API_URL };

export const reportService = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
};

function getReports(location) {
    const requestOptions = {
        method: "GET",
        body: JSON.stringify(location),
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions).then(handleResponse);
}

function getAdminReports() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/reports/`, requestOptions).then(handleResponse);
}

function createReport(report) {
    const requestOptions = {
        method: "POST",
        body: JSON.stringify(report),
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions).then(handleResponse);
}

function updateReport(report) {
    const requestOptions = {
        method: "PUT",
        body: JSON.stringify(report),
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/reports/${report.id}`, requestOptions).then(handleResponse);
}

function deleteReport(reportId) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/reports/${reportId}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("NOT LOGGED IN");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
