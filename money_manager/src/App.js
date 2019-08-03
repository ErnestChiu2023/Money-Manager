import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { LinkContainer } from "react-router-bootstrap";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import EditExpense from "./components/EditExpense";
import EditIncome from "./components/EditIncome";
import IncomeDisplay from "./components/IncomeDisplay";
import ExpenseDisplay from "./components/ExpenseDisplay";
import EditCatagories from "./components/editCatagories";

class App extends Component {
  constructor(props) {
    super(props);
    this.SuccessNotification = this.SuccessNotification.bind(this);
    this.SuccessCatagoryNotification = this.SuccessCatagoryNotification.bind(
      this
    );
    this.deleteCatagoryNotification = this.deleteCatagoryNotification.bind(
      this
    );
    this.deleteRecordNotification = this.deleteRecordNotification.bind(this);
    this.editRecordNotification = this.editRecordNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  SuccessNotification() {
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

  SuccessCatagoryNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Success",
      message: "Your catagory has been saved!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated ", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  deleteCatagoryNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Deleted",
      message: "Your catagory has been deleted!",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated ", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  deleteRecordNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Deleted",
      message: "Your record has been deleted!",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated ", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  editRecordNotification() {
    this.notificationDOMRef.current.addNotification({
      title: "Success",
      message: "Your record has been edited!",
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

              <LinkContainer to="/editCatagories">
                <Nav.Link bg="dark">Catagories</Nav.Link>
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
            render={props => (
              <Income
                SuccessNotification={this.SuccessNotification}
                SuccessCatagoryNotification={this.SuccessCatagoryNotification}
                {...props}
              />
            )}
          />
          <Route
            path="/expense"
            exact
            render={props => (
              <Expense
                SuccessNotification={this.SuccessNotification}
                SuccessCatagoryNotification={this.SuccessCatagoryNotification}
                {...props}
              />
            )}
          />
          <Route
            path="/editExpense/:id"
            render={props => (
              <EditExpense
                editNotification={this.editRecordNotification}
                deleteRecordNotification={this.deleteRecordNotification}
                {...props}
              />
            )}
          />
          <Route
            path="/editIncome/:id"
            render={props => (
              <EditIncome
                editNotification={this.editRecordNotification}
                deleteRecordNotification={this.deleteRecordNotification}
                {...props}
              />
            )}
          />
          <Route
            path="/editCatagories"
            render={props => (
              <EditCatagories
                deleteCatagory={this.deleteCatagoryNotification}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
