import React from "react";
import warningIcon from "../assets/images/warning.svg";

export default function ConfirmDelete(props) {
  const yesButton = () => {
    props.setConfirmDelete(false);
    props.delete();
  };

  const cancelButton = () => {
    props.setConfirmDelete(false);
  };

  return (
    <>
      <div
        className={`w-full h-screen absolute top-0 left-0 z-40 bg-black/70 ${
          props.confirmDelete ? "translate-y-0" : "-translate-y-full"
        }`}
      ></div>
      <div
        className={`w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center ${
          props.confirmDelete ? "translate-y-0" : "-translate-y-full"
        } transition ease-in-out duration-700`}
      >
        <div
          className={`bg-white shadow-2xl text-center px-10 py-5 rounded-lg ${
            props.mode === "dark"
              ? "bg-gray-700 text-white"
              : "bg-white text-black"
          }`}
        >
          <img
            src={warningIcon}
            alt="warning-icon"
            className="w-20 inline mb-3"
          />
          <h1 className="font-bold text-xl">Are you sure?</h1>
          <p className="text-sm font-normal mb-5">
            You won't be able to revert this!
          </p>
          <button
            className="bg-blue-500 text-white text-sm px-6 py-1 rounded mx-1"
            onClick={yesButton}
          >
            Yes, delete it!
          </button>
          <button
            className="bg-red-500 text-white text-sm px-6 py-1 rounded mx-1"
            onClick={cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
