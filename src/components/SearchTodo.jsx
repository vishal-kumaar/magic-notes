import React from "react";
import searchLogo from "../assets/images/search.svg";

export default function SearchTodo(props) {
  return (
    <form
      className={`flex items-center justify-between border-2 p-2 rounded-xl border-gray-400 ${
        props.mode === "light" ? "bg-white" : "bg-gray-900"
      }`}
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Search..."
          className={`outline-none w-full p-1 text-lg font-mono  bg-transparent ${
            props.mode === "light"
              ? " text-gray-500 placeholder:text-gray-500"
              : "text-white placeholder:text-white"
          }`}
        />
      </div>
      <div className="">
        <button type="submit" className="px-3 py-1">
          <img
            src={searchLogo}
            alt="search-logo"
            className={`w-6 h-6 ${
              props.mode === "light" ? "invert-0" : "invert"
            }`}
          />
        </button>
      </div>
    </form>
  );
}
