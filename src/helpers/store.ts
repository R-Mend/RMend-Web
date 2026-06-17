import { createStore, applyMiddleware, type AnyAction, type Middleware } from "redux";
import thunkMiddleware, { type ThunkAction, type ThunkDispatch } from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

/**
 * Creates a fresh Redux store. The store is instantiated on the client (see
 * `app/providers.tsx`) so that reducers reading from `localStorage` during
 * initialization run in the browser rather than during server rendering.
 */
export function makeStore() {
    const loggerMiddleware = createLogger();

    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware as Middleware, loggerMiddleware as Middleware)
    );
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

/** Return type for thunk action creators. */
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
