import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "fetch-mock";

import report, {
    getAdminReports,
    createReport,
    updateReport,
    deleteReport,
    ReportState,
} from "@/redux/features/report.slice";
import type { Report } from "@/models/Report";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const sampleReport = (overrides: Partial<Report> = {}): Report => ({
    id: 1,
    geom: { type: "Point", coordinates: [0, 0] } as any,
    issueCategory: 1,
    authorityID: 1,
    status: "assigned",
    description: "Big pothole on Main St",
    reporterContact: "example@email.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
});

const makeTestStore = (preloaded?: ReportState) =>
    configureStore({
        reducer: { report },
        preloadedState: preloaded ? { report: preloaded } : undefined,
    });

// Thunk integration tests (real store + mocked fetch) -----------------------

describe("report slice thunks", () => {
    afterEach(() => fetchMock.restore());

    it("getAdminReports stores the returned reports", async () => {
        const reports = [sampleReport()];
        fetchMock.get(`${apiUrl}/authority/reports/`, {
            body: { reports },
            headers: { "content-type": "application/json" },
        });

        const store = makeTestStore();
        await store.dispatch(getAdminReports());

        expect(store.getState().report.reports).toEqual(reports);
    });

    it("deleteReport removes the matching report", async () => {
        fetchMock.delete(`${apiUrl}/authority/reports/1`, {
            body: { reportId: "1" },
            headers: { "content-type": "application/json" },
        });

        const store = makeTestStore({ reports: [sampleReport({ id: 1 }), sampleReport({ id: 2 })] });
        await store.dispatch(deleteReport(1));

        expect(store.getState().report.reports).toEqual([sampleReport({ id: 2 })]);
    });
});

// Reducer tests (drive the slice with generated fulfilled actions) ----------

describe("report reducer", () => {
    it("returns the initial state by default", () => {
        expect(report(undefined, { type: "@@INIT" })).toEqual({ reports: null });
    });

    it("stores reports on getAdminReports.fulfilled", () => {
        const reports = [sampleReport()];
        expect(report({ reports: null }, getAdminReports.fulfilled(reports, "requestId", undefined))).toEqual({
            reports,
        });
    });

    it("adds a report on createReport.fulfilled", () => {
        const existing = sampleReport({ id: 1 });
        const created = sampleReport({ id: 2 });
        expect(
            report({ reports: [existing] }, createReport.fulfilled(created, "requestId", {}))
        ).toEqual({ reports: [existing, created] });
    });

    it("updates a report on updateReport.fulfilled", () => {
        const original = sampleReport({ id: 1, description: "hello" });
        const updated = sampleReport({ id: 1, description: "goodbye" });
        expect(
            report(
                { reports: [original] },
                updateReport.fulfilled(updated, "requestId", { reportId: 1, report: {} })
            )
        ).toEqual({ reports: [updated] });
    });

    it("removes a report on deleteReport.fulfilled", () => {
        const remaining = sampleReport({ id: 2 });
        expect(
            report({ reports: [sampleReport({ id: 1 }), remaining] }, deleteReport.fulfilled("1", "requestId", 1))
        ).toEqual({ reports: [remaining] });
    });
});
