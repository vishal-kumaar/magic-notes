import React, {useState} from "react";
import Navbar from "./components/Navbar";

function App() {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "dark"){
      setMode("light");
      document.body.classList.add("bg-light");
      document.body.classList.remove("bg-gray-900");
    }
    else {
      setMode("dark");
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-light");
    }
  }
  return (
    <>
    <Navbar mode={mode} toggleMode={toggleMode} title="Magic Todo"/>
    </>
  );
}

export default App;