import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../css/incomeDisplay.css";
const axios = require("axios");
var classNames = require("classnames");

class IncomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: []
    };
    axios
      .get("https://ernest-money-manager.herokuapp.com/api/records/")
      .then(res => {
        this.setState({
          incomes: res.data.incomes
        });
      });
  }

  componentDidMount() {
    axios
      .get("https://ernest-money-manager.herokuapp.com/api/records/")
      .then(res => {
        this.setState({
          incomes: res.data.incomes
        });
        console.log(this.state.expenses);
      });
  }

  displayIncomes = () => {
    return this.state.incomes.map(income => {
      var labelColor = "";
      if (income.amount > 1000) {
        labelColor += "green";
      } else if (income.amount > 500) {
        labelColor += "yellow";
      } else {
        labelColor += "red";
      }
      return (
        <tr key={income._id}>
          <td>{income.catagory}</td>
          <td>
            <span className={labelColor}>{income.amount}</span>
          </td>
          <td>{income.date.substring(0, 10)}</td>
          <td>
            <Link to={`editIncome/${income._id}`}>edit</Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="IncomeDisplay">
        <div className="TableContainer">
          <Table hover striped className="table">
            <thead>
              <tr>
                <th>Catagory</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <this.displayIncomes />
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default IncomeDisplay;
