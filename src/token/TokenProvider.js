import React, { useState } from "react";
import TokenContext from "./TokenContext";

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setUserToken = (tokenValue) => {
    const newToken = `Bearer ${tokenValue}`;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const removeUserToken = () => {
    localStorage.setItem("token", "");
    setToken("");
  };
  return (
    <TokenContext.Provider value={{ token, setUserToken, removeUserToken }}>
      {children}
    </TokenContext.Provider>
  );
}
