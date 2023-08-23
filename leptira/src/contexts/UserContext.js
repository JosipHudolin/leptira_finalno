import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { auth } from "../config";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
    else setUser(null);
  });
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
