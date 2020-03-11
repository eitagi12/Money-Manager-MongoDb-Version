import React, { Component } from "react";
import Axios from "../../../config/axios.setup.js";
import { Form, Button, Row, Col, DatePicker, Modal, Input } from "antd";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { successEdit, successDelete } from "./notification/notification.js";

var moment = require("moment");
const dateFormat = "YYYY-MM-DD";

export default class History extends Component {
  state = {
    historyData: [],
    remarks: "",
    amount: "",
    date: "",
    visible: []
  };
  fetchData = () => {
    Axios.get("/getactivity").then(result => {
      let visible = [];
      for (let boo of result.data) {
        visible.push(false);
      }

      this.setState({
        historyData: result.data,
        visible: visible
      });

      console.log(this.state.historyData);
    });
  };
  componentDidMount() {
    this.fetchData();
  }
  onSearch = fieldsValue => {
    const values = {
      ...fieldsValue,
      date: fieldsValue["date"].format("YYYY-MM-DD")
    };
    console.log(values);
    Axios.post("/getbydate", values)
      .then(res => {
        this.setState({ historyData: res.data });
        console.log(res.data);
        console.log("Success:", values);
      })
      .catch(err => {
        console.log(err);
        console.log("Somethin Went Wrong");
      });
  };

  handleDelete = id => {
    Axios.delete(`/deleteactivity/${id}`)
      .then(result => {
        this.fetchData();
        successDelete();
      })
      .catch(err => {
        console.error(err);
      });
  };

  showModal = (_id, idx) => {
    Axios.get(`/getactivityone/${_id}`).then(res => {
      console.log(res);
      let visible = this.state.visible;
      visible[idx] = true;
      this.setState({
        remarks: res.data.remarks,
        amount: res.data.amount,
        date: res.data.date,
        visible
      });
    });
  };

  handleOk = (id, idx) => {
    let payload = {
      remarks: this.state.remarks,
      amount: this.state.amount,
      date: this.state.date
    };
    Axios.put(`/update-activity/${id}`, payload)
      .then(result => {
        successEdit();
        console.log(result);
        this.fetchData();
        let visible = this.state.visible;
        visible[idx] = false;
        this.setState({
          visible
        });
      })
      .catch(err => {
        console.error(err);
      });
    console.log(id);
  };

  handleCancel = idx => {
    console.log(idx);
    let visible = this.state.visible;
    visible[idx] = false;
    this.setState({
      visible
    });
  };

  render() {
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
      <div style={{ backgroundColor: "#FFE7FF" }}>
        <Form
          name="addIncome"
          onFinish={this.onSearch}
          validateMessages={validateMessages}
          style={{ paddingTop: "20px" }}
        >
          <Row justify="space-around" align="middle">
            <Col xs={4} md={2} justify="space-around" align="middle">
              <div
                style={{
                  fontSize: "20px",
                  marginBottom: "25px",
                  fontWeight: "bold"
                }}
              >
                HISTORY
              </div>
            </Col>
            <Col xs={10} md={19}>
              <Form.Item name="date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={4} md={2} justify="space-around" align="middle">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <h5 style={{ textAlign: "center" }}>*Default Show today</h5>

        <Row style={{ height: "100vh" }}>
          <Col xs={1} md={4}></Col>
          <Col xs={22} md={16}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Remarks</TableCell>
                    <TableCell align="center">Amount (Baht)</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Modify</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.historyData.map((row, idx) => {
                    let color = row.type === "income" ? "green" : "red";
                    let sign = row.type === "income" ? "+" : "-";
                    return (
                      <TableRow key={row._id}>
                        <TableCell align="center">{row.remarks}</TableCell>
                        <TableCell align="center" style={{ color }}>
                          {sign +
                            " " +
                            new Intl.NumberFormat().format(row.amount)}
                        </TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">
                          <Button
                            type="primary"
                            danger
                            onClick={this.handleDelete.bind(this, row._id)}
                          >
                            <DeleteOutlined />
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => this.showModal(row._id, idx)}
                          >
                            <EditOutlined />
                          </Button>
                          <Modal
                            title="Edit"
                            visible={this.state.visible[idx]}
                            onOk={() => this.handleOk(row._id, idx)}
                            onCancel={() => this.handleCancel(idx)}
                          >
                            <Row>
                              Remarks
                              <Input
                                placeholder="New Remarks"
                                value={this.state.remarks}
                                onChange={e =>
                                  this.setState({ remarks: e.target.value })
                                }
                              />
                            </Row>
                            <Row style={{ marginTop: "10px" }}>
                              Amount
                              <Input
                                type="number"
                                min="0"
                                placeholder="New Amount"
                                value={this.state.amount}
                                onChange={e =>
                                  this.setState({ amount: e.target.value })
                                }
                              />
                            </Row>

                            <Row style={{ marginTop: "10px" }}>
                              Date
                              <DatePicker
                                defaultValue={moment(
                                  this.state.date,
                                  "YYYY-MM-DD"
                                )}
                                format={dateFormat}
                                onChange={(date, dateString) =>
                                  this.setState({ date: dateString })
                                }
                                style={{ width: "100%" }}
                              />
                            </Row>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col xs={1} md={4}></Col>
        </Row>
      </div>
    );
  }
}
