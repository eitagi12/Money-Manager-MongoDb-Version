import React, { Component } from "react";
import Layout from "../../common/loginLayout.js";
import Register from "./components/Register.js";
import { Row, Col } from "antd";

export default class index extends Component {
  render() {
    return (
      <div>
        <Layout {...this.props}>
          <Row style={{ height: "100vh" }} justify="spacearound" align="middle">
            <Col md={6}></Col>
            <Col style={{ paddingBottom: "50px" }} md={12}>
              <Register />
            </Col>
            <Col md={6}></Col>
          </Row>
        </Layout>
      </div>
    );
  }
}
