import db from "../db.mjs";

db.run(`INSERT INTO meme_has_caption (meme_name, caption_id) VALUES (?, ?)`, [11, 'non_existing_meme'], function(error) {
    if (error) {
        console.log("Error in populating meme_has_caption with [11, 'non_existing_meme']");
        console.log(error);
    }
});

db.run(`INSERT INTO meme_has_caption (meme_name, caption_id) VALUES (?, ?)`, [123, 'creep'], function(error) {
    if (error) {
        console.log("Error in populating meme_has_caption with [123, 'creep']");
        console.log(error);
    }
});

