/* eslint-disable react/prop-types */
import { useState } from "react"
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"

import { Header } from "../header/header"

import './style.css'

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setMessage('');

        let valid = true;
        let msg = '';

        if (!username || username === '') {
            valid = false;
            msg += 'Please insert a valid username.\r\n'
        }

        if (!password || password === '') {
            valid = false;
            msg += 'Please insert a valid password\r\n'
        }

        if (valid) {
            props.login(username, password);
        }
        else {
            props.setMessage(msg);
        }
    }

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Container fluid className="loginContainer">
                    <Row>
                        <Col>
                            <Row className="loginFormContainer">
                                <h2 className="login-text">Login</h2>
                                {props.message ? <Alert className="error" variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : false}
                                <Form.Group className="form">
                                    <Form.Control placeholder="Username" type='text' value={username} onChange={ev => setUsername(ev.target.value)} id="username" />
                                    <Form.Control className="mt-3" placeholder="Password" type='password' value={password} onChange={ev => setPassword(ev.target.value)} id="password" />
                                </Form.Group>
                                <Button variant='warning' type='submit' className='loginBtn' onClick={handleSubmit}>Login</Button>
                                <hr></hr>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export { Login }