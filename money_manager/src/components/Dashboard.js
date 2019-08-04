import React, { Component } from "react";
import "../css/dashboard.css";
import incomePNG from "../images/income.png";
import expensePNG from "../images/expense.png";
import balancePNG from "../images/balance.png";
import { Line, Pie } from "react-chartjs-2";

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

  updateLineChart = e => {
    let unsorted = this.state.time_expenses;
    var sorted = unsorted.sort(function(a, b) {
      return a._id - b._id;
    });
    let labels_values = [];
    let data_values = [];
    var ctx = document.getElementById("linechart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(50, 176, 226, 0)");
    gradient.addColorStop(1, "rgba(50, 176, 226, 1)");
    sorted.map(s => {
      data_values.push(s.total);
      labels_values.push(s._id);
    });
    this.setState({
      timeChartData: {
        labels: labels_values,
        datasets: [
          {
            label: "daily spending",
            data: data_values,
            backgroundColor: gradient
          }
        ]
      }
    });
    console.log(this.state);
  };

  updatePieChart = e => {
    let unsorted = this.state.catagory_expenses;
    var sorted = unsorted.sort(function(a, b) {
      return a._id - b._id;
    });
    let labels_values = [];
    let data_values = [];

    sorted.map(s => {
      data_values.push(s.total);
      labels_values.push(s._id);
    });
    this.setState({
      catagoryChartData: {
        labels: labels_values,
        datasets: [
          {
            label: "daily spending",
            data: data_values,
            backgroundColor: [
              "#FFA8A9",
              "#E2EB98",
              "#7CCCEC",
              "#F2D398",
              "#7CE577",
              "#44A1A0",
              "#C1B8C8"
            ]
          }
        ]
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
        <div className="graph">
          <h3>Expense Statistics by Dates</h3>
          <Line
            id="linechart"
            data={this.state.timeChartData}
            width={50}
            height={10}
            responsive={true}
            options={{
              legend: {
                display: false
              },
              scales: {
                yAxes: [
                  {
                    gridLines: false,
                    ticks: {
                      padding: 10
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: false,
                    ticks: {
                      padding: 10
                    }
                  }
                ]
              }
            }}
          />
        </div>
        <div className="bottom_row_container">
          <div className="piegraph">
            <h3>Expense Statistics by Catagory</h3>
            <Pie
              id="piechart"
              data={this.state.catagoryChartData}
              width={50}
              height={25}
              responsive={true}
            />
          </div>
          <div className="topExpenses">
            <h3>Highest Expense Records of the month</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
