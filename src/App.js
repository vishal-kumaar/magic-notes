// import React, {useState} from "react";
// import Footer from "./components/Footer";
// import Navbar from "./components/Navbar";
// import Todo from "./components/Todo";
// import TodoForm from "./components/TodoForm";
import Tasks from "./components/Tasks";

function App() {
  // const [mode, setMode] = useState("light");
  // const toggleMode = () => {
  //   if (mode === "dark"){
  //     setMode("light");
  //     document.body.classList.add("bg-light");
  //     document.body.classList.remove("bg-gray-900");
  //   }
  //   else {
  //     setMode("dark");
  //     document.body.classList.add("bg-gray-900");
  //     document.body.classList.remove("bg-light");
  //   }
  // }
  return (
    <>
    {/* <Navbar mode={mode} toggleMode={toggleMode} title="Magic Todo"/> */}
    {/* <div className='flex flex-col my-6 mx-4 sm:mx-10 md:mx-14 lg:mx-20 xl:mx-24 2xl:mx-28'>
      <TodoForm />
      <Todo />
    </div> */}
    <Tasks />
    {/* <Footer /> */}
    </>
  );
}

export default App;