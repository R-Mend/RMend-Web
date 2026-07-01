"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { IAuthUser } from "@/models/IAuthUser";
import { authActions } from "@/redux/features/auth.slice";

export default function Login() {
    const [{ email, password }, setInputs] = useState({
        email: "",
        password: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const loggingIn = useAppSelector((state) => state.auth.loggingIn);
    const loggedIn = useAppSelector((state) => state.auth.loggedIn);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        const user: IAuthUser | null = stored ? JSON.parse(stored) : null;
        if (user && user.token) {
            router.push("/");
        }
    }, [loggedIn, router]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            dispatch(authActions.login({ email, password }));
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
