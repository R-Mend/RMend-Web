"use client";

import { reportActions } from "@/redux/features/report.slice";
import { useAppDispatch } from "@/redux/hooks";
import type { Report } from "@/models/Report";

export function ReportRow({ report }: { report: Report }) {
    const dispatch = useAppDispatch();

    const handleDeleteClick = () => {
        dispatch(reportActions.deleteReport(report.id));
    };

    return (
        <tr className="border-b border-line/60 transition-colors hover:bg-elevated" key={report.id}>
            <td className="px-4 py-3 whitespace-nowrap">{report.description}</td>
            <td className="px-4 py-3 whitespace-nowrap">{report.reporterContact}</td>
            <td className="px-4 py-3">
                <button
                    className="flex items-center text-muted transition-colors hover:text-brand"
                    onClick={handleDeleteClick}
                >
                    <span className="material-icons">delete</span>
                </button>
            </td>
        </tr>
    );
}
