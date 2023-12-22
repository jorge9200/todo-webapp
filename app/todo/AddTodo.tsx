"use client";
import { FormEventHandler, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";

const AddTodo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newToDoValue, setNewToDoValue] = useState("");

  const handleSubmitNewToDo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        title: newToDoValue,
        done: false,
      }),
    });
    setNewToDoValue("");
    setModalOpen(false);
  };

  return (
    <section>
      <button
        className="btn btn-primary w-full"
        onClick={() => setModalOpen(true)}
      >
        New To-Do <FaPlus size={15} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewToDo}>
          <h3 className="font-bold text-lg">Add New To-Do</h3>
          <section className="modal-action">
            <input
              value={newToDoValue}
              onChange={(e) => setNewToDoValue(e.target.value)}
              type="text"
              placeholder="What do you need to do..."
              className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </section>
        </form>
      </Modal>
    </section>
  );
};

export default AddTodo;
