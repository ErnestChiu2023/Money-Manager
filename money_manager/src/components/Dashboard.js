import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
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
    return <div className="Dashboard">Overview</div>;
  }
}

export default Dashboard;
