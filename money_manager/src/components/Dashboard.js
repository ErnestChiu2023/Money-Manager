import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "../css/dashboard.css";
import Chart from "react-apexcharts";
const Axios = require("axios");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense_sum: 0,
      incomes_sum: 0,
      balance: 0,
      catagory_expenses: [],
      time_expenses: [],
      catagoryChart: {
        options: {
          title: {
            text: "Expenses by Catagory",
            align: "center",
            style: {
              fontSize: "25px",
              color: "#263238"
            }
          },
          labels: []
        },
        series: []
      },
      timeChart: {
        options: {
          title: {
            text: "Expenses by Day of Month",
            align: "center",
            style: {
              fontSize: "25px",
              color: "#263238"
            }
          },
          chart: {
            id: "timeChart"
          }
        },
        plotOptions: {
          line: {
            curve: "smooth"
          }
        },
        series: [
          {
            name: "Expenses",
            data: []
          }
        ]
      }
    };
  }

  updateLineChart = e => {
    let data = [];
    this.state.time_expenses.map(s => {
      data.push({ x: s._id, y: s.total });
    });
    this.setState({
      timeChart: {
        options: {
          title: {
            text: "Expenses by Day of Month",
            align: "center",
            style: {
              fontSize: "25px",
              color: "#263238"
            }
          },
          chart: {
            id: "timeChart"
          }
        },
        plotOptions: {
          line: {
            curve: "smooth"
          }
        },
        series: [
          {
            data,
            name: "Expenses"
          }
        ]
      }
    });
    console.log(this.state);
  };

  updatePieChart = e => {
    let data = [];
    let labels = [];
    this.state.catagory_expenses.map(s => {
      data.push(s.total);
      labels.push(s._id);
    });
    this.setState({
      catagoryChart: {
        options: {
          title: {
            text: "Expenses by Catagory",
            align: "center",
            style: {
              fontSize: "25px",
              color: "#263238"
            }
          },
          labels: labels
        },
        series: data
      }
    });
    console.log(this.state);
  };

  componentDidMount() {
    Axios.get("https://ernest-money-manager.herokuapp.com/api/dashboard/").then(
      res => {
        console.log(res.data);
        this.setState({
          expense_sum: res.data.expense_sum,
          incomes_sum: res.data.incomes_sum,
          balance: res.data.balance,
          catagory_expenses: res.data.catagory_expenses,
          time_expenses: res.data.time_expenses
        });
        console.log(this.state);
        this.updateLineChart();
        this.updatePieChart();
      }
    );
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
