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
      catagory: "",
      amount: "",
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
        amount: res.data.amont,
        date: res.data.date
      });
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
              <Form.Control as="select" onChange={this.handleCatagory}>
                <this.listCatagories />
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                onChange={this.handleAmount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                id="#date"
                type="date"
                onChange={this.handleDate}
                value={this.state.date}
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
