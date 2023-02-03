import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Todo from "./components/Todo";
import UserProfile from "./components/UserProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UpdatePassword from "./components/UpdatePassword";
import UpdateName from "./components/UpdateName";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyEmail from "./components/VerifyEmail";
import SearchResult from "./components/SearchResult";

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.classList.add("bg-light");
      document.body.classList.remove("bg-gray-800");
    } else {
      setMode("dark");
      document.body.classList.add("bg-gray-800");
      document.body.classList.remove("bg-light");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          exect
          path="/"
          element={<Home mode={mode} toggleMode={toggleMode} />}
        ></Route>
        <Route
          exect
          path="/search/result"
          element={<SearchResult mode={mode} />}
        ></Route>
        <Route
          exect
          path="/todo/:todoId"
          element={<Todo mode={mode} toggleMode={toggleMode} />}
        ></Route>
        <Route
          exect
          path="/profile"
          element={<UserProfile mode={mode} toggleMode={toggleMode} />}
        ></Route>
        <Route exect path="/signup" element={<Signup mode={mode} />}></Route>
        <Route exect path="/login" element={<Login mode={mode} />}></Route>
        <Route
          exect
          path="/password/update/:userId"
          element={<UpdatePassword mode={mode} />}
        ></Route>
        <Route
          exect
          path="/username/update/:userId"
          element={<UpdateName mode={mode} />}
        ></Route>
        <Route
          exect
          path="/password/forgot"
          element={<ForgotPassword mode={mode} />}
        ></Route>
        <Route
          exect
          path="/password/reset/:resetToken"
          element={<ResetPassword mode={mode} />}
        ></Route>
        <Route
          exect
          path="/user/verify/:userId"
          element={<VerifyEmail mode={mode} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
