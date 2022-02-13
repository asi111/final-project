import { createContext, useContext, useState, useEffect } from "react";
import { dataContext } from "./dataContext";
import { authContext } from "./authContext";

export const positionsContext = createContext();

export const PositionsProvider = (props) => {
  const [data, setData] = useContext(dataContext);
  const [auth, setAuth] = useContext(authContext);


  const [positionsImage, setPositionsImage] = useState({
    image: { x: 0, y: 0 },
  });

  const [positionsHome, setPositionsHome] = useState( 
    { home: { x: 0, y: 0 } });

  const [positionsAbout, setPositionsAbout] = useState({
    about: { x: 0, y: 0 },
  });

  const [positionsContact, setPositionsContact] = useState({
    contact: { x: 0, y: 0 },
  });

  const [positionsNewItem, setPositionsNewItem] = useState( {
    newItem: { x: 0, y: 0 },
  });

  const [positionsTitle, setPositionsTitle] = useState({
    title: { x: 0, y: 0 },
  });

  const [positionsDescription, setPositionsDescription] = useState( {
    description : { x: 0, y: 0 },
  });

  const [positionsButton, setPositionsButton] = useState({
    button : { x: 0, y: 0 },
  });


  
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
           setPositionsButton
           
        ]}
      >
        {props.children}
      </positionsContext.Provider>
    </div>
  );
};
