import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Spending from "./components/Spending";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
          <LinkContainer to="/dashboard">
            <Navbar.Brand>Money Manager</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to="/dashboard">
              <Nav.Link bg="dark">Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/income">
              <Nav.Link bg="dark">Add Income</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/spending">
              <Nav.Link bg="dark">Add Spending</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar>

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/income" component={Income} />
        <Route path="/Spending" component={Spending} />
      </Router>
    </div>
  );
}

export default App;
