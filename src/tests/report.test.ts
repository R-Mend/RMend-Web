import { configureStore } from "@reduxjs/toolkit";
import fetchMock from "fetch-mock";

import report, {
    adminReportsFetched,
    reportCreated,
    reportUpdated,
    reportDeleted,
    IReportState,
} from "@/app/(admin)/_redux/features/report.slice";
import type { IReport } from "@/models/IReport";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const sampleReport = (overrides: Partial<IReport> = {}): IReport => ({
    _id: "1",
    title: "Pothole",
    details: "Big pothole on Main St",
    author: "Jane",
    priority: false,
    in_review: false,
    ...overrides,
});

const makeTestStore = (preloaded?: IReportState) =>
    configureStore({
        reducer: { report },
        preloadedState: preloaded ? { report: preloaded } : undefined,
    });

// Thunk integration tests (real store + mocked fetch) -----------------------

describe("report slice thunks", () => {
    afterEach(() => fetchMock.restore());

    it("adminReportsFetched stores the returned reports", async () => {
        const reports = [sampleReport()];
        fetchMock.get(`${apiUrl}/authority/reports/`, {
            body: { reports },
            headers: { "content-type": "application/json" },
        });

        const store = makeTestStore();
        await store.dispatch(adminReportsFetched());

        expect(store.getState().report.reports).toEqual(reports);
    });

    it("reportDeleted removes the matching report", async () => {
        fetchMock.delete(`${apiUrl}/authority/reports/1`, {
            body: { reportId: "1" },
            headers: { "content-type": "application/json" },
        });

        const store = makeTestStore({ reports: [sampleReport({ _id: "1" }), sampleReport({ _id: "2" })] });
        await store.dispatch(reportDeleted("1"));

        expect(store.getState().report.reports).toEqual([sampleReport({ _id: "2" })]);
    });
});

// Reducer tests (drive the slice with generated fulfilled actions) ----------

describe("report reducer", () => {
    it("returns the initial state by default", () => {
        expect(report(undefined, { type: "@@INIT" })).toEqual({ reports: null });
    });

    it("stores reports on adminReportsFetched.fulfilled", () => {
        const reports = [sampleReport()];
        expect(report({ reports: null }, adminReportsFetched.fulfilled(reports, "requestId", undefined))).toEqual({
            reports,
        });
    });

    it("adds a report on reportCreated.fulfilled", () => {
        const existing = sampleReport({ _id: "1" });
        const created = sampleReport({ _id: "2" });
        expect(
            report({ reports: [existing] }, reportCreated.fulfilled(created, "requestId", {}))
        ).toEqual({ reports: [existing, created] });
    });

    it("updates a report on reportUpdated.fulfilled", () => {
        const original = sampleReport({ _id: "1", priority: false });
        const updated = sampleReport({ _id: "1", priority: true });
        expect(
            report(
                { reports: [original] },
                reportUpdated.fulfilled(updated, "requestId", { reportId: "1", report: {} })
            )
        ).toEqual({ reports: [updated] });
    });

    it("removes a report on reportDeleted.fulfilled", () => {
        const remaining = sampleReport({ _id: "2" });
        expect(
            report({ reports: [sampleReport({ _id: "1" }), remaining] }, reportDeleted.fulfilled("1", "requestId", "1"))
        ).toEqual({ reports: [remaining] });
    });
});
