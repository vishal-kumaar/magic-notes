import React, { useEffect, useState } from "react";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";
import colorMode from "../assets/images/color_mode.png";
import { useParams, useNavigate } from "react-router-dom";
import putData from "../utils/putData";
import getData from "../utils/getData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Note(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { noteId } = useParams();
  const navigate = useNavigate();

  const editNote = async () => {
    const data = {
      title,
      body,
    };
    const res = await putData(`/api/note/editNote/${noteId}`, data);

    if (res.success === true) {
      setTitle(res.note.title);
      setBody(res.note.body);
      toast("Saved", {
        theme: props.mode,
        type: "success",
        autoClose: 1500,
      });
    } else {
      toast(res.message, {
        theme: props.mode,
        type: "error",
        autoClose: 1500,
      });
    }
  };

  const getNote = async () => {
    const res = await getData(`/api/note/getNote/${noteId}`);
    if (res.success === true) {
      setTitle(res.note.title);
      setBody(res.note.body);
    }
  };

  useEffect(
    () => {
      getNote();
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="box-border">
      <ToastContainer />
      <div
        className={`flex items-center w-full sticky h-[8vh] top-0 justify-between p-2 ${
          props.mode === "light" ? "bg-slate-400" : "bg-black"
        }`}
      >
        <div className="flex items-center">
          <img
            src={leftArrow}
            alt="back-button"
            className={`w-6 cursor-pointer ${
              props.mode === "light" ? "invert-0" : "invert"
            }`}
            onClick={() => navigate(-1)}
          />
          <h1
            className={`ml-3 text-3xl font-bold outline-none ${
              props.mode === "light" ? "text-black" : "text-white"
            }`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(event) => setTitle(event.target.innerText)}
          >
            {title}
          </h1>
        </div>
        <div className="flex">
          <img
            src={colorMode}
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
            onClick={() => editNote()}
          />
        </div>
      </div>
      <div className="">
        <textarea
          type="text"
          className={`pt-4 px-8 text-2xl font-semibold outline-none ${
            props.mode === "light" ? "text-black" : "text-white"
          } bg-transparent h-[91.1vh] w-full resize-none`}
          defaultValue={body}
          onBlur={(event) => setBody(event.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
