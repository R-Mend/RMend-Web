"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/app/(admin)/_redux/store";
import { Navbar } from "@/app/(admin)/_components/Navbar";
import { useAppSelector, useAppDispatch } from "@/app/(admin)/_redux/hooks";
import { alertActions } from "@/app/(admin)/_redux/features/alert.slice";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    // Create the store once, on the client, so reducers that read from
    // localStorage during initialization run in the browser. The lazy
    // useState initializer runs exactly once and is safe during render.
    const [store] = useState(makeStore);

    return (
        <Provider store={store}>
            <AppShell>{children}</AppShell>
        </Provider>
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
