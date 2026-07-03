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
        <tr className="table-row rounded-pill" key={report.id}>
            <td className="text-nowrap">{report.description}</td>
            <td className="text-nowrap">{report.reporterContact}</td>
            <td>
                <button className="icon-button delete-user" onClick={handleDeleteClick}>
                    <span className="material-icons">delete</span>
                </button>
            </td>
        </tr>
    );
}
