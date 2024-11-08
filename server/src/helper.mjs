import { validationResult } from "express-validator"

function validateRequest(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let error = "The parameters are not formatted properly\n\n"
        errors.array().forEach((e) => {
            error += "- Parameter: **" + e.param + "** - Reason: *" + e.msg + "* - Location: *" + e.location + "*\n\n"
        })
        return res.status(422).json({ error: error })
    }
    return next()
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: "Unauthenticated user", status: 401 })
}

export { validateRequest, isLoggedIn }