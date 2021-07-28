import { combineReducers } from "redux";
import { alert } from "./alert.reducer.js";
import { auth } from "./auth.reducer.js";
import { report } from "./report.reducer.js";
import { user } from "./user.reducer.js";
export default combineReducers({ alert, auth, report, user });
