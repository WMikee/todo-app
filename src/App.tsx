import TodoApp from "./components/TodoApp";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <TodoProvider>
      <h1>free</h1>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
