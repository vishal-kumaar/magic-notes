import React from "react";

export default function ConfirmAlert(props) {
  return (
    <>
      <div
        className={`w-full h-screen absolute top-0 left-0 z-40 bg-black/70 ${
          props.confirmAlert ? "translate-y-0" : "-translate-y-full"
        }`}
      ></div>
      <div
        className={`w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center ${
          props.confirmAlert ? "translate-y-0" : "-translate-y-full"
        } transition ease-in-out duration-700`}
      >
        <div
          className={`bg-white shadow-2xl px-10 py-8 rounded-lg ${
            props.mode === "dark"
              ? "bg-gray-700 text-white"
              : "bg-white text-black"
          }`}
        >
          <h1 className="font-bold text-2xl mb-3">{props.title}</h1>
          <hr />
          <p className="text-base font-medium mt-3 mb-14">{props.subtitle}</p>
          <div className="text-right">
          <button
            className="font-bold border border-gray-400 text-base px-4 py-1 rounded-3xl"
            onClick={() => {
              props.setConfirmAlert(false);
              props.callback2 && props.callback2();
            }}
          >
            Cancal
          </button>
          <button
            className="bg-green-700 text-white font-medium border border-green-700 text-base px-7 py-1 rounded-3xl ml-4"
            onClick={() => {
              props.setConfirmAlert(false);
              props.callback1 && props.callback1();
            }}
          >
            OK
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
