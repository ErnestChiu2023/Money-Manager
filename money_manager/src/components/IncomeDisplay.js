import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
const axios = require("axios");

class IncomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: []
    };
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        incomes: res.data.incomes
      });
    });
  }

  componentDidMount() {
    axios.get("http://localhost:80/records/").then(res => {
      this.setState({
        incomes: res.data.incomes
      });
      console.log(this.state.expenses);
    });
  }

  displayIncomes = () => {
    return this.state.incomes.map(income => {
      return (
        <tbody key={income._id}>
          <tr>
            <td>{income.catagory}</td>
            <td>{income.amount}</td>
            <td>{income.date.substring(0, 10)}</td>
            <td>
              <Link to={`editIncome/${income._id}`}>edit</Link>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  render() {
    return (
      <div className="IncomeDisplay">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Catagory</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <this.displayIncomes />
        </Table>
      </div>
    );
  }
}

export default IncomeDisplay;
