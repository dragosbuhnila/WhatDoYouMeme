import db from "../db.mjs";

try {
    db.run(`DELETE FROM captions`, (err) => {
        if (err) {
        return console.error(err.message);
        }
        console.log("Successfully emptied the captions table");
    });
} catch (error) {
    console.log("Error in emptying captions")
    console.log(error);
}
