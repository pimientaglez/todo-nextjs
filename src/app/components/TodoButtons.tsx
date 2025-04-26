import React from "react";
import { STATUS, Todo } from "./TodoItem";

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
  return (
    <div>
      <button onClick={() => onDeleteItem(todo.id)}>Delete</button>
      <button onClick={() => onArchiveItem(todo, "ARCHIVED")}>Archive</button>
    </div>
  );
};

export default TodoButtons;
