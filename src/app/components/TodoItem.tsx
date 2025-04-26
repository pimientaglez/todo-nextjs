import React, { useState } from "react";
import TodoButtons from "./TodoButtons";

export interface Todo {
  id: number;
  title: string;
  status: STATUS;
}
export type STATUS = "PENDING" | "COMPLETED" | "ARCHIVED";

interface TodoItemProps {
  todo: Todo;
  onTodoUpdate: (todo: Todo, selection: STATUS) => void;
  onTodoDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onTodoUpdate,
  onTodoDelete,
}) => {
  const [checked, setChecked] = useState<boolean>(
    todo.status === "PENDING" ? false : true
  );
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    onTodoUpdate(todo, e.target.checked ? "COMPLETED" : "PENDING");
  };
  return (
    <div className="flex justify-between mt-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          name="checkbox"
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheck(e)}
          disabled={todo.status === "ARCHIVED"}
          className="mr-2"
        />
        <span
          className={`${todo.status === "COMPLETED" ? "line-through" : ""}`}
        >
          {todo.title}
        </span>
      </div>
      {/* <span>{todo.status}</span> */}
      <TodoButtons
        todo={todo}
        onDeleteItem={onTodoDelete}
        onArchiveItem={onTodoUpdate}
      />
    </div>
  );
};

export default TodoItem;
