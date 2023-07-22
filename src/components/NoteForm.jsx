import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import createNote from "../apis/createNote";
import TokenContext from "../token/TokenContext";

export default function NoteForm(props) {
  const {token} = useContext(TokenContext);
  const [title, setTitle] = useState("");

  const handleCreateNote = async () => {
    const res = await createNote(title, token);
    if (res?.success) {
      toast("Note created successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });

      setTitle("");

      if (props.notes === null) {
        props.setNotes([res.note]);
      }
    } else if (res?.message === "Not authorized to access this route") {
      toast("Please login to access this", {
        theme: props.mode,
        type: "warning",
        autoClose: 2000,
      });
    } else {
      toast("Something went wrong", {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
    handleCreateNote();
  };
  return (
    <div className={props.visible}>
      <form
        className={`flex items-center justify-between border-2 p-2 rounded-xl border-gray-400 mt-4 ${
          props.mode === "light" ? "bg-white" : "bg-gray-900"
        }`}
        onSubmit={handleForm}>
        <div className="w-full">
          <input
            type="text"
            placeholder="Title..."
            className={`outline-none w-full p-1 text-lg font-firasans bg-transparent ${
              props.mode === "light"
                ? "placeholder:text-gray-500 text-gray-500 "
                : "placeholder:text-white text-white "
            }`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="px-3.5 py-2 text-base bg-blue-600 text-white rounded font-roboto">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
