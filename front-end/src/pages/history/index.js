import React, { Component } from "react";
import Layout from "../../common/Layout.js";
import History from "./components/History.js";

export default class index extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <History />
      </Layout>
    );
  }
}
