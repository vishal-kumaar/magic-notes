import React, { useContext, useState } from "react";
import leftArrow from "../assets/images/left_arrow.svg";
import saveLogo from "../assets/images/save.svg";
import lightMode from "../assets/images/light_mode.svg";
import darkMode from "../assets/images/dark_mode.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmAlert from "./ConfirmAlert";
import TokenContext from "../token/TokenContext";
import createNote from "../apis/createNote";

export default function CreateNote(props) {
  const { token } = useContext(TokenContext);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("Note");
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    const res = await createNote({ title, body }, token);
    if (res?.success) {
      toast("Note created successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });

      navigate(`/note/${res.note._id}`, { replace: true });
    } else {
      toast(res?.message, {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const handleBack = () => {
    if (title || (body && body !== "Note")) {
      setConfirmAlert(true);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <ConfirmAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        title="Unsaved changes"
        subtitle="Are you sure you want to discard this changes? Your changes will be lost forever."
        mode={props.mode}
        button1={{
          name: "Save",
          callback: () => {
            handleCreateNote();
            navigate(-1);
          },
        }}
        button2={{
          name: "Exit",
          callback: () => navigate(-1),
        }}
      />
      <>
        <div
          className={`flex items-center w-full sticky h-14 top-0 left-0 p-2 ${
            props.mode === "light" ? "bg-slate-400" : "bg-black"
          }`}>
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
              className={`ml-3 text-3xl font-signika outline-none w-full bg-transparent ${
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
              onClick={() => handleCreateNote()}
            />
          </div>
        </div>
        <div
          className={`pt-2 min-h-[calc(100vh-56px)] bg-transparent font-firasans font-medium px-11 text-xl outline-none ${
            props.mode === "light"
              ? "text-black placeholder:text-black/60"
              : "text-white placeholder:text-white/60"
          } bg-transparent h-full w-full resize-none`}
          style={{
            whiteSpace: "pre-wrap",
          }}
          contentEditable={true}
          onBlur={(event) => setBody(event.target.textContent)}>
          {body}
        </div>
      </>
    </>
  );
}
