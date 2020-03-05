import React, { Component } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Axios from "../../../config/axios.setup";
import { Link } from "react-router-dom";
import { successRegister, failRegister } from "./Notification/notification.js";

export default class Register extends Component {
  render() {
    const onFinish = values => {
      Axios.post("/registeruser", values)
        .then(res => {
          console.log(res);
          console.log("Success:", values);
          successRegister();
          window.location.reload();
        })
        .catch(err => {
          console.log("Something Wrong");
          failRegister();
        });
    };

    return (
      <div>
        <Row>
          <p style={{ fontSize: "40px" }}>Register</p>
          <Col md={6}></Col>
          <Col md={12}>
            <Form
              name="nest-messages"
              onFinish={onFinish}
              justify="spacearound"
              align="middle"
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" }
                ]}
              >
                <Input style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                name="firstname"
                label="First name"
                rules={[
                  { required: true, message: "Please input your First name!" }
                ]}
              >
                <Input style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last name"
                rules={[
                  { required: true, message: "Please input your Last name!" }
                ]}
              >
                <Input style={{ width: "300px" }} />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input your phone number!" }
                ]}
              >
                <Input style={{ width: "250px" }} addonBefore="+66" />
              </Form.Item>
              <Form.Item>
                <Link style={{ marginRight: "10px" }} to="/login">
                  <Button style={{ marginLeft: "100px" }}>Back</Button>
                </Link>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col md={6}></Col>
        </Row>
      </div>
    );
  }
}
