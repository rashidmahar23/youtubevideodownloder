document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Fetch and display todos
  function loadTodos() {
    fetch('/api/todos')
      .then(res => res.json())
      .then(todos => {
        todoList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = todo.text;
          const delBtn = document.createElement('button');
          delBtn.textContent = 'Delete';
          delBtn.onclick = () => deleteTodo(todo.id);
          li.appendChild(delBtn);
          todoList.appendChild(li);
        });
      });
  }

  // Add a new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(loadTodos);
    todoInput.value = '';
  });

  // Delete a todo
  function deleteTodo(id) {
    fetch(`/api/todos/${id}`, { method: 'DELETE' }).then(loadTodos);
  }

  loadTodos();
});