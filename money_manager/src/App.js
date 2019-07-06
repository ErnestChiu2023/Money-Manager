import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
        <Navbar.Brand href="#">Money Manager</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#" bg="dark">
            Dashboard
          </Nav.Link>
          <Nav.Link href="#" bg="dark">
            Add Income
          </Nav.Link>
          <Nav.Link href="#" bg="dark">
            Add Spending
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default App;
