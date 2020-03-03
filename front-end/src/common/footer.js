import React, { Component } from "react";
import { TableFooter } from "@material-ui/core";

export default class footer extends Component {
  render() {
    return (
      <div>
        <TableFooter
          style={{
            position: "fixed",
            bottom: "0px",
            width: "100%",
            height: "50px",
            backgroundColor: "#005EA2",
            fontSize: "20px"
          }}
        >
          <h5
            style={{ textAlign: "center", marginTop: "10px", height: "100%" }}
          >
            Copyright (c) 2020 Supasit Loha
          </h5>
        </TableFooter>
      </div>
    );
  }
}
