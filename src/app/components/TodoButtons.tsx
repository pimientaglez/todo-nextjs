import React from "react";
import { STATUS, Todo } from "./TodoItem";
import { Button } from "@/components/ui/button";

interface TodoButtons {
  todo: Todo;
  onDeleteItem: (id: number) => void;
  onArchiveItem: (todo: Todo, selection: STATUS) => void;
}

const TodoButtons: React.FC<TodoButtons> = ({
  todo,
  onDeleteItem,
  onArchiveItem,
}) => {
  const newStatus = todo.status === "ARCHIVED" ? "PENDING" : "ARCHIVED";
  return (
    <div>
      <Button
        onClick={() => onDeleteItem(todo.id)}
        className="mr-2 cursor-pointer"
      >
        Delete
      </Button>
      <Button
        className="cursor-pointer"
        onClick={() => onArchiveItem(todo, newStatus)}
      >{`${todo.status === "ARCHIVED" ? "Restore" : "Archive"}`}</Button>
    </div>
  );
};

export default TodoButtons;
