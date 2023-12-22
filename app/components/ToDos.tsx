import { ToDoItem } from "@/types/todos";
import AddTodo from "./AddTodo";
import ToDoList from "./TodoList";

export default async function ToDos() {
  const response = await fetch("http://localhost:3000/api", {
    cache: "no-store",
  });
  const todos: ToDoItem[] = await response.json();

  return (
    <section className="text-center my-5 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <AddTodo />
      <ToDoList toDos={todos} />
    </section>
  );
}
