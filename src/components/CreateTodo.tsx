import { useState } from "react";
import { type Todo as TodoType } from "../types";

interface Props {
  saveTodo: ({ title }: Pick<TodoType, "title">) => void;
}

export function CreateTodo({ saveTodo }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    saveTodo({
      title: inputValue,
    });
    setInputValue("");
  };

  return (
    <form className="createtodo-form" action="submit" onSubmit={handleSubmit}>
      <input
        className="createtodo-input"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="What do you want to do?"
        autoFocus
      />
    </form>
  );
}
