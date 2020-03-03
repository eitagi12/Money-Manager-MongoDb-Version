import React, { Component } from "react";
import Layout from "../../common/Layout.js";
import Activity from "./components/Activity";

export default class index extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Activity />
      </Layout>
    );
  }
}
