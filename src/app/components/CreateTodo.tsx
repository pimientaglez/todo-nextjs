import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateTodoProps {
  onTodoCreated: () => void;
}
const CreateTodo: React.FC<CreateTodoProps> = ({ onTodoCreated }) => {
  const [title, setTitle] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length > 0) {
      await createTodo(title);
      setTitle("");
      onTodoCreated();
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
      <form
        className="flex"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <Input
          type="text"
          name="title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
          value={title}
          className="mr-2"
        />
        <Button variant="outline" type="submit">
          Add Todo
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;
