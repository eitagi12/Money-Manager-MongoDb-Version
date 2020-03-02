import React from "react";
import { Layout, Row, Col } from "antd";
import NavBar from "./navbar.js";
import Content from "./content.js";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default props => {
  return (
    <Layout>
      <NavBar />
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>
          <Content>{props.children}</Content>
          <Footer />
        </Col>
      </Row>
    </Layout>
  );
};
