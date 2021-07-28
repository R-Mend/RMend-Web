import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { userActions } from "../../actions";

function UsersPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    var users = useSelector((state) => state.user.users || []);
    var hasUsers = useSelector((state) => state.user.users !== null);
    var requests = useSelector((state) => state.user.requests || []);
    var hasRequests = useSelector((state) => state.user.requests !== null);

    useEffect(() => {
        if (!hasUsers) {
            dispatch(userActions.getAuthorityUsers());
        }
        if (!hasRequests) {
            dispatch(userActions.getAuthorityRequests);
        }
    }, []);

    const getUsers = () => {
        dispatch(userActions.getAuthorityUsers());
    };

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
                                    <tr className="table-row rounded-pill" key={user._id}>
                                        <td className="text-nowrap">{user["_id"]}</td>
                                        <td className="text-nowrap">{user["username"]}</td>
                                        <td className="text-nowrap">{user["email"]}</td>
                                        <td className="text-nowrap">{user["access_level"]}</td>
                                        <td>
                                            <button className="icon-button delete-user disabled">
                                                <span className="material-icons">save</span>
                                            </button>
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
                                {users.map((user) => (
                                    <tr className="table-row rounded-pill" key={user._id}>
                                        <td className="text-nowrap">{user["_id"]}</td>
                                        <td className="text-nowrap">{user["username"]}</td>
                                        <td className="text-nowrap">{user["email"]}</td>
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

export default UsersPage;
