import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../css/dashboard.css";
const Axios = require("axios");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_sum: 0,
      incomes_sum: 0,
      balance: 0,
      catagory_expenses: [],
      time_expenses: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:80/dashboard/").then(res => {
      console.log(res.data);
      this.setState({
        expense_sum: res.data.expense_sum,
        incomes_sum: res.data.incomes_sum,
        balance: res.data.balance,
        catagory_expenses: res.data.catagory_expenses,
        time_expenses: res.data.time_expenses
      });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <h2 className="title">Monthly Status Report</h2>
        <div className="flex-container">
          <Card
            style={{ width: "25rem", margin: "1%" }}
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Total Income</Card.Title>
              <Card.Text className="stat">
                {this.state.incomes_sum.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "25rem", margin: "1%" }}
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="stat">
                {this.state.expense_sum.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            style={{ width: "25rem", margin: "1%" }}
            className="text-center"
          >
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <Card.Text className="stat">
                {this.state.balance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
