"use strict";
import db from '../db/db.mjs';

class MemeDAO {
    getMemes() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM memes';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // A row contains only one field: name (of the meme). So convert it immediately from object to just string.
                    resolve(rows.map((row) => row.name));
                }
            });
        });
    }
}
export default MemeDAO