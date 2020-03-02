import React, { Component } from "react";
import Layout from "../../common/loginLayout.js";
import { Row, Col } from "antd";
import Login from "./components/Login.js";

export default class index extends Component {
  render() {
    return (
      <div>
        <Layout {...this.props}>
          <Row>
            <Col md={12}>This is gonna be picture</Col>
            <Col md={12}>
              <Login />
            </Col>
          </Row>
        </Layout>
      </div>
    );
  }
}
