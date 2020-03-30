import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import Routes from "./Routes";
import { Auth } from "aws-amplify";


function App(props) {
  // initialize states and set them to false
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  // Assume we are authenticating when we first load app
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try{
      await Auth.currentSession();
      userHasAuthenticated(true);
    }catch(err){
      if(err !== "No current user"){
        alert(err);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    // when isAuthenticating === true, do not render app
    !isAuthenticating &&
    <div className="App container">
      {/*  fluid makes sure Navbar fits its container's width  */}
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
          : <>
            <LinkContainer to="/signup">
              <NavItem>Sign up</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Log in</NavItem>
            </LinkContainer>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }}/>
    </div>
  );
}

export default withRouter(App);
