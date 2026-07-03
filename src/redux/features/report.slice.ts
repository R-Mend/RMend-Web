import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reportService } from "@/services/report.service";
import type { Report } from "@/models/Report";
import { alertActions } from "./alert.slice";

export interface ReportState {
    reports: Report[] | null;
}

interface ILatLng {
    longitude: number;
    latitude: number;
}

interface IUpdateReportArg {
    reportId: number;
    report: Partial<Report>;
}

const initialState: ReportState = { reports: null };

export const getReports = createAsyncThunk<Report[], ILatLng>(
    "report/getReports",
    async (location, { dispatch, rejectWithValue }) => {
        try {
            const response = await reportService.getReports(location);
            return response.reports;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const getAdminReports = createAsyncThunk<Report[], void>(
    "report/getAdminReports",
    async (_arg, { dispatch, rejectWithValue }) => {
        try {
            const response = await reportService.getAdminReports();
            return response.reports;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const createReport = createAsyncThunk<Report, Partial<Report>>(
    "report/createReport",
    async (report, { dispatch, rejectWithValue }) => {
        try {
            const response = await reportService.createReport(report);
            return response.report;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const updateReport = createAsyncThunk<Report, IUpdateReportArg>(
    "report/updateReport",
    async ({ reportId, report }, { dispatch, rejectWithValue }) => {
        try {
            const response = await reportService.updateReport(reportId, report);
            return response.report;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const deleteReport = createAsyncThunk<string, number>(
    "report/deleteReport",
    async (reportId, { dispatch, rejectWithValue }) => {
        try {
            const response = await reportService.deleteReport(reportId);
            return response.reportId;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReports.fulfilled, (state, action) => {
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state) => {
                state.reports = [];
            })
            .addCase(getAdminReports.pending, (state) => {
                state.reports = null;
            })
            .addCase(getAdminReports.fulfilled, (state, action) => {
                state.reports = action.payload;
            })
            .addCase(getAdminReports.rejected, (state) => {
                state.reports = [];
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.reports = [...(state.reports ?? []), action.payload];
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.reports = (state.reports ?? []).map((report) =>
                    report.id === action.payload.id ? action.payload : report
                );
            })
            .addCase(deleteReport.fulfilled, (state, action) => {
                state.reports = (state.reports ?? []).filter((report) => String(report.id) !== action.payload);
            });
    },
});

export const reportActions = {
    getReports,
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
};
export default reportSlice.reducer;
