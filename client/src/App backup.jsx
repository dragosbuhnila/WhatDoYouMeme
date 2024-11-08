import { useState } from "react"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { WrongCredentialsError } from './errors/user_errors.mjs';
import { InternalServerError } from './errors/server_errors.mjs';

import { Home } from "./components/home/home"
import { Footer } from "./components/footer/footer"
import { Login } from "./components/login/login"
import { Profile } from "./components/profile/profile"
import { Play } from "./components/play/play"
// import { GameOver } from "./components/gameover/gameOver"

import { LoggedInContext } from "./contexts/LoggedInContext"
import { logIn, createGame } from "./API.mjs"
import "./App.css"

function App() {
  const navigate = useNavigate();

  /* LoggedIn Context */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const value_loggedInContext = {
    isLoggedIn,
    setLoggedIn,
    username,
    setUsername
  };

  /* LogIn API */
  const [loginMessage, setLoginMessage] = useState('');
  
  const doLogin = function (username, password) {
    logIn(username, password)
      .then((u) => {
        setLoggedIn(true)
        setUsername(u)  
        navigate('/home')
      })
      .catch(err => {
        if (err instanceof WrongCredentialsError) {
          setLoginMessage('Wrong username or password')
        }
        else if (err instanceof InternalServerError) {
          setLoginMessage('Internal Server Error')
        }
        else {
          setLoginMessage('Unexpected Error')
        }
      })
  }

  /* New Game API */
  const [game, setGame] = useState({});
  const [gameErrorMessage, setgameErrorMessage] = useState('');

  const newGame = function () {
    createGame().then((g) => {
      setGame(g)
      navigate('/play')
      })
      .catch(err => {
        console.log(err)
        if (err instanceof InternalServerError) {
          setgameErrorMessage('Internal Server Error')
        }
        else {
          setgameErrorMessage('Unexpected Error')
        }
      })
  }

  const [captionChoices, setCaptionChoices] = useState([]);
  const addToCaptionChoices = function (caption_index) {
    setCaptionChoices([...captionChoices, caption_index])
  }

  return (
    <LoggedInContext.Provider value={value_loggedInContext}>
      <div className="main-content">
        <Routes>

          <Route path="/"
            element={<Navigate to="/home" />}
          /> 

          <Route path="/home"
            element={<Home startGame={newGame} message={gameErrorMessage} setMessage={setgameErrorMessage}/>}
          />

          <Route path="/login"
            element={<Login login={doLogin} message={loginMessage} setMessage={setLoginMessage}/>}
          />

          <Route path="/profile"
            element={<Profile/>}
          />

          <Route path="/play"
            element={<Play game={game} choices={captionChoices} addToCaptionChoices={addToCaptionChoices}/>}
          />

          {/* <Route path="/gameover"
            element={<GameOver />}
          /> */}

          <Route path="*"
            element={<Navigate to="/home" replace />}
          />

        </Routes>
      </div>
      <Footer />
    </LoggedInContext.Provider>
  )
}

export default App
