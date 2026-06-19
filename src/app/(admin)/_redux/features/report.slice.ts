import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentAdminsReports, getReportsByLocation, createReport, updateReport, deleteReport } from "@/app/(admin)/_actions/report.actions";
import type { IReport } from "@/models/IReport";
import { alertActions } from "./alert.slice";

export interface IReportState {
    reports: IReport[] | null;
}

interface ILatLng {
    longitude: number;
    latitude: number;
}

interface IUpdateReportArg {
    reportId: string;
    report: Partial<IReport>;
}

const initialState: IReportState = { reports: null };

export const reportsFetched = createAsyncThunk<IReport[], ILatLng>(
    "report/getReports",
    async (location, { dispatch, rejectWithValue }) => {
        try {
            const response = await getReportsByLocation(location);
            return response.reports;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const adminReportsFetched = createAsyncThunk<IReport[], void>(
    "report/getAdminReports",
    async (_arg, { dispatch, rejectWithValue }) => {
        try {
            const response = await getCurrentAdminsReports();
            return response.reports;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const reportCreated = createAsyncThunk<IReport, Partial<IReport>>(
    "report/createReport",
    async (report, { dispatch, rejectWithValue }) => {
        try {
            const response = await createReport(report);
            return response.report;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const reportUpdated = createAsyncThunk<IReport, IUpdateReportArg>(
    "report/updateReport",
    async ({ reportId, report }, { dispatch, rejectWithValue }) => {
        try {
            const response = await updateReport(reportId, report);
            return response.report;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const reportDeleted = createAsyncThunk<string, string>(
    "report/deleteReport",
    async (reportId, { dispatch, rejectWithValue }) => {
        try {
            const response = await deleteReport(reportId);
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
            .addCase(reportsFetched.fulfilled, (state, action) => {
                state.reports = action.payload;
            })
            .addCase(reportsFetched.rejected, (state) => {
                state.reports = [];
            })
            .addCase(adminReportsFetched.pending, (state) => {
                state.reports = null;
            })
            .addCase(adminReportsFetched.fulfilled, (state, action) => {
                state.reports = action.payload;
            })
            .addCase(adminReportsFetched.rejected, (state) => {
                state.reports = [];
            })
            .addCase(reportCreated.fulfilled, (state, action) => {
                state.reports = [...(state.reports ?? []), action.payload];
            })
            .addCase(reportUpdated.fulfilled, (state, action) => {
                state.reports = (state.reports ?? []).map((report) =>
                    report._id === action.payload._id ? action.payload : report
                );
            })
            .addCase(reportDeleted.fulfilled, (state, action) => {
                state.reports = (state.reports ?? []).filter((report) => report._id !== action.payload);
            });
    },
});

export default reportSlice.reducer;
