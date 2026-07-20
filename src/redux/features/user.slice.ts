import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/services/user.service";
import type { User } from "@/models/User";
import { alertActions } from "./alert.slice";

export interface UserState {
    users: User[] | null;
    requests: User[] | null;
}

interface IUpdateAccessLevelArg {
    userId: string;
    accessLevel: string;
}

const initialState: UserState = { users: null, requests: null };

export const acceptUserRequest = createAsyncThunk<string, string>(
    "user/acceptUserRequest",
    async (userId, { dispatch, rejectWithValue }) => {
        try {
            const response = await userService.acceptUserRequest(userId);
            return response.message;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const updateUsersAccessLevel = createAsyncThunk<User, IUpdateAccessLevelArg>(
    "user/updateUsersAccessLevel",
    async ({ userId, accessLevel }, { dispatch, rejectWithValue }) => {
        try {
            const response = await userService.updateUsersAccessLevel(userId, accessLevel);
            return response.user;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUsersAccessLevel.fulfilled, (state, action) => {
                state.users = (state.users ?? []).map((user) =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
    },
});

export const userActions = {
    acceptUserRequest,
    updateUsersAccessLevel,
};
export default userSlice.reducer;
