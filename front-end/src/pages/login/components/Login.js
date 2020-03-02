import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import Axios from "../../../config/axios.setup.js";
import { Link } from "@material-ui/core";

export default class Login extends Component {
  render() {
    const onFinish = values => {
      Axios.post("/loginuser", values)
        .then(res => {
          console.log(res);
          console.log("Success:", values);
        })
        .catch(err => console.log("something wrong"));
    };

    const onFinishFailed = errorInfo => {
      console.log("Failed:", errorInfo);
    };

    return (
      <div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
