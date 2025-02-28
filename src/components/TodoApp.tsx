import { Todos } from "./Todos";
import { useContext, useState, useRef } from "react";
import { TodoContext } from "../context/TodoContext";
import { type FilterValue, type Todo as TodoType } from "../types";
import { TODO_FILTERS } from "../consts";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { reordered } from "../services/reordered";

function TodoApp() {
  const { todos, setTodos } = useContext(TodoContext);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );
  const [isOrdered, setIsOrdered] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const previousTodosRef = useRef<TodoType[]>(todos);

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) {
      return !todo.completed;
    }
    if (filterSelected === TODO_FILTERS.COMPLETED) {
      return todo.completed;
    }
    return todo;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  const completedCount = todos.length - activeCount;

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = (title: Pick<TodoType, "title">) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title.title,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleOrdering = async () => {
    try {
      if (!todos.length) return;

      setIsLoading(true);

      const todosTitle = todos.map((todo) => todo.title);
      const reorderedTodos = await reordered(todosTitle);

      if (!reorderedTodos) {
        console.warn("Did not receive a valid response from the AI.");
      } else {
        const reorderedList = reorderedTodos
          .split(",")
          .map((num) => Number(num.trim()));
        const newTodos = reorderedList
          .map((index) => todos[index - 1])
          .filter((todo) => todo);

        previousTodosRef.current = todos;
        setTodos(newTodos);
        setIsOrdered(true);
      }
    } catch (error) {
      console.error("Reordering failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-[1.2rem] max-w-180 justify-center mx-auto">
      <Header onAddTodo={handleAddTodo} />
      <section className="relative my-2 mx-2">
        <button
          className={`absolute right-0 rounded-full ${
            isLoading ? "p-1" : "p-2"
          } ${isOrdered ? "bg-[#1E5CE3]" : "bg-[#262A32]"}`}
          onClick={() => {
            if (isOrdered) {
              setTodos(previousTodosRef.current);
              setIsOrdered(false);
            } else {
              handleOrdering();
            }
          }}
        >
          {isLoading ? (
            <img src="/preload.svg" alt="Icon" className="w-5 h-5" />
          ) : (
            <img src="/down-row.svg" alt="Icon" className="w-3 h-3" />
          )}
        </button>
        <h2 className="relative -bottom-0.5 flex w-32 px-6 py-1 bg-[#262A2F] rounded-tl-2xl rounded-tr-2xl">
          List
        </h2>
        <div className=" bg-[#262A2F] min-h-screen rounded-tr-3xl min-w-80">
          <Todos todos={filteredTodos}></Todos>
        </div>
      </section>
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onclearClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  );
}

export default TodoApp;
