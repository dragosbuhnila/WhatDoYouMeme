"use strict";
import db from "../db/db.mjs"
import crypto from "crypto"


class UserDAO {
    // createUser(username, password) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             const salt = crypto.randomBytes(16).toString('hex');
    //             const hashedPassword = crypto.scryptSync(password, salt, 16).toString('hex');
    //             const sql = "INSERT INTO users(username, password, salt) VALUES(?, ?, ?)";
    //             db.run(sql, [username, hashedPassword, salt], (err) => {
    //                 if (err) {
    //                     if (err.message.includes("UNIQUE constraint failed: users.username")) reject("Username already exists");
    //                     reject(err);
    //                 }
    //                 resolve(true);
    //             });
    //         } catch (error) {
    //             reject(error);
    //         }
    //     });
    // }

    getUser(username, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE username=?';
            db.get(sql, [username], (err, row) => {
                if (err) { // database error
                    reject(err);
                } else {

                    if (!row) { // non-existent user
                        reject('Invalid username or password');
                    } else {
                        crypto.scrypt(password, row.salt, 32, (err, computed_hash) => {
                            if (err) { // key derivation fails
                                reject(err);
                            } else {
                                // console.log("username: " + username + " password: " + password + " salt: " + row.salt + " computed_hash: " + computed_hash + " row.password: " + row.password)
                                // eslint-disable-next-line no-undef
                                const equal = crypto.timingSafeEqual(computed_hash, Buffer.from(row.password, 'hex'));
                                if (equal) { // password ok
                                    resolve(row.username);
                                } else { // password doesn't match
                                    reject('Invalid username or password');
                                }
                            }
                        });
                    }
                    
                }
            });
        });
    }
}
export default UserDAO