"use client";

import { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { userActions } from "../actions";
import { useAppDispatch, useAppSelector } from "../helpers";
import { UserRow } from "./UserRow";

export function UsersPage() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user.users || []);
    const hasUsers = useAppSelector((state) => state.user.users !== null);
    const requests = useAppSelector((state) => state.user.requests || []);
    const hasRequests = useAppSelector((state) => state.user.requests !== null);

    useEffect(() => {
        if (!hasUsers) {
            dispatch(userActions.getAuthorityUsers());
        }
        if (!hasRequests) {
            dispatch(userActions.getAuthorityRequests());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                                {users.map((user) => (
                                    <UserRow user={user} key={user._id} />
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
                                {requests.map((user) => (
                                    <tr className="table-row rounded-pill" key={user._id}>
                                        <td className="text-nowrap">{user._id}</td>
                                        <td className="text-nowrap">{user.username}</td>
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
