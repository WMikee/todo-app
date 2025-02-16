import { Todos } from "./Todos";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { type FilterValue, type Todo as TodoType } from "../types";
import { TODO_FILTERS } from "../consts";
import { Footer } from "./Footer";
import { Header } from "./Header";

function TodoApp() {
  const { todos, setTodos } = useContext(TodoContext);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

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

  return (
    <div className="todoapp-container">
      <Header onAddTodo={handleAddTodo} />
      <Todos todos={filteredTodos}></Todos>
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
