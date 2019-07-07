import React, { Component } from "react";
import Table from "react-bootstrap/Table";

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <Table variant="dark" responsive bordered hover>
          <thead>
            <tr>
              <th>Catagory</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>food</td>
              <td>10.50</td>
              <td>2019-07-02</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td>groceries</td>
              <td>40.00</td>
              <td>2019-06-23</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>gas</td>
              <td>63.28</td>
              <td>2019-06-28</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Dashboard;
