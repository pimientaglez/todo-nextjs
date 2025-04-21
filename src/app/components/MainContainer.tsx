"use client";

import React, { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import TodoContainer from "./TodoContainer";
import { Todo } from "./TodoItem";

const MainContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
  return (
    <div>
      <CreateTodo onTodoCreated={fetchTodos} />
      <TodoContainer todos={todos} onTodoUpdated={fetchTodos} />
    </div>
  );
};

export default MainContainer;
