/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { Header } from "../header/header_gohome";
import './style.css';

const ROUND_LENGTH = 30;
const NEXT_ROUND_LENGTH = 5;

function Play(props) {
    const navigate = useNavigate();

    /* ==== States and onClicks ==== */
    const [timer, setTimer] = useState(ROUND_LENGTH); 
    const [roundFinished, setRoundFinished] = useState(false);

    const [nextRoundTimer, setNextRoundTimer] = useState(NEXT_ROUND_LENGTH);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);

    const [selectedCaptionIndex, setSelectedCaptionIndex] = useState(null);
    const [captionCorrect, setCaptionCorrect] = useState(false);

    const chooseCaption = (index) => {
        const isCorrect = props.game.captions[round][index].valid === true;
        setSelectedCaptionIndex(index);
        setCaptionCorrect(isCorrect);
        if (isCorrect) {
            setScore((prevScore) => prevScore + 5);
        }
        props.addToCaptionChoices(round, index);
        setTimer(0);
    };

    /* ==== useEffects ==== */
    /* 30 seconds Timer for the round */
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
        }, 1000);

        return () => clearInterval(countdown);
    }, [round]);

    /* Prepare the 5 seconds Timer for going to next round */
    useEffect(() => {
        if (timer === 0) {
            setRoundFinished(true);
        }
    }, [timer, selectedCaptionIndex])

    /* Start the 5 seconds Timer */
    useEffect(() => {
        let nextRoundCountdown;
        if (roundFinished) {
            setNextRoundTimer(NEXT_ROUND_LENGTH); // Reset the next round timer to 5 seconds
            nextRoundCountdown = setInterval(() => {
                setNextRoundTimer((prevTimer) => prevTimer > 0 ? prevTimer - 1 : 0);
            }, 1000);
        }
    
        return () => clearInterval(nextRoundCountdown);
    }, [roundFinished]);

    /* Catch the 5 seconds Timer end */
    useEffect(() => {
        if (round < props.roundMax && nextRoundTimer === 0) {
            setTimer(ROUND_LENGTH);
            setRoundFinished(false);

            setRound((prevRound) => prevRound + 1);
            setSelectedCaptionIndex(null);
            setCaptionCorrect(false);
        } else if (round === props.roundMax && nextRoundTimer === 0) {
            if (props.roundMax == 2) {
                navigate('/gameover', { state: {
                    total_score: score,
                    memes: props.game.memes, 
                    captions: [
                                props.choices[0] === - 1 ? { caption_text: "", valid: false } : props.game.captions[0][props.choices[0]], 
                                props.choices[1] === - 1 ? { caption_text: "", valid: false } : props.game.captions[1][props.choices[1]],
                                props.choices[2] === - 1 ? { caption_text: "", valid: false } : props.game.captions[2][props.choices[2]],
                            ],
                }});
            } else
            if (props.roundMax == 0) {
                navigate('/gameover', { state: {
                    total_score: score,
                    memes: [props.game.memes[0]], 
                    captions: [
                                props.choices[0] === - 1 ? { caption_text: "", valid: false } : props.game.captions[0][props.choices[0]],
                            ],
                }});
            }
        }
    }, [nextRoundTimer]);

    /* Cleanup effect (the only thing that needs cleanup is choices tbf) */
    useEffect(() => {
        return () => {
            props.resetChoices();
        };
    }, []);


    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <Container className="play-container">
                    <Row className="justify-content-center align-items-center">
                        <Col className="d-flex justify-content-center">
                        <div className="timer">
                            {roundFinished && round == props.roundMax ? 
                                "Game Over: "
                                :
                                roundFinished ?
                                    "Next Round: "
                                    :
                                    "Time Left: "}
                            {roundFinished ? nextRoundTimer : timer}</div>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <img src={props.game.memes[round]} alt="Big Image" className="big-image"/>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <div className="level-score">Score: {score}</div>
                        </Col>
                    </Row>
                    <p> </p>
                    <Captions captions={props.game.captions[round]} chooseCaption={chooseCaption} 
                        selectedCaptionIndex={selectedCaptionIndex} captionCorrect={captionCorrect}
                        roundFinished={roundFinished}/>
                </Container>
            </div>
        </>
    );
}

function Captions(props) {
    const buttons = [...props.captions].map((caption, index) => (
        <Button key={index} onClick={() => !props.roundFinished && props.chooseCaption(index)} 
            variant="outline-primary" className="text-box button-caption"
            style={{ backgroundColor: props.selectedCaptionIndex === index ?
                                        (props.captionCorrect ?
                                            'green' :
                                            'red') :
                                        (!props.roundFinished ?
                                            'white' :
                                            (props.captionCorrect ? // The doc said to show both correct answers only in case of wrong guess.
                                                'white' :
                                                (caption.valid ? 
                                                    'green' :
                                                    'white'))),
                    color: 'black' }}
            disabled={props.roundFinished}
            >
            {caption.caption_text}
        </Button>
    ));

    return (
        <>
            <Container className="captions-container">
                {buttons.slice(0, 6).map((button, index) => (
                    index % 2 === 0 ? (
                        <Row key={index} className="justify-content-center my-2">
                            <Col xs={6} className="d-flex justify-content-center">{buttons[index]}</Col>
                            <Col xs={6} className="d-flex justify-content-center">{buttons[index + 1]}</Col>
                        </Row>
                    ) : null
                ))}
                {buttons.length % 2 !== 0 && (
                    <Row className="justify-content-center my-2">
                        <Col className="d-flex justify-content-center">{buttons[buttons.length - 1]}</Col>
                    </Row>
                )}
            </Container>
        </>
    );
}

export { Play };