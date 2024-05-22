import React from 'react';

function GradingSystem({ todos }) {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const totalTodos = todos.length;
  const grade = totalTodos === 0 ? 'N/A' : `${((completedTodos / totalTodos) * 100).toFixed(2)}%`;

  return (
    <div className="grading-system">
      <h2>Grading System</h2>
      <p>Total Tasks: {totalTodos}</p>
      <p>Completed Tasks: {completedTodos}</p>
      <p>Completion Percentage: {grade}</p>
    </div>
  );
}

export default GradingSystem;
