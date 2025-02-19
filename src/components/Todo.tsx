import { useContext } from "react";
import { type Todo as TodoType } from "../types";
import { TodoContext } from "../context/TodoContext";

export const Todo: React.FC<TodoType> = ({ id, title, completed }) => {
  const { removeTodo, toggleCompleted } = useContext(TodoContext);

  return (
    <div className="bg-[#1F2123] rounded-lg p-8 flex items-center">
      <div className="flex w-full gap-5">
        <input
          className="size-8"
          type="checkbox"
          checked={completed}
          onChange={(event) => {
            toggleCompleted({ id, completed: event.target.checked });
          }}
        />
        <label className="">{title}</label>
      </div>
      <button
        className="bg-red-600 w-10"
        onClick={() => {
          removeTodo({ id });
        }}
      >
        ×
      </button>
    </div>
  );
};
