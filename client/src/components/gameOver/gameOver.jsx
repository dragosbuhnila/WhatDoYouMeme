import { useLocation } from 'react-router-dom';
import { useContext, useState } from "react";
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

import { Header } from '../header/header';
import { saveGame } from '../../API.mjs';
import { LoggedInContext } from '../../contexts/LoggedInContext.mjs';
import { BodyFormatError, InternalServerError } from '../../errors/server_errors.mjs';
import { UnauthenticatedError } from '../../errors/user_errors.mjs';
import './style.css';
import CompleteGame from '../../models/complete_game.mjs';

const GameOver = () => {
    const location = useLocation();
    const { total_score, memes, captions } = location.state;

    const {isLoggedIn} = useContext(LoggedInContext);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const [isSaving, setIsSaving] = useState(false);

    const handleSaveGame = () => {
        if (isLoggedIn === true && !isSaving) {
            setIsSaving(true); 
            const completeGame = new CompleteGame ({
                meme1: memes[0],
                meme2: memes[1],
                meme3: memes[2],
                score1: captions[0].valid ? 5 : 0,
                score2: captions[1].valid ? 5 : 0,
                score3: captions[2].valid ? 5 : 0,
                total_score: total_score,
            });

            saveGame(completeGame).then(() => {
                setMessage('Game saved successfully!');
                setVariant('success');
            }).catch(error => {
                if (error instanceof BodyFormatError) {
                    setMessage('Body format error');
                } else if (error instanceof UnauthenticatedError) {
                    setMessage('Unauthenticated. Please log in.');
                } else if (error instanceof InternalServerError) {
                    setMessage('Internal server error. Please try again later.');
                } else {
                    setMessage('Unexpected error.');
                }
                setVariant('danger');
                setIsSaving(false); // Re-enable the save button only on error
            });
        }
    };

    return (
        <>
            <Header />
            {message && <Alert variant={variant} onClose={() => setMessage('')} dismissible>{message}</Alert>}
            <div className="recap-box" style={{ height: '89vh' }}>
                <Container>
                    <Row>
                        {memes.map((meme, index) => (
                            <Col key={index} className="meme-item" style={{ 
                                border: '3px solid', 
                                borderColor: captions[index].valid ? 'green' : 'red' 
                            }}>
                                <Row>
                                    <img className="meme-image" src={meme} alt={`Meme ${index + 1}`} />
                                </Row>
                                <Row>
                                    <p className="caption-result">{captions[index].caption_text}</p>
                                </Row>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <p className="total-score">Total Score: {total_score}</p>
                        </Col>
                    </Row>
                    { isLoggedIn ? 
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button onClick={handleSaveGame} disabled={isSaving}>Save Game</Button>
                            </Col>
                        </Row>
                        :
                        null}
                </Container>
            </div>
        </>
    );
};

export { GameOver };