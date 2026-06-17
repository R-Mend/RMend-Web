import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";
import type { IAuthUser } from "@/models/IAuthUser";
import { alertActions } from "./alert.slice";

export interface IAuthState {
    loggingIn?: boolean;
    loggedIn?: boolean;
    user?: IAuthUser;
}

function initialAuthState(): IAuthState {
    if (typeof window === "undefined") {
        return {};
    }

    const stored = localStorage.getItem("user");
    const user: IAuthUser | null = stored ? JSON.parse(stored) : null;
    return user ? { loggedIn: true, user } : {};
}

export const login = createAsyncThunk<IAuthUser, { email: string; password: string }>(
    "auth/login",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            return await authService.login(email, password);
        } catch (error) {
            const message = String(error);
            dispatch(alertActions.error(message));
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
    await authService.logout();
});

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loggingIn = true;
            })
            .addCase(login.fulfilled, (_state, action): IAuthState => ({
                loggedIn: true,
                user: action.payload,
            }))
            .addCase(login.rejected, (): IAuthState => ({ loggedIn: false }))
            .addCase(logout.fulfilled, (): IAuthState => ({ loggedIn: false }));
    },
});

export const authActions = { login, logout };
export default authSlice.reducer;
