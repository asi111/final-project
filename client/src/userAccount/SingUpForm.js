import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button, FormGroup, Label, Input } from "reactstrap";
import { authAPI_KEY } from "./constants";
import { authContext } from "../useContext/authContext";
import style from "./SingUpForm.module.css";
import { dataContext } from "../useContext/dataContext";
import { positionsContext } from "../useContext/PositionsContext";

export default function SingUpForm() {
  const [auth, setAuth] = useContext(authContext);
  const [data, setData] = useContext(dataContext);

  const [singUpEmail, setSingUpEmail] = useState(null);
  const [singUPPassword, setSingUPPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [ConfirmPasswordErr, setConfirmPasswordErr] = useState(false);

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

  useEffect(() => {

    return () => {};
  },[auth]);

  const singUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authAPI_KEY}`,
        { email: singUpEmail, password: singUPPassword }
      );
      setAuth(response.data.email);

      const addTemplateUser = async () => {
        let userTemplateBody = {
          main: data[0]?.main || [],
          nav: data[0]?.nav || [],
          email: response.data.email,
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

      addTemplateUser();

      console.log(response);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  };

  const isValid = () => {
    if (singUpEmail === "") {
      setEmailErr(true);
    } else if (singUPPassword?.length < 6) {
      setPasswordErr(true);
    } else if (singUPPassword != confirmPassword) {
      setConfirmPasswordErr(true);
    } else {
      singUp();
    }
    return true;
  };

  return (
    <div className={style.container}>
      {redirectToLogin ? <Redirect to="LoginForm" /> : null}
      {auth ? <Redirect to="/"></Redirect> : null}

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          isValid();
        }}
        className={style.form}
      >
        <h2 className="text-center">singUp</h2>
        <FormGroup>
          <Label>email </Label>
          <Input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setSingUpEmail(e.target.value);
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
              setSingUPPassword(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <p style={{ color: "red" }}>
          {PasswordErr ? "The password is less than 6 characters" : ""}
        </p>

        <FormGroup>
          <Label>confirm password </Label>
          <Input
            type="password"
            placeholder="confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Input>
        </FormGroup>
        <p style={{ color: "red" }}>
          {ConfirmPasswordErr ? "password not match" : ""}
        </p>

        {loading ? (
          "loading"
        ) : (
          <Button type="submit" className="btn-lg btn-dark btn-block">
            singUp
          </Button>
        )}
        <div className="text-center">
          <a
            style={{ color: "whiteSmoke" }}
            onClick={() => setRedirectToLogin(true)}
            href="#"
          >
            login
          </a>
          <span className="p-2 ">|</span>
          <a style={{ color: "whiteSmoke" }} href="#">
            forgot password
          </a>
        </div>
      </Form>
    </div>
  );
}
