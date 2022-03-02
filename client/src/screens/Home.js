import React, { useState, useContext,useEffect } from "react";
import style from "./Home.module.css";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { authContext } from "../useContext/authContext";
import { dataContext } from "../useContext/dataContext";
import axios from "axios";
export default function Home() {
  const [redirectToSingUpForm, setRedirectToSingUpForm] = useState(false);
  const [redirectToEditorPage, setRedirectToEditorPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [auth, setAuth] = useContext(authContext);
  const [data, setData] = useContext(dataContext);

  console.log(data,"home");
  
  useEffect(() => {
    const getPos = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/EditorPage/${auth}`);
        setData([response.data]);
      } catch (error) {
        throw error;
      }
    setLoading(false);
    };

    if (auth) return getPos();  
  }, [auth]);

  return (
    <div className={style.container}>
      {redirectToSingUpForm ? <Redirect to="SingUpForm" /> : null}
      {redirectToEditorPage ? <Redirect to="EditorPage" /> : null}
      <div>
        <h2>Create professional looking website.</h2>
        <h1>FAST & Easy!</h1>
        {loading ? <div className={style.loader}></div> : auth ? (
          <Button onClick={() => setRedirectToEditorPage(true)}> START </Button>
        ) : (
          <Button onClick={() => setRedirectToSingUpForm(true)}> START </Button>
        )}
      </div>
    </div>
  );
}
