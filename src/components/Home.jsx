import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteLogo from "../assets/images/delete.svg";
import notesIcon from "../assets/images/notes_icon.svg"
import TodoForm from "./TodoForm";
import getData from "../utils/getData";

export default function Todos(props) {
  const [formVisibility, setFormVisibility] = useState("hidden");
  const [todos, setTodos] = useState(null);

  const getAllTodo = async () => {
    const res = await getData("/api/todo");
    if (res.success === true){
      setTodos(res.todos);
    }
  }

  useEffect(()=>{
    getAllTodo();
  }, [todos]);
  
  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className={`font-extrabold font-sans text-3xl ${props.mode==="light" ? "text-black" : "text-white"}`}>
          All Todos
        </h1>
        <button className="bg-green-500 px-3 py-2 rounded-md text-white font-semibold shadow-md" onClick={
          () => {
            if (formVisibility === "hidden"){
              setFormVisibility("block");
            }else{
              setFormVisibility("hidden");
            }
          }
        }>
          {formVisibility==="hidden" ? "Create New Todo" : "Done"}
        </button>
      </div>
      <hr />
      <TodoForm mode={props.mode} visible={formVisibility}/>
      {
        todos === null ?
        (
          <div className={`flex flex-col items-center mt-28`}>
            <img src={notesIcon} alt="notes-icon" className={`w-14 h-14 ${props.mode==="light"? "invert-0" : "invert"}`} />
            <div className={`font-normal text-2xl mt-2 ${props.mode === "light" ? "text-black" : "text-white"}`}>Nothing to show add you first todo</div>
          </div>
        )
         : 
        todos.map((todo) => (
            <div className={`my-5 pl-2 pt-2 shadow-md rounded-lg overflow-hidden ${props.mode==="light" ? "bg-gray-100" : " bg-gray-700"}`}>
          <div className="flex justify-between">
            <div className="">
              <input type="checkbox" className="w-4 h-4" checked={todo.checked} />
              <div className={`inline ml-2 text-xl font-bold font-[serif] ${props.mode==="light" ? "text-black" : "text-white"}`}>{todo.title}</div>
            </div>
            <div>
              <img src={deleteLogo} alt="delete-button" className={`inline mx-2 ${props.mode==="light" ? "invert-0" : "invert"}`} />
            </div>
          </div>
          <Link to={"/todo"}>
            <p className="h-28 pr-1 ml-6">
              {/* <div className={`text-lg font-[serif] ${props.mode==="light" ? "text-gray-500" : "text-gray-300"}`}>Task 1</div>
              <div className={`text-lg font-[serif] ${props.mode==="light" ? "text-gray-500" : "text-gray-300"}`}>Task 2</div>
              <div className={`text-lg font-[serif] ${props.mode==="light" ? "text-gray-500" : "text-gray-300"}`}>Task 3</div> */}
              {todo.task}
            </p>
          </Link>
        </div>
        ))
      }
    </div>
  );
}