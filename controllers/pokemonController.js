const db = require('../database/database');

const isPrime = (num) => {
  for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
    if (num % i === 0) return false;
  return num > 1;
};

const fibonacci = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
};

const catchPokemon = (req, res) => {
  const probability = Math.random() < 0.5;
  if (probability) {
    const { id, name } = req.body;
    db.run(
      `INSERT OR IGNORE INTO pokemon (id, name, nickname, renameCount) VALUES (?, ?, ?, ?)`,
      [id, name, '', 0],
      function (err) {
        if (err) {
          return res.json({ success: false, message: 'Failed to save the Pokemon to the database' });
        }
        if (this.changes === 0) {
          return res.json({ success: true, message: 'Pokemon already exists in the database' });
        }
        res.json({ success: true, message: 'Pokemon caught successfully' });
      }
    );
  } else {
    res.json({ success: false, message: 'Failed to catch the Pokemon!' });
  }
};

const releasePokemon = (req, res) => {
  const { name } = req.params;
  db.run("DELETE FROM pokemon WHERE name = ?", name, function(err) {
    if (err) {
      return res.json({ success: false, message: 'Failed to release the Pokemon' });
    }
    res.json({ success: true, message: 'Pokemon released successfully' });
  });
};

const renamePokemon = (req, res) => {
  const { id, name } = req.body;
  db.get("SELECT * FROM pokemon WHERE id = ?", [id], (err, row) => {
    if (err || !row) {
      return res.status(404).json({ success: false, message: 'Pokemon not found' });
    }
    const renameCount = row.renameCount + 1;
    const newName = `${name}-${fibonacci(renameCount)}`;
    db.run("UPDATE pokemon SET name = ?, renameCount = ? WHERE id = ?", [newName, renameCount, id], function(err) {
      if (err) {
        return res.json({ success: false, message: 'Failed to rename the Pokemon' });
      }
      res.json({ success: true, newName });
    });
  });
};

module.exports = {
  catchPokemon,
  releasePokemon,
  renamePokemon,
};
