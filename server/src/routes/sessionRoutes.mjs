import express from "express";
import passport from "passport";

import { isLoggedIn } from "../helper.mjs";


class SessionRoutes {
    /* Calls initRoutes at the end */
    constructor() {
        this.router = express.Router()
        this.initRoutes()
    }

    getRouter() {
        return this.router
    }

    // Base URL: /api/sessions
    initRoutes() {

        this.router.post('/', function(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
              if (err)
                return next(err);
                if (!user) {
                  // display wrong login messages
                  // console.log("Inside Login Route")
                  return res.status(401).send(info);
                }
                // success, perform the login
                req.login(user, (err) => {
                  if (err)
                    return next(err);
                  
                  // req.user contains the authenticated user, we send all the user info back
                  return res.status(200).json(req.user);
                });
            })(req, res, next);
        });

        this.router.get('/current',
          (req, res, next) => isLoggedIn(req, res, next),
          (req, res) => { res.json(req.user); }
        );

        this.router.delete('/current', (req, res) => {
          req.logout(() => {
            res.end();
          });
        });

    }
}

export { SessionRoutes }