import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import { Header } from '../header/header';

import { getHistory, logOut, getHistoricalScore } from '../../API.mjs';
import { LoggedInContext } from '../../contexts/LoggedInContext.mjs';
import './style.css';
import { UnauthenticatedError } from '../../errors/user_errors.mjs';
import { InternalServerError } from '../../errors/server_errors.mjs';


const Profile = () => {
    const navigate = useNavigate();

    const {setLoggedIn, setUsername} = useContext(LoggedInContext);
    const [gamesHistory, setGamesHistory] = useState([]);
    const [score, setScore] = useState(0);
    // console.log(gamesHistory[0].meme1);

    useEffect(() => {
        getHistory()
            .then((history) => {
                setGamesHistory(history);
            })
            .catch((err) => {
                if (err instanceof UnauthenticatedError) {
                    console.log('Unauthenticated Error');
                } else 
                if (err instanceof InternalServerError) {
                    console.log('Internal Server Error');
                } else {
                    console.log('Unexpected Error');
                }
            });
    }, []);

    useEffect(() => {
        getHistoricalScore()
            .then((score) => {
                setScore(score);
            })
            .catch((err) => {
                if (err instanceof UnauthenticatedError) {
                    console.log('Unauthenticated Error');
                } else 
                if (err instanceof InternalServerError) {
                    console.log('Internal Server Error');
                } else {
                    console.log('Unexpected Error');
                }
            });
    }, []);

    const logOutAndRedirect = () => {
        logOut().then(() => {
            setLoggedIn(false);
            setUsername('');
            navigate('/home');
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {
            console.log("Unexpected Erorr while logging-out")
            navigate('/home');
          })
    };

    return (
        <>
            <Header />
            <div>
                <div className="games-history-box">
                    <Col>
                        <p className="total-score">Cumulative Score: {score}</p>
                    </Col>
                    {gamesHistory.map((game, index) => (
                        <Container key={index} className="game-history-item">
                            <Row>
                                <Col xs={12}>
                                    <p className="game-number">Game #{index + 1}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="meme-item">
                                    <img className="meme-image" src={game.meme1} alt="Meme 1" />
                                    <p className="score">Score: {game.score1}</p>
                                </Col>
                                <Col className="meme-item">
                                    <img className="meme-image" src={game.meme2} alt="Meme 2" />
                                    <p className="score">Score: {game.score2}</p>
                                </Col>
                                <Col className="meme-item">
                                    <img className="meme-image" src={game.meme3} alt="Meme 3" />
                                    <p className="score">Score: {game.score3}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="total-score">Total Score: {game.total_score}</p>
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </div>
                <button className="logout-button" onClick={logOutAndRedirect}>Logout</button>
            </div>
        </>
    );
};

export { Profile };