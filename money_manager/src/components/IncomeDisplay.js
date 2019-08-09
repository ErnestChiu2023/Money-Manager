import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../css/incomeDisplay.css";
import Button from "react-bootstrap/Button";

const axios = require("axios");

class IncomeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:80/api/income/").then(res => {
      this.setState({
        incomes: res.data
      });
      console.log(this.state.incomes);
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
            <Link to={`editIncome/${income._id}`}>
              <span className="bg-primary edit">Edit</span>
            </Link>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="IncomeDisplay">
        <div className="ButtonContainer">
          <Link to={"/income"}>
            <Button type="submit">Add Income</Button>
          </Link>
          <Link to={"/incomeCatagories"}>
            <Button variant="danger">Edit Catagories</Button>
          </Link>
        </div>
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
