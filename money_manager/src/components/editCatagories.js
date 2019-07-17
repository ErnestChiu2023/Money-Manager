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
    Axios.get("http://localhost:80/expenseCatagory/").then(res => {
      this.setState({
        expenses: res.data
      });
      console.log(this.state.expenses);
    });
    Axios.get("http://localhost:80/incomeCatagory/").then(res => {
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
      Axios.delete("http://localhost:80/incomeCatagory/?id=" + id).then(
        response => {
          console.log(response);
          this.props.deleteCatagory();
          Axios.get("http://localhost:80/incomeCatagory/").then(res => {
            this.setState({
              incomes: res.data
            });
            console.log(this.state.incomes);
          });
        }
      );
    } else {
      Axios.delete("http://localhost:80/expenseCatagory/?id=" + id).then(
        response => {
          console.log(response);
          this.props.deleteCatagory();
          Axios.get("http://localhost:80/expenseCatagory/").then(res => {
            this.setState({
              expenses: res.data
            });
            console.log(this.state.expenses);
          });
        }
      );
    }
  };

  render() {
    return (
      <div className="EditCatagories">
        <Tabs defaultActiveKey="Income">
          <Tab eventKey="Income" title="Income">
            <Table bordered hover>
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
            <Table bordered hover>
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
