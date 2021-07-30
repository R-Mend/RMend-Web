import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { userActions } from "../../actions";

function UserRow({ user }) {
    const dispatch = useDispatch();
    const [accessLevel, setAccessLevel] = useState(user["access_level"]);
    const [disabled, setDisabled] = useState(true);

    const handleSelectChange = (event) => {
        setDisabled(user["access_level"] == event.target.value);
        setAccessLevel(event.target.value);
    };

    const handleDeleteClick = (event) => {
        dispatch(userActions.removeUserFromAuthority(user["_id"]));
    };

    const handleSubmit = (event) => {
        console.log("HADLING");
        dispatch(userActions.updateUsersAccessLevel(user["_id"], accessLevel));
    };

    return (
        <tr className="table-row rounded-pill" key={user._id}>
            <td className="text-nowrap">{user["_id"]}</td>
            <td className="text-nowrap">{user["username"]}</td>
            <td className="text-nowrap">{user["email"]}</td>
            <td className="text-nowrap">
                <select
                    className="form-select"
                    aria-label="select access level"
                    onChange={handleSelectChange}
                    value={accessLevel}
                >
                    <option value="user">User</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </td>
            <td>
                <button className="icon-button delete-user" disabled={disabled} onClick={handleSubmit}>
                    <span className="material-icons">save</span>
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

export default UserRow;
