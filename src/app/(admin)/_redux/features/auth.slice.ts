import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "@/app/(admin)/_actions/auth.actions";
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

export const userLoggedIn = createAsyncThunk<IAuthUser, { email: string; password: string }>(
    "auth/login",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            return await loginUser(email, password);
        } catch (error) {
            const message = String(error);
            dispatch(alertActions.error(message));
            return rejectWithValue(message);
        }
    }
);

export const userLoggedOut = createAsyncThunk<void, void>("auth/logout", async () => {
    await logoutUser();
});

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLoggedIn.pending, (state) => {
                state.loggingIn = true;
            })
            .addCase(userLoggedIn.fulfilled, (_state, action): IAuthState => ({
                loggedIn: true,
                user: action.payload,
            }))
            .addCase(userLoggedIn.rejected, (): IAuthState => ({ loggedIn: false }))
            .addCase(userLoggedOut.fulfilled, (): IAuthState => ({ loggedIn: false }));
    },
});

export default authSlice.reducer;
