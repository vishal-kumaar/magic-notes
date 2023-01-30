import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchTodo from "./components/SearchTodo";
import Todo from "./components/Todo";
import UserProfile from "./components/UserProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UpdatePassword from "./components/UpdatePassword";
import UpdateName from "./components/UpdateName";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

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
          element={
            <>
              <Navbar mode={mode} toggleMode={toggleMode} title="Magic Todo" />
              <div className="flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28">
                <SearchTodo mode={mode} />
                <Home mode={mode} />
              </div>
              <Footer mode={mode} />
            </>
          }
        ></Route>
        <Route
          exect
          path="/todo/:todoId"
          element={<Todo mode={mode} toggleMode={toggleMode} />}
        ></Route>
        <Route
          exect
          path="/profile"
          element={
            <>
              <UserProfile mode={mode} toggleMode={toggleMode} />
              <Footer mode={mode} />
            </>
          }
        ></Route>
        <Route exect path="/signup" element={<Signup mode={mode} />}></Route>
        <Route exect path="/login" element={<Login mode={mode} />}></Route>
        <Route
          exect
          path="/updatePassword"
          element={<UpdatePassword mode={mode} />}
        ></Route>
        <Route
          exect
          path="/updateName"
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
      </Routes>
    </Router>
  );
}

export default App;
