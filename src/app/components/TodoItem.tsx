import React, { useState } from "react";

export interface Todo {
  id: number;
  title: string;
  status: STATUS;
}
export type STATUS = "PENDING" | "COMPLETED" | "ARCHIVED";

interface TodoItemProps {
  todo: Todo;
  onTodoUpdate: (todo: Todo, selection: STATUS) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdate }) => {
  const [checked, setChecked] = useState<boolean>(
    todo.status === "PENDING" ? false : true
  );
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onTodoUpdate(todo, e.target.checked ? "COMPLETED" : "PENDING");
  };
  return (
    <div>
      <input
        type="checkbox"
        name="checkbox"
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheck(e)}
      />
      <span>{todo.title}</span>
      <span>{todo.status}</span>
    </div>
  );
};

export default TodoItem;
