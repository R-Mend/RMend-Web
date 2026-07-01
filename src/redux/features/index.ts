import { combineReducers } from "@reduxjs/toolkit";
import alert from "./alert.slice";
import report from "./report.slice";
import user from "./user.slice";

const rootReducer = combineReducers({ alert, report, user });

export default rootReducer;
