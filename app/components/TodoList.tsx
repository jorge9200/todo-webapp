import { ToDoItem } from "@/types/todos";
import ToDo from "./todo";

type TodoList = {
  toDos: ToDoItem[];
};

const ToDoList: React.FC<TodoList> = ({ toDos }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((toDo, i) => (
            <ToDo key={toDo.id} toDo={toDo} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
