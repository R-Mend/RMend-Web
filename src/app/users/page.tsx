"use client";

import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { UserRow } from "@/components/UserRow";
import { userActions } from "@/redux/features/user.slice";
import { User } from "@/models/User";

export default function UsersPage() {
    // const dispatch = useAppDispatch();
    // const users = useAppSelector((state) => state.user.users || []);
    // const hasUsers = useAppSelector((state) => state.user.users !== null);
    // const requests = useAppSelector((state) => state.user.requests || []);
    // const hasRequests = useAppSelector((state) => state.user.requests !== null);

    // useEffect(() => {
    //     if (!hasUsers) {
    //         dispatch(userActions.getAuthorityUsers());
    //     }
    //     if (!hasRequests) {
    //         dispatch(userActions.getAuthorityRequests());
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <div className="col-8 d-flex flex-column">
            <Tabs className="pt-5">
                <TabList>
                    <Tab>Users</Tab>
                    <Tab>Requests</Tab>
                </TabList>

                <TabPanel>
                    <div className="table-responsive flex-grow-1" style={{ overflowY: "scroll" }}>
                        <table id="data" className="table table-borderless">
                            <thead className="bg-primary border-bottom">
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th className="text-nowrap">Access Level</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[].map((user: User) => (
                                    <UserRow user={user} key={user.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="table-responsive flex-grow-1" style={{ overflowY: "scroll" }}>
                        <table id="data" className="table table-borderless">
                            <thead className="bg-primary border-bottom">
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[].map((user: User) => (
                                    <tr className="table-row rounded-pill" key={user.id}>
                                        <td className="text-nowrap">{user.id}</td>
                                        <td className="text-nowrap">{user.firstName}</td>
                                        <td className="text-nowrap">{user.email}</td>
                                        <td>
                                            <button className="btn btn-sm btn-light">Accept</button>
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
