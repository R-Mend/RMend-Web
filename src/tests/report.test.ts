import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import type { AnyAction } from "redux";
import fetchMock from "fetch-mock";

import { reportConstants } from "../constants";
import { reportActions } from "../actions";
import { report } from "../reducers/report.reducer";
import type { AppDispatch, RootState } from "../helpers/store";
import type { Report } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mockStore = configureMockStore<RootState, AppDispatch>([thunk]);

const sampleReport = (overrides: Partial<Report> = {}): Report => ({
    _id: "1",
    title: "Pothole",
    details: "Big pothole on Main St",
    author: "Jane",
    priority: false,
    in_review: false,
    ...overrides,
});

// Action creator tests ------------------------------------------------------

describe("reportActions", () => {
    afterEach(() => fetchMock.restore());

    it("dispatches GET_ADMIN_REPORTS_SUCCESS when getAdminReports resolves", async () => {
        const reports = [sampleReport()];
        fetchMock.get(`${apiUrl}/authority/reports/`, {
            body: { reports },
            headers: { "content-type": "application/json" },
        });

        const store = mockStore({} as RootState);
        await store.dispatch(reportActions.getAdminReports());

        expect(store.getActions()).toEqual([
            { type: reportConstants.GET_ADMIN_REPORTS_REQUEST },
            { type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports },
        ]);
    });

    it("dispatches DELETE_REPORT_SUCCESS when deleteReport resolves", async () => {
        fetchMock.delete(`${apiUrl}/authority/reports/1`, {
            body: { reportId: "1" },
            headers: { "content-type": "application/json" },
        });

        const store = mockStore({} as RootState);
        await store.dispatch(reportActions.deleteReport("1"));

        expect(store.getActions()).toEqual([
            { type: reportConstants.DELETE_REPORT_REQUEST },
            { type: reportConstants.DELETE_REPORT_SUCCESS, reportId: "1" },
        ]);
    });
});

// Reducer tests -------------------------------------------------------------

describe("report reducer", () => {
    it("returns the initial state by default", () => {
        expect(report(undefined, {} as AnyAction)).toEqual({ reports: null });
    });

    it("stores reports on GET_ADMIN_REPORTS_SUCCESS", () => {
        const reports = [sampleReport()];
        expect(
            report({ reports: null }, { type: reportConstants.GET_ADMIN_REPORTS_SUCCESS, reports })
        ).toEqual({ reports });
    });

    it("adds a report on CREATE_REPORT_SUCCESS", () => {
        const existing = sampleReport({ _id: "1" });
        const created = sampleReport({ _id: "2" });
        expect(
            report({ reports: [existing] }, { type: reportConstants.CREATE_REPORT_SUCCESS, report: created })
        ).toEqual({ reports: [existing, created] });
    });

    it("updates a report on UPDATE_REPORT_SUCCESS", () => {
        const original = sampleReport({ _id: "1", priority: false });
        const updated = sampleReport({ _id: "1", priority: true });
        expect(
            report({ reports: [original] }, { type: reportConstants.UPDATE_REPORT_SUCCESS, report: updated })
        ).toEqual({ reports: [updated] });
    });

    it("removes a report on DELETE_REPORT_SUCCESS", () => {
        const remaining = sampleReport({ _id: "2" });
        expect(
            report(
                { reports: [sampleReport({ _id: "1" }), remaining] },
                { type: reportConstants.DELETE_REPORT_SUCCESS, reportId: "1" }
            )
        ).toEqual({ reports: [remaining] });
    });
});
