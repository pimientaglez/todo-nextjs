import React from "react";

interface Todo {
  id: number;
  title: string;
  status: STATUS;
}
type STATUS = "PENDING" | "COMPLETED" | "ARCHIVED";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" name="checkbox" />
      <span>{todo.title}</span>
      <span>{todo.status}</span>
    </div>
  );
};

export default TodoItem;
