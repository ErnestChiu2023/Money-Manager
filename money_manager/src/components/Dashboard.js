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
          labels: ["gas", "books"]
        },
        series: [44, 32]
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
      this.updateLineChart();
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
        <div className="flex-container">
          <div className="donut">
            <Chart
              options={this.state.catagoryChart.options}
              series={this.state.catagoryChart.series}
              type="donut"
              width="600"
            />
          </div>
          <div className="time-chart">
            <Chart
              options={this.state.timeChart.options}
              series={this.state.timeChart.series}
              type="scatter"
              width="700"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
