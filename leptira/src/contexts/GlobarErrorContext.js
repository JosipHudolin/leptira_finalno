import React, { createContext, useState, useEffect } from "react";

export const GlobalErrorContext = createContext("");

const ErrorProvider = ({ children }) => {
  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    if (!globalError) return;
    setTimeout(() => {
      setGlobalError("");
    }, 10 * 1000);
  }, [globalError]);

  return (
    <GlobalErrorContext.Provider value={{ globalError, setGlobalError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};

export default ErrorProvider;
