"use client";

import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoContainer from "./TodoContainer";
import { Todo } from "./TodoItem";
import ToggleArchived from "./ToggleArchived";

const MainContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showArchived, setShowArchived] = useState<boolean>(false);
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/tasks");
      if (!response.ok) {
        throw new Error("Http error Status " + response.status);
      }
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (err) {
      throw new Error("Http error Status " + err);
    }
  };

  const handleCheck = (selection: boolean) => {
    setShowArchived(selection);
  };

  return (
    <div>
      <CreateTodo onTodoCreated={fetchTodos} />
      <ToggleArchived onToggleCheck={handleCheck} />
      <TodoContainer
        todos={todos}
        onTodoUpdated={fetchTodos}
        showArchived={showArchived}
      />
    </div>
  );
};

export default MainContainer;
