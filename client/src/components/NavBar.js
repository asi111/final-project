import React, { useContext, useState } from "react";
import style from "./NavBar.module.css";
import { authContext } from "../useContext/authContext";

import * as ReactBootStrap from "react-bootstrap";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";

import { positionsContext } from "../useContext/PositionsContext";

const NavBar = () => {
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

  const [redirectToLoginForm, setRedirectToLoginForm] = useState(false);

  return (
    <div>
      {redirectToLoginForm ? <Redirect to="LoginForm" /> : null}

      <ReactBootStrap.Navbar
        collapseOnSelect
        expand="sm"
        bg="black"
        variant="dark"
      >
        <ReactBootStrap.Navbar.Brand>editor app</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          <ReactBootStrap.Nav className="mr-auto">
            <ReactBootStrap.Nav.Link as={Link} to="/">
              Home
            </ReactBootStrap.Nav.Link>

            {auth ? (
              <ReactBootStrap.Nav.Link as={Link} to="/EditorPage">
                EditorPage
              </ReactBootStrap.Nav.Link>
            ) : null}

            {auth ? null : (
              <>
                <ReactBootStrap.Nav.Link as={Link} to="/SingUpForm">
                  singUp
                </ReactBootStrap.Nav.Link>

                <ReactBootStrap.Nav.Link as={Link} to="/LoginForm">
                  login
                </ReactBootStrap.Nav.Link>
              </>
            )}

            {auth ? (
              <Button
                onClick={() => {
                  setRedirectToLoginForm(true);
                  setAuth(null);
                  setPositionsImage(null);
                  setPositionsAbout(null);
                  setPositionsHome(null);
                  setPositionsContact(null);
                  setPositionsNewItem(null);
                  setPositionsTitle(null);
                  setPositionsDescription(null);
                  setPositionsButton(null);
                  localStorage.removeItem("user");
                  localStorage.removeItem("posImage");
                  localStorage.removeItem("posHome");
                  localStorage.removeItem("posAbout");
                }}
              >
                logout
              </Button>
            ) : null}
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default NavBar;
