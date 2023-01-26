import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left_arrow.svg";
import putData from "../utils/putData";
import getData from "../utils/getData";

export default function Login(props) {
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const updateName = async () => {
    const data = {
      newName,
      password
    }

    const res1 = await getData("/api/auth/profile");
    if (res1.success === true){
      const res2 = await putData(`/api/auth/username/update/${res1.user._id}`, data);
      if (res2.success === true){
        alert("Name successfully updated")
        navigate("/profile")
      }
      else {
        alert(res2.message);
      }
    }
    else {
      alert(res1.message);
    }
  }

  const handleForm = (event) => {
    event.preventDefault();
    updateName();
  }

  return (
    <div>
      <div className="mt-4 ml-2">
        <Link to="/profile">
          <img
            src={leftArrow}
            alt="left-arrow"
            className={`w-7 h-7 ${
              props.mode === "light" ? "invert-0" : "invert"
            }`}
          />
        </Link>
      </div>
      <form className="mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-72 2xl:mx-96 my-28" onSubmit={handleForm}>
        <div
          className={`font-extrabold text-2xl mb-7 text-center ${
            props.mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Update Username
        </div>
        <div className="my-6">
          <input
            type="text"
            placeholder="Enter new name"
            className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
              props.mode === "light"
                ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
            }`}
            value={newName}
            onChange={(event) => {setNewName(event.target.value)}}
          />
        </div>
        <div className="my-6">
          <input
            type="password"
            placeholder="Enter password"
            className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
              props.mode === "light"
                ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
            }`}
            value={password}
            onChange={(event) => {setPassword(event.target.value)}}
          />
        </div>
        <div className="my-6">
          <button
            type="submit"
            className={`w-full py-3 rounded-3xl font-semibold text-lg bg-blue-500 text-white shadow-lg`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}