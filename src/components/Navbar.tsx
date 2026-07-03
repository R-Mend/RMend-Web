"use client";

import { authClient } from "@/lib/auth/client"
import Link from "next/link";

export async function Navbar() {
    const { data: session } = await authClient.getSession();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-secondary">
            <Link href="/" className="navbar-brand">
                RMend
            </Link>

            {/* Replace with Neon Auth State Handling (updated redux state) */}
            {session?.user && (
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
        </nav>
    );
}
