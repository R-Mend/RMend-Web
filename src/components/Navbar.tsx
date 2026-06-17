"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { authActions } from "../actions";
import { useAppDispatch, useAppSelector } from "../helpers";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const loggedIn = useAppSelector((state) => state.auth.loggedIn);

    useEffect(() => {
        if (!loggedIn && pathname !== "/login") {
            router.push("/login");
        }
    }, [loggedIn, pathname, router]);

    const logout = () => {
        dispatch(authActions.logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-secondary">
            <Link href="/" className="navbar-brand">
                RMend
            </Link>

            {loggedIn && (
                <ul className="navbar-nav mr-auto mt-2">
                    <li className="nav-item active">
                        <Link href="/" className="nav-link">
                            Reports <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/users" className="nav-link">
                            Users
                        </Link>
                    </li>
                </ul>
            )}
            {loggedIn && (
                <button className="btn btn-sm btn-light" onClick={logout}>
                    Logout
                </button>
            )}
        </nav>
    );
}
