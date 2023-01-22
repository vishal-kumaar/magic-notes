import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import SearchTodo from "./components/SearchTodo";
import Todo from "./components/Todo";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "dark"){
      setMode("light");
      document.body.classList.add("bg-light");
      document.body.classList.remove("bg-gray-800");
    }
    else {
      setMode("dark");
      document.body.classList.add("bg-gray-800");
      document.body.classList.remove("bg-light");
    }
  }
  return (
    <Router>
      <Routes>
        <Route exect path="/" 
        element={<>
          <Navbar mode={mode} toggleMode={toggleMode} title="Magic Todo"/>
          <div className='flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28'>
            <SearchTodo mode={mode} />
            <Todos mode={mode}/>
          </div>
          <Footer mode={mode}/>
        </>}></Route>
        <Route exect path="/todo" element={<Todo mode={mode} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;