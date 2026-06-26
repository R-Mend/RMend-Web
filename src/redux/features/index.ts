import { combineReducers } from "@reduxjs/toolkit";
import alert from "./alert.slice";
import auth from "./auth.slice";
import report from "./report.slice";
import user from "./user.slice";

const rootReducer = combineReducers({ alert, auth, report, user });

export default rootReducer;
