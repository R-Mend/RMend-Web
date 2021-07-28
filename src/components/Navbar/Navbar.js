import { useEffect } from "react";
import { Route, Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../actions";

export function Navbar(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();

    const loggedIn = useSelector((state) => {
        return state.auth["loggedIn"];
    });

    useEffect(() => {
        if (!loggedIn && location.pathname != "/login") {
            history.push("/login");
        }
    });

    const logout = () => {
        dispatch(authActions.logout());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-secondary">
            <Link to="/" className="navbar-brand">
                RMend
            </Link>

            {loggedIn && (
                <ul className="navbar-nav mr-auto mt-2">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link">
                            Reports <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/users" className="nav-link">
                            Users
                        </Link>
                    </li>
                </ul>
            )}
            {loggedIn && (
                <button className="btn btn-sm btn-light" onClick={logout}>
                    Logout
                </button>
            )}
        </nav>
    );
}
