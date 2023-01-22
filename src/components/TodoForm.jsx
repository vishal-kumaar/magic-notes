import React from "react";

export default function TodoForm(props) {
  return (
    <div className={props.visible}>
      <form
        className={`flex items-center justify-between border-2 p-2 rounded-xl border-gray-400 mt-4 ${
          props.mode === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <div>
          <input
            type="text"
            placeholder="Add title..."
            className={`outline-none w-full p-1 text-lg sm:w-96 lg:w-[40rem] xl:w-[60rem] 2xl:w-[70rem] font-mono bg-transparent ${
              props.mode === "light"
                ? "placeholder:text-gray-500 text-gray-500 "
                : "placeholder:text-white text-white "
            }`}
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="px-3 py-1 text-lg bg-blue-600 text-white rounded font-mono"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
