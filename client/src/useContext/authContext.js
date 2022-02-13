import React, { createContext, useState } from "react";

export const authContext = createContext();
const localStorageKey = "user";

const userEmail = JSON.parse(localStorage.getItem(localStorageKey));
if (!userEmail) {
  localStorage.setItem(localStorageKey, JSON.stringify(localStorageKey));
}

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(userEmail);
  return (
    <authContext.Provider value={[auth, setAuth]}>
      {props.children}
    </authContext.Provider>
  );
};
