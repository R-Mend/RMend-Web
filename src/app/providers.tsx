"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";
import { makeStore } from "@/redux/store";
import { Navbar } from "@/components/Navbar";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { alertActions } from "@/redux/features/alert.slice";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    // Create one store per client via a lazy useState initializer, so each
    // browser session gets its own isolated instance. The initializer runs
    // exactly once and is safe during render.
    const [store] = useState(makeStore);

    return (
        <NeonAuthUIProvider authClient={authClient}>
            <Provider store={store}>
                <AppShell>{children}</AppShell>
            </Provider>
        </NeonAuthUIProvider>
    );
}

// Rendered inside <Provider> so the Redux hooks have a store in context.
function AppShell({ children }: { children: React.ReactNode }) {
    const alert = useAppSelector((state) => state.alert);
    const dispatch = useAppDispatch();
    const pathname = usePathname();

    useEffect(() => {
        // clear alert on location change
        if (Object.keys(alert).length !== 0) {
            dispatch(alertActions.clear());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <div className="h-100 d-flex justify-content-center" style={{ paddingTop: "58px" }}>
            <Navbar />
            {alert.message && (
                <div style={{ position: "absolute" }}>
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                </div>
            )}
            {children}
        </div>
    );
}
