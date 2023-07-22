import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import deleteLogo from "../assets/images/delete.svg";
import notesIcon from "../assets/images/notes_icon.svg";
import { toast } from "react-toastify";
import Loading from "./Loading";
import ConfirmAlert from "./ConfirmAlert";
import checkNote from "../apis/checkNote";
import deleteNote from "../apis/deleteNote";
import TokenContext from "../token/TokenContext";

export default function NotesList(props) {
  const { token } = useContext(TokenContext);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const handleCheckNote = async (noteId) => {
    const res = await checkNote(noteId, token);
    if (res?.success) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "warning",
        autoClose: 200,
      });
    }
  };

  const handleDeleteNote = async () => {
    const res = await deleteNote(deleteNoteId, token);
    if (res?.success) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "error",
        autoClose: 2000,
      });
    } else {
      toast("Deleted Successfully", {
        theme: props.mode,
        type: "success",
        autoClose: 2000,
      });
      setDeleteNoteId(null);
    }
  };
  return (
    <>
      <ConfirmAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        title="Confirm delete"
        subtitle="Are you sure you want delete this?"
        mode={props.mode}
        button1={{
          name: "Delete",
          callback: handleDeleteNote,
        }}
        button2={{
          name: "Cancel",
          callback: () => () => setDeleteNoteId(null),
        }}
      />
      {props.isLoading ? (
        <Loading height={"half"} />
      ) : (
        <div>
          {props.notes === null ? (
            <div className={`flex flex-col items-center mt-28`}>
              <img
                src={notesIcon}
                alt="notes-icon"
                className={`w-14 h-14 ${
                  props.mode === "light" ? "invert-0" : "invert"
                }`}
              />
              <div
                className={`font-normal font-firasans text-xl mt-2 ${
                  props.mode === "light" ? "text-black" : "text-white"
                }`}>
                Nothing to show add you first note
              </div>
            </div>
          ) : (
            props.notes.map((note) => (
              <div
                className={`my-5 pl-2 pt-2 shadow-md rounded-lg overflow-hidden ${
                  props.mode === "light" ? "bg-gray-100" : " bg-gray-700"
                }`}
                key={note._id}>
                <div className="flex items-center">
                  <div className="flex items-center w-full">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer"
                      checked={note.checked}
                      onChange={() => handleCheckNote(note._id)}
                    />
                    <Link
                      to={`/note/${note._id}`}
                      className={`w-full outline-none`}>
                      <input
                        className={`inline ml-2 text-xl w-full font-signika pointer-events-none bg-transparent outline-none font-bold ${
                          props.mode === "light" ? "text-black" : "text-white"
                        }`}
                        value={note.title}
                        readOnly={true}
                      />
                    </Link>
                  </div>
                  <div>
                    <img
                      src={deleteLogo}
                      alt="delete-button"
                      className={`inline ml-3 mr-2 cursor-pointer ${
                        props.mode === "light" ? "invert-0" : "invert"
                      }`}
                      onClick={() => {
                        setConfirmAlert(true);
                        setDeleteNoteId(note._id);
                      }}
                    />
                  </div>
                </div>
                <Link to={`/note/${note._id}`} className="outline-none">
                  <p
                    className={`bg-transparent w-full font-firasans line-clamp-5 mb-2 pr-14 ml-6 ${
                      props.mode === "light" ? "text-black" : "text-gray-300"
                    }`}
                    style={{
                      whiteSpace: "pre-wrap",
                    }}>
                    {note.body}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
