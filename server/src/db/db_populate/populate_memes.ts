import db from "../db";

/* Populate Memes */
try {
    db.serialize(() => {
        // 1)
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['boii']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['bugs_bunny_shoot']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['christian_bale']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['creep']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['giveup_rain']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['monkey_puppet']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['patrick']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['persian_monkey']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['seal_good']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['seal_weird']);
        // 11)
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['steve_carrel']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['steve_harvey']);
        db.run(`INSERT INTO memes (name) VALUES (?)`, ['veins']);
        
        console.log('Memes populated')
    });
} catch (error) {
    console.log("Error in populating memes")
    console.log(error);
}

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });