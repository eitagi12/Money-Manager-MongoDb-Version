import React, { useState, useEffect } from "react";
import Axios from "../../../config/axios.setup";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputAmount from "./InputAmount";
var moment = require("moment");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    alignItems: "center"
  },
  table: {
    minWidth: 400
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [incomeData, setIncomeData] = React.useState([]);
  const [expenseData, setExpenseData] = React.useState([]);

  useEffect(() => {
    Axios.get("/getincomeactivity")
      .then(res => {
        setIncomeData(res.data);
      })
      .catch(err => {
        console.log("some thing went wrong");
      });
    Axios.get("/getexpenseactivity")
      .then(res => {
        setExpenseData(res.data);
      })
      .catch(err => {
        console.log("some thing went wrong");
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  console.log(expenseData);
  return (
    <div className={classes.root} style={{ paddingBottom: "50px" }}>
      <InputAmount />
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Expense" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Remark</TableCell>
                  <TableCell align="center">Amount (Baht)</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeData.map(row => (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {row.remarks}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat().format(row.amount)}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.date).format("LL")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Remark</TableCell>
                  <TableCell align="center">Amount (Baht)</TableCell>
                  <TableCell align="center">Date/Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseData.map(row => (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {row.remarks}
                    </TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat().format(row.amount)}
                    </TableCell>
                    <TableCell align="center">
                      {moment(row.date).format("LLL")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
