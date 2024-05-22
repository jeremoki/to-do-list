import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
          <span>{todo.text}</span>
          <button onClick={() => toggleTodo(index)}>Complete</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
