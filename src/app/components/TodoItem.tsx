import React, { useState } from "react";
import TodoButtons from "./TodoButtons";
import { Switch } from "@/components/ui/switch";

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
  const handleCheck = (check: boolean) => {
    setChecked(!checked);
    onTodoUpdate(todo, check ? "COMPLETED" : "PENDING");
  };
  return (
    <div className="flex justify-between mt-2">
      <div className="flex items-center mr-2">
        <Switch
          name="check-todo"
          checked={checked}
          onCheckedChange={(check: boolean) => handleCheck(check)}
          disabled={todo.status === "ARCHIVED"}
          className="mr-2 cursor-pointer"
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
