import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import Axios from "../../../config/axios.setup";

export default class Register extends Component {
  render() {
    const onFinish = values => {
      Axios.post("/registeruser", values)
        .then(res => {
          console.log(res);
          console.log("Success:", values);
        })
        .catch(err => {
          console.log("Something Wrong");
        });
    };

    return (
      <div>
        <Form name="nest-messages" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
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
          <Form.Item
            name="firstname"
            label="First name"
            rules={[
              { required: true, message: "Please input your First name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last name"
            rules={[
              { required: true, message: "Please input your Last name!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" }
            ]}
          >
            <Input addonBefore="+66" style={{ width: "100%" }} />
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
