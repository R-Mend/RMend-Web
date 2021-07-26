import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { authActions } from "../../actions";

function LoginPage() {
    const [{ email, password }, setInputs] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useSelector((state) => state.auth.loggingIn);
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user["token"]) {
            history.push("/");
        }
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            // get return url from location state or default to home page
            dispatch(authActions.login(email, password, "/"));
        }
    }

    return (
        <div
            className="content d-flex flex-column justify-content-center align-items-center"
            style={{ height: 600, paddingTop: 10 }}
        >
            <div className="card bg-primary" style={{ width: "18rem" }}>
                <h2>Login</h2>
                <form method="POST" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            autoFocus={true}
                            className={"form-control" + (submitted && !email ? " is-invalid" : "")}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={"form-control" + (submitted && !password ? " is-invalid" : "")}
                        />
                        {submitted && !password && <div className="invalid-feedback">Password is required</div>}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary mb-2">
                            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
