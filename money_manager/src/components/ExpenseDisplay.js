import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
const axios = require("axios");

class ExpenseDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: []
    };
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        expenses: res.data.expenses
      });
    });
  }

  componentDidMount() {
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        expenses: res.data.expenses
      });
      console.log(this.state.expenses);
    });
  }

  displayExpenses = () => {
    return this.state.expenses.map(expense => {
      return (
        <tbody key={expense._id}>
          <tr>
            <td>{expense.catagory}</td>
            <td>{expense.amount}</td>
            <td>{expense.date.substring(0, 10)}</td>
            <td>
              <Link to={`expense/edit/${expense._id}`}>edit</Link>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  render() {
    return (
      <div className="ExpenseDisplay">
        <Table variant="dark" responsive bordered hover>
          <thead>
            <tr>
              <th>Catagory</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <this.displayExpenses />
        </Table>
      </div>
    );
  }
}

export default ExpenseDisplay;
