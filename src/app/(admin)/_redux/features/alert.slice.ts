import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IAlertState {
    type?: string;
    message?: string;
}

const initialState: IAlertState = {};

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        success: (_state, action: PayloadAction<string>): IAlertState => ({
            type: "alert-success",
            message: action.payload,
        }),
        error: (_state, action: PayloadAction<string>): IAlertState => ({
            type: "alert-danger",
            message: action.payload,
        }),
        clear: (): IAlertState => ({}),
    },
});

export const alertActions = alertSlice.actions;
export default alertSlice.reducer;
