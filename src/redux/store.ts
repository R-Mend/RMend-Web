import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/features";

/**
 * Creates a fresh Redux Toolkit store. Using a factory (rather than a shared
 * module-level store) gives each client its own isolated instance, which is the
 * recommended App Router pattern since client components are pre-rendered on the
 * server and a shared store would leak state across requests.
 *
 * `configureStore` wires up redux-thunk and the Redux DevTools automatically.
 */
export function makeStore() {
    return configureStore({ reducer: rootReducer });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
