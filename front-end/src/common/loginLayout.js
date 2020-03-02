import React from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar.js";
import Content from "./content.js";
import Footer from "./footer";

export default props => {
  return (
    <Layout>
      <NavBar />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};
