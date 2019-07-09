import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
const axios = require("axios");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      incomes: []
    };
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        expenses: res.data.expenses,
        incomes: res.data.incomes
      });
    });
  }

  componentDidMount() {
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        expenses: res.data.expenses,
        incomes: res.data.incomes
      });
      console.log(this.state.expenses);
    });
  }

  displayExpenses = () => {
    return this.state.expenses.map(expense => {
      return (
        <tbody>
          <tr>
            <td>{expense.catagory}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
          </tr>
        </tbody>
      );
    });
  };

  displayIncomes = () => {
    return this.state.incomes.map(income => {
      return (
        <tbody>
          <tr>
            <td>{income.catagory}</td>
            <td>{income.amount}</td>
            <td>{income.date}</td>
          </tr>
        </tbody>
      );
    });
  };

  render() {
    return (
      <div className="Dashboard">
        <Tabs defaultActiveKey="overview">
          <Tab eventKey="overview" title="Overview">
            Overview
          </Tab>
          <Tab eventKey="income" title="Income">
            <Table variant="dark" responsive bordered hover>
              <thead>
                <tr>
                  <th>Catagory</th>
                  <th>Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <this.displayIncomes />
            </Table>
          </Tab>
          <Tab eventKey="expenses" title="Expenses">
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
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
