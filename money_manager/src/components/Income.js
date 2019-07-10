import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

class Income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagory: "Salary",
      amount: "",
      date: "",
      time: ""
    };
  }

  handleCatagory = e => {
    this.setState({
      catagory: e.target.value
    });
  };

  handleAmount = e => {
    this.setState({
      amount: parseInt(e.target.value)
    });
  };

  handleDate = e => {
    this.setState({
      date: e.target.value
    });
  };

  handleTime = e => {
    this.setState({
      time: e.target.value
    });
  };

  handleLog = e => {
    e.preventDefault();

    Axios.post("http://localhost:80/income/", {
      catagory: this.state.catagory,
      amount: this.state.amount,
      date: this.state.date,
      time: this.state.time
    }).then(response => {
      console.log(response);
    });
  };

  render() {
    return (
      <div className="Income">
        <Container>
          <Form onSubmit={this.handleLog}>
            <Form.Row>
              <h3>Record a new source of Income</h3>
            </Form.Row>
            <Form.Group controlId="catagory">
              <Form.Label>Select a catagory</Form.Label>
              <Form.Control as="select" onChange={this.handleCatagory}>
                <option>Salary</option>
                <option>Refunds</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Add a Catagory (optional)</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Button>Add</Button>
            <br />
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" onChange={this.handleAmount} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control type="date" onChange={this.handleDate} />
                </Col>
                <Col>
                  <Form.Control type="time" onChange={this.handleTime} />
                </Col>
              </Form.Row>
            </Form.Group>
            <Button type="submit">Add Income</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Income;
