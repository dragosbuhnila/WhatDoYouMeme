import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserDAO from './daos/userDAO.mjs';

/**
 * Represents a class that defines the routes for handling authentication.
 */
class Authenticator {
    constructor(app) {
        this.app = app
        this.userdao = new UserDAO()
        this.initAuth()
    }

    initAuth() {
        /* Passport */
        passport.use(new LocalStrategy((username, password, callback) => {
            // verify function
            // console.log("Inside passport: username: " + username + " password: " + password)

            // Note that the password contained in the db is hashed
            this.userdao.getUser(username, password).then((username) => {
                callback(null, username);
            }).catch((err) => {
                // console.log("Inside passport error: " + err)
                callback(null, false, err)
            });
        }));

        passport.serializeUser((username, callback) => {
            callback(null, username);
        });
        passport.deserializeUser((username, callback) => {
            callback(null, username);
        });

        /* Session */
        this.app.use(session({
            secret: 'xxxxyyyyzzz', resave: false, saveUninitialized: false
        }));

        this.app.use(passport.authenticate('session'));
    }
}

export default Authenticator