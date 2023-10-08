import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import moment from "moment";
import { MdOutlineUpdate } from "react-icons/md";

const SingleTodo = ({
  isListView,
  todo,
  setTodoToShow,
  setTodoToBeUpdated,
  setTodoIdToBeDeleted,
  updateTodoModal,
  todoDetailModal,
  confirmModal,
}) => {
  const handleCheckIsTodoMissed = (actualDate) => {
    const currentTime = new Date().getTime();
    const actualTime = new Date(actualDate).getTime();

    if (actualTime < currentTime) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div>
        <span
          className={` ${
            todo?.status === "completed" ? "text-decoration-line-through" : ""
          }`}
        >
          {todo?.title}
        </span>
        {isListView && (
          <span
            className={`badge rounded-pill ${
              todo?.status === "completed"
                ? "bg-success"
                : todo?.status === "todo"
                ? "bg-secondary"
                : "bg-warning"
            } text-light justify-self-center ms-2`}
          >
            {todo?.status}
          </span>
        )}
      </div>
      <div className="btns">
        {isListView && (
          <div className="btn-group" role="group" aria-label="Todo Actions">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => {
                setTodoToShow(todo);
                todoDetailModal.openModal();
              }}
            >
              <GrView fontSize={20} />
            </button>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                setTodoToBeUpdated(todo);
                updateTodoModal.openModal();
              }}
            >
              <BiEdit fontSize={20} />
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                setTodoIdToBeDeleted(todo?._id);
                confirmModal.openModal();
              }}
            >
              <AiFillDelete fontSize={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleTodo;
