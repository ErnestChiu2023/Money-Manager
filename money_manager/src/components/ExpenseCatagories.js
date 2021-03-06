import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import "../css/ExpenseCatagories.css";
import { connect } from "react-redux";

class ExpenseCatagories extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      expenses: []
    };
  }

  componentDidMount() {
    Axios.get(
      "http://localhost:80/api/expenseCatagory?UserID=" + this.props.User._id
    ).then(res => {
      this.setState({
        expenses: res.data
      });
      console.log(this.state.expenses);
    });
  }

  listExpense = e => {
    return this.state.expenses.map(expense => {
      return (
        <tr key={expense._id}>
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
      );
    });
  };

  handleDelete = (id, type) => {
    Axios.delete("http://localhost:80/api/expenseCatagory/?id=" + id).then(
      response => {
        console.log(response);
        this.props.deleteCatagory();
        Axios.get(
          "http://localhost:80/api/expenseCatagory?UserID=" +
            this.props.User._id
        ).then(res => {
          this.setState({
            expenses: res.data
          });
          console.log(this.state.expenses);
        });
      }
    );
  };

  render() {
    return (
      <div className="ExpenseCatagories">
        <Table striped hover>
          <thead>
            <tr>
              <th>Catagory</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <this.listExpense />
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  User: state.auth.user
});

export default connect(mapStateToProps)(ExpenseCatagories);
