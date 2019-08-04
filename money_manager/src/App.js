import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expense from "./components/Expense";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import EditExpense from "./components/EditExpense";
import EditIncome from "./components/EditIncome";
import IncomeDisplay from "./components/IncomeDisplay";
import ExpenseDisplay from "./components/ExpenseDisplay";
import ExpenseCatagories from "./components/ExpenseCatagories";
import IncomeCatagories from "./components/IncomeCatagories";
import GoogleFontLoader from "react-google-font-loader";

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
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto"
            },
            {
              font: "Avenir"
            }
          ]}
        />
        <Router>
          <div className="top_nav">
            <span>Money Manager</span>
            <span>Welcome, Ernest Chiu!</span>
          </div>
          <div className="side_nav">
            <span>
              <Link
                to="/Dashboard"
                style={{ textDecoration: "none", color: "#5a5a5a" }}
              >
                <i className="fa fa-dashboard" /> Dashboard
              </Link>
            </span>
            <span>
              <Link
                to="/incomeDisplay"
                style={{ textDecoration: "none", color: "#5a5a5a" }}
              >
                <i className="fa fa-money" /> Income
              </Link>
            </span>
            <span>
              <Link
                to="/expenseDisplay"
                style={{ textDecoration: "none", color: "#5a5a5a" }}
              >
                <i className="fa fa-shopping-cart" /> Expenses
              </Link>
            </span>
          </div>
          <div className="content">
            <ReactNotification ref={this.notificationDOMRef} />
            <Route path="/" exact component={Dashboard} />
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
              path="/incomeCatagories"
              render={props => (
                <IncomeCatagories
                  deleteCatagory={this.deleteCatagoryNotification}
                />
              )}
            />
            <Route
              path="/expenseCatagories"
              render={props => (
                <ExpenseCatagories
                  deleteCatagory={this.deleteCatagoryNotification}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
