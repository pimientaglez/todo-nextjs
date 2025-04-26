"use client";

import React, { useEffect, useState } from "react";
import { STATUS, Todo } from "./TodoItem";
import TodoGroup from "./TodoGroup";

interface TodoCategory {
  completed: Todo[];
  pending: Todo[];
  archived: Todo[];
}
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
  const [todoList, setTodoList] = useState<TodoCategory>({
    completed: [],
    pending: [],
    archived: [],
  });

  useEffect(() => {
    const completedTodos = todos.filter((item) => item.status === "COMPLETED");
    const pendingTodos = todos.filter((item) => item.status === "PENDING");
    const archivedTodos = todos.filter((item) => item.status === "ARCHIVED");
    setTodoList({
      completed: completedTodos,
      pending: pendingTodos,
      archived: archivedTodos,
    });
  }, [todos]);

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
      <TodoGroup
        group="PENDING"
        todos={todoList.pending}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <TodoGroup
        group="COMPLETED"
        todos={todoList.completed}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <TodoGroup
        group="ARCHIVED"
        todos={todoList.archived}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        show={showArchived}
      />
    </div>
  );
};

export default TodoContainer;
