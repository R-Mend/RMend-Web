import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/reducers";

/**
 * Creates a fresh Redux Toolkit store. The store is instantiated on the client
 * (see `app/providers.tsx`) so that reducers reading from `localStorage` during
 * initialization run in the browser rather than during server rendering.
 *
 * `configureStore` wires up redux-thunk and the Redux DevTools automatically.
 */
export function makeStore() {
    return configureStore({ reducer: rootReducer });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
