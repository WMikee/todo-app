import React, { createContext, ReactNode, useState } from "react";
import { type ListOfTodos } from "../types";
import { type Todo as TodoType } from "../types";

interface TodoContextProps {
  todos: ListOfTodos;
  setTodos: React.Dispatch<React.SetStateAction<ListOfTodos>>;
  removeTodo: ({ id }: Pick<TodoType, "id">) => void;
  toggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  setTodos: () => {},
  removeTodo: () => {},
  toggleCompleted: () => {},
});

const mockTodos = [
  { id: crypto.randomUUID(), title: "Learn React", completed: false },
  { id: crypto.randomUUID(), title: "Learn TypeScript", completed: false },
  {
    id: crypto.randomUUID(),
    title: "Learn something more...",
    completed: true,
  },
];

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<ListOfTodos>(mockTodos);

  const handleRemove = ({ id }: Pick<TodoType, "id">): void => {
    const newTodos = todos.filter((todos) => todos.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">): void => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        removeTodo: handleRemove,
        toggleCompleted: handleCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
