import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Income extends Component {
  render() {
    return (
      <div className="Income">
        <Container>
          <Row>
            <h3>Record a new source of Income</h3>
          </Row>
          <Form>
            <Form.Group controlId="catagory">
              <Form.Label>Select a catagory</Form.Label>
              <Form.Control as="select">
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
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control type="date" />
                </Col>
                <Col>
                  <Form.Control type="time" />
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
