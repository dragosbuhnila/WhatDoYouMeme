import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import Authenticator from './src/auth.mjs';
import { SessionRoutes } from './src/routes/sessionRoutes.mjs';
import { GameRoutes } from './src/routes/gameRoutes.mjs';

const app = new express();
const port = 3001;

/* First setups */
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

/* Authentication and Session Setup */
// eslint-disable-next-line no-unused-vars
const authenticator = new Authenticator(app); // I used this as a class to keep more things in one place, but it turns out I can't keep functions in it if 
                                              // I pass the object around :(, so I'll just leave it like this bc it's too much changing the strucure

/* Routes */
const sessionRoutes = new SessionRoutes(app);
app.use(`/api/sessions`, sessionRoutes.getRouter())
const gameRoutes = new GameRoutes(app);
app.use(`/api/games`, gameRoutes.getRouter())

/* Make Meme Images Available */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/memes', express.static(join(__dirname, 'memes')));


/* Activate The Server */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});