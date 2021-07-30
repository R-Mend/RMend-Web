import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-tabs/style/react-tabs.css";

import { reportActions } from "../../actions";

function ReportRow({ report }) {
    const dispatch = useDispatch();

    const handlePriorityClick = () => {
        dispatch(reportActions.updateReport(report._id, { priority: !report.priority }));
    };

    const handleInReviewClick = () => {
        dispatch(reportActions.updateReport(report._id, { in_review: !report.in_review }));
    };

    const handleDeleteClick = () => {
        dispatch(reportActions.deleteReport(report._id));
    };

    return (
        <tr className="table-row rounded-pill" key={report._id}>
            <td className="text-nowrap text-center">
                <button
                    className={report.priority ? "icon-button text-success" : "icon-button"}
                    title="deactivate user"
                    style={{ cursor: "pointer" }}
                    onClick={handlePriorityClick}
                >
                    {report.priority && <span className="material-icons">radio_button_checked</span>}
                    {!report.priority && <span className="material-icons">radio_button_unchecked</span>}
                </button>
            </td>
            <td className="text-nowrap">{report["title"]}</td>
            <td className="text-nowrap">{report["details"]}</td>
            <td className="text-nowrap">{report["author"]}</td>
            <td className="text-nowrap text-center">
                <button
                    className={report.in_review ? "icon-button text-warning" : "icon-button"}
                    title="deactivate user"
                    style={{ cursor: "pointer" }}
                    onClick={handleInReviewClick}
                >
                    {report.in_review && <span className="material-icons">radio_button_checked</span>}
                    {!report.in_review && <span className="material-icons">radio_button_unchecked</span>}
                </button>
            </td>
            <td>
                <button className="icon-button delete-user" onClick={handleDeleteClick}>
                    <span className="material-icons">delete</span>
                </button>
            </td>
        </tr>
    );
}

export default ReportRow;
