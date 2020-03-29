import React from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import './App.css';

function App(props) {
  return (
    <div className="App container">
      {/*  fluid makes sure Navbar fits its container's width  */}
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    </div>
  );
}

export default App;
