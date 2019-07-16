import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link } from "react-router-dom";
const axios = require("axios");

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Dashboard">Overview</div>;
  }
}

export default Dashboard;
