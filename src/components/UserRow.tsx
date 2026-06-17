"use client";

import { useState, type ChangeEvent } from "react";

import { useAppDispatch } from "@/redux/hooks";
import type { IUser } from "@/models/IUser";
import { userActions } from "@/redux/reducers/user.slice";

export function UserRow({ user }: { user: IUser }) {
    const dispatch = useAppDispatch();
    const [accessLevel, setAccessLevel] = useState(user.access_level);
    const [disabled, setDisabled] = useState(true);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setDisabled(user.access_level === event.target.value);
        setAccessLevel(event.target.value);
    };

    const handleDeleteClick = () => {
        dispatch(userActions.removeUserFromAuthority(user._id));
    };

    const handleSubmit = () => {
        dispatch(userActions.updateUsersAccessLevel({ userId: user._id, accessLevel }));
    };

    return (
        <tr className="table-row rounded-pill" key={user._id}>
            <td className="text-nowrap">{user._id}</td>
            <td className="text-nowrap">{user.username}</td>
            <td className="text-nowrap">{user.email}</td>
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
