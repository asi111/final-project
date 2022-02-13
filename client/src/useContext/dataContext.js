
import { authContext } from "./authContext";
import axios from "axios";

import React, { createContext, useContext, useEffect, useState } from "react";


export const dataContext = createContext();

export const DataProvider = (props) => {
  const [auth, setAuth] = useContext(authContext);
  const [data, setData] = useState([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`/EditorPage/${auth}`);
      setData([response.data]);
    } catch (error) {
      throw error;
    }
  };

  const getMainTemplate = async () => {
    try {
      const responseData = await axios.get(
        `/EditorPage/api/62036fec2473da6dc1710657`
      );
      setData([responseData.data]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (auth) {
      getUserData();
    } else {
      getMainTemplate();
    }
  }, []);

  return (
    <dataContext.Provider value={[data, setData]}>
      {props.children}
    </dataContext.Provider>
  );
};
