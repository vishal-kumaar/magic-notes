import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import SearchNotes from "./SearchNotes";
import Footer from "./Footer";
import deleteLogo from "../assets/images/delete.svg";
import notFound from "../assets/images/not_found.svg";
import getData from "../utils/getData";
import putData from "../utils/putData";
import deleteData from "../utils/deleteData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

export default function SearchResult(props) {
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);

  const searchNotes = async () => {
    const input = queryParams.get("input");
    const res = await getData(`/api/note/search?input=${input}`);
    if (res.success === true) {
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

  const checkNote = async (noteId) => {
    const res = await putData(`/api/note/checkNote/${noteId}`);
    if (res.success === false) {
      toast("Something went wrong", {
        theme: props.mode,
        type: "warning",
        autoClose: 200,
      });
    }
  };

  const deleteNote = async (noteId) => {
    const res = await deleteData(`/api/note/deleteNote/${noteId}`);
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
    }
  };

  useEffect(
    () => {
      searchNotes();
    },
    // eslint-disable-next-line
    [notes]
  );

  return (
    <>
      <Navbar
        mode={props.mode}
        toggleMode={props.toggleMode}
        title="Magic Note"
      />
      <div className="flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28">
        <SearchNotes
          mode={props.mode}
          setSearchParams={setSearchParams}
          focus={true}
        />
        {isLoading ? (
          <Loading height={40} />
        ) : (
          <div>
            <ToastContainer />
            {notes === null || notes.length === 0 ? (
              <div className={`flex flex-col items-center mt-16`}>
                <img src={notFound} alt="not-found" className={`w-60 h-60`} />
                <div
                  className={`font-normal text-2xl mt-2 ${
                    props.mode === "light" ? "text-black" : "text-white"
                  }`}
                >
                  No result found
                </div>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  className={`my-5 pl-2 pt-2 shadow-md rounded-lg overflow-hidden ${
                    props.mode === "light" ? "bg-gray-100" : " bg-gray-700"
                  }`}
                  key={note._id}
                >
                  <div className="flex justify-between">
                    <div className="">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={note.checked}
                        onChange={() => checkNote(note._id)}
                      />
                      <div
                        className={`inline ml-2 text-xl font-bold font-[serif] ${
                          props.mode === "light" ? "text-black" : "text-white"
                        }`}
                      >
                        {note.title}
                      </div>
                    </div>
                    <div>
                      <img
                        src={deleteLogo}
                        alt="delete-button"
                        className={`inline mx-2 cursor-pointer ${
                          props.mode === "light" ? "invert-0" : "invert"
                        }`}
                        onClick={() => deleteNote(note._id)}
                      />
                    </div>
                  </div>
                  <Link to={`/note/${note._id}`}>
                    <div
                      className={`bg-transparent overflow-hidden h-32 mr-4 ml-6`}
                    >
                      {note.body
                        .split("\n")
                        .slice(0, 5)
                        .map((line, index) => (
                          <p
                            key={index}
                            className={`${
                              props.mode === "light"
                                ? "text-black"
                                : "text-gray-300"
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer mode={props.mode} />
    </>
  );
}
