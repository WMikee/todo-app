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
    <form className="flex w-full" action="submit" onSubmit={handleSubmit}>
      <input
        className="bg-[#262A32] w-full p-3 pr-30 rounded-2xl text-left mx-2"
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
