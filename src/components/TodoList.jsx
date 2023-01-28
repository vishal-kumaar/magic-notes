import React from "react";
import { Link } from "react-router-dom";
import deleteLogo from "../assets/images/delete.svg";
import notesIcon from "../assets/images/notes_icon.svg";
import putData from "../utils/putData";
import deleteData from "../utils/deleteData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoList(props) {
  const checkTodo = async (todoId) => {
    const res = await putData(`/api/todo/checkTodo/${todoId}`);
    if (res.success === false) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "warning",
        autoClose: 200,
      });
    }
  };

  const deleteTodo = async (todoId) => {
    const res = await deleteData(`/api/todo/deleteTodo/${todoId}`);
    if (res.success === false) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    } else {
      toast("Deleted Successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      {props.todos === null ? (
        <div className={`flex flex-col items-center mt-28`}>
          <img
            src={notesIcon}
            alt="notes-icon"
            className={`w-14 h-14 ${
              props.mode === "light" ? "invert-0" : "invert"
            }`}
          />
          <div
            className={`font-normal text-2xl mt-2 ${
              props.mode === "light" ? "text-black" : "text-white"
            }`}
          >
            Nothing to show add you first todo
          </div>
        </div>
      ) : (
        props.todos.map((todo) => (
          <div
            className={`my-5 pl-2 pt-2 shadow-md rounded-lg overflow-hidden ${
              props.mode === "light" ? "bg-gray-100" : " bg-gray-700"
            }`}
            key={todo._id}
          >
            <div className="flex justify-between">
              <div className="">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={todo.checked}
                  onChange={() => checkTodo(todo._id)}
                />
                <div
                  className={`inline ml-2 text-xl font-bold font-[serif] ${
                    props.mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {todo.title}
                </div>
              </div>
              <div>
                <img
                  src={deleteLogo}
                  alt="delete-button"
                  className={`inline mx-2 cursor-pointer ${
                    props.mode === "light" ? "invert-0" : "invert"
                  }`}
                  onClick={() => deleteTodo(todo._id)}
                />
              </div>
            </div>
            <Link to={`/todo/${todo._id}`}>
              <p className="h-28 pr-1 ml-6">
                {todo.task}
              </p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
