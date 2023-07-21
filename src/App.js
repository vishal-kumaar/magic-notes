import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Note from "./components/Note";
import UserProfile from "./components/UserProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UpdatePassword from "./components/UpdatePassword";
import UpdateName from "./components/UpdateName";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import SearchResult from "./components/SearchResult";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenProvider from "./token/TokenProvider";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  if (mode === "dark") {
    document.body.classList = "bg-gray-800";
  } else {
    document.body.classList = "bg-white";
  }

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("theme", "light");
    } else {
      setMode("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <Router>
      <TokenProvider>
        <ToastContainer />
        <Routes>
          <Route
            exect
            path="/"
            element={<Home mode={mode} toggleMode={toggleMode} />}></Route>
          <Route
            exect
            path="/search"
            element={
              <SearchResult mode={mode} toggleMode={toggleMode} />
            }></Route>
          <Route
            exect
            path="/note/:noteId"
            element={<Note mode={mode} toggleMode={toggleMode} />}></Route>
          <Route
            exect
            path="/profile"
            element={<UserProfile mode={mode} />}></Route>
          <Route exect path="/signup" element={<Signup mode={mode} />}></Route>
          <Route exect path="/login" element={<Login mode={mode} />}></Route>
          <Route
            exect
            path="/update/password/:userId"
            element={<UpdatePassword mode={mode} />}></Route>
          <Route
            exect
            path="/update/name/:userId"
            element={<UpdateName mode={mode} />}></Route>
          <Route
            exect
            path="/password/forgot"
            element={<ForgotPassword mode={mode} />}></Route>
          <Route
            exect
            path="/password/reset/:resetToken"
            element={<ResetPassword mode={mode} />}></Route>
          <Route
            exect
            path="/user/verify/:userId"
            element={<VerifyEmail mode={mode} />}></Route>
        </Routes>
      </TokenProvider>
    </Router>
  );
}

export default App;
