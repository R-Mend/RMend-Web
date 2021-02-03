import { authHeader } from '../helpers';
const config = { apiUrl: process.env.REACT_APP_API_URL };

export const reportService = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport
}

function getReports(location) {
    const requestOptions = {
        method: 'GET',
        body: JSON.stringify(location)
    }

    return fetch(`${config.apiUrl}/reports/`, requestOptions).then(handleResponse)
}

function getAdminReports(authorityId) {
    const requestOptions = {
        method: 'GET',
        header: authHeader()
    }

    return fetch(`${config.apiUrl}/authority/${authorityId}/reports/`, requestOptions).then(handleResponse)
}

function createReport(report) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(report)
    }

    return fetch(`${config.apiUrl}/reports/create`, requestOptions).then(handleResponse)
}

function updateReport(authorityId, report) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(report),
        header: authHeader()
    }

    return fetch(`${config.apiUrl}/authority/${authorityId}/reports/${report.id}/update`, 
        requestOptions).then(handleResponse)
}

function deleteReport(authorityId, reportId) {
    const requestOptions = {
        method: 'DELETE',
        header: authHeader()
    }

    return fetch(`${config.apiUrl}/authority/${authorityId}/reports/${reportId}/delete`, 
        requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status == 401) {
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}