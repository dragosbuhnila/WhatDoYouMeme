import UserDAO from "../../daos/userDAO"

/* Populate Users */
const userDAO = new UserDAO();
userDAO.createUser('gianluca', 'gianluca')
    .then(() => console.log('User gianluca created'))
    .catch((err) => console.error(err));
userDAO.createUser('graziella', 'graziella')
    .then(() => console.log('User graziella created'))
    .catch((err) => console.error(err));
