"use strict";
import db from '../db/db.mjs';
import CompleteGame from '../components/complete_game.mjs';


class HistoryDAO {
    getHistory(username) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM history WHERE username = ?';
            db.all(sql, [username], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map((row) => 
                        new CompleteGame(JSON.parse(row.memes), JSON.parse(row.scores))
                    ));
                }
            });
        });
    }

    saveGame(username, memes, scores, total_score) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO history (username, memes, scores, total_score) VALUES (?, ?, ?, ?)';
            db.run(sql, [username, JSON.stringify(memes), JSON.stringify(scores), total_score], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
export default HistoryDAO