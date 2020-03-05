import React, { Component } from "react";
import { Row, Col } from "antd";
import { Card } from "@material-ui/core";

export default class Expense extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card
              title="Default size card"
              style={{ width: "300px", height: "200px" }}
            >
              <p>Today Expense</p>
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
              <p>This month Expense</p>
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
              <p>Total Expense</p>
              <p>Total</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
