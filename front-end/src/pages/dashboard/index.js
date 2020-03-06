import React, { Component } from "react";
import Layout from "../../common/Layout.js";
import { Row, Col } from "antd";
import Income from "./components/Income.js";
import Expense from "./components/Expense.js";
import Balance from "./components/Balance.js";

export default class index extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Row style={{ height: "100vh" }}>
          <Col md={8} align="middle">
            <Income />
          </Col>
          <Col md={8} align="middle">
            <Expense />
          </Col>
          <Col md={8} align="middle">
            <Balance />
          </Col>
        </Row>
      </Layout>
    );
  }
}
