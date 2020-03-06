import React from "react";
import { Layout } from "antd";
import LoginNavBar from "./loginNavbar.js";
import Content from "./content.js";
import Footer from "./footer";

export default props => {
  return (
    <Layout>
      <LoginNavBar />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};
