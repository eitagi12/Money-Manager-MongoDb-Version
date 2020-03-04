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

var moment = require("moment");

export default class History extends Component {
  state = {
    historyData: [],
    visible: false,
    remark: "",
    amount: "",
    date: ""
  };
  fetchData = () => {
    Axios.get("/getactivity").then(result => {
      this.setState({
        historyData: result.data
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
    Axios.get("/getbydate", values)
      .then(res => {
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
      })
      .catch(err => {
        console.error(err);
      });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = id => {
    // let payload = {
    //   remarks: this.state.remark,
    //   amount: this.state.amount,
    //   date: this.state.date
    // };
    // Axios.put(`/update-activity/${id}`, payload)
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       visible: false
    //     });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    console.log(id);
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
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

        <Row style={{ height: "100vh" }}>
          <Col xs={1} md={4}></Col>
          <Col xs={22} md={16}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Remark</TableCell>
                    <TableCell align="center">Amount (Baht)</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Modify</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.historyData.map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.remarks}</TableCell>
                      <TableCell align="center">{row.amount}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">
                        <Button
                          type="primary"
                          danger
                          onClick={this.handleDelete.bind(this, row.id)}
                        >
                          <DeleteOutlined />
                        </Button>
                        <Button type="primary" onClick={this.showModal}>
                          <EditOutlined />
                        </Button>
                        <Modal
                          title="Edit"
                          visible={this.state.visible}
                          onOk={this.handleOk.bind(this, row.id)}
                          onCancel={this.handleCancel}
                        >
                          <Row>
                            Remark
                            <Input
                              placeholder="New Remark"
                              onChange={e =>
                                this.setState({ remark: e.target.value })
                              }
                            />
                          </Row>
                          <Row style={{ marginTop: "10px" }}>
                            Amount
                            <Input
                              type="number"
                              min="0"
                              placeholder="New Amount"
                              onChange={e =>
                                this.setState({ amount: e.target.value })
                              }
                            />
                          </Row>

                          <Row style={{ marginTop: "10px" }}>
                            Date
                            <DatePicker
                              onChange={(date, dateString) =>
                                this.setState({ date: dateString })
                              }
                              style={{ width: "100%" }}
                            />
                          </Row>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))}
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
