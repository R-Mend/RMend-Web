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
        <div className="flex w-2/3 flex-col">
            <Tabs className="flex grow flex-col pt-8">
                <TabList>
                    <Tab>Reports</Tab>
                </TabList>

                <TabPanel className="grow">
                    <div className="grow overflow-y-scroll">
                        <table id="data" className="w-full border-collapse text-left text-sm">
                            <thead className="border-b border-line text-muted">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                    <th className="px-4 py-3 font-medium">Reporter Contact</th>
                                    <th className="px-4 py-3 font-medium">Delete</th>
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
