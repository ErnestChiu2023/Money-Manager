import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import "../css/income.css";

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

class Income extends Component {
  constructor(props) {
    super(props);
    this.notificationDOMRef = React.createRef();
    this.state = {
      catagory: "",
      amount: "",
      date: today,
      catagories: [],
      newCatagory: ""
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:80/incomeCatagory/").then(res => {
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

    Axios.post("http://localhost:80/income/", {
      catagory: this.state.catagory,
      amount: this.state.amount,
      date: this.state.date
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        this.props.SuccessNotification();
        this.props.history.push("/incomeDisplay");
      }
    });
  };

  handleNewCatagory = e => {
    this.setState({
      newCatagory: e.target.value
    });
    console.log(this.state.newCatagory);
  };

  newCatagory = e => {
    Axios.post("http://localhost:80/incomeCatagory/", {
      catagory: this.state.newCatagory
    }).then(response => {
      this.props.SuccessCatagoryNotification();
      Axios.get("http://localhost:80/incomeCatagory/").then(res => {
        this.setState({
          catagories: res.data
        });
        console.log(this.state.catagories);
      });
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
                <option value="" disabled selected>
                  Select your option
                </option>
                <this.listCatagories />
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Add a Catagory (optional)</Form.Label>
              <Form.Control type="text" onChange={this.handleNewCatagory} />
            </Form.Group>
            <Button onClick={this.newCatagory}>Add</Button>
            <br />
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
                value={this.state.date}
                onChange={this.handleDate}
              />
            </Form.Group>
            <Button type="submit">Add Income</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Income;
