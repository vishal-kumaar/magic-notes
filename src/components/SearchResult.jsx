import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import SearchTodo from "./SearchTodo";
import Footer from "./Footer";
import deleteLogo from "../assets/images/delete.svg";
import notFound from "../assets/images/not_found.svg";
import getData from "../utils/getData";
import putData from "../utils/putData";
import deleteData from "../utils/deleteData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchResult(props) {
  const [todos, setTodos] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  
  const searchTodo = async () => {
    const input = queryParams.get("input");
    const res = await getData(`/api/todo/search?input=${input}`);
    if (res.success === true) {
      setTodos(res.todos);
    } else {
        if (todos === null){
            setTodos([]);
        }
        else{
            setTodos(null)
        }
    }
  };

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
      setTodos(
        todos.filter((todo) => {
          return todo && todo._id !== res.todo._id;
        })
      );
    }
  };
  
  useEffect(() => {
    searchTodo();
  }, 
  // eslint-disable-next-line
  [todos]);

  return (
    <>
      <Navbar
        mode={props.mode}
        toggleMode={props.toggleMode}
        title="Magic Todo"
      />
      <div className="flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28">
        <SearchTodo
          mode={props.mode}
          setSearchParams={setSearchParams}
          focus={true}
        />
        <div>
          <ToastContainer />
          {todos === null || todos.length === 0 ? (
            <div className={`flex flex-col items-center mt-16`}>
              <img src={notFound} alt="not-found" className={`w-60 h-60`} />
              <div
                className={`font-normal text-2xl mt-2 ${
                  props.mode === "light" ? "text-black" : "text-white"
                }`}
              >
                No result found
              </div>
            </div>
          ) : (
            todos.map((todo) => (
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
                  <div
                    className={`bg-transparent overflow-hidden h-32 mr-4 ml-6`}
                  >
                    {todo.task.split("\n").map((line, index) => (
                      <p
                        key={index}
                        className={`${
                          props.mode === "light"
                            ? "text-black"
                            : "text-gray-300"
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer mode={props.mode} />
    </>
  );
}
