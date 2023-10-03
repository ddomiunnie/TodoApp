const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: '1234',
  database: 'kdt8',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + db.threadId);
});

// GET
exports.getTodos = (req, res) => {
  db.query('SELECT * FROM todo', (error, results) => {
    if (error) {
      console.error('Error retrieving todos: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
};

// POST
exports.addTodo = (req, res) => {
  const { text } = req.body;
  db.query('INSERT INTO todo (text) VALUES (?)', [text], (error, results) => {
    if (error) {
      console.error('Error adding todo: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(201).json({ id: results.insertId, text, completed: false });
  });
};

//PATCH
exports.updateTodo = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query(
    'UPDATE todo SET completed = ? WHERE id = ?',
    [completed, id],
    (error) => {
      if (error) {
        console.error('Error updating todo: ' + error.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.sendStatus(200);
    }
  );
};

// DELETE
exports.deleteTodo = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todo WHERE id = ?', [id], (error) => {
    if (error) {
      console.error('Error deleting todo: ' + error.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.sendStatus(204);
  });
};
