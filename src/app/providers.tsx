"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "../helpers/store";
import { AppShell } from "../components/AppShell";

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
