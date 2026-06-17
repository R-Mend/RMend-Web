"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/redux/store";
import { Navbar } from "@/components/Navbar";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { alertActions } from "@/redux/reducers/alert.slice";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    // Create the store once, on the client, so reducers that read from
    // localStorage during initialization run in the browser.
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
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
