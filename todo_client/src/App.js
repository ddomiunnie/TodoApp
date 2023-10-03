import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (newTodo) {
      fetch('/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo('');
        })
        .catch((error) => console.error('Error adding todo:', error));
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    fetch(`/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: updatedTodos.find((todo) => todo.id === id).completed,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update todo');
        }
      })
      .catch((error) => console.error('Error updating todo:', error));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    fetch(`/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete todo');
        }
      })
      .catch((error) => console.error('Error deleting todo:', error));

    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="todo를 입력해주세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </div>
    </div>
  );
}
