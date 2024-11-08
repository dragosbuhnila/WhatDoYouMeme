import db from "../db.mjs";

/* Populate History */
try {
    db.serialize(() => {
        db.run(`INSERT INTO history (username, memes, scores, total_score) VALUES (?, ?, ?, ?)`,
            [
                'gianluca',
                JSON.stringify(['boii', 'steve_harvey', 'creep']),
                JSON.stringify([5, 0, 5]),
                10
            ]);
        db.run(`INSERT INTO history (username, memes, scores, total_score) VALUES (?, ?, ?, ?)`,
            [
                'graziella',
                JSON.stringify(['seal_good', 'creep', 'giveup_rain']),
                JSON.stringify([5, 0, 0]),
                5
            ]);
        db.run(`INSERT INTO history (username, memes, scores, total_score) VALUES (?, ?, ?, ?)`,
        [
            'gianluca',
            JSON.stringify(['bugs_bunny_shoot', 'steve_carrel', 'patrick']),
            JSON.stringify([5, 5, 5]),
            15
        ]);
    });
} catch (error) {
    console.log("Error in populating history")
    console.log(error);
}

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });