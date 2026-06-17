import { combineReducers } from "redux";
import { alert } from "./alert.reducer";
import { auth } from "./auth.reducer";
import { report } from "./report.reducer";
import { user } from "./user.reducer";

const rootReducer = combineReducers({ alert, auth, report, user });

export default rootReducer;
