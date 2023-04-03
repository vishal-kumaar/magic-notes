import React, { useEffect, useState } from "react";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";
import lightMode from "../assets/images/light_mode.svg";
import darkMode from "../assets/images/dark_mode.svg";
import { useParams, useNavigate } from "react-router-dom";
import putData from "../utils/putData";
import getData from "../utils/getData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import ConfirmAlert from "./ConfirmAlert";

export default function Note(props) {
  const [isLoading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [editTime, setEditTime] = useState();
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
      const date = new Date(res.note.updatedAt);
      setEditTime(editDate(date));
    } else {
      toast(res.message, {
        theme: props.mode,
        type: "error",
        autoClose: 1500,
      });
    }
  };

  const getNote = async () => {
    setLoading(true);
    const res = await getData(`/api/note/getNote/${noteId}`);
    if (res.success === true) {
      const date = new Date(res.note.updatedAt);

      setTitle(res.note.title);
      setBody(res.note.body);
      setEditTime(editDate(date));
    }

    setLoading(false);
  };

  const editDate = (date) => {
    return `Edited on ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()} ${(
      "0" + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
    ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)} ${
      date.getHours() >= 12 ? "PM" : "AM"
    }`;
  };

  const handleBack = async () => {
    const res = await getData(`/api/note/getNote/${noteId}`);
    let saved = true;
    if (res.success === true) {
      if (res.note.title !== title || res.note.body !== body) {
        saved = false;
      }
    }

    if (saved) {
      navigate(-1);
    } else {
      setConfirmAlert(true);
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
            editNote();
            navigate(-1);
          },
        }}
        button2={{
          name: "Exit",
          callback: () => navigate(-1),
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
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
                  props.mode === "light"
                    ? "text-black placeholder:text-black/60"
                    : "text-white placeholder:text-white/60"
                }`}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Title"
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
                onClick={() => editNote()}
              />
            </div>
          </div>
          <div className="mt-14 mb-6 h-full">
            <textarea
              className={`pt-2 bg-transparent px-11 text-2xl font-semibold outline-none ${
                props.mode === "light"
                  ? "text-black placeholder:text-black/60"
                  : "text-white placeholder:text-white/60"
              } bg-transparent h-full w-full resize-none`}
              defaultValue={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Note"
            ></textarea>
          </div>
          <div
            className={`fixed bottom-0 left-0 w-full h-6 text-center text-sm font-thin font-mono ${
              props.mode === "light"
                ? "bg-gray-200 text-black"
                : "bg-gray-900 text-white"
            }`}
          >
            {editTime}
          </div>
        </div>
      )}
    </>
  );
}
