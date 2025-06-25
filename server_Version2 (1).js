const express = require('express');
const path = require('path');
const app = express();

let todos = []; // In-memory storage

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// API endpoint to add a todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.json(newTodo);
});

// API endpoint to delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));