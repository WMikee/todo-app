import { useContext } from "react";
import { type Todo as TodoType } from "../types";
import { TodoContext } from "../context/TodoContext";

export const Todo: React.FC<TodoType> = ({ id, title, completed }) => {
  const { removeTodo, toggleCompleted } = useContext(TodoContext);

  return (
    <div className="todo-container">
      <div className="label-container">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={(event) => {
            toggleCompleted({ id, completed: event.target.checked });
          }}
        />
        <label className="">{title}</label>
      </div>
      <button
        className="destroy"
        onClick={() => {
          removeTodo({ id });
        }}
      >
        ×
      </button>
    </div>
  );
};
