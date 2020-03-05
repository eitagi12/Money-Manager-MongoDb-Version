import React, { Component } from "react";
import { Row, Col } from "antd";
import { Card } from "@material-ui/core";

export default class Income extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card
              title="Default size card"
              style={{ width: "300px", height: "200px" }}
            >
              <p>Today Income</p>
              <p>Total</p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card
              title="Default size card"
              style={{ width: "300px", height: "200px" }}
            >
              <p>This month Income</p>
              <p>Total</p>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card
              title="Default size card"
              style={{ width: "300px", height: "200px" }}
            >
              <p>Total Income</p>
              <p>Total</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
