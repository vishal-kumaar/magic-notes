import React from "react";

export default function Footer(props) {
  return (
    <div className="fixed w-full bottom-0">
      <div
        className={`py-1 font-semibold text-center text-white ${
          props.mode === "light" ? "bg-gray-700" : "bg-gray-900"
        }`}
      >
        Copyright &copy; Magic Todo 2023
      </div>
    </div>
  );
}
