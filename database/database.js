const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./pokemon.sqlite');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY,
      name TEXT,
      nickname TEXT,
      renameCount INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;
