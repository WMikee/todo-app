import { type ListOfTodos } from "../types";
import { Todo } from "./Todo";

interface Props {
  todos: ListOfTodos;
}

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <div className="pt-6 px-4">
      <ul className="flex flex-col gap-3">
        {todos.map((todo) => (
          <li key={todo.id} className={`${todo.completed ? "completed" : ""}`}>
            <Todo
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
              title={todo.title}
            ></Todo>
          </li>
        ))}
      </ul>
    </div>
  );
};
