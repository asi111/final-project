import React, { useContext } from "react";
import Editor from "./Editor";
import HomeTemplate from "./templates/HomeTemplate";
import style from "./EditorPage.module.css";
import { dataContext } from "../useContext/dataContext";

export default function EditorPage() {
  const [data, setData] = useContext(dataContext);

  return (
    <>
      <div className={style.container}>
        <div className={style.preview}>
          <HomeTemplate />
        </div>
        <div className={style.editor}>
       
          <Editor />
        </div>
      </div>
    </>
  );
}
