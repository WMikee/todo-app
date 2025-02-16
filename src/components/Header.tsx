import { type Todo as TodoType } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
  onAddTodo: ({ title }: Pick<TodoType, "title">) => void;
}

export function Header({ onAddTodo }: Props) {
  return (
    <header>
      <h1 className="title">Todo</h1>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
}
