const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./workouts.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS workouts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      duration INTEGER,
      calories INTEGER
    )
  `);
});

module.exports = db;
