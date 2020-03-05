import React, { Component } from "react";
import Layout from "../../common/loginLayout.js";
import { Row, Col, Carousel } from "antd";
import Login from "./components/Login.js";

export default class index extends Component {
  render() {
    return (
      <div>
        <Layout {...this.props}>
          <Row style={{ height: "100vh" }} justify="spacearound" align="middle">
            <Col md={12} style={{ textAlign: "center" }}>
              <img
                src="/images/bank.jpg"
                width="80%"
                height="80%"
                alt="Bank"
              ></img>
            </Col>
            <Col md={12}>
              <Login />
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}
