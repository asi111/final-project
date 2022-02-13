import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { authAPI_KEY } from "./constants";
import style from "./LoginForm.module.css";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import { authContext } from "../useContext/authContext";
import { dataContext } from "../useContext/dataContext";
import { Redirect } from "react-router-dom";

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(authContext);
  const [data, setData] = useContext(dataContext);

  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    return () => {};
  });

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authAPI_KEY}`,

        { email: loginEmail, password: loginPassword }
      );

      setAuth(response.data.email);
      //  localStorage.setItem("user", JSON.stringify(response.data.email));
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const isValid = () => {
    if (loginEmail === "") {
      setEmailErr(true);
    } else if (loginPassword.length < 6) {
      setPasswordErr(true);
    } else {
      login();
    }
    return true;
  };

  return (
    <div className={style.container}>
      {redirectToHome ? <Redirect to="/"></Redirect> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          isValid();
          setRedirectToHome(true);
        }}
        className={style.form}
      >
        <h2 className="text-center">login</h2>
        <FormGroup>
          <Label>email </Label>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <p style={{ color: "red" }}>{emailErr ? "empty filed" : ""}</p>
        <FormGroup>
          <Label>password </Label>
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <p style={{ color: "red" }}>
          {PasswordErr ? "The password is less than 6 characters" : ""}
        </p>
        {loading ? (
          "Loading...."
        ) : (
          <Button type="submit" className="btn-lg btn-dark btn-block">
            login
          </Button>
        )}
      </Form>
    </div>
  );
}
