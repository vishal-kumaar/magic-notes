import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "./NoteForm";
import Navbar from "./Navbar";
import SearchNotes from "./SearchNotes";
import Footer from "./Footer";
import getData from "../utils/getData";
import NotesList from "./NotesList";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [isLoading, setLoading] = useState(true);
  const [formVisibility, setFormVisibility] = useState("hidden");
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
      <div className="flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28">
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
              onClick={() => {
                if (formVisibility === "hidden") {
                  setFormVisibility("block");
                } else {
                  setFormVisibility("hidden");
                }
              }}
            >
              {formVisibility === "hidden" ? "Create New Note" : "Done"}
            </button>
          </div>
          <hr />
          <NoteForm
            mode={props.mode}
            visible={formVisibility}
            setNotes={setNotes}
            notes={notes}
          />
          <NotesList mode={props.mode} notes={notes} isLoading={isLoading} />
        </div>
      </div>
      <Footer mode={props.mode} />
    </>
  );
}
