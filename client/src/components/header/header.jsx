import { useContext } from "react";
import { Col, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { appname } from "../../helper.mjs";
import './style.css';
import { LoggedInContext } from "../../contexts/LoggedInContext.mjs";

function Header() {
    const {isLoggedIn, username} = useContext(LoggedInContext);

    return (
        <Navbar bg="warning">
            <Col>
                <Link to='/home' className="brand">{appname}</Link>
            </Col>
            <Col style={{ textAlign: "right" }} className="login-profile-col">
                <i className="bi bi-person-circle" style={{ marginRight: '10px' }}></i>
                {isLoggedIn === true ? (
                    <Link to="/profile" className="brand"> {username}</Link>
                ) : (
                    <Link to="/login" className="brand">Login</Link>
                )}
            </Col>
        </Navbar>
    );
}

export { Header };