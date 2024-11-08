import CryptoJS from 'crypto-js';

import { WrongCredentialsError, UnauthenticatedError } from './errors/user_errors.mjs';
import { InternalServerError, UnexpectedError, BodyFormatError } from './errors/server_errors.mjs';
import Game from './models/game.mjs';
import CompleteGame from './models/complete_game.mjs'

const SERVER_URL = 'http://localhost:3001';

/* ------------ Login API ------------ */
const logIn = async (username, password) => {
  const hashedPassword = CryptoJS.SHA1(password).toString();

  const response = await fetch(SERVER_URL + '/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password: hashedPassword }),
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    const username = await response.json();
    return username;

  } else if (response.status === 401) {
    /* 401 Wrong Credentials */
    throw new WrongCredentialsError();

  } else if (response.status === 500) {
    /* 500 Internal Server Error */
    throw new InternalServerError();

  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

const getUserInfo = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    const username = await response.json();
    return username;

  } else if (response.status === 401) {
    /* 401 Unauthenticated */
    throw new UnauthenticatedError();

  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

const logOut = async () => {
  const response = await fetch(SERVER_URL + '/api/sessions/current', {
    method: 'DELETE',
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    return;
    
  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

/* ------------ Game API ------------ */
const createGame = async () => {
  const response = await fetch(SERVER_URL + '/api/games/new');
  
  if (response.ok) {
    /* 200 OK */
    let game = await response.json();
    game = new Game([game.meme1, game.meme2, game.meme3], [game.captions1, game.captions2, game.captions3]);
    return game;

  } else if (response.status === 500) {
    /* 500 Internal Server Error */
    throw new InternalServerError();

  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};
  
const getHistory = async () => {
  const response = await fetch(SERVER_URL + '/api/games/history', {
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    let history = await response.json(); // an array of CompleteGame objects
    history = history.map((game) => new CompleteGame(game));

    return history;

  } else if (response.status === 401) {
    /* 401 Unauthenticated */
    throw new UnauthenticatedError();

  } else if (response.status === 500) {
    /* 500 Internal Server Error */
    throw new InternalServerError();
  } else {

    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

const saveGame = async (gameData) => {
  const response = await fetch(SERVER_URL + '/api/games/history', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameData),
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    return;

  } else if (response.status === 422) {
    /* 422 Body Format Error */
    throw new BodyFormatError();

  } else if (response.status === 401) {
    /* 401 Unauthenticated */
    throw new UnauthenticatedError();

  } else if (response.status === 500) {
    /* 500 Internal Server Error */
    throw new InternalServerError();

  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

const getHistoricalScore = async () => {
  const response = await fetch(SERVER_URL + '/api/games/historical-score', {
    credentials: 'include',
  });

  if (response.ok) {
    /* 200 OK */
    const { score } = await response.json();
    return score;

  } else if (response.status === 401) {
    /* 401 Unauthenticated */
    throw new UnauthenticatedError();

  } else if (response.status === 500) {
    /* 500 Internal Server Error */
    throw new InternalServerError();

  } else {
    /* Unexpected Error */
    throw new UnexpectedError();
  }
};

export { logIn, getUserInfo, logOut, createGame, getHistory, saveGame, getHistoricalScore };