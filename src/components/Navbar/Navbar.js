import { useEffect } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../actions";

export function Navbar(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedIn = useSelector((state) => {
        return state.auth["loggedIn"];
    });

    useEffect(() => {
        if (!loggedIn) {
            history.push("/login");
        }
    });

    const logOut = () => {
        dispatch(authActions.logout());
    };

    return (
        <nav className="navbar fixed-top navbar-dark bg-secondary">
            <Link to="/" className="navbar-brand">
                RMend
            </Link>
            <ul className="nav navbar-right d-flex flex-row">
                {loggedIn && (
                    <button className="btn btn-sm btn-light" onClick={logOut}>
                        Logout
                    </button>
                )}
            </ul>
        </nav>
    );
}
