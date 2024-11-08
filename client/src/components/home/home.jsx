/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Alert, Container } from 'react-bootstrap';

import { Header } from "../header/header"

import './style.css';
import { LoggedInContext } from '../../contexts/LoggedInContext.mjs';

const Home = (props) => {
    const {isLoggedIn} = useContext(LoggedInContext);

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Container className="homeContainer">
                    <p className="explanatoryText">
                        {isLoggedIn === true ? (
                            "Click Start to start playing!\nThe game will be saved if you complete the game, and will be visible by visiting your profile."
                        ) : (
                            "Click Start to start playing!\nIf you want the game to be saved, login first!"
                        )}
                    </p>
                    <button onClick={props.startGame} className="startButton" style={{ marginTop: '20px' }}>
                        Start Game
                    </button>
                    {props.message ? <Alert className="error" variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : false}
                </Container>
            </div>
        </>
    );
};

export { Home };