const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbFilePath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) throw new Error("Erro ao se conectar com o banco de dados: ", err.message);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        pass TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;