import { authHeader } from "../helpers/auth-header";
import type { IReport } from "@/models/IReport";

const config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };

interface LatLng {
    longitude: number;
    latitude: number;
}

function getReports(location: LatLng): Promise<any> {
    const requestOptions: RequestInit = {
        method: "GET",
        body: JSON.stringify(location),
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions).then(handleResponse);
}

function getAdminReports(): Promise<any> {
    const requestOptions: RequestInit = {
        method: "GET",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/reports/`, requestOptions).then(handleResponse);
}

function createReport(report: Partial<IReport>): Promise<any> {
    const requestOptions: RequestInit = {
        method: "POST",
        body: JSON.stringify(report),
        headers: { ...authHeader(), "Content-Type": "application/json" },
    };

    return fetch(`${config.apiUrl}/reports`, requestOptions).then(handleResponse);
}

function updateReport(reportId: string, report: Partial<IReport>): Promise<any> {
    const requestOptions: RequestInit = {
        method: "PUT",
        body: JSON.stringify(report),
        headers: { ...authHeader(), "Content-Type": "application/json" },
    };

    return fetch(`${config.apiUrl}/authority/reports/${reportId}`, requestOptions).then(handleResponse);
}

function deleteReport(reportId: string): Promise<any> {
    const requestOptions: RequestInit = {
        method: "DELETE",
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/authority/reports/${reportId}`, requestOptions).then(handleResponse);
}

function handleResponse(response: Response): Promise<any> {
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

export const reportService = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
};
