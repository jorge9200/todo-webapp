"use client";
import { ToDoItem } from "@/types/todos";
import { FormEventHandler, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../components/Modal";

type ToDo = {
  toDo: ToDoItem;
  index: number;
};

const ToDo: React.FC<ToDo> = ({ toDo, index }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [toDoValue, setToDoValue] = useState(toDo.title);
  const [toDoCompleted, setToDoCompleted] = useState(toDo.done);

  const handleSubmitEditToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({ ...toDo, title: toDoValue }),
    });
    setEditModalOpen(false);
  };

  const handleRemoveToDo = async () => {
    await fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({
        id: toDo.id,
      }),
    });
    setRemoveModalOpen(false);
  };

  const handleCompleteToDo = async (checked: boolean) => {
    setToDoCompleted(checked);
    await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({ ...toDo, done: checked }),
    });
    setEditModalOpen(false);
  };

  return (
    <tr key={toDo.id}>
      <th>{++index}</th>
      <td className="flex">
        <input
          type="checkbox"
          checked={toDoCompleted}
          className="checkbox checkbox-primary checkbox-sm"
          onChange={(e) => handleCompleteToDo(e.target.checked)}
        />
      </td>
      <td className="w-full">{toDo.title}</td>
      <td className="">
        <section className="flex place-content-around">
          <MdEdit
            id="editToDoButton"
            cursor="pointer"
            size={15}
            className="text-gray-500"
            onClick={() => setEditModalOpen(true)}
          />
          <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen}>
            <form onSubmit={handleSubmitEditToDo}>
              <h3 className="font-bold text-lg">Edit To-Do</h3>
              <section className="modal-action editToDo">
                <input
                  value={toDoValue}
                  onChange={(e) => setToDoValue(e.target.value)}
                  type="text"
                  placeholder="What do you need to do..."
                  className="input input-bordered w-full"
                />
                <button type="submit" className="btn btn-neutral">
                  Edit
                </button>
              </section>
            </form>
          </Modal>
          <FaRegTrashAlt
            id="removeToDoButton"
            cursor="pointer"
            size={15}
            className="text-red-600"
            onClick={() => setRemoveModalOpen(true)}
          />
          <Modal modalOpen={removeModalOpen} setModalOpen={setRemoveModalOpen}>
            <h3 className="text-lg">
              Are you sure, you want to remove this To-Do?
            </h3>
            <section className="modal-action removeToDo">
              <button onClick={handleRemoveToDo} className="btn btn-neutral">
                Yes
              </button>
              <button onClick={() => setRemoveModalOpen(false)} className="btn">
                No
              </button>
            </section>
          </Modal>
        </section>
      </td>
    </tr>
  );
};

export default ToDo;
