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
      list: []
    };
  }

  state = {
    expenses: [],
    incomes: []
  };

  componentDidMount() {
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        expenses: res.data.expenses,
        incomes: res.data.incomes
      });
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <Container>
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
                <tbody>
                  <tr>
                    <td>food</td>
                    <td>10.50</td>
                    <td>2019-07-02</td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>groceries</td>
                    <td>40.00</td>
                    <td>2019-06-23</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>gas</td>
                    <td>63.28</td>
                    <td>2019-06-28</td>
                  </tr>
                </tbody>
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
                <tbody>
                  <tr>
                    <td>food</td>
                    <td>10.50</td>
                    <td>2019-07-02</td>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>groceries</td>
                    <td>40.00</td>
                    <td>2019-06-23</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>gas</td>
                    <td>63.28</td>
                    <td>2019-06-28</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
