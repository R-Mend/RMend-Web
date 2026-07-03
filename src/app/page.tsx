"use client";

import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReportRow } from "@/components/ReportRow";
import { reportActions } from "@/redux/features/report.slice";
import { Report } from "@/models/Report";

export default function ReportsPage() {
    // const dispatch = useAppDispatch();
    // const reports = useAppSelector((state) => state.report.reports || []);
    // const hasReports = useAppSelector((state) => state.report.reports !== null);

    // useEffect(() => {
    //     if (!hasReports) {
    //         dispatch(reportActions.getAdminReports());
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

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
                                    <th>Description</th>
                                    <th>Reporter Contact</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[].map((report: Report) => (
                                    <ReportRow report={report} key={report.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}
