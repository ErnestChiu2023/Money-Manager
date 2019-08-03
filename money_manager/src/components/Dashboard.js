import React, { Component } from "react";
import "../css/dashboard.css";
import incomePNG from "../images/income.png";
import expensePNG from "../images/expense.png";
import balancePNG from "../images/balance.png";

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
        <div className="welcome">
          <h2>Hello Ernest!</h2>
          <p>Here's the latest updated spending report</p>
        </div>
        <div className="flex-container">
          <div className="card">
            <h5>Total Income</h5>
            <h4>$ {this.state.incomes_sum.toFixed(2)}</h4>
            <div className="img">
              <img src={incomePNG} />
            </div>
          </div>
          <div className="card">
            <h5>Total Expenses</h5>
            <h4>$ {this.state.expense_sum.toFixed(2)}</h4>
            <div className="img">
              <img src={expensePNG} />
            </div>
          </div>
          <div className="card">
            <h5>Total Balance</h5>
            <h4>$ {this.state.balance.toFixed(2)}</h4>
            <div className="img">
              <img src={balancePNG} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
