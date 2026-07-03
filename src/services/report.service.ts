import type { Report } from "@/models/Report";

const config = { apiUrl: process.env.NEXT_PUBLIC_API_URL };

interface LatLng {
    longitude: number;
    latitude: number;
}

function getReports(location: LatLng): Promise<any> {
    return Promise.resolve([]);
}

function getAdminReports(): Promise<any> {
    return Promise.resolve([]);
}

function createReport(report: Partial<Report>): Promise<any> {
    return Promise.resolve();
}

function updateReport(reportId: number, report: Partial<Report>): Promise<any> {
    return Promise.resolve();
}

function deleteReport(reportId: number): Promise<any> {
    return Promise.resolve();
}

async function handleResponse(response: Response): Promise<any> {
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
