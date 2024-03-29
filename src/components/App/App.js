import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { alertActions } from "../../actions";
import { PrivateRoute } from "../PrivateRoute";
import { Navbar } from "../Navbar";
import LoginPage from "../LoginPage";
import ReportsPage from "../ReportsPage";
import UsersPage from "../UsersPage";

function App() {
    const alert = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            if (Object.keys(alert).length !== 0) dispatch(alertActions.clear());
        });
    });

    return (
        <div className="h-100 d-flex justify-content-center" style={{ paddingTop: "58px" }}>
            <Navbar />
            {alert.message && (
                <div style={{ position: "absolute" }}>
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                </div>
            )}
            <Switch>
                <Route exact path="/login" component={LoginPage} />
                <PrivateRoute exact path="/" component={ReportsPage} />
                <PrivateRoute exact path="/users" component={UsersPage} />
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export default App;
