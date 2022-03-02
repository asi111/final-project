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
        `/EditorPage/api/621f8c728c6878ebb6f89de6`
      );
      setData([responseData.data]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!auth) return getDefaultTemplate();
  }, [auth]);

  return (
    <dataContext.Provider value={[data, setData]}>
      {props.children}
    </dataContext.Provider>
  );
};
