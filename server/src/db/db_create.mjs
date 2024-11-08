import db from "./db";

db.serialize(() => {
  db.run(`CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    salt TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE memes (
    name TEXT PRIMARY KEY
  )`);

  db.run(`CREATE TABLE captions (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE history (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    memes TEXT NOT NULL,
    scores TEXT NOT NULL,
    total_score INTEGER NOT NULL,
    FOREIGN KEY(username) REFERENCES users(username)
  )`);

  db.run(`CREATE TABLE meme_has_caption (
    meme_name TEXT NOT NULL,
    caption_id INTEGER NOT NULL,
    PRIMARY KEY(meme_name, caption_id),
    FOREIGN KEY(meme_name) REFERENCES memes(name),
    FOREIGN KEY(caption_id) REFERENCES captions(id)
  )`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});