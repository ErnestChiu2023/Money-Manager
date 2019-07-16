import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Spending from "./components/Spending";
import { LinkContainer } from "react-router-bootstrap";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import EditExpense from "./components/EditExpense";
import EditIncome from "./components/EditIncome";
import IncomeDisplay from "./components/IncomeDisplay";
import ExpenseDisplay from "./components/ExpenseDisplay";

class App extends Component {
  constructor(props) {
    super(props);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Success",
      message: "Your record has been saved!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated ", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  render() {
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
              <LinkContainer to="/incomeDisplay">
                <Nav.Link bg="dark">Income</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/expenseDisplay">
                <Nav.Link bg="dark">Expenses</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/income">
                <Nav.Link bg="dark">Add Income</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/spending">
                <Nav.Link bg="dark">Add Spending</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar>
          <ReactNotification ref={this.notificationDOMRef} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/incomeDisplay" component={IncomeDisplay} />
          <Route path="/expenseDisplay" component={ExpenseDisplay} />
          <Route
            path="/income"
            exact
            render={() => <Income notification={this.addNotification} />}
          />
          <Route
            path="/spending"
            exact
            render={() => <Spending notification={this.addNotification} />}
          />
          <Route
            path="/expense/edit/:id"
            render={props => (
              <EditExpense notification={this.addNotification} {...props} />
            )}
          />
          <Route
            path="/income/edit/:id"
            render={props => (
              <EditIncome notification={this.addNotification} {...props} />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
