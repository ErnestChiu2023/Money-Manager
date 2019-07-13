import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "../css/Edit.css";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      catagory: "Gas",
      amount: "",
      date: "",
      catagories: []
    };
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
                value={this.state.amount}
                onChange={this.handleAmount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="#date"
                type="date"
                value={this.state.date}
                onChange={this.handleDate}
              />
            </Form.Group>
            <Button type="submit">Edit Record</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Edit;