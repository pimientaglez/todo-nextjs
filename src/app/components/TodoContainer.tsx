"use client";

import React from "react";
import TodoItem, { STATUS, Todo } from "./TodoItem";

interface TodoContainerProps {
  todos: Todo[];
  onTodoUpdated: () => void;
}
const TodoContainer: React.FC<TodoContainerProps> = ({
  todos,
  onTodoUpdated,
}) => {
  const handleUpdate = async (todo: Todo, status: STATUS) => {
    await updateTodo({
      ...todo,
      status: status,
    });
    onTodoUpdated();
  };
  const updateTodo = async (todo: Todo) => {
    await fetch(`http://localhost:8080/api/tasks/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo }),
    });
  };
  return (
    <div>
      {todos.map((item: Todo) => (
        <TodoItem key={item.id} todo={item} onTodoUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default TodoContainer;
