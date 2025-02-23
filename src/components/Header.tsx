import { type Todo as TodoType } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
  onAddTodo: ({ title }: Pick<TodoType, "title">) => void;
}

export function Header({ onAddTodo }: Props) {
  return (
    <header className="flex flex-col items-center min-w-84">
      <div className="flex w-full m-3">
        <div className="rounded-3xl bg-[#262A2F] flex items-center justify-center h-12 mx-2 w-20">
          <h1 className="relative -top-1.5 font-bold p-1 text-4xl text-center ">
            o-<span className="text-[#1B5BE4]">o</span>
          </h1>
        </div>
      </div>
      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
}
