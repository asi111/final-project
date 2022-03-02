import { authContext } from "./authContext";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const dataContext = createContext();

export const DataProvider = (props) => {
  const [auth, setAuth] = useContext(authContext);
  const [data, setData] = useState([]);

  const getDefaultTemplate = async () => {
    try {
      const responseData = await axios.get(
        `/EditorPage/api/621bd4a31bfe630be8a2db4d`
      );
      setData([responseData.data]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!auth) return getDefaultTemplate();
  }, []);

  return (
    <dataContext.Provider value={[data, setData]}>
      {props.children}
    </dataContext.Provider>
  );
};
