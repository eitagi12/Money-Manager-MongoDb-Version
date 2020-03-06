import React, { Component } from "react";
import { Row, Col } from "antd";
import { Card } from "@material-ui/core";
import Axios from "../../../config/axios.setup";
import "./style.css";

export default class Balance extends Component {
  state = {
    dashboardData: []
  };

  fetchData = () => {
    Axios.get("/dashboard")
      .then(res => {
        console.log(res);
        this.setState({ dashboardData: res.data });
      })
      .catch(err => {
        console.log("some thing went wrong");
      });
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div>
        <Row style={{ marginTop: "5%" }}>
          <Col style={{ margin: "5% 15% 10% 12%" }}>
            <Card className="cardStyle">
              <p style={{ fontSize: "50px", fontWeight: "bold" }}>Balance</p>
              <p style={{ fontSize: "30px" }}>Total</p>
              <hr></hr>
              <p style={{ color: "blue", fontSize: "40px" }}>
                {new Intl.NumberFormat().format(
                  this.state.dashboardData.balanceDashboard
                )}
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
