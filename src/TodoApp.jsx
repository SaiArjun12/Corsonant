import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1/todos'
      );
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newTodo = {
      userId: 1, 
      id: todos.length + 1, 
      title: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );

    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter">
        <label>
          Show Completed
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
        </label>
      </div>
      <ul>
        {todos
          .filter((todo) => (showCompleted ? true : !todo.completed))
          .map((todo) => (
            <li key={todo.id}>
              <span
                className={todo.completed ? 'completed' : ''}

                onClick={() => toggleCompleted(todo.id)}
                
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.title}
              </span>
              <button onClick={() => editTask(todo.id, prompt('Edit task:', todo.title))}>Edit</button>
              <button onClick={() => deleteTask(todo.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoApp;
