import React from "react";

export default function Footer(props) {
  return (
    <div className="fixed font-poppins w-full bottom-0">
      <div
        className={`py-2 font-medium text-center text-white ${
          props.mode === "light" ? "bg-gray-700" : "bg-gray-900"
        }`}
      >
        Copyright &copy; Magic Notes 2023
      </div>
    </div>
  );
}
