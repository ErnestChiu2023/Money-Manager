import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "../css/Edit.css";

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      catagory: "",
      amount: 0,
      date: "",
      catagories: []
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
    Axios.get(
      "http://localhost:80/expense/?id=" + this.props.match.params.id
    ).then(res => {
      console.log(res.data);
      this.setState({
        catagory: res.data.catagory,
        amount: res.data.amount,
        date: res.data.date
      });
    });
    Axios.get("http://localhost:80/expenseCatagory/").then(res => {
      this.setState({
        catagories: res.data
      });
      console.log(this.state.catagories);
    });
  }

  listCatagories = () => {
    return this.state.catagories.map(catagory => {
      return <option key={catagory._id}>{catagory.catagory}</option>;
    });
  };

  handleCatagory = e => {
    this.setState({
      catagory: e.target.value
    });
  };

  handleAmount = e => {
    this.setState({
      amount: parseFloat(e.target.value)
    });
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleLog = e => {
    e.preventDefault();
    Axios.post(
      "http://localhost:80/expense/edit/?id=" + this.props.match.params.id,
      {
        catagory: this.state.catagory,
        amount: this.state.amount,
        date: this.state.date
      }
    ).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.props.notification();
        this.props.history.push("/expenseDisplay");
      }
    });
  };

  handleDelete = e => {
    console.log("delete fired");
    Axios.delete(
      "http://localhost:80/expense/?id=" + this.props.match.params.id
    ).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.props.history.push("/expenseDisplay");
      }
    });
  };

  render() {
    return (
      <div className="Edit">
        <Container>
          <Form onSubmit={this.handleLog}>
            <Form.Row>
              <h3>Edit the Record</h3>
            </Form.Row>
            <Form.Group controlId="catagory">
              <Form.Label>Select a catagory</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleCatagory}
                value={this.state.catagory}
              >
                <this.listCatagories />
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                onChange={this.handleAmount}
                value={this.state.amount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="#date"
                type="date"
                onChange={this.handleDate}
                value={this.state.date.substring(0, 10)}
              />
            </Form.Group>
            <Button type="submit">Edit Record</Button>
            <Button variant="danger" onClick={this.handleDelete}>
              Delete Record
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditExpense;
