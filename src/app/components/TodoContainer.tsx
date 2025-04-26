"use client";

import React, { useEffect, useState } from "react";
import TodoItem, { STATUS, Todo } from "./TodoItem";

interface TodoContainerProps {
  todos: Todo[];
  onTodoUpdated: () => void;
  showArchived: boolean;
}
const TodoContainer: React.FC<TodoContainerProps> = ({
  todos,
  onTodoUpdated,
  showArchived,
}) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    console.log("On load", todoList);
  }, [todoList]);

  useEffect(() => {
    const handleShowArchived = (selection: boolean) => {
      if (selection) {
        setTodoList(todos);
      } else {
        const filteredTodos = todos.filter(
          (item) => item.status !== "ARCHIVED"
        );
        setTodoList(filteredTodos);
      }
    };
    console.log();
    setTodoList(todos);
    handleShowArchived(showArchived);
  }, [showArchived, todos]);

  const handleUpdate = async (todo: Todo, status: STATUS) => {
    await updateTodo({
      ...todo,
      status: status,
    });
    onTodoUpdated();
  };
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
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
  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <div>
      {todoList.map((item: Todo) => (
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

export default TodoContainer;
