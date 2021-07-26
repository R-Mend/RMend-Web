import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, roles, ...rest }) {
    console.log(localStorage.getItem("user"));
    return (
        <Route
            {...rest}
            render={(props) => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (!user || !user["token"]) {
                    console.log("COULD NOT FIND USER");
                    // not logged in so redirect to login page with the return url
                    return <Redirect to="/login" />;
                }

                // logged in so return component
                return <Component {...props} />;
            }}
        />
    );
}

export { PrivateRoute };
