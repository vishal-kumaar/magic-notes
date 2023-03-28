import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SearchNotes from "./SearchNotes";
import Footer from "./Footer";
import getData from "../utils/getData";
import NotesList from "./NotesList";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    const res = await getData("/api/auth/profile");
    if (res.success === false) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const getNotes = async () => {
    const res = await getData("/api/note/getNotes");
    if (res.success === true) {
      setNotes(res.notes);
    } else {
      setNotes(null);
    }
    setLoading(false);
  };

  useEffect(
    () => {
      isLoggedIn();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    getNotes();
  }, [notes]);

  return (
    <>
      <Navbar
        mode={props.mode}
        toggleMode={props.toggleMode}
        title="Magic Notes"
      />
      <div className="flex flex-col py-6 px-4 sm:px-10 md:px-14 lg:px-20 xl:px-24 2xl:px-28">
        <Link to={`/search?input=`}>
          <SearchNotes mode={props.mode} focus={false} />
        </Link>
        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <h1
              className={`font-extrabold font-sans text-3xl ${
                props.mode === "light" ? "text-black" : "text-white"
              }`}
            >
              All Notes
            </h1>
            <button
              className="bg-green-500 px-3 py-2 rounded-md text-white font-semibold shadow-md"
              onClick={() => navigate("/note")}
            >
              Create New Note
            </button>
          </div>
          <hr />
        </div>
        <NotesList
          mode={props.mode}
          notes={notes}
          isLoading={isLoading}
        />
      </div>
      <Footer mode={props.mode} />
    </>
  );
}
