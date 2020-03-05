import React, { Component } from "react";
import { Row, Col } from "antd";
import { Card } from "@material-ui/core";

export default class Balance extends Component {
  render() {
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card style={{ width: "300px", height: "200px" }}>
              <p>Balance</p>
              <p>Total</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
