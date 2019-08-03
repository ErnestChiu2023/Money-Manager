import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../css/expenseDisplay.css";
import Button from "react-bootstrap/Button";

const axios = require("axios");

class ExpenseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
    axios
      .get("https://ernest-money-manager.herokuapp.com/api/records/")
      .then(res => {
        this.setState({
          expenses: res.data.expenses
        });
      });
  }

  componentDidMount() {
    axios
      .get("https://ernest-money-manager.herokuapp.com/api/records/")
      .then(res => {
        this.setState({
          expenses: res.data.expenses
        });
        console.log(this.state.expenses);
      });
  }

  displayExpenses = () => {
    return this.state.expenses.map(expense => {
      var labelColor = "";
      if (expense.amount > 50) {
        labelColor += "red";
      } else if (expense.amount > 20) {
        labelColor += "yellow";
      } else {
        labelColor += "green";
      }
      return (
        <tr key={expense._id}>
          <td>{expense.catagory}</td>
          <td>
            <span className={labelColor}>{expense.amount}</span>
          </td>
          <td>{expense.date.substring(0, 10)}</td>
          <td>
            <Link to={`editExpense/${expense._id}`}>
              <span className="bg-primary edit">Edit</span>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="ExpenseDisplay">
        <div className="ButtonContainer">
          <Link to={"/expense"}>
            <Button type="submit">Add Expense</Button>
          </Link>
        </div>
        <div className="TableContainer">
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Catagory</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <this.displayExpenses />
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ExpenseDisplay;
