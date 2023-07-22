import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import SearchNotes from "./SearchNotes";
import Footer from "./Footer";
import deleteLogo from "../assets/images/delete.svg";
import notFound from "../assets/images/not_found.svg";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import ConfirmAlert from "./ConfirmAlert";
import { toast } from "react-toastify";
import searchNotes from "../apis/searchNotes";
import checkNote from "../apis/checkNote";
import deleteNote from "../apis/deleteNote";
import TokenContext from "../token/TokenContext";

export default function SearchResult(props) {
  const { token } = useContext(TokenContext);
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);

  const handleSearchNotes = async () => {
    const input = queryParams.get("input");
    const res = await searchNotes(input, token);
    if (res.success) {
      setNotes(res.notes);
    } else {
      if (notes === null) {
        setNotes([]);
      } else {
        setNotes(null);
      }
    }
    setLoading(false);
  };

  const handleCheckNote = async (noteId) => {
    const res = await checkNote(noteId, token);
    if (res.success) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "warning",
        autoClose: 200,
      });
    }
  };

  const handleDeleteNote = async () => {
    const res = await deleteNote(deleteNoteId, token);
    if (res.success === false) {
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
      setNotes(
        notes.filter((note) => {
          return note && note._id !== res.note._id;
        })
      );
      setDeleteNoteId(null);
    }
  };

  useEffect(
    () => {
      handleSearchNotes();
    },
    // eslint-disable-next-line
    [notes]
  );

  return (
    <div className="flex flex-col min-h-screen">
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
      <Navbar
        mode={props.mode}
        toggleMode={props.toggleMode}
        title="Magic Notes"
      />
      <div
        className={`flex flex-col flex-grow my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28`}>
        <SearchNotes
          mode={props.mode}
          setSearchParams={setSearchParams}
          focus={true}
        />
        {isLoading ? (
          <Loading height={"half"} />
        ) : (
          <div>
            {notes === null || notes.length === 0 ? (
              <div className={`flex flex-col items-center mt-16`}>
                <img src={notFound} alt="not-found" className={`w-60 h-60`} />
                <div
                  className={`font-firasans text-2xl mt-2 ${
                    props.mode === "light" ? "text-black" : "text-white"
                  }`}>
                  No result found
                </div>
              </div>
            ) : (
              notes.map((note) => (
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
                          className={`inline font-signika ml-1 text-xl outline-none pointer-events-none w-full bg-transparent ${
                            props.mode === "light" ? "text-black" : "text-white"
                          }`}
                          value={note.title}
                          onChange={() => {}}
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
      </div>
      <Footer mode={props.mode} />
    </div>
  );
}
