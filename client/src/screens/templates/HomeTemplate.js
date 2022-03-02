import React, { useContext, useEffect, useState, useRef } from "react";
import { dataContext } from "../../useContext/dataContext";
import style from "./HomeTemplate.module.css";
import Draggable from "react-draggable";
import { positionsContext } from "../../useContext/PositionsContext";
import { authContext } from "../../useContext/authContext";

export default function HomeTemplate() {
  const [data, setData] = useContext(dataContext);
  const [auth, setAuth] = useContext(authContext);
  const imageRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const newItemRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  const [
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
  ] = useContext(positionsContext);

  console.log("home tamplate", data[0]);
  console.log(positionsHome);

  // useEffect(() => {
  //   const existingPosImage = JSON.parse(localStorage.getItem("posImage"));
  //   const existingPosHome = JSON.parse(localStorage.getItem("posHome"));
  //   const existingPosAbout = JSON.parse(localStorage.getItem("posAbout"));
  //   const existingPosContact = JSON.parse(localStorage.getItem("posContact"));
  //   const existingPosNewItem = JSON.parse(localStorage.getItem("posNewItem"));
  //   const existingPosTitle = JSON.parse(localStorage.getItem("posTitle"));
  //   const existingPosDescription = JSON.parse(
  //     localStorage.getItem("posDescription")
  //   );
  //   const existingPosButton = JSON.parse(localStorage.getItem("posButton"));

  //   if (
  //     (existingPosImage || existingPosHome || existingPosAbout,
  //     existingPosContact,
  //     existingPosNewItem,
  //     existingPosTitle,
  //     existingPosDescription,
  //     existingPosButton)
  //   ) {
  //     setPositionsImage(existingPosImage);
  //     setPositionsHome(existingPosHome);
  //     setPositionsAbout(existingPosAbout);
  //     setPositionsContact(existingPosContact);
  //     setPositionsNewItem(existingPosNewItem);
  //     setPositionsTitle(existingPosTitle);
  //     setPositionsDescription(existingPosDescription);
  //     setPositionsButton(existingPosButton);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(`posImage`, JSON.stringify(positionsImage));
  //   localStorage.setItem(`posHome`, JSON.stringify(positionsHome));
  //   localStorage.setItem(`posAbout`, JSON.stringify(positionsAbout));
  //   localStorage.setItem(`posContact`, JSON.stringify(positionsContact));
  //   localStorage.setItem(`posNewItem`, JSON.stringify(positionsNewItem));
  //   localStorage.setItem(`posTitle`, JSON.stringify(positionsTitle));
  //   localStorage.setItem(
  //     `posDescription`,
  //     JSON.stringify(positionsDescription)
  //   );
  //   localStorage.setItem(`posButton`, JSON.stringify(positionsButton));
  // }, [
  //   positionsImage,
  //   positionsHome,
  //   positionsAbout,
  //   positionsContact,
  //   positionsNewItem,
  //   positionsTitle,
  //   positionsDescription,
  //   positionsButton,
  // ]);

  const handleStop = (e, pos) => {
    let tempPositionsImage = { ...positionsImage };
    let tempPositionsHome = { ...positionsHome };
    let tempPositionsAbout = { ...positionsAbout };
    let tempPositionsContact = { ...positionsContact };
    let tempPositionsNewItem = { ...positionsNewItem };
    let tempPositionsTitle = { ...positionsTitle };
    let tempPositionsDescription = { ...positionsDescription };
    let tempPositionsButton = { ...positionsButton };
    const itemId = e.target.id;

    if (itemId == "image") {
      tempPositionsImage[itemId] = {};
      tempPositionsImage[itemId]["x"] = pos.x;
      tempPositionsImage[itemId]["y"] = pos.y;
      setPositionsImage(tempPositionsImage);
    }

    switch (itemId) {
      case "home":
        tempPositionsHome[itemId] = {};
        tempPositionsHome[itemId]["x"] = pos.x;
        tempPositionsHome[itemId]["y"] = pos.y;
        setPositionsHome(tempPositionsHome);
        break;

      case "about":
        tempPositionsAbout[itemId] = {};
        tempPositionsAbout[itemId]["x"] = pos.x;
        tempPositionsAbout[itemId]["y"] = pos.y;
        setPositionsAbout(tempPositionsAbout);
        break;

      case "contact":
        tempPositionsContact[itemId] = {};
        tempPositionsContact[itemId]["x"] = pos.x;
        tempPositionsContact[itemId]["y"] = pos.y;
        setPositionsContact(tempPositionsContact);
        break;

      case "newItem":
        tempPositionsNewItem[itemId] = {};
        tempPositionsNewItem[itemId]["x"] = pos.x;
        tempPositionsNewItem[itemId]["y"] = pos.y;
        setPositionsNewItem(tempPositionsNewItem);
        break;

      case "title":
        tempPositionsTitle[itemId] = {};
        tempPositionsTitle[itemId]["x"] = pos.x;
        tempPositionsTitle[itemId]["y"] = pos.y;
        setPositionsTitle(tempPositionsTitle);
        break;

      case "description":
        tempPositionsDescription[itemId] = {};
        tempPositionsDescription[itemId]["x"] = pos.x;
        tempPositionsDescription[itemId]["y"] = pos.y;
        setPositionsDescription(tempPositionsDescription);
        break;

      case "button":
        tempPositionsButton[itemId] = {};
        tempPositionsButton[itemId]["x"] = pos.x;
        tempPositionsButton[itemId]["y"] = pos.y;
        setPositionsButton(tempPositionsButton);
        break;
      default:
        break;
    }
  };

  function createNavImage() {
    let image;
    for (let index = 0; index < data[0]?.nav?.length; index++) {
      const element = data[0].nav[index];

      if (element.type === "image") {
        image = (
          <div>
            <Draggable
              defaultPosition={
                !positionsImage && !auth
                  ? { x: 0, y: 0 }
                  : data[0]?.positionsImage
                  ? {
                      x: data[0]?.positionsImage.image.x,
                      y: data[0]?.positionsImage.image.y,
                    }
                  : { x: 0, y: 0 }
              }
              key={index}
              nodeRef={imageRef}
              onStop={handleStop}
            >
              <div ref={imageRef}>
                <img
                  id={element.type}
                  src={element.value}
                  className={style.logo}
                />
              </div>
            </Draggable>
          </div>
        );
      }
    }
    return image;
  }

  function createNavLinks() {
    let NavLinks;
    let elementsContainer = { newItem: [] };
    for (let index = 0; index < data[0]?.nav?.length; index++) {
      const element = data[0].nav[index];

      switch (element.name) {
        case "home":
          elementsContainer.home = (
            <Draggable
              defaultPosition={
                !positionsHome && !auth
                  ? { x: 0, y: 0 }
                  : data[0]?.positionsHome
                  ? {
                      x: data[0]?.positionsHome.home.x,
                      y: data[0]?.positionsHome.home.y,
                    }
                  : { x: 0, y: 0 }
              }
              key={index}
              nodeRef={homeRef}
              onStop={handleStop}
            >
              <li ref={homeRef}>
                <a id={element.name} className={style.active} href="#">
                  {element.value}
                </a>
              </li>
            </Draggable>
          );
          break;
        case "about":
          elementsContainer.about = (
            <Draggable
            defaultPosition={
              !positionsAbout && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsAbout
                ? {
                    x: data[0]?.positionsAbout.about.x,
                    y: data[0]?.positionsAbout.about.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={aboutRef}
              onStop={handleStop}
            >
              <li ref={aboutRef}>
                <a id={element.name} href="#">
                  {" "}
                  {element.value}{" "}
                </a>
              </li>
            </Draggable>
          );
          break;
        case "contact":
          elementsContainer.contact = (
            <Draggable
            defaultPosition={
              !positionsContact && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsContact
                ? {
                    x: data[0]?.positionsContact.contact.x,
                    y: data[0]?.positionsContact.contact.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={contactRef}
              onStop={handleStop}
            >
              <li ref={contactRef}>
                <a id={element.name} href="#">
                  {element.value}
                </a>
              </li>
            </Draggable>
          );
          break;
        case "newItem":
          elementsContainer.newItem.push(
            <Draggable
            defaultPosition={
              !positionsNewItem && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsNewItem
                ? {
                    x: data[0]?.positionsNewItem.newItem.x,
                    y: data[0]?.positionsNewItem.newItem.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={newItemRef}
              onStop={handleStop}
            >
              <li ref={newItemRef}>
                <a id={element.name} href="#">
                  {element.value}
                </a>
              </li>
            </Draggable>
          );
          break;
        default:
          break;
      }
    }
    NavLinks = (
      <div>
        <div>
          <ul className={style.navLinks}>
            {elementsContainer.home}
            {elementsContainer.about}
            {elementsContainer.contact}
            {elementsContainer.newItem}
          </ul>
        </div>
      </div>
    );

    return NavLinks;
  }

  function creatMainContent() {
    let mainContent;
    let elementsMainContainer = [];
    for (let index = 0; index < data[0]?.main?.length; index++) {
      const element = data[0]?.main[index];

      switch (element.name) {
        case "title":
          elementsMainContainer.title = (
            <Draggable
            defaultPosition={
              !positionsTitle && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsTitle
                ? {
                    x: data[0]?.positionsTitle.title.x,
                    y: data[0]?.positionsTitle.title.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={titleRef}
              onStop={handleStop}
            >
              <div ref={titleRef}>
                <h2 id={element.name}> {element.value} </h2>
                <div className={style.line}></div>
              </div>
            </Draggable>
          );
          break;

        case "description":
          elementsMainContainer.description = (
            <Draggable
            defaultPosition={
              !positionsDescription && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsDescription
                ? {
                    x: data[0]?.positionsDescription.description.x,
                    y: data[0]?.positionsDescription.description.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={descriptionRef}
              onStop={handleStop}
            >
              <div ref={descriptionRef}>
                <p id={element.name} className={style.description}>
                  {element.value}
                </p>
              </div>
            </Draggable>
          );
          break;

        case "button":
          elementsMainContainer.button = (
            <Draggable
            defaultPosition={
              !positionsButton && !auth
                ? { x: 0, y: 0 }
                : data[0]?.positionsButton
                ? {
                    x: data[0]?.positionsButton.button.x,
                    y: data[0]?.positionsButton.button.y,
                  }
                : { x: 0, y: 0 }
            }
              key={index}
              nodeRef={buttonRef}
              onStop={handleStop}
            >
              <div ref={buttonRef}>
                <button id={element.name} className={style.ctn}>
                  {element.value}
                </button>
              </div>
            </Draggable>
          );

          break;

        default:
          break;
      }
    }

    mainContent = (
      <div className={style.container}>
        {elementsMainContainer.title}
        {elementsMainContainer.description}
        {elementsMainContainer.button}
      </div>
    );
    return mainContent;
  }

  return (
    <div>
      <div className={style.navBar}>
        {createNavImage()}
        {createNavLinks()}
      </div>

      <div className={style.header}>{creatMainContent()}</div>
    </div>
  );
}
