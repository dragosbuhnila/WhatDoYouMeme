import UserDAO from "../daos/userDAO.mjs"

class UserController {
    constructor() {
        this.dao = new UserDAO
    }

    async createUser(username, password) {
        return this.dao.createUser(username, password)
    }
}

export default UserController