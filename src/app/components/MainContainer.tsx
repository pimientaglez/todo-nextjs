"use client";

import React from "react";
import CreateTodo from "./CreateTodo";
import TodoContainer from "./TodoContainer";

const MainContainer = () => {
  return (
    <div>
      <CreateTodo />
      <TodoContainer />
    </div>
  );
};

export default MainContainer;
