import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import "../css/IncomeCatagories.css";
import { connect } from "react-redux";

class IncomeCatagories extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      incomes: []
    };
  }

  componentDidMount() {
    Axios.get(
      "http://localhost:80/api/incomeCatagory?UserID=" + this.props.User._id
    ).then(res => {
      this.setState({
        incomes: res.data
      });
      console.log(this.state.incomes);
    });
  }

  listIncome = e => {
    return this.state.incomes.map(income => {
      return (
        <tr key={income._id}>
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
      );
    });
  };

  handleDelete = (id, type) => {
    Axios.delete("http://localhost:80/api/incomeCatagory/?id=" + id).then(
      response => {
        console.log(response);
        this.props.deleteCatagory();
        Axios.get(
          "http://localhost:80/api/incomeCatagory?UserID=" + this.props.User._id
        ).then(res => {
          this.setState({
            incomes: res.data
          });
          console.log(this.state.incomes);
        });
      }
    );
  };

  render() {
    return (
      <div className="IncomeCatagories">
        <Table striped hover>
          <thead>
            <tr>
              <th>Catagory</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <this.listIncome />
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  User: state.auth.user
});

export default connect(mapStateToProps)(IncomeCatagories);
