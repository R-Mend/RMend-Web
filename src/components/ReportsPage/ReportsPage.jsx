import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { reportActions } from "../../actions/report.actions";

function ReportsPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    var reports = useSelector((state) => state.report.reports || []);
    var hasReports = useSelector((state) => state.report.reports !== null);

    useEffect(() => {
        if (!hasReports) {
            dispatch(reportActions.getAdminReports());
        }
    }, []);

    const getReports = () => {
        dispatch(reportActions.getAdminReports());
    };

    return (
        <div className="col-8 d-flex flex-column">
            <Tabs className="pt-5">
                <TabList>
                    <Tab>Reports</Tab>
                </TabList>

                <TabPanel>
                    <div className="table-responsive flex-grow-1" style={{ overflowY: "scroll" }}>
                        <table id="data" className="table table-borderless">
                            <thead className="bg-primary border-bottom">
                                <tr>
                                    <th>Priority</th>
                                    <th>Title</th>
                                    <th>Detials</th>
                                    <th>Author</th>
                                    <th className="text-nowrap">In Review</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr className="table-row rounded-pill" key={report._id}>
                                        <td className="text-nowrap text-center">
                                            {report.priority && (
                                                <button
                                                    className="icon-button text-success"
                                                    title="deactivate user"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="material-icons">radio_button_checked</span>
                                                </button>
                                            )}
                                            {!report.priority && (
                                                <button
                                                    className="icon-button"
                                                    title="activate user"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="material-icons">radio_button_unchecked</span>
                                                </button>
                                            )}
                                        </td>
                                        <td className="text-nowrap">{report["title"]}</td>
                                        <td className="text-nowrap">{report["details"]}</td>
                                        <td className="text-nowrap">{report["author"]}</td>
                                        <td className="text-nowrap text-center">
                                            {report.in_review && (
                                                <button
                                                    className="icon-button text-warning"
                                                    title="deactivate user"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="material-icons">radio_button_checked</span>
                                                </button>
                                            )}
                                            {!report.in_review && (
                                                <button
                                                    className="icon-button"
                                                    title="activate user"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="material-icons">radio_button_unchecked</span>
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button className="icon-button delete-user">
                                                <span className="material-icons">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default ReportsPage;
