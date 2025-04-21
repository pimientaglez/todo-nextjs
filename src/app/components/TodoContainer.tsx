"use client";

import React from "react";
import TodoItem, { Todo } from "./TodoItem";

interface TodoContainerProps {
  todos: Todo[];
}
const TodoContainer: React.FC<TodoContainerProps> = ({ todos }) => {
  return (
    <div>
      {todos.map((item: Todo) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoContainer;
