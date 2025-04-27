import React, { useState } from "react";
import TodoButtons from "./TodoButtons";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="flex justify-between mt-2 w-full">
      <div className="flex items-center mr-2">
        <Checkbox
          name="check-todo"
          checked={checked}
          onCheckedChange={(check: boolean) => handleCheck(check)}
          disabled={todo.status === "ARCHIVED"}
          className="mr-2 cursor-pointer"
        />
        <span
          className={`${
            todo.status === "COMPLETED" ? "line-through" : ""
          } max-w-80 min-w-80 truncate text-foreground flex-1`}
        >
          {todo.title}
        </span>
      </div>
      <TodoButtons
        todo={todo}
        onDeleteItem={onTodoDelete}
        onArchiveItem={onTodoUpdate}
      />
    </div>
  );
};

export default TodoItem;
