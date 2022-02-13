import React, { useContext, useRef, useState } from "react";
import { dataContext } from "../useContext/dataContext";
import { authContext } from "../useContext/authContext";
import EditorPage from "./EditorPage";
import style from "./Editor.module.css";
import { RiChatDeleteFill } from "react-icons/ri";
import { MdAddTask } from "react-icons/md";
import axios from "axios";
import { positionsContext } from "../useContext/PositionsContext";

export default function Editor() {
  const [picHolder, setPicHolder] = useState(null);

  const [data, setData] = useContext(dataContext);
  const [auth, setAuth] = useContext(authContext);

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

  const handleChange = (e) => {
    const tempData = [...data];

    const { name, value } = e.target;
    tempData[0].nav.forEach((element) => {
      if (element.name === name) {
        element.value = value;
      }
    });

    tempData[0].main.forEach((element) => {
      if (element.name === name) {
        element.value = value;
      }
    });

    setData(tempData);
  };

  const addElemToNav = (e) => {
    const tempData = [...data];
    tempData[0].nav.push({
      id: new Date().getTime(),
      type: "text",
      name: "newItem",
      value: "added",
    });

    setData(tempData);
  };

  const fileUpload = async () => {
    if (picHolder) {
      const formData = new FormData();
      formData.append("file", picHolder);
      formData.append("upload_preset", "uv3tfvmx");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddemqansf/image/upload",
        formData
      );
      const tempData = [...data];
      tempData[0]?.nav.forEach((element) => {
        if (element.type === "image") {
          element.value = response.data.url;
          setData(tempData);
        }
      });
    }
  };

  const addTemplateUser = async () => {
    let userTemplateBody = {
      main: data[0].main,
      nav: data[0].nav,
      email: auth,
      positionsImage: positionsImage,
      positionsHome: positionsHome,
      positionsAbout: positionsAbout,
      positionsContact: positionsContact,
      positionsNewItem: positionsNewItem,
      positionsTitle: positionsTitle,
      positionsDescription: positionsDescription,
      positionsButton: positionsButton,
    };
    try {
      const response = await axios.post("/EditorPage", userTemplateBody);

      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.form}>
        <div className={style.cover}></div>
        <h2>Editor</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTemplateUser();
          }}
        >
          <div className={style.box}>
            <input
              type="text"
              name="home"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.nav[1]?.value}
            />
          </div>
          <br />
          <div className={style.box}>
            <input
              type="text"
              name="about"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.nav[2]?.value}
            />
          </div>
          <br />
          <div className={style.box}>
            <input
              type="text"
              name="contact"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.nav[3]?.value}
            />
          </div>
          <br />
          <div className={style.box}>
            <RiChatDeleteFill
              // onClick={removeSelectedImage}
              style={style.delete}
            ></RiChatDeleteFill>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPicHolder(e.target.files[0])}
            />
            <br />

            <button onClick={() => fileUpload()}>upload</button>
          </div>

          <div className={style.box}>
            <input
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.main[0]?.value}
            />
          </div>
          <br />
          <div className={style.box}>
            <textarea
              type="text"
              name="description"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.main[1]?.value}
              rows="4"
            ></textarea>
          </div>
          <br />
          <div className={style.box}>
            <input
              type="text"
              name="button"
              onChange={(e) => handleChange(e)}
              defaultValue={data[0]?.main[2]?.value}
            />
          </div>
          <br />

          <div className={style.box}>
            <MdAddTask onClick={() => addElemToNav()}> Add to nav</MdAddTask>
            <input
              type="text"
              name="newItem"
              onChange={(e) => handleChange(e)}
              defaultValue={"Add"}
            />
          </div>

          <button disabled={auth ? false : true} type="submit">
            {" "}
            save{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
