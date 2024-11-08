import express from "express";
import GameController from "../controllers/gameController.mjs";
import { isLoggedIn, validateRequest } from "../helper.mjs";
import { body } from "express-validator";


class GameRoutes {
    /* Calls initRoutes at the end */
    constructor() {
        this.router = express.Router()
        this.controller = new GameController()
        this.initRoutes()
    }

    getRouter() {
        return this.router
    }

    // Base URL: /api/games
    initRoutes() {
        this.router.get(
            "/new",
            (req, res, next) => this.controller.createGame(req, res, next)
                .then((game) => res.status(200).json(game))
                .catch((error) => {
                    console.log("Error in creating game")
                    console.log(error)
                    res.status(500).send("Error in creating game")
                })
        )

        this.router.get(
            "/history",
            (req, res, next) => isLoggedIn(req, res, next),
            // eslint-disable-next-line no-unused-vars
            (req, res, next) => this.controller.getHistory(req.user)
                .then((history) => res.status(200).json(history))
                .catch((error) => {
                    console.log("Error in getting history")
                    console.log(error)
                    res.status(500).send("Error in getting history")
                })
        )

        this.router.post(
            "/history",
            body("meme1").isString().isLength({ min: 1 }), 
            body("meme2").isString().isLength({ min: 1 }),
            body("meme3").isString().isLength({ min: 1 }),
            body("score1").isNumeric().custom(value => value === 0 || value === 5).withMessage('Score must be 0 or 5'),
            body("score2").isNumeric().custom(value => value === 0 || value === 5).withMessage('Score must be 0 or 5'),
            body("score3").isNumeric().custom(value => value === 0 || value === 5).withMessage('Score must be 0 or 5'),
            body("total_score").isNumeric().custom(value => value >= 0 && value % 5 === 0).withMessage('Total score must be a multiple of 5 and not negative'),
            (req, res, next) => validateRequest(req, res, next),
            (req, res, next) => isLoggedIn(req, res, next),
            // eslint-disable-next-line no-unused-vars
            (req, res, next) => this.controller.saveGame(req.user, req.body)
                .then(() => res.status(200).send("Game saved"))
                .catch((error) => {
                    console.log("Error in saving game")
                    console.log(error)
                    res.status(500).send("Error in saving game")
                })
        )

        this.router.get(
            "/historical-score",
            (req, res, next) => isLoggedIn(req, res, next),
            // eslint-disable-next-line no-unused-vars
            (req, res, next) => this.controller.getHistoricalScore(req.user)
                .then((score) => res.status(200).json({ score: score }))
                .catch((error) => {
                    console.log("Error in getting historical scores")
                    console.log(error)
                    res.status(500).send("Error in getting historical scores")
                })
        )
    }
}

export { GameRoutes }