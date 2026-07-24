"use client";

import { useState, type ChangeEvent } from "react";

import { useAppDispatch } from "@/redux/hooks";
import type { User } from "@/models/User";
import { userActions } from "@/redux/features/user.slice";

export function UserRow({ user }: { user: User }) {
    const dispatch = useAppDispatch();
    // const [accessLevel, setAccessLevel] = useState(user.access_level);
    // const [disabled, setDisabled] = useState(true);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // setDisabled(user.access_level === event.target.value);
        // setAccessLevel(event.target.value);
    };

    const handleDeleteClick = () => {
        console.log("Not Implemented");
    };

    const handleSubmit = () => {
        // dispatch(userActions.updateUsersAccessLevel({ userId: user._id, accessLevel }));
    };

    return (
        <tr className="border-b border-line/60 transition-colors hover:bg-elevated" key={user.id}>
            <td className="px-4 py-3 whitespace-nowrap">{user.id}</td>
            <td className="px-4 py-3 whitespace-nowrap">{user.firstName}</td>
            <td className="px-4 py-3 whitespace-nowrap">{user.email}</td>
            {/* <td className="px-4 py-3 whitespace-nowrap">
                <select
                    className="rounded-md border border-line bg-surface px-2 py-1 text-sm text-fg"
                    aria-label="select access level"
                    onChange={handleSelectChange}
                    value={accessLevel}
                >
                    <option value="user">User</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
            </td> */}
            {/* <td className="px-4 py-3">
                <button
                    className="flex items-center text-muted transition-colors hover:text-brand disabled:opacity-40"
                    disabled={disabled}
                    onClick={handleSubmit}
                >
                    <span className="material-icons">save</span>
                </button>
            </td> */}
            <td className="px-4 py-3">
                <button
                    className="flex items-center text-muted transition-colors hover:text-brand"
                    onClick={handleDeleteClick}
                >
                    <span className="material-icons">delete</span>
                </button>
            </td>
        </tr>
    );
}
