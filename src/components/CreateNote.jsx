import React, { useState } from "react";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";
import lightMode from "../assets/images/light_mode.svg";
import darkMode from "../assets/images/dark_mode.svg";
import { useNavigate } from "react-router-dom";
import postData from "../utils/postData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmAlert from "./ConfirmAlert";

export default function CreateNote(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [confirmAlert, setConfirmAlert] = useState(false);
  const navigate = useNavigate();

  const createNote = async () => {
    const res = await postData("/api/note/createNote", { title, body });
    if (res.success === true) {
      toast("Note created successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });
      navigate(res.note._id);
    } 
    else {
      toast(res.message, {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const handleBack = () => {
    if (!title && !body){
        navigate(-1);
    }
    else{
        setConfirmAlert(true);
    }
  }

  return (
    <>
      <ToastContainer />
      <ConfirmAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        title="Unsaved changes"
        subtitle="Are you sure you want to discard this changes? Your changes will be lost forever."
        mode={props.mode}
        button1={{
          name: "Save",
          callback: () => {
            createNote();
            navigate(-1);
          },
        }}
        button2={{
          name: "Exit",
          callback: () => navigate(-1),
        }}
      />
      <div className="flex flex-col h-screen">
        <div
          className={`flex items-center w-full fixed h-14 top-0 left-0 p-2 ${
            props.mode === "light" ? "bg-slate-400" : "bg-black"
          }`}
        >
          <div className="flex items-center w-full">
            <img
              src={leftArrow}
              alt="back-button"
              className={`w-6 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={handleBack}
            />
            <input
              className={`ml-3 text-3xl font-bold outline-none w-full bg-transparent ${
                props.mode === "light" ? "text-black placeholder:text-black/60" : "text-white placeholder:text-white/60"
              }`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Edit title"
            />
          </div>
          <div className="flex">
            <img
              src={props.mode === "dark" ? lightMode : darkMode}
              alt="color-mode"
              className={`w-7 h-7 mx-2 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={props.toggleMode}
            />
            <img
              src={saveLogo}
              alt="save-button"
              className={`w-7 h-7 mx-1 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={() => {
                createNote();
              }}
            />
          </div>
        </div>
        <div className="mt-14 mb-6 h-full">
          <textarea
            className={`pt-2 bg-transparent px-11 text-2xl font-semibold outline-none ${
              props.mode === "light" ? "text-black placeholder:text-black/60" : "text-white placeholder:text-white/60"
            } bg-transparent h-full w-full resize-none`}
            defaultValue={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Edit body"
          ></textarea>
        </div>
        <div
          className={`fixed bottom-0 left-0 w-full h-6 text-center text-sm font-thin font-mono ${
            props.mode === "light"
              ? "bg-gray-200 text-black"
              : "bg-gray-900 text-white"
          }`}
        >
        </div>
      </div>
    </>
  );
}
