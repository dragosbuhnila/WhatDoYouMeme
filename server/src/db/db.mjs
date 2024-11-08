import sqlite from "sqlite3";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbFilePath = join(__dirname, 'mydb.sqlite3');

// The database is created and the foreign keys are enabled.
const db = new sqlite.Database(dbFilePath, (err) => {
    if (err) throw err
    db.run("PRAGMA foreign_keys = ON")
})

export default db;