import React, { Component } from "react";
import { Form, Input, Button, Row } from "antd";
import Axios from "../../../config/axios.setup.js";
import { Link } from "react-router-dom";

import {
  successLoginNotification,
  failLoginNotification
} from "./Notification/notification.js";

export default class Login extends Component {
  render() {
    const onFinish = values => {
      Axios.post("/loginuser", values)
        .then(res => {
          successLoginNotification();
          localStorage.setItem("Access_TOKEN", res.data.token);
          window.location.reload();
          console.log(res);
          console.log("Success:", values);
        })
        .catch(err => {
          failLoginNotification();
          console.log("something wrong");
        });
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div>
        <Row>
          <Form
            justify="spacearound"
            align="middle"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link style={{ marginLeft: "10px" }} to="/register">
                Register
              </Link>
            </Form.Item>
          </Form>
        </Row>
      </div>
    );
  }
}
