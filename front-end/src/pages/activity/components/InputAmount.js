import React, { Component } from "react";
import Axios from "../../../config/axios.setup.js";
import {
  Form,
  Button,
  InputNumber,
  Row,
  Col,
  Radio,
  Input,
  DatePicker
} from "antd";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NoteIcon from "@material-ui/icons/Note";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DateRangeIcon from "@material-ui/icons/DateRange";
var moment = require("moment");

export default class InputIncome extends Component {
  render() {
    const onFinish = fieldsValue => {
      const values = {
        ...fieldsValue,
        date: fieldsValue["date"].format("YYYY-MM-DD")
      };
      Axios.post("/addactivity", values)
        .then(res => {
          window.location.reload();
          console.log(res);
          console.log("Success:", values);
        })
        .catch(err => {
          console.log(err);
          console.log("Somethin Went Wrong");
        });
    };

    const validateMessages = {
      required: "This field is required!",
      types: {
        number: "Not a validate number!"
      },
      number: {
        range: "Must be between ${min} and ${max}"
      }
    };

    return (
      <div style={{ backgroundColor: "#00D2FC" }}>
        <Form
          name="addIncome"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ paddingTop: "20px" }}
        >
          <Row justify="space-around" align="middle">
            <Col sm={3} md={3} justify="space-around" align="middle">
              <AccountBalanceIcon />
              <Form.Item name="type" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio.Button value="income">INCOME</Radio.Button>
                  <Radio.Button value="expense">EXPENSE</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={20} md={6} justify="space-around" align="middle">
              <MonetizationOnIcon />
              <Form.Item
                name="amount"
                rules={[
                  { required: true, type: "number", min: 1, max: 99999999 }
                ]}
              >
                <InputNumber placeholder="Amount" style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col xs={20} md={6} justify="space-around" align="middle">
              <NoteIcon />
              <Form.Item name="remarks">
                <Input placeholder="Remarks" style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col xs={20} md={6} justify="space-around" align="middle">
              <DateRangeIcon />
              <Form.Item name="date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "80%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={3}>
              <Row justify="space-around" align="middle">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
