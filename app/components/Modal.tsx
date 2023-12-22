import { Children, Dispatch, SetStateAction } from "react";

type Modal = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal: React.FC<Modal> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <dialog
      id="my_modal_2"
      className={`modal ${modalOpen ? "modal-open" : ""}`}
    >
      <section className="modal-box">{children}</section>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setModalOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
