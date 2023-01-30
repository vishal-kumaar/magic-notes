import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import getData from "../utils/getData";
import TodoList from "./TodoList";

export default function Todos(props) {
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [todos, setTodos] = useState(null);

  const getTodos = async () => {
    const res = await getData("/api/todo");
    if (res.success === true) {
      setTodos(res.todos);
    } else {
      setTodos(null);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h1
          className={`font-extrabold font-sans text-3xl ${
            props.mode === "light" ? "text-black" : "text-white"
          }`}
        >
          All Todos
        </h1>
        <button
          className="bg-green-500 px-3 py-2 rounded-md text-white font-semibold shadow-md"
          onClick={() => {
            if (formVisibility === "hidden") {
              setFormVisibility("block");
            } else {
              setFormVisibility("hidden");
            }
          }}
        >
          {formVisibility === "hidden" ? "Create New Todo" : "Done"}
        </button>
      </div>
      <hr />
      <TodoForm
        mode={props.mode}
        visible={formVisibility}
        setTodos={setTodos}
      />
      <TodoList mode={props.mode} todos={todos} />
    </div>
  );
}
