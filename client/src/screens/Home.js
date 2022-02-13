import React, { useState, useContext } from "react";
import style from "./Home.module.css";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { authContext } from "../useContext/authContext";
export default function Home() {
  const [redirectToSingUpForm, setRedirectToSingUpForm] = useState(false);
  const [redirectToEditorPage, setRedirectToEditorPage] = useState(false);
  const [auth, setAuth] = useContext(authContext);

  return (
    <div className={style.container}>
      {redirectToSingUpForm ? <Redirect to="SingUpForm" /> : null}
      {redirectToEditorPage ? <Redirect to="EditorPage" /> : null}
      <div>
        <h2>Create professional looking website.</h2>
        <h1>FAST & Easy!</h1>
        {auth ? (
          <Button onClick={() => setRedirectToEditorPage(true)}> START </Button>
        ) : (
          <Button onClick={() => setRedirectToSingUpForm(true)}> START </Button>
        )}
      </div>
    </div>
  );
}
