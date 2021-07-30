import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { reportActions } from "../../actions/report.actions";
import ReportRow from "./ReportRow";

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
            <Tabs className="pt-5 d-flex flex-column flex-grow-1">
                <TabList>
                    <Tab>Reports</Tab>
                </TabList>

                <TabPanel className="d-flex flex-grow-1">
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
                                    <ReportRow report={report} key={report._id} />
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
