import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "@/app/(admin)/_actions/user.actions";
import type { IUser } from "@/models/IUser";
import { alertActions } from "./alert.slice";

export interface IUserState {
    users: IUser[] | null;
    requests: IUser[] | null;
}

interface IUpdateAccessLevelArg {
    userId: string;
    accessLevel: string;
}

const initialState: IUserState = { users: null, requests: null };

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

export const getAuthorityUsers = createAsyncThunk<IUser[], void>(
    "user/getAuthorityUsers",
    async (_arg, { dispatch, rejectWithValue }) => {
        try {
            const response = await userService.getAuthorityUsers();
            return response.users;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const getAuthorityRequests = createAsyncThunk<IUser[], void>(
    "user/getAuthorityRequests",
    async (_arg, { dispatch, rejectWithValue }) => {
        try {
            const response = await userService.getAuthorityRequests();
            return response.requests;
        } catch (error) {
            dispatch(alertActions.error(String(error)));
            return rejectWithValue(String(error));
        }
    }
);

export const updateUsersAccessLevel = createAsyncThunk<IUser, IUpdateAccessLevelArg>(
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

export const removeUserFromAuthority = createAsyncThunk<string, string>(
    "user/removeUserFromAuthority",
    async (userId, { dispatch, rejectWithValue }) => {
        try {
            const response = await userService.removeUserFromAuthority(userId);
            return response.userId;
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
            .addCase(getAuthorityUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(getAuthorityUsers.rejected, (state) => {
                state.users = [];
            })
            .addCase(getAuthorityRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })
            .addCase(getAuthorityRequests.rejected, (state) => {
                state.requests = [];
            })
            .addCase(updateUsersAccessLevel.fulfilled, (state, action) => {
                state.users = (state.users ?? []).map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );
            })
            .addCase(removeUserFromAuthority.fulfilled, (state, action) => {
                state.users = (state.users ?? []).filter((user) => user._id !== action.payload);
            });
    },
});

export const userActions = {
    acceptUserRequest,
    getAuthorityUsers,
    getAuthorityRequests,
    updateUsersAccessLevel,
    removeUserFromAuthority,
};
export default userSlice.reducer;
