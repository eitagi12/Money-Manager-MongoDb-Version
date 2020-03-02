import React from "react";
import { Layout } from "antd";
export default function Content(props) {
  return <Layout.Content>{props.children}</Layout.Content>;
}
