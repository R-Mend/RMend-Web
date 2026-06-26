"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { IAuthUser } from "@/models/IAuthUser";

/**
 * Client-side route guard replacing the old <PrivateRoute>. Redirects to
 * /login when there is no authenticated user in localStorage and otherwise
 * renders its children.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        const user: IAuthUser | null = stored ? JSON.parse(stored) : null;

        if (!user || !user.token) {
            // not logged in so redirect to login page
            router.replace("/login");
        } else {
            // localStorage is only available client-side, so this gate must run
            // in an effect; deriving it during render would mismatch SSR. This
            // whole guard is slated to be replaced by Neon Auth middleware.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return null;
    }

    return <>{children}</>;
}
