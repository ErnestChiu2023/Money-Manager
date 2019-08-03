import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import "../css/EditCatagories.css";

class EditCatagories extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      expenses: [],
      incomes: []
    };
  }

  componentDidMount() {
    Axios.get(
      "https://ernest-money-manager.herokuapp.com/api/expenseCatagory/"
    ).then(res => {
      this.setState({
        expenses: res.data
      });
      console.log(this.state.expenses);
    });
    Axios.get(
      "https://ernest-money-manager.herokuapp.com/api/incomeCatagory/"
    ).then(res => {
      this.setState({
        incomes: res.data
      });
      console.log(this.state.incomes);
    });
  }

  listExpense = e => {
    return this.state.expenses.map(expense => {
      return (
        <tbody key={expense._id}>
          <tr>
            <td>{expense.catagory}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(expense._id, "expense")}
              >
                Delete Catagory
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  listIncome = e => {
    return this.state.incomes.map(income => {
      return (
        <tbody key={income._id}>
          <tr>
            <td>{income.catagory}</td>
            <td>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(income._id, "income")}
              >
                Delete Catagory
              </Button>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  handleDelete = (id, type) => {
    if (type === "income") {
      Axios.delete(
        "https://ernest-money-manager.herokuapp.com/api/incomeCatagory/?id=" +
          id
      ).then(response => {
        console.log(response);
        this.props.deleteCatagory();
        Axios.get(
          "https://ernest-money-manager.herokuapp.com/api/incomeCatagory/"
        ).then(res => {
          this.setState({
            incomes: res.data
          });
          console.log(this.state.incomes);
        });
      });
    } else {
      Axios.delete(
        "https://ernest-money-manager.herokuapp.com/api/expenseCatagory/?id=" +
          id
      ).then(response => {
        console.log(response);
        this.props.deleteCatagory();
        Axios.get(
          "https://ernest-money-manager.herokuapp.com/api/expenseCatagory/"
        ).then(res => {
          this.setState({
            expenses: res.data
          });
          console.log(this.state.expenses);
        });
      });
    }
  };

  render() {
    return (
      <div className="EditCatagories">
        <Tabs defaultActiveKey="Income">
          <Tab eventKey="Income" title="Income">
            <Table hover>
              <thead>
                <tr>
                  <th>Catagory</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <this.listIncome />
            </Table>
          </Tab>
          <Tab eventKey="Expenses" title="Expenses">
            <Table hover>
              <thead>
                <tr>
                  <th>Catagory</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <this.listExpense />
            </Table>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default EditCatagories;
