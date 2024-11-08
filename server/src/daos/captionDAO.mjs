"use strict";
import db from '../db/db.mjs';

class CaptionDAO {
    getValidCaptions(meme_name) {
        return new Promise((resolve, reject) => {
            // Join meme_has_caption with captions, select text where meme_name
            const sql = `   SELECT text FROM captions 
                            WHERE id IN 
                                (   SELECT caption_id 
                                    FROM meme_has_caption 
                                    WHERE meme_name = ?)`;
            db.all(sql, [meme_name], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map((row) => row.text));
                }
            });
        });
    }

    getInvalidCaptions(meme_name) {
        return new Promise((resolve, reject) => {
            // Join meme_has_caption with captions, select text where meme_name
            const sql = `   SELECT text FROM captions 
                            WHERE id NOT IN 
                                (   SELECT caption_id 
                                    FROM meme_has_caption 
                                    WHERE meme_name = ?)`;
            db.all(sql, [meme_name], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows.map((row) => row.text));
                }
            });
        });
    }
}
export default CaptionDAO