import React, { Component } from "react";
import Layout from "../../common/loginLayout.js";
import Register from "./components/Register.js";

export default class index extends Component {
  render() {
    return (
      <div>
        <Layout {...this.props}>
          <Register />
        </Layout>
      </div>
    );
  }
}
