import React, { createContext, useState, useEffect } from "react";

export const GlobalMessageContext = createContext("");

const MessageProvider = ({ children }) => {
  const [globalMessage, setGlobalMessage] = useState("");

  useEffect(() => {
    if (!globalMessage) return;
    setTimeout(() => {
      setGlobalMessage("");
    }, 10 * 1000);
  }, [globalMessage]);

  return (
    <GlobalMessageContext.Provider value={{ globalMessage, setGlobalMessage }}>
      {children}
    </GlobalMessageContext.Provider>
  );
};

export default MessageProvider;
