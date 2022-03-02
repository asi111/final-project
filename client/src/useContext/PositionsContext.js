import { createContext, useContext, useState, useEffect } from "react";
import { dataContext } from "./dataContext";
import axios from "axios";
import { authContext } from "./authContext";

export const positionsContext = createContext();

export const PositionsProvider = (props) => {
  const [data, setData] = useContext(dataContext);
  const [auth, setAuth] = useContext(authContext);
  const [positionsHome, setPositionsHome] = useState(null);
  const [positionsImage, setPositionsImage] = useState(null);
  const [positionsAbout, setPositionsAbout] = useState(null);
  const [positionsContact, setPositionsContact] = useState(null);
  const [positionsNewItem, setPositionsNewItem] = useState(null);
  const [positionsTitle, setPositionsTitle] = useState(null);
  const [positionsDescription, setPositionsDescription] = useState(null);
  const [positionsButton, setPositionsButton] = useState(null);
  
  useEffect(() => {
    const getPos = async () => {
      try {
        const response = await axios.get(`/EditorPage/${auth}`);
        setData([response.data]);
        if (response.data?.positionsHome) {
          setPositionsHome(response.data?.positionsHome);
        }
      } catch (error) {
        throw error;
      }
    };

    if (auth) return getPos();
  }, [auth]);

  return (
    <div>
      <positionsContext.Provider
        value={[
          positionsImage,
          setPositionsImage,
          positionsHome,
          setPositionsHome,
          positionsAbout,
          setPositionsAbout,
          positionsContact,
          setPositionsContact,
          positionsNewItem,
          setPositionsNewItem,
          positionsTitle,
          setPositionsTitle,
          positionsDescription,
          setPositionsDescription,
          positionsButton,
          setPositionsButton,
        ]}
      >
        {props.children}
      </positionsContext.Provider>
    </div>
  );
};
