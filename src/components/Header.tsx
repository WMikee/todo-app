import { type Todo as TodoType } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
  onAddTodo: ({ title }: Pick<TodoType, "title">) => void;
}

export function Header({ onAddTodo }: Props) {
  return (
    <header className="flex flex-col items-center">
      <div className="flex w-full m-4">
        <h1 className="mx-2 font-bold p-1 w-2/10 text-2xl bg-[#262A2F] text-center rounded-xl">
          o-<span className="text-[#1B5BE4]">o</span>
        </h1>
      </div>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
}
