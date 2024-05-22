import React, { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import GradingSystem from './GradingSystem';
import GoogleCalendarIntegration from './GoogleCalendarIntegration';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>To-Do List with Grading System</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <GradingSystem todos={todos} />
      <GoogleCalendarIntegration />
    </div>
  );
}

export default App;
