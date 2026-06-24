"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/app/(admin)/_redux/hooks";
import { userLoggedOut } from "@/app/(admin)/_redux/features/auth.slice";

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const loggedIn = useAppSelector((state) => state.auth.loggedIn);

    // `loggedIn` is derived from localStorage, which is unavailable during SSR.
    // Wait until after mount before rendering auth-dependent UI so the first
    // client render matches the server HTML and hydration succeeds.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);
    const showAuthNav = mounted && loggedIn;

    useEffect(() => {
        if (!loggedIn && pathname !== "/login") {
            router.push("/login");
        }
    }, [loggedIn, pathname, router]);

    const logout = () => {
        dispatch(userLoggedOut());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-secondary">
            <Link href="/" className="navbar-brand">
                RMend
            </Link>

            {showAuthNav && (
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
            {showAuthNav && (
                <button className="btn btn-sm btn-light" onClick={logout}>
                    Logout
                </button>
            )}
        </nav>
    );
}
