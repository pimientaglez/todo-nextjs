"use client";

import React from "react";
import TodoItem, { STATUS, Todo } from "./TodoItem";

interface TodoGroupProps {
  group: STATUS;
  todos: Todo[];
  show?: boolean;
  handleUpdate: (todo: Todo, status: STATUS) => void;
  handleDelete: (id: number) => void;
}
const TodoGroup: React.FC<TodoGroupProps> = ({
  todos,
  handleUpdate,
  handleDelete,
  show = true,
}) => {
  return (
    <div>
      {show &&
        todos.map((item: Todo) => (
          <TodoItem
            key={item.id}
            todo={item}
            onTodoUpdate={handleUpdate}
            onTodoDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default TodoGroup;
