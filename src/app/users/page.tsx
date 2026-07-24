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
        <div className="flex w-2/3 flex-col">
            <Tabs className="flex grow flex-col pt-8">
                <TabList>
                    <Tab>Users</Tab>
                    <Tab>Requests</Tab>
                </TabList>

                <TabPanel className="grow">
                    <div className="grow overflow-y-scroll">
                        <table id="data" className="w-full border-collapse text-left text-sm">
                            <thead className="border-b border-line text-muted">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Id</th>
                                    <th className="px-4 py-3 font-medium">Username</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium whitespace-nowrap">Access Level</th>
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
                <TabPanel className="grow">
                    <div className="grow overflow-y-scroll">
                        <table id="data" className="w-full border-collapse text-left text-sm">
                            <thead className="border-b border-line text-muted">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Id</th>
                                    <th className="px-4 py-3 font-medium">Username</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {[].map((user: User) => (
                                    <tr className="border-b border-line/60 transition-colors hover:bg-elevated" key={user.id}>
                                        <td className="px-4 py-3 whitespace-nowrap">{user.id}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{user.firstName}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <button className="rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover">
                                                Accept
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
