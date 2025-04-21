import React, { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length > 0) {
      createTodo(title);
      setTitle("");
    }
  };
  const createTodo = async (title: string) => {
    await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, status: "PENDING" }),
    });
  };

  return (
    <div>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
          value={title}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
