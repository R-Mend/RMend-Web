"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { alertActions } from "../actions";
import { useAppDispatch, useAppSelector } from "../helpers";
import { Navbar } from "./Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
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
