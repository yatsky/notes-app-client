import React from 'react';
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import './App.css';

function App(props) {
  return (
    <div className="App container">
      <Navbar className="App container">
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
