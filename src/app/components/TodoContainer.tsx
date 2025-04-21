"use client";

import React, { useEffect, useState } from "react";
import TodoItem, { Todo } from "./TodoItem";

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
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
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.map((item: Todo) => (
        <TodoItem key={item.id} todo={item} />
      ))}
    </div>
  );
};

export default TodoContainer;
